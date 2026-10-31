/* Wii Portfolio Admin — local content editor and publisher */
const DRAFT_KEY = "ct-portfolio-draft-v2";
const LIVE_KEY = "ct-portfolio-live-v1";
const PREVIEW_KEY = "ct-portfolio-preview-v1";
const $ = (selector) => document.querySelector(selector);
const cloneData = (value) => JSON.parse(JSON.stringify(value));
const baseState = { site: cloneData(SITE), about: cloneData(ABOUT), categories: cloneData(CATEGORIES), projects: cloneData(PROJECTS) };

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || cloneData(baseState); }
  catch { return cloneData(baseState); }
}
let state = loadDraft();
let activeCategory = CATEGORY_ORDER.find((id) => state.categories[id]) || Object.keys(state.categories)[0];
let editingSlug = null;
let saveTimer = null;
const mediaUrls = new Map();

const tabs = $("#channel-tabs");
const grid = $("#project-grid");
const siteName = $("#site-name");
const channelLabel = $("#channel-label");
const channelTagline = $("#channel-tagline");
const projectCount = $("#project-count");
const deployStatus = $("#deploy-status");
const projectDialog = $("#project-dialog");
const projectForm = $("#project-form");
const aboutDialog = $("#about-dialog");
const aboutForm = $("#about-form");
const contactDialog = $("#contact-dialog");
const contactForm = $("#contact-form");
const mediaCurrent = $("#media-current");

function mediaSource(project) {
  const reference = project.tileMedia || project.cover;
  return mediaUrls.get(reference) || (PortfolioMedia.isReference(reference) ? null : reference);
}
async function hydrateMedia() {
  try {
    const hydrated = await PortfolioMedia.hydrate(state.projects);
    hydrated.forEach((url, reference) => mediaUrls.set(reference, url));
  } catch {
    deployStatus.textContent = "Uploaded media needs a browser that supports local media storage.";
  }
}

function saveDraft(message = "Draft saved locally") {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); deployStatus.textContent = message; }
    catch { deployStatus.textContent = "Draft could not be saved in this browser."; }
  }, 120);
}
function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function projectBySlug(slug) { return state.projects.find((project) => project.slug === slug); }
function channelProjects() { return state.projects.filter((project) => project.category === activeCategory); }
function renderTabs() {
  tabs.replaceChildren();
  CATEGORY_ORDER.filter((id) => state.categories[id]).forEach((id) => {
    const category = state.categories[id];
    const button = document.createElement("button");
    button.className = "channel-tab";
    button.type = "button";
    button.textContent = category.label;
    button.style.setProperty("--g1", category.g1);
    button.style.setProperty("--g2", category.g2);
    button.setAttribute("aria-current", String(id === activeCategory));
    button.addEventListener("click", () => { activeCategory = id; render(); });
    tabs.append(button);
  });
}
function renderGrid() {
  grid.replaceChildren();
  const category = state.categories[activeCategory];
  const projects = channelProjects();
  projectCount.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;
  projects.forEach((project) => {
    const tile = document.createElement("article");
    tile.className = "project-tile";
    tile.style.setProperty("--g1", category.g1);
    tile.style.setProperty("--g2", category.g2);
    const media = mediaSource(project);
    if (media) {
      const image = document.createElement("img");
      image.className = "tile-media";
      image.src = media;
      image.alt = "";
      image.addEventListener("error", () => { image.hidden = true; });
      tile.append(image);
    }
    tile.addEventListener("click", () => openProjectEditor(project.slug));

    const edit = document.createElement("span");
    edit.className = "tile-edit";
    edit.textContent = "✎";
    edit.setAttribute("aria-hidden", "true");
    const title = document.createElement("span");
    title.className = "tile-title";
    title.textContent = project.title;
    const year = document.createElement("span");
    year.className = "tile-year";
    year.textContent = project.year || "Add year";
    tile.append(title, year, edit);
    grid.append(tile);
  });

  const add = document.createElement("button");
  add.className = "add-project";
  add.type = "button";
  add.innerHTML = "<span>+</span>Add project";
  add.addEventListener("click", openNewProject);
  grid.append(add);
}
function render() {
  const category = state.categories[activeCategory];
  siteName.textContent = state.site.name || "Portfolio";
  channelLabel.textContent = category.label;
  channelTagline.textContent = category.tagline || "Add a channel tagline";
  renderTabs();
  renderGrid();
}
function setProjectForm(project) {
  const fields = projectForm.elements;
  fields.title.value = project.title || "";
  fields.slug.value = project.slug || "";
  fields.category.value = project.category || activeCategory;
  fields.year.value = project.year || "";
  fields.role.value = project.role || "";
  fields.client.value = project.client || "";
  fields.context.value = project.context || "";
  fields.body.value = (project.body || []).join("\n\n");
  fields.media.value = "";
  mediaCurrent.textContent = project.tileMedia || project.cover ? `Current media: ${(project.tileMedia || project.cover).split("/").pop()}` : "No media selected";
  fields.tileHoverTitle.value = project.tileHoverTitle || "";
  fields.videoUrl.value = project.videoUrl || "";
  fields.caseStyle.value = project.caseStyle || "";
}
function fillCategoryOptions() {
  const select = $("#project-category");
  select.replaceChildren();
  CATEGORY_ORDER.filter((id) => state.categories[id]).forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = state.categories[id].label;
    select.append(option);
  });
}
function openProjectEditor(slug) {
  editingSlug = slug;
  const project = projectBySlug(slug);
  if (!project) return;
  fillCategoryOptions();
  setProjectForm(project);
  $("#project-dialog-kicker").textContent = "Project editor";
  $("#project-dialog-title").textContent = `Edit ${project.title}`;
  $("#delete-project").hidden = false;
  projectDialog.showModal();
}
function openNewProject() {
  editingSlug = null;
  fillCategoryOptions();
  setProjectForm({ category: activeCategory, title: "", slug: "", body: [] });
  projectForm.elements.caseStyle.value = activeCategory === "video" ? "feature" : "";
  $("#project-dialog-kicker").textContent = "New project";
  $("#project-dialog-title").textContent = "Add project";
  $("#delete-project").hidden = true;
  projectDialog.showModal();
}
function closeDialog(dialog) { if (dialog.open) dialog.close(); }
async function readProjectForm(existing = {}) {
  const fields = projectForm.elements;
  const title = fields.title.value.trim();
  const slug = fields.slug.value.trim() || slugify(title);
  let tileMedia = existing.tileMedia || existing.cover || null;
  if (fields.media.files[0]) {
    tileMedia = await PortfolioMedia.put(fields.media.files[0]);
    mediaUrls.set(tileMedia, URL.createObjectURL(fields.media.files[0]));
  }
  return {
    slug, title, category: fields.category.value, year: fields.year.value.trim(), role: fields.role.value.trim(), client: fields.client.value.trim(),
    context: fields.context.value.trim(), body: fields.body.value.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean),
    tileMedia, cover: null,
    tileHoverTitle: fields.tileHoverTitle.value.trim() || (fields.category.value === "video" ? title.toUpperCase() : null),
    videoUrl: fields.videoUrl.value.trim() || null,
    caseStyle: fields.caseStyle.value || (fields.category.value === "video" ? "feature" : null),
  };
}
function publish(key, message) {
  const published = cloneData(state);
  try {
    localStorage.setItem(key, JSON.stringify(published));
    deployStatus.textContent = message;
    $("#deploy").classList.add("is-deployed");
    setTimeout(() => $("#deploy").classList.remove("is-deployed"), 1200);
  } catch {
    deployStatus.textContent = "Changes could not be saved in this browser.";
  }
}
function deploy() { publish(LIVE_KEY, "Deployed to this portfolio. Reload the main site to see it live."); }
function preview() {
  publish(PREVIEW_KEY, "Opening your draft preview…");
  window.open("index.html?preview=1#/", "_blank");
}

