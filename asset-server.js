const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const root = __dirname;
const assets = path.join(root, "assets");
const ffmpeg = path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages", "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe", "ffmpeg-9.0.2-full_build", "bin", "ffmpeg.exe");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".cur": "image/x-icon" };
const maxBytes = 300 * 1024 * 1024;
const send = (res, code, body, type = "text/plain") => { res.writeHead(code, { "Content-Type": type }); res.end(body); };
const run = (command, args) => new Promise((resolve, reject) => execFile(command, args, { windowsHide: true }, (error, stdout, stderr) => error ? reject(new Error(stderr || error.message)) : resolve(stdout)));

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "POST" && url.pathname === "/api/assets") {
    const name = path.basename(url.searchParams.get("name") || "");
    if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) return send(res, 400, "Invalid filename");
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > maxBytes) return send(res, 413, "File is larger than 300 MB"); chunks.push(chunk); }
    await fs.promises.mkdir(assets, { recursive: true });
    const destination = path.join(assets, name);
    if (url.searchParams.get("convert") === "gif") {
      const temp = path.join(assets, `.upload-${Date.now()}-${Math.random().toString(16).slice(2)}.video`);
      await fs.promises.writeFile(temp, Buffer.concat(chunks));
      try {
        const filter = url.searchParams.get("crop") === "hero"
          ? "fps=12,scale=960:408:force_original_aspect_ratio=increase,crop=960:408"
          : "fps=12,scale=960:-2:flags=lanczos";
        await run(ffmpeg, ["-y", "-i", temp, "-vf", filter, "-loop", "0", destination]);
      } catch (error) {
        await fs.promises.rm(destination, { force: true });
        return send(res, 500, `Video conversion failed: ${error.message}`);
      } finally { await fs.promises.rm(temp, { force: true }); }
    } else await fs.promises.writeFile(destination, Buffer.concat(chunks));
    return send(res, 200, JSON.stringify({ path: `assets/${name}` }), "application/json");
  }
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
  let requested = decodeURIComponent(url.pathname);
  if (requested === "/") requested = "/index.html";
  const file = path.normalize(path.join(root, requested));
  if (!file.startsWith(root)) return send(res, 403, "Forbidden");
  fs.readFile(file, (error, data) => error ? send(res, 404, "Not found") : send(res, 200, data, types[path.extname(file)] || "application/octet-stream"));
}).listen(8126, "127.0.0.1", () => console.log("Asset uploader ready at http://127.0.0.1:8126/asset-uploader.html"));
