/* ============================================================
   APP — router, views, channel-zoom transition.
   Menu → channel splash → project grid → case study.
   ("start" is a reserved second path segment — see README.)
   ============================================================ */

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const scr = document.getElementById("scr");
const doc = document.getElementById("doc");
const dockMenu = document.querySelector(".dock-menu");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const inCat = (cat) => PROJECTS.filter((p) => p.category === cat);
document.documentElement.classList.toggle("hide-scanlines", localStorage.getItem("ct-scanlines") === "off");
function setDockHomeControl() {
  dockMenu.textContent = "HOME";
  dockMenu.setAttribute("data-home", "");
  dockMenu.removeAttribute("data-overlay-toggle");
  dockMenu.removeAttribute("aria-pressed");
}
function setDockOverlayControl() {
  const visible = !document.documentElement.classList.contains("hide-scanlines");
  dockMenu.textContent = visible ? "OVERLAY ON" : "OVERLAY OFF";
  dockMenu.removeAttribute("data-home");
  dockMenu.setAttribute("data-overlay-toggle", "");
  dockMenu.setAttribute("aria-pressed", String(visible));
}
/* Every project opened from a channel uses the shared feature-page system. */
const isFeatureProject = () => true;

/* ---------------- channel faces ---------------- */
function catFace(id) {
  const c = CATEGORIES[id];
  return `<span class="face face--art" style="--g1:${c.g1};--g2:${c.g2}">
            <span class="face-label">${c.label} Channel</span>
            <span class="face-icon"><svg viewBox="0 0 24 24">${c.icon}</svg></span>
          </span>`;
}
function projFace(p) {
  const c = CATEGORIES[p.category];
  const tileMedia = p.tileMedia || p.cover;
  if (tileMedia) {
    return `<span class="face face--photo">
              <img src="${tileMedia}" alt="" draggable="false">
              <span class="face-label">${esc(p.tileTitle || p.title)}</span>
            </span>`;
  }
  return `<span class="face face--art" style="--g1:${c.g1};--g2:${c.g2}">
            <span class="face-label">${esc(p.title)}</span>
            <span class="face-year">${esc(p.year)}</span>
          </span>`;
}

