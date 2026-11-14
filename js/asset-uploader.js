const projectSelect = document.getElementById("asset-project");
const heroInput = document.getElementById("hero-input");
const galleryInput = document.getElementById("gallery-input");
const heroFiles = document.getElementById("hero-files");
const galleryFiles = document.getElementById("gallery-files");
const stageButton = document.getElementById("stage-project");
const batchSection = document.getElementById("asset-batch");
const batchList = document.getElementById("batch-list");
const batchCount = document.getElementById("batch-count");
const uploadBatchButton = document.getElementById("upload-batch");
const status = document.getElementById("asset-status");
const handoff = document.getElementById("asset-handoff");
const handoffText = document.getElementById("handoff-text");
let hero = null;
let gallery = [];
let batch = [];

Object.keys(CATEGORIES).forEach((category) => {
  const group = document.createElement("optgroup");
  group.label = CATEGORIES[category].label;
  PROJECTS.filter((project) => project.category === category).forEach((project) => group.append(new Option(project.title, project.slug)));
  projectSelect.append(group);
});

const safe = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
const isVideo = (file) => file.type.startsWith("video/") || /\.(mp4|mov)$/i.test(file.name);
const extension = (file) => isVideo(file) ? ".gif" : file.name.includes(".") ? `.${file.name.split(".").pop().toLowerCase()}` : ".jpg";

function fileRow(name, remove) {
  const id = `remove-${crypto.randomUUID()}`;
  queueMicrotask(() => document.getElementById(id)?.addEventListener("click", remove));
  return `<div class="asset-file"><span>${safe(name)}</span><button id="${id}" type="button" aria-label="Remove ${safe(name)}">Remove</button></div>`;
}
function renderCurrentFiles() {
  heroFiles.innerHTML = hero ? fileRow(hero.name, () => { hero = null; renderCurrentFiles(); }) : "";
  galleryFiles.innerHTML = gallery.map((file, index) => fileRow(file.name, () => { gallery.splice(index, 1); renderCurrentFiles(); })).join("");
  stageButton.disabled = !projectSelect.value || (!hero && !gallery.length);
}
function renderBatch() {
  batchSection.hidden = !batch.length;
  batchCount.textContent = `${batch.length} project${batch.length === 1 ? "" : "s"}`;
  batchList.innerHTML = batch.map((entry, index) => `<article class="batch-item"><div><b>${safe(entry.project.title)}</b><span>${entry.hero ? "1 hero" : "No hero"} · ${entry.gallery.length} gallery item${entry.gallery.length === 1 ? "" : "s"}</span></div><button type="button" data-remove-batch="${index}">Remove</button></article>`).join("");
  batchList.querySelectorAll("[data-remove-batch]").forEach((button) => button.addEventListener("click", () => { batch.splice(Number(button.dataset.removeBatch), 1); renderBatch(); }));
}
function acceptFiles(kind, files) {
  const valid = [...files].filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/") || /\.(gif|webp|mp4|mov)$/i.test(file.name));
  if (!valid.length) return;
  if (kind === "hero") hero = valid[0]; else gallery.push(...valid);
  handoff.hidden = true;
  renderCurrentFiles();
}
[["hero", heroInput], ["gallery", galleryInput]].forEach(([kind, input]) => {
  const zone = document.querySelector(`[data-kind="${kind}"]`);
  zone.addEventListener("click", () => input.click());
  zone.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") input.click(); });
  input.addEventListener("change", () => acceptFiles(kind, input.files));
  ["dragenter", "dragover"].forEach((eventName) => zone.addEventListener(eventName, (event) => { event.preventDefault(); zone.classList.add("is-dragging"); }));
  ["dragleave", "drop"].forEach((eventName) => zone.addEventListener(eventName, (event) => { event.preventDefault(); zone.classList.remove("is-dragging"); }));
  zone.addEventListener("drop", (event) => acceptFiles(kind, event.dataTransfer.files));
});
projectSelect.addEventListener("change", renderCurrentFiles);

stageButton.addEventListener("click", () => {
  const project = PROJECTS.find((item) => item.slug === projectSelect.value);
  if (!project || (!hero && !gallery.length)) return;
  batch = batch.filter((entry) => entry.project.slug !== project.slug);
  batch.push({ project, hero, gallery: [...gallery] });
  hero = null; gallery = []; projectSelect.value = "";
  heroInput.value = ""; galleryInput.value = "";
  status.textContent = `${project.title} added to the batch. Choose the next project.`;
  renderCurrentFiles(); renderBatch();
});

async function upload(file, name, cropForHero = false) {
  const params = new URLSearchParams({ name });
  if (isVideo(file)) params.set("convert", "gif");
  /* Hero GIFs and videos are normalised to the banner crop server-side.
     This preserves their proportions; the crop simply fills the hero frame. */
  if (cropForHero) params.set("crop", "hero");
  const response = await fetch(`/api/assets?${params}`, { method: "POST", headers: { "Content-Type": file.type || "application/octet-stream" }, body: file });
  if (!response.ok) throw new Error(await response.text());
  return (await response.json()).path;
}
uploadBatchButton.addEventListener("click", async () => {
  uploadBatchButton.disabled = true;
  status.textContent = "Uploading the batch… video files may take a moment to convert to GIF.";
  try {
    const reports = [];
    for (let itemIndex = 0; itemIndex < batch.length; itemIndex += 1) {
      const entry = batch[itemIndex];
      const heroPath = entry.hero ? await upload(entry.hero, `${entry.project.slug}-hero${extension(entry.hero)}`, true) : null;
      const galleryPaths = [];
      for (let index = 0; index < entry.gallery.length; index += 1) galleryPaths.push(await upload(entry.gallery[index], `${entry.project.slug}-gallery-${index + 1}${extension(entry.gallery[index])}`));
      reports.push(`PROJECT: ${entry.project.title}\n\nHERO\n${heroPath || "No hero uploaded"}\n\nGALLERY\n${galleryPaths.length ? galleryPaths.map((path) => `- ${path}`).join("\n") : "- No gallery images uploaded"}`);
    }
    handoffText.textContent = `BULK PROJECT ASSET HANDOFF\n==========================\n\n${reports.join("\n\n--------------------------\n\n")}\n\nBUILD REQUEST\nAdd each project’s uploaded assets to its shared Hero and Gallery modules.`;
    handoff.hidden = false;
    status.textContent = "Everything uploaded. Copy the one bulk handoff below and send it to me.";
    batch = []; renderBatch();
  } catch (error) { status.textContent = `Upload failed: ${error.message}`; }
  finally { uploadBatchButton.disabled = false; }
});
document.getElementById("copy-handoff").addEventListener("click", async () => { await navigator.clipboard.writeText(handoffText.textContent); status.textContent = "Bulk asset handoff copied — paste it into our chat."; });
renderCurrentFiles(); renderBatch();