channelLabel.addEventListener("input", () => { state.categories[activeCategory].label = channelLabel.textContent.trim(); saveDraft(); renderTabs(); });
channelTagline.addEventListener("input", () => { state.categories[activeCategory].tagline = channelTagline.textContent.trim(); saveDraft(); });
projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const existing = projectBySlug(editingSlug) || {};
  const updated = await readProjectForm(existing);
  if (!updated.title || !updated.slug) return;
  const index = state.projects.findIndex((project) => project.slug === editingSlug);
  if (index >= 0) state.projects[index] = { ...state.projects[index], ...updated };
  else state.projects.push(updated);
  activeCategory = updated.category;
  saveDraft("Project saved locally");
  closeDialog(projectDialog);
  render();
});
$("#delete-project").addEventListener("click", () => {
  const project = projectBySlug(editingSlug);
  if (!project || !confirm(`Delete “${project.title}”?`)) return;
  state.projects = state.projects.filter((item) => item.slug !== editingSlug);
  saveDraft("Project removed from draft");
  closeDialog(projectDialog);
  render();
});
$("#open-about").addEventListener("click", () => {
  const fields = aboutForm.elements;
  fields.name.value = state.site.name || ""; fields.location.value = state.site.location || "";
  fields.lead.value = state.about.lead || ""; fields.body.value = (state.about.body || []).join("\n\n");
  aboutDialog.showModal();
});
aboutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = aboutForm.elements;
  state.site.name = fields.name.value.trim(); state.site.location = fields.location.value.trim();
  state.about.lead = fields.lead.value.trim(); state.about.body = fields.body.value.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean);
  saveDraft("About saved locally");
  closeDialog(aboutDialog);
  render();
});
$("#open-contact").addEventListener("click", () => {
  const fields = contactForm.elements;
  fields.email.value = state.site.email || ""; fields.resume.value = state.site.resume || "";
  fields.socials.value = (state.site.socials || []).map((social) => `${social.label} | ${social.url}`).join("\n");
  contactDialog.showModal();
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = contactForm.elements;
  state.site.email = fields.email.value.trim();
  state.site.resume = fields.resume.value.trim();
  state.site.socials = fields.socials.value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [label, ...url] = line.split("|");
    return { label: label.trim(), url: url.join("|").trim() };
  }).filter((social) => social.label && social.url);
  saveDraft("Contact saved locally");
  closeDialog(contactDialog);
  render();
});
$("#discard-drafts").addEventListener("click", () => {
  if (!confirm("Discard all unpublished admin edits?")) return;
  localStorage.removeItem(DRAFT_KEY);
  location.reload();
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => closeDialog(button.closest("dialog"))));
projectForm.elements.media.addEventListener("change", () => {
  const file = projectForm.elements.media.files[0];
  mediaCurrent.textContent = file ? `Selected: ${file.name}` : "No media selected";
});
$("#deploy").addEventListener("click", deploy);
$("#preview").addEventListener("click", preview);
hydrateMedia().finally(render);