/* ---------------- the zoom ---------------- */
let busy = false;
const setBusyCursor = (on) => document.body.classList.toggle("is-transitioning", on);
const asRect = (r) => ({ left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
function clone(html) {
  const z = document.createElement("div");
  z.className = "zoomer";
  z.innerHTML = html;
  document.body.appendChild(z);
  return z;
}
function morphingClone(tile, html) {
  const z = clone("");
  const media = tile.querySelector(".face--photo img");
  if (media) {
    z.classList.add("zoomer--media");
    z.appendChild(media);
    z.movingMedia = media;
  } else {
    z.innerHTML = html;
  }
  return z;
}
/* Tile grows to fill the screen, or morphs directly into a matching feature banner. */
function zoomIn(tile, html, go, targetSelector = "") {
  if (REDUCED || busy) { go(); return; }
  busy = true;
  setBusyCursor(true);
  const z = targetSelector ? morphingClone(tile, html) : clone(html);
  Object.assign(z.style, asRect(tile.getBoundingClientRect()));

  if (targetSelector) {
    document.body.classList.add("is-feature-morphing");
    go();
    setBusyCursor(true);
    const target = document.querySelector(targetSelector);
    z.getBoundingClientRect();
    z.classList.add("fly");
    if (target) {
      Object.assign(z.style, asRect(target.getBoundingClientRect()));
      z.style.borderRadius = getComputedStyle(target).borderRadius;
    }
    setTimeout(() => {
      const bannerImage = target?.querySelector("img");
      if (z.movingMedia && bannerImage) bannerImage.replaceWith(z.movingMedia);
      z.remove();
      document.body.classList.replace("is-feature-morphing", "is-feature-morph-complete");
      setTimeout(() => document.body.classList.remove("is-feature-morph-complete"), 850);
      busy = false;
      setBusyCursor(false);
    }, 620);
    return;
  }

  z.getBoundingClientRect();
  z.classList.add("fly");
  Object.assign(z.style, { left: "0px", top: "0px", width: "100vw", height: "100vh", borderRadius: "0px" });
  setTimeout(go, 430);
  setTimeout(() => z.classList.add("gone"), 640);
  setTimeout(() => { z.remove(); busy = false; setBusyCursor(false); }, 1040);
}
/* and back down into whichever tile it came from */
function zoomOut(html, selector, go, sourceSelector = "") {
  if (REDUCED || busy) { go(); return; }
  busy = true;
  if (sourceSelector) {
    const source = document.querySelector(sourceSelector);
    const sourceMedia = source?.querySelector("img");
    const z = clone("");
    if (sourceMedia) {
      z.classList.add("zoomer--media", "zoomer--reverse");
      z.appendChild(sourceMedia);
      z.movingMedia = sourceMedia;
    } else {
      z.innerHTML = html;
    }
    Object.assign(z.style, asRect(source.getBoundingClientRect()));
    document.body.classList.add("is-feature-reversing");
    go();
    setBusyCursor(true);
    const tile = scr.querySelector(selector);
    tile?.classList.add("is-morph-target");
    z.getBoundingClientRect();
    z.classList.add("fly");
    if (tile) {
      Object.assign(z.style, asRect(tile.getBoundingClientRect()));
      z.style.borderRadius = "1.56vw";
    }
    setTimeout(() => {
      const tileImage = tile?.querySelector(".face--photo img");
      if (z.movingMedia && tileImage) tileImage.replaceWith(z.movingMedia);
      z.remove();
      tile?.classList.remove("is-morph-target");
      document.body.classList.remove("is-feature-reversing");
      busy = false;
      setBusyCursor(false);
    }, 620);
    return;
  }
  const z = clone(html);
  Object.assign(z.style, { left: "0px", top: "0px", width: "100vw", height: "100vh", borderRadius: "0px" });
  go();
  setBusyCursor(true);
  const tile = scr.querySelector(selector);
  z.getBoundingClientRect();
  z.classList.add("fly");
  if (tile) {
    Object.assign(z.style, asRect(tile.getBoundingClientRect()));
    z.style.borderRadius = "1.56vw";
  }
  setTimeout(() => z.classList.add("gone"), 520);
  setTimeout(() => { z.remove(); busy = false; setBusyCursor(false); }, 950);
}

/* ---------------- views ---------------- */
const ARROW = `<svg viewBox="0 0 60 90" aria-hidden="true"><path d="M9 6 53 45 9 84Z"/></svg>`;

function pad(tiles) {
  const n = Math.max(12, Math.ceil(tiles.length / 4) * 4);
  const out = tiles.slice();
  while (out.length < n) out.push(`<div class="chan chan--void" aria-hidden="true"></div>`);
  return out.join("");
}

function viewMenu() {
  document.title = "Cristian Tassone";
  document.body.className = "v-menu";
  setDockOverlayControl();
  const tiles = CATEGORY_ORDER.map((id) =>
    `<a class="chan" href="#/${id}" data-tile="c:${id}" aria-label="${CATEGORIES[id].label} Channel">${catFace(id)}</a>`);
  scr.innerHTML = `<div class="grid">${pad(tiles)}</div>`;
}

function viewSplash(id) {
  const c = CATEGORIES[id];
  document.title = `${c.label} Channel — Cristian Tassone`;
  document.body.className = "v-splash";
  setDockHomeControl();
  const list = inCat(id);
  const i = CATEGORY_ORDER.indexOf(id);
  const prev = CATEGORY_ORDER[(i + CATEGORY_ORDER.length - 1) % CATEGORY_ORDER.length];
  const next = CATEGORY_ORDER[(i + 1) % CATEGORY_ORDER.length];

  /* the banner mirrors the Mii crowd — covers where they exist, name plates where they don't */
  let cells = list.map((p) => p.cover
    ? `<span class="bn"><img src="${p.cover}" alt="" loading="lazy"></span>`
    : `<span class="bn bn--txt">${esc(p.title)}</span>`);
  while (cells.length && cells.length < 7) cells = cells.concat(cells);   // fill the strip
  cells = cells.slice(0, 9);

  scr.innerHTML = `
    <div class="splash" style="--acc:${c.accent};--g1:${c.g1};--g2:${c.g2}">
      <h1 class="splash-title">The ${c.label} Channel</h1>
      <div class="splash-banner">${cells.join("")}</div>
      <p class="splash-sub">${esc(c.tagline)} — ${list.length} project${list.length === 1 ? "" : "s"}</p>
      <div class="splash-btns">
        <button class="btn" type="button" data-home>Home</button>
        <a class="btn" href="#/${id}/start" data-start>Start</a>
      </div>
      <a class="arw arw--l" href="#/${prev}" aria-label="${CATEGORIES[prev].label} Channel">${ARROW}</a>
      <a class="arw arw--r" href="#/${next}" aria-label="${CATEGORIES[next].label} Channel">${ARROW}</a>
    </div>`;
}

function viewGrid(id) {
  const c = CATEGORIES[id];
  document.title = `${c.label} — Cristian Tassone`;
  const reversing = document.body.classList.contains("is-feature-reversing");
  document.body.className = `v-grid v-grid--${id}${reversing ? " is-feature-reversing" : ""}`;
  setDockHomeControl();
  const tiles = inCat(id).map((p) =>
    `<a class="chan" href="#/${id}/${p.slug}" data-tile="p:${p.slug}" aria-label="${esc(p.title)}">${projFace(p)}</a>`);
  const i = CATEGORY_ORDER.indexOf(id);
  const prev = CATEGORY_ORDER[(i + CATEGORY_ORDER.length - 1) % CATEGORY_ORDER.length];
  const next = CATEGORY_ORDER[(i + 1) % CATEGORY_ORDER.length];
  scr.innerHTML = `
    <div class="strip" style="--dot:${c.accent}">
      <span class="strip-name"><em>${c.label}</em> Channel</span>
      ${id === "video" ? "" : `<button class="btn btn--sm" type="button" data-home>Home</button>`}
    </div>
    <div class="grid grid--sub">${pad(tiles)}</div>
    <a class="arw arw--l" href="#/${prev}/start" aria-label="${CATEGORIES[prev].label}">${ARROW}</a>
    <a class="arw arw--r" href="#/${next}/start" aria-label="${CATEGORIES[next].label}">${ARROW}</a>`;
}

function viewCase(p) {
  if (isFeatureProject(p)) {
    viewFeatureCase(p);
    return;
  }
  const c = CATEGORIES[p.category];
  document.title = `${p.title} — Cristian Tassone`;
  document.body.className = "v-case";
  setDockHomeControl();
  const sib = inCat(p.category);
  const i = sib.indexOf(p);
  const prev = sib[(i + sib.length - 1) % sib.length];
  const next = sib[(i + 1) % sib.length];

  const meta = [["year", p.year], ["role", p.role], ["client", p.client]]
    .filter(([, v]) => v).map(([k, v]) => `<li><span>${k}</span>${esc(v)}</li>`).join("");
  const gallery = (p.gallery || []).map((s) => `<figure><img src="${s}" alt="" loading="lazy"></figure>`).join("");
  const sections = (p.content || []).map((section) => section.type === "image"
    ? `<figure><img src="${section.src}" alt="${esc(section.caption || p.title)}" loading="lazy">${section.caption ? `<figcaption>${esc(section.caption)}</figcaption>` : ""}</figure>`
    : `<section class="case-copy">${section.heading ? `<h2>${esc(section.heading)}</h2>` : ""}<p>${esc(section.text || "")}</p></section>`).join("");
  const credits = (p.credits || []).map(([k, v]) => `<div class="credit"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join("");
  const links = (p.links || []).map((l) => `<a class="tag" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");

  doc.innerHTML = `
    <article class="case" style="--acc:${c.accent};--g1:${c.g1};--g2:${c.g2}">
      <div class="case-bar">
        <a class="btn btn--sm" href="#/${p.category}/start" data-back>← ${c.label}</a>
        <button class="btn btn--sm" type="button" data-home>Home</button>
      </div>
      <span class="case-band">${c.label} Channel</span>
      <h1>${esc(p.title)}</h1>
      <ul class="case-meta">${meta}</ul>
      <p class="case-context">${esc(p.context)}</p>
      ${p.cover ? `<figure class="case-cover"><img src="${p.cover}" alt="${esc(p.title)}"></figure>` : ""}
      <div class="case-body">${sections || (p.body || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
      ${p.embed ? `<div class="case-embed"><button class="btn btn--sm" data-embed="${p.embed}">▶ play on spotify</button></div>` : ""}
      ${gallery ? `<div class="case-gallery">${gallery}</div>` : ""}
      ${credits ? `<section class="case-credits"><h3>credits</h3>${credits}</section>` : ""}
      ${links ? `<div class="case-links">${links}</div>` : ""}
      <nav class="case-pn">
        <a class="btn btn--sm" href="#/${p.category}/${prev.slug}">← ${esc(prev.title)}</a>
        <a class="btn btn--sm" href="#/${p.category}/${next.slug}">${esc(next.title)} →</a>
      </nav>
    </article>`;
  scr.innerHTML = "";
  window.scrollTo(0, 0);
}

function viewFeatureCase(p) {
  const c = CATEGORIES[p.category];
  const sib = inCat(p.category);
  const i = sib.indexOf(p);
  const prev = sib[(i + sib.length - 1) % sib.length];
  const next = sib[(i + 1) % sib.length];
  const hero = p.tileMedia || p.cover;
  const facts = [["Year", p.year], ["Role", p.role], ["Client", p.client]]
    .filter(([, value]) => value)
    .map(([label, value]) => `<div class="feature-fact"><span>${label}</span><b>${esc(value)}</b></div>`).join("");
  const description = (p.body || []).map((text) => `<p>${esc(text)}</p>`).join("");
  const youtube = p.youtube || p.videoUrl;
  const spotifyEmbed = (url) => url.includes("/embed/") ? url : url.replace("open.spotify.com/", "open.spotify.com/embed/");
  const isSpotifyPlaylist = (url) => /open\.spotify\.com\/(?:embed\/)?playlist\//.test(url);
  const mediaModules = [
    ...(p.embed ? [{ type: "spotify", url: p.embed, heading: p.embedHeading, text: p.embedNote }] : []),
    ...(youtube ? [{ type: "youtube", url: youtube, heading: p.youtubeHeading, text: p.youtubeNote }] : []),
    ...(p.mediaModules || []),
  ];
  let mediaPosition = 0;
  const renderMedia = (module) => {
    const layoutClass = mediaPosition++ % 2 === 0 ? " project-media--flipped" : "";
    const kind = module.type === "media" ? module.kind : module.type;
    const url = String(module.url || "").trim();
    return kind === "youtube"
    ? `<section class="project-media project-media--player project-media--youtube${layoutClass}">
        <div class="media-frame media-frame--youtube">${url ? `<iframe src="${youtubeEmbed(url)}" title="${esc(p.title)} video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` : `<div class="media-placeholder"><span>Video coming soon</span></div>`}</div>
        <aside class="media-copy"><p>${esc(module.text || "A visual companion piece that carries the atmosphere of the project into a different space.")}</p></aside>
      </section>`
    : `<section class="project-media project-media--player project-media--spotify${layoutClass}">
        <div class="media-frame media-frame--spotify${isSpotifyPlaylist(module.url) ? " media-frame--spotify-playlist" : ""}"><iframe src="${spotifyEmbed(module.url)}" title="${esc(p.title)} on Spotify" loading="lazy" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div>
        <aside class="media-copy"><p>${esc(module.text || "A complete release, available to play here without leaving the project.")}</p></aside>
      </section>`;
  };
  const renderStory = (module) => `<section class="project-media project-media--story">
    <div class="story-card"><h2>${esc(module.title)}</h2>${String(module.text || "").split(/\n\s*\n/).filter(Boolean).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div>
  </section>`;
  const renderGallery = (images) => {
    const allImages = (images || []).map((item) => typeof item === "string" ? { src: item, context: "" } : { src: item?.src || item?.path || "", context: item?.context || item?.caption || item?.text || "" }).filter((item) => item.src);
    const visibleImages = allImages.slice(0, 6);
    const remaining = Math.max(0, allImages.length - visibleImages.length);
    const galleryData = encodeURIComponent(JSON.stringify(allImages));
    const cards = visibleImages.map((image, index) => `<button class="project-gallery-card${p.slug === "cover-art" ? " cover-gallery-card" : ""}${remaining && index === visibleImages.length - 1 ? " project-gallery-card--more" : ""}" type="button" data-image-preview="${esc(image.src)}" data-image-alt="${esc(p.title)} image ${index + 1}" data-gallery="${galleryData}" data-gallery-index="${index}">
      <img src="${esc(image.src)}" alt="${esc(p.title)} image ${index + 1}" loading="lazy">
      ${remaining && index === visibleImages.length - 1 ? `<span class="gallery-more-count">+${remaining}</span>` : ""}
    </button>`).join("");
    return cards ? `<section class="project-media project-media--gallery"><div class="case-gallery${p.slug === "cover-art" ? " cover-gallery" : ""}"${p.slug === "cover-art" ? " data-magnetic-gallery" : ""}>${cards}</div></section>` : "";
  };
  const renderLinks = (items) => {
    const links = (items || []).map((link) => `<a class="btn btn--sm" href="${link.url}" target="_blank" rel="noopener">${esc(link.label)} ↗</a>`).join("");
    return links ? `<div class="case-links">${links}</div>` : "";
  };
  const defaultExtras = !p.pageModules ? [
    ...mediaModules.map(renderMedia),
    ...(p.storyModules || []).map(renderStory),
    renderGallery(p.gallery),
    renderLinks(p.links),
  ].join("") : "";
  const orderedExtras = p.pageModules
    ? p.pageModules.map((module) => {
      if (module.type === "media") return renderMedia(module);
      if (module.type === "story") return renderStory(module);
      if (module.type === "gallery") return renderGallery(module.items);
      if (module.type === "links") return renderLinks(module.items);
      return "";
    }).join("")
    : defaultExtras;

  document.title = `${p.title} — Cristian Tassone`;
  const morphing = document.body.classList.contains("is-feature-morphing");
  document.body.className = `v-case v-case--feature${morphing ? " is-feature-morphing" : ""}`;
  setDockHomeControl();
  doc.innerHTML = `
    <article class="case case--feature" style="--acc:${c.accent};--g1:${c.g1};--g2:${c.g2}">
      <nav class="feature-nav" aria-label="Project navigation">
        <a class="feature-icon-btn" href="#/${p.category}/start" data-back aria-label="Back to ${c.label}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4 6.5 12l8 8M7.5 12h10"/></svg>
        </a>
        <div class="feature-nav-actions">
          <button class="feature-icon-btn" type="button" data-home aria-label="Home">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 10 8.5-7 8.5 7v9.5a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 3.5 19.5z"/><path d="M9.2 21v-6h5.6v6"/></svg>
          </button>
        </div>
      </nav>
      <figure class="feature-banner feature-banner--${p.slug}${hero ? "" : " feature-banner--art"}" style="--g1:${c.g1};--g2:${c.g2}">
        ${hero ? `<img src="${hero}" alt="${esc(p.title)}">` : ""}
        <figcaption>
          <h1>${esc(p.title)}</h1>
          ${p.client ? `<p>${esc(p.client)}</p>` : ""}
        </figcaption>
      </figure>
      <section class="feature-details">
        <div class="feature-story">
          <p class="feature-lead">${esc(p.context)}</p>
          ${description}
        </div>
        <aside class="feature-info" aria-label="Project details">${facts}</aside>
      </section>
      ${orderedExtras ? `<section class="feature-extras">${orderedExtras}</section>` : ""}
      <nav class="case-pn feature-pn">
        <a class="btn btn--sm" href="#/${p.category}/${prev.slug}">← ${esc(prev.title)}</a>
        <a class="btn btn--sm" href="#/${p.category}/${next.slug}">${esc(next.title)} →</a>
      </nav>
    </article>`;
  scr.innerHTML = "";
  window.scrollTo(0, 0);
  enableMagneticCoverGallery();
}

function enableMagneticCoverGallery() {
  const gallery = doc.querySelector("[data-magnetic-gallery]");
  if (!gallery || REDUCED) return;
  const cards = [...gallery.querySelectorAll(".cover-gallery-card")];
  let frame = 0;
  const reset = () => cards.forEach((card) => {
    card.style.setProperty("--pull-x", "0px");
    card.style.setProperty("--pull-y", "0px");
    card.style.setProperty("--pull-scale", "1");
  });
  gallery.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(x, y);
        const pull = Math.max(0, 1 - distance / 360);
        card.style.setProperty("--pull-x", `${x * pull * .12}px`);
        card.style.setProperty("--pull-y", `${y * pull * .09}px`);
        card.style.setProperty("--pull-scale", String(1 + pull * .065));
      });
    });
  });
  gallery.addEventListener("pointerleave", reset);
  reset();
}

/* ---------------- routing ---------------- */
let quiet = false;

function parse() {
  const h = location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  if (!h) return { name: "menu" };
  const [cat, seg] = h.split("/");
  if (!CATEGORIES[cat]) return { name: "menu" };
  if (!seg) return { name: "splash", cat };
  if (seg === "start") return { name: "grid", cat };
  // Slugs are the canonical project identity. Keeping the category check as
  // a fallback guard made browser-created projects open their channel when
  // metadata came from a different admin version.
  const p = PROJECTS.find((x) => x.slug === seg);
  return p ? { name: "case", p } : { name: "splash", cat };
}

function render(r) {
  if (r.name === "case") viewCase(r.p);
  else if (r.name === "grid") viewGrid(r.cat);
  else if (r.name === "splash") viewSplash(r.cat);
  else viewMenu();
}

const draw = () => render(parse());

function go(hash) {
  quiet = true;
  location.hash = hash;
  draw();
}

window.addEventListener("hashchange", () => {
  if (quiet) { quiet = false; return; }
  draw();
});

/* ---------------- interaction ---------------- */
document.addEventListener("click", (e) => {
  const overlayToggle = e.target.closest("[data-overlay-toggle]");
  if (overlayToggle) {
    const root = document.documentElement;
    root.classList.toggle("hide-scanlines");
    localStorage.setItem("ct-scanlines", root.classList.contains("hide-scanlines") ? "off" : "on");
    setDockOverlayControl();
    return;
  }
  /* home, from anywhere */
  const home = e.target.closest("[data-home]");
  if (home) {
    e.preventDefault();
    if (busy) return;
    SFX.back();
    if (home.classList.contains("dock-menu")) {
      go("#/");
      return;
    }
    const r = parse();
    const cat = r.name === "case" ? r.p.category : r.cat;
    if (cat && document.body.classList.contains("v-grid")) zoomOut(catFace(cat), `[data-tile="c:${cat}"]`, () => go("#/"));
    else go("#/");
    return;
  }
  /* a channel tile — zoom it open */
  const tile = e.target.closest(".chan[data-tile]");
  if (tile) {
    e.preventDefault();
    if (busy) return;
    SFX.open();
    const project = PROJECTS.find((p) => `p:${p.slug}` === tile.dataset.tile);
    const featureTarget = project && isFeatureProject(project) ? ".feature-banner" : "";
    zoomIn(tile, tile.querySelector(".face").outerHTML, () => go(tile.getAttribute("href")), featureTarget);
    return;
  }
  /* back out of a case study into its grid slot */
  const back = e.target.closest("[data-back]");
  if (back) {
    e.preventDefault();
    if (busy) return;
    SFX.back();
    const r = parse();
    if (r.name === "case") {
      const featureSource = isFeatureProject(r.p) ? ".feature-banner" : "";
      zoomOut(projFace(r.p), `[data-tile="p:${r.p.slug}"]`, () => go(back.getAttribute("href")), featureSource);
    }
    else go(back.getAttribute("href"));
    return;
  }
  /* Start / arrows / prev-next: plain navigation */
  const a = e.target.closest("a[href^='#']");
  if (a) { SFX.select(); go(a.getAttribute("href")); e.preventDefault(); }
}, false);

/* click-to-load embeds */
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-embed]");
  if (!b) return;
  SFX.select();
  const embed = b.parentElement;
  embed.classList.add("is-loading");
  embed.innerHTML = `<iframe src="${b.dataset.embed}" title="spotify player" loading="lazy"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  const frame = embed.querySelector("iframe");
  frame.addEventListener("load", () => embed.classList.remove("is-loading"), { once: true });
  frame.addEventListener("error", () => embed.classList.remove("is-loading"), { once: true });
});

/* cursor ticks */
document.addEventListener("pointerenter", (e) => {
  if (e.target instanceof Element && e.target.matches(".chan[data-tile], .orb, .btn, .arw, .sd, .tag")) SFX.hover();
}, true);

/* ---------------- the clock ---------------- */
const SEG = { a: [20, 6, 60, 16], b: [78, 20, 16, 60], c: [78, 96, 16, 60], d: [20, 158, 60, 16], e: [6, 96, 16, 60], f: [6, 20, 16, 60], g: [20, 82, 60, 16] };
const DIGIT = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
const digit = (ch) => `<svg class="dg" viewBox="0 0 100 180" aria-hidden="true">${
  [...(DIGIT[ch] || "")].map((s) => { const [x, y, w, h] = SEG[s]; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}"/>`; }).join("")
}</svg>`;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const tEl = document.getElementById("clock-time");
const dEl = document.getElementById("clock-date");

function tick() {
  const d = new Date();
  let h = d.getHours();
  const ap = h < 12 ? "AM" : "PM";
  h = h % 12 || 12;
  const mm = String(d.getMinutes()).padStart(2, "0");
  const colon = `<svg class="cln ${d.getSeconds() % 2 ? "off" : ""}" viewBox="0 0 20 180" aria-hidden="true">
                   <rect x="2" y="50" width="16" height="16" rx="8"/><rect x="2" y="112" width="16" height="16" rx="8"/>
                 </svg>`;
  tEl.innerHTML = String(h).split("").map(digit).join("") + colon + mm.split("").map(digit).join("") +
                  `<span class="clock-ap">${ap}</span>`;
  dEl.textContent = `${DAYS[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}`;
}
tick();
setInterval(tick, 1000);

/* ---------------- overlays ---------------- */
function overlay(id, open) {
  const el = document.getElementById(id);
  el.classList.toggle("open", open);
  el.setAttribute("aria-hidden", String(!open));
  if (!open && id === "ov-player") {
    document.querySelector(".player-frame-wrap").classList.remove("is-loading");
    setTimeout(() => { document.getElementById("player-frame").src = ""; }, 260);
  }
  if (open) SFX.pop(); else SFX.back();
}

function youtubeEmbed(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const id = host === "youtu.be"
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get("v") || (parsed.pathname.startsWith("/embed/") || parsed.pathname.startsWith("/shorts/") ? parsed.pathname.split("/")[2] : "");
    const origin = /^https?:$/.test(window.location.protocol) ? `&origin=${encodeURIComponent(window.location.origin)}` : "";
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0${origin}` : url;
  } catch (e) {
    return url;
  }
}

