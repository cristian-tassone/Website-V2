const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile, spawn } = require("child_process");
const root = __dirname;
const assets = path.join(root, "assets");
const ffmpeg = path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages", "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe", "ffmpeg-9.0.2-full_build", "bin", "ffmpeg.exe");
const ffprobe = path.join(path.dirname(ffmpeg), "ffprobe.exe");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".cur": "image/x-icon" };
const maxBytes = 300 * 1024 * 1024;
const port = Number(process.env.PORT || 8126);
const uploadJobs = new Map();
const send = (res, code, body, type = "text/plain") => { res.writeHead(code, { "Content-Type": type }); res.end(body); };
const run = (command, args) => new Promise((resolve, reject) => execFile(command, args, { windowsHide: true }, (error, stdout, stderr) => error ? reject(new Error(stderr || error.message)) : resolve(stdout)));
const probeDuration = input => run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", input]).then(value => Number.parseFloat(value) || 0);
const runFfmpeg = (args, onProgress) => new Promise((resolve, reject) => {
  const process = spawn(ffmpeg, args, { windowsHide: true }); let output = "";
  process.stderr.setEncoding("utf8");
  process.stderr.on("data", data => {
    output += data;
    for (const line of data.split(/\r?\n/)) {
      const match = /^out_time_(?:ms|us)=(\d+)/.exec(line);
      if (match) onProgress(Number(match[1]));
    }
  });
  process.on("error", reject);
  process.on("close", code => code === 0 ? resolve() : reject(new Error(output || `ffmpeg exited with code ${code}`)));
});
const validJobId = value => /^[a-z0-9-]{8,100}$/i.test(value || "");
const expireJob = id => setTimeout(() => uploadJobs.delete(id), 90_000).unref();

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/api/assets-progress") {
    const job = uploadJobs.get(url.searchParams.get("job"));
    return send(res, job ? 200 : 404, JSON.stringify(job || { error: "Upload job not found" }), "application/json");
  }
  if (req.method === "POST" && url.pathname === "/api/assets") {
    const name = path.basename(url.searchParams.get("name") || "");
    if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) return send(res, 400, "Invalid filename");
    const jobId = validJobId(url.searchParams.get("job")) ? url.searchParams.get("job") : null;
    const total = Number(req.headers["content-length"]) || 0;
    const job = jobId ? { phase: "uploading", received: 0, total, percent: 0, name } : null;
    if (jobId) uploadJobs.set(jobId, job);
    const chunks = []; let size = 0;
    try {
      for await (const chunk of req) {
        size += chunk.length;
        if (size > maxBytes) { if (job) Object.assign(job, { phase: "error", error: "File is larger than 300 MB" }); return send(res, 413, "File is larger than 300 MB"); }
        chunks.push(chunk);
        if (job) Object.assign(job, { received: size, percent: total ? Math.min(100, Math.round(size / total * 100)) : 0 });
      }
    await fs.promises.mkdir(assets, { recursive: true });
    const destination = path.join(assets, name);
    const cropHeroGif = url.searchParams.get("crop") === "hero" && path.extname(name).toLowerCase() === ".gif";
    if (url.searchParams.get("convert") === "gif" || cropHeroGif) {
      const temp = path.join(assets, `.upload-${Date.now()}-${Math.random().toString(16).slice(2)}.video`);
      await fs.promises.writeFile(temp, Buffer.concat(chunks));
      try {
        const duration = await probeDuration(temp).catch(() => 0);
        if (job) Object.assign(job, { phase: "converting", percent: 0, duration });
        const filter = url.searchParams.get("crop") === "hero"
          ? "fps=12,scale=960:408:force_original_aspect_ratio=increase,crop=960:408,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=new=1"
          : "fps=12,scale=960:-2:flags=lanczos";
        await runFfmpeg(["-y", "-i", temp, "-progress", "pipe:2", "-nostats", "-vf", filter, "-loop", "0", destination], outTime => {
          if (job && duration) job.percent = Math.min(99, Math.max(0, Math.round(outTime / 1_000_000 / duration * 100)));
        });
      } catch (error) {
        await fs.promises.rm(destination, { force: true });
        if (job) Object.assign(job, { phase: "error", error: error.message });
        return send(res, 500, `Video conversion failed: ${error.message}`);
      } finally { await fs.promises.rm(temp, { force: true }); }
    } else await fs.promises.writeFile(destination, Buffer.concat(chunks));
    if (job) { Object.assign(job, { phase: "complete", percent: 100, received: size }); expireJob(jobId); }
    return send(res, 200, JSON.stringify({ path: `assets/${name}` }), "application/json");
    } catch (error) {
      if (job) Object.assign(job, { phase: "error", error: error.message });
      return send(res, 500, error.message || "Could not save asset");
    }
  }
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
  let requested = decodeURIComponent(url.pathname);
  if (requested === "/") requested = "/index.html";
  const file = path.normalize(path.join(root, requested));
  if (!file.startsWith(root)) return send(res, 403, "Forbidden");
  fs.readFile(file, (error, data) => error ? send(res, 404, "Not found") : send(res, 200, data, types[path.extname(file)] || "application/octet-stream"));
}).listen(port, "127.0.0.1", () => console.log(`Portfolio workspace ready at http://127.0.0.1:${port}/project-creator.html`));
