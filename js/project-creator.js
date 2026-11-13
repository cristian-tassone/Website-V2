const form = document.querySelector("#brief-form");
const picker = document.querySelector("#existing-project");
const preview = document.querySelector("#live-preview-content");
const output = document.querySelector("#brief-output");
const report = document.querySelector("#report");
const status = document.querySelector("#saved-status");
const key = "ct-project-creator-draft-v2";

const text = (value) => String(value || "").trim();
const lines = (value) => text(value).split(/\n+/).map(text).filter(Boolean);
const field = (data, name) => text(data.get(name));
const section = (label, value) => value ? `\n${label}\n${value}\n` : "";
const escapeHtml = (value) => text(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));

function setField(name, value = "") { if (form.elements[name]) form.elements[name].value = value; }
function formData() { return new FormData(form); }

function populatePicker() {
  const groups = Object.groupBy(PROJECTS, ({ category }) => category);
  Object.entries(groups).forEach(([category, projects]) => {
    const group = document.createElement("optgroup");
    group.label = CATEGORIES[category].label;
    projects.forEach((project) => group.append(new Option(project.title, project.slug)));
    picker.append(group);
  });
}

function loadProject(slug) {
  if (!slug) { form.reset(); setField("sourceSlug", ""); updatePreview(); return; }
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return;
  setField("sourceSlug", project.slug);
  setField("title", project.title);
  setField("channel", project.category);
  setField("year", project.year);
  setField("client", project.client);
  setField("role", project.role);
  setField("context", project.context);
  setField("about", (project.body || []).join("\n\n"));
  setField("hero", project.tileMedia || project.cover || "");
  setField("spotify", project.embed || "");
  setField("spotifyText", project.embedNote || "");
  setField("youtube", project.youtube || project.videoUrl || "");
  setField("youtubeText", project.youtubeNote || "");
  setField("storyTitle", project.storyModules?.[0]?.title || "");
  setField("storyText", project.storyModules?.[0]?.text || "");
  setField("gallery", (project.gallery || []).join("\n"));
  setField("links", (project.links || []).map((link) => `${link.label} | ${link.url}`).join("\n"));
  saveDraft();
  updatePreview();
}

function mediaPreview(kind, title, copy, reverse) {
  if (!title && !copy) return "";
  return `<section class="builder-media${reverse ? " builder-media--reverse" : ""}">
    <div class="builder-frame builder-frame--${kind}"><span>${kind === "spotify" ? "Spotify player" : "YouTube player"}</span></div>
    <div class="builder-copy"><h3>${escapeHtml(title || (kind === "spotify" ? "Music title" : "Video title"))}</h3><p>${escapeHtml(copy || "Add the accompanying text for this media module.")}</p></div>
  </section>`;
}

function updatePreview() {
  const data = formData();
  const gallery = lines(data.get("gallery"));
  const about = lines(data.get("about"));
  const hero = field(data, "hero");
  const media = [];
  if (field(data, "spotify")) media.push(mediaPreview("spotify", field(data, "title"), field(data, "spotifyText"), true));
  if (field(data, "youtube")) media.push(mediaPreview("youtube", "Video module", field(data, "youtubeText"), media.length % 2 === 0));
  preview.innerHTML = `
    <article class="builder-page">
      <div class="builder-hero${hero ? " has-image" : ""}"${hero ? ` style="background-image:url('${escapeHtml(hero)}')"` : ""}>
        <div><h2>${escapeHtml(field(data, "title") || "Project title")}</h2><p>${escapeHtml(field(data, "client") || "Client")} · ${escapeHtml(field(data, "year") || "Year")}</p></div>
      </div>
      <section class="builder-overview"><div><p class="builder-lead">${escapeHtml(field(data, "context") || "Your project summary appears here.")}</p>${about.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div><aside><span>Year</span><b>${escapeHtml(field(data, "year") || "—")}</b><span>Role</span><b>${escapeHtml(field(data, "role") || "—")}</b><span>Client</span><b>${escapeHtml(field(data, "client") || "—")}</b></aside></section>
      ${media.join("")}
      ${field(data, "storyTitle") || field(data, "storyText") ? `<section class="builder-story"><h3>${escapeHtml(field(data, "storyTitle") || "Story title")}</h3><p>${escapeHtml(field(data, "storyText") || "Story text goes here.")}</p></section>` : ""}
      ${gallery.length ? `<section class="builder-gallery">${gallery.map((src) => `<img src="${escapeHtml(src)}" alt="Gallery preview">`).join("")}</section>` : ""}
    </article>`;
}

function buildReport(data) {
  const gallery = lines(data.get("gallery"));
  const links = lines(data.get("links"));
  const about = lines(data.get("about"));
  const source = field(data, "sourceSlug");
  return `PROJECT BUILD HANDOFF\n=====================\n\nMODE: ${source ? "Update existing project" : "New project"}\nEXISTING PROJECT: ${source || "None"}\n\nTITLE: ${field(data, "title")}\nCHANNEL: ${field(data, "channel")}\nYEAR: ${field(data, "year") || "Not supplied"}\nCLIENT: ${field(data, "client") || "Not supplied"}\nROLE: ${field(data, "role") || "Not supplied"}\n\nOVERVIEW\nSummary: ${field(data, "context") || "Not supplied"}\n${section("Overview copy", about.length ? about.map((paragraph, i) => `${i + 1}. ${paragraph}`).join("\n\n") : "")}\nMEDIA\nHero GIF / image: ${field(data, "hero") || "Add later"}\nSpotify embed: ${field(data, "spotify") || "None"}\nSpotify text: ${field(data, "spotifyText") || "None"}\nYouTube URL: ${field(data, "youtube") || "None"}\nYouTube text: ${field(data, "youtubeText") || "None"}\n${section("STORY", field(data, "storyTitle") || field(data, "storyText") ? `Title: ${field(data, "storyTitle") || "Untitled"}\nText: ${field(data, "storyText") || "Not supplied"}` : "")}GALLERY\n${gallery.length ? gallery.map((item) => `- ${item}`).join("\n") : "- Add later"}\n\nEXTERNAL LINKS\n${links.length ? links.map((item) => `- ${item}`).join("\n") : "- None"}\n\nBUILD REQUEST\nApply this handoff using the shared Overview, Media, Story and Gallery modules.\n`;
}

function saveDraft() { localStorage.setItem(key, JSON.stringify(Object.fromEntries(formData()))); }
function restoreDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(key) || "null");
    if (!draft) return;
    Object.entries(draft).forEach(([name, value]) => setField(name, value));
    picker.value = draft.sourceSlug || "";
  } catch { /* A fresh blank brief is fine. */ }
}

picker.addEventListener("change", () => loadProject(picker.value));
form.addEventListener("input", () => { saveDraft(); updatePreview(); });
form.addEventListener("submit", (event) => {
  event.preventDefault(); report.value = buildReport(formData()); output.hidden = false;
  status.textContent = "Saved locally"; output.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#copy-report").addEventListener("click", async () => {
  await navigator.clipboard.writeText(report.value); status.textContent = "Copied — paste it into our chat";
});
document.querySelector("#download-report").addEventListener("click", () => {
  const filename = (field(formData(), "title") || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const blob = new Blob([report.value], { type: "text/markdown" }); const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = `${filename}-handoff.md`; link.click(); URL.revokeObjectURL(link.href);
});
document.querySelector("#clear-form").addEventListener("click", () => { form.reset(); picker.value = ""; output.hidden = true; localStorage.removeItem(key); updatePreview(); });

populatePicker();
restoreDraft();
updatePreview();