function openVideoPlayer(p) {
  const source = p.videoUrl || p.youtube || (p.links || []).find((link) => /youtube\.com|youtu\.be/.test(link.url))?.url;
  if (!source) return;
  const frame = document.getElementById("player-frame");
  const playerWrap = document.querySelector(".player-frame-wrap");
  playerWrap.classList.add("is-loading");
  frame.addEventListener("load", () => playerWrap.classList.remove("is-loading"), { once: true });
  frame.addEventListener("error", () => playerWrap.classList.remove("is-loading"), { once: true });
  frame.src = youtubeEmbed(source);
  overlay("ov-player", true);
}

let imageGallery = [];
let imageGalleryIndex = 0;
let imageGalleryAlt = "Artwork preview";

function paintImageGallery() {
  const preview = document.getElementById("image-preview");
  const total = imageGallery.length;
  const active = imageGallery[imageGalleryIndex] || { src: "", context: "" };
  preview.src = active.src;
  preview.alt = total > 1 ? `${imageGalleryAlt} — image ${imageGalleryIndex + 1} of ${total}` : imageGalleryAlt;
  document.getElementById("image-count").textContent = total > 1 ? `${imageGalleryIndex + 1} / ${total}` : "";
  const context = document.getElementById("image-context");
  const contextCopy = document.getElementById("image-context-copy");
  context.hidden = !active.context;
  contextCopy.textContent = active.context || "";
  document.querySelectorAll("[data-image-prev], [data-image-next]").forEach((button) => { button.hidden = total < 2; });
}

function openImageGallery(images, index, alt) {
  imageGallery = images.map((item) => typeof item === "string" ? { src: item, context: "" } : { src: item?.src || item?.path || "", context: item?.context || item?.caption || item?.text || "" }).filter((item) => item.src);
  imageGalleryIndex = Math.max(0, Math.min(Number.isFinite(index) ? index : 0, imageGallery.length - 1));
  imageGalleryAlt = alt;
  paintImageGallery();
  overlay("ov-image", true);
}

function cycleGallery(step) {
  if (imageGallery.length < 2) return;
  imageGalleryIndex = (imageGalleryIndex + step + imageGallery.length) % imageGallery.length;
  paintImageGallery();
}

document.getElementById("orb-about").addEventListener("click", () => overlay("ov-about", true));
document.getElementById("orb-mail").addEventListener("click", () => overlay("ov-contact", true));
document.querySelectorAll(".ov").forEach((ov) => {
  ov.addEventListener("click", (e) => { if (e.target === ov || e.target.closest("[data-close]")) overlay(ov.id, false); });
});
document.addEventListener("click", (e) => {
  const watch = e.target.closest("[data-watch]");
  if (watch) {
    const project = PROJECTS.find((p) => p.slug === watch.dataset.watch);
    if (project) openVideoPlayer(project);
    return;
  }
  const image = e.target.closest("[data-image-preview]");
  if (image) {
    let images = [image.dataset.imagePreview];
    try { images = JSON.parse(decodeURIComponent(image.dataset.gallery || "")); } catch { /* A single image still opens. */ }
    openImageGallery(images, Number(image.dataset.galleryIndex || 0), image.dataset.imageAlt || "Artwork preview");
    return;
  }
  if (e.target.closest("[data-image-prev]")) cycleGallery(-1);
  if (e.target.closest("[data-image-next]")) cycleGallery(1);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".ov.open").forEach((ov) => overlay(ov.id, false));
  if (document.getElementById("ov-image").classList.contains("open") && e.key === "ArrowLeft") cycleGallery(-1);
  if (document.getElementById("ov-image").classList.contains("open") && e.key === "ArrowRight") cycleGallery(1);
});

document.getElementById("about-body").innerHTML = `
  <figure class="ab-portrait"><img src="${ABOUT.portrait}" alt="Cristian Tassone"></figure>
  <p class="ab-lead">${esc(ABOUT.lead)}</p>
  ${ABOUT.body.map((t) => `<p class="ab-p">${esc(t)}</p>`).join("")}
  <h3>experience</h3>
  ${ABOUT.experience.map((x) => `
    <div class="ab-xp"><span>${esc(x.period)}</span><b>${esc(x.role)} — ${esc(x.org)}</b>
      <ul>${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul></div>`).join("")}
  ${SITE.resume ? `<p><a class="tag" href="${SITE.resume}" target="_blank" rel="noopener">resume ↗</a></p>` : ""}
  <h3>tools</h3>
  <div class="ab-tools">${ABOUT.tools.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`;

document.getElementById("contact-body").innerHTML = `
  <p class="ab-lead">Always open to creative opportunities — or to just connect.</p>
  <a class="btn btn--sm mail-btn" href="mailto:${SITE.email}">${SITE.email}</a>
  <div class="ab-tools">${SITE.socials.map((s) => `<a class="tag" href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

/* sound switch */
const sd = document.getElementById("btn-sound");
const paintSd = () => { sd.classList.toggle("is-muted", SFX.muted); sd.title = SFX.muted ? "sound off" : "sound on"; };
sd.addEventListener("click", () => { SFX.toggle(); paintSd(); });
paintSd();

/* ---------------- go ---------------- */
draw();
PortfolioMedia.hydrate(PROJECTS).then((media) => {
  if (!media.size) return;
  PROJECTS.forEach((project) => {
    if (media.has(project.tileMedia)) project.tileMedia = media.get(project.tileMedia);
    if (media.has(project.cover)) project.cover = media.get(project.cover);
  });
  draw();
}).catch(() => {});
