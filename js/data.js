/* ============================================================
   CONTENT MODEL — Wii portfolio
   5 categories (the pills). Every project is one object.
   Add a project: push an object into PROJECTS with a `category`
   — it appears as a channel + gets a case-study page. Done.
   ============================================================ */

const SITE = {
  name: "Cristian Tassone",
  location: "Melbourne, Australia",
  email: "cristian.tassone02@gmail.com",
  resume: "",
  socials: [
    { label: "instagram", url: "https://www.instagram.com/cristiantassone" },
    { label: "instagram · music", url: "https://www.instagram.com/xaxtl/" },
    { label: "spotify", url: "https://open.spotify.com/artist/59bIufijCORHrxmHd6e5ta" },
    { label: "youtube", url: "https://www.youtube.com/@cristiantassone02" },
    { label: "linkedin", url: "https://www.linkedin.com/in/cristian-tassone-3a04a7218/" },
    { label: "facebook", url: "https://www.facebook.com/cristian.tassone.33" },
  ],
};

/* the 5 pills — g1/g2 are the channel-tile gradient (deep enough for
   white text, like the Forecast/News channels), accent drives the splash
   title + case-study page, icon is the channel artwork */
const ICONS = {
  music:    `<path d="M9 18V5.5l11-2V16"/><circle cx="6.2" cy="18" r="2.9"/><circle cx="17.2" cy="16" r="2.9"/>`,
  video:    `<rect x="2.2" y="4.4" width="19.6" height="15.2" rx="3"/><path d="M10 9.4v5.2l4.6-2.6z" fill="currentColor" stroke="none"/>`,
  design:   `<path d="M16.8 3.4a2.15 2.15 0 0 1 3.05 3.05L8.9 17.4 4.2 19l1.6-4.7z"/><path d="m15.2 5 3.05 3.05"/>`,
  sport:    `<ellipse cx="12" cy="12" rx="9.1" ry="5.6" transform="rotate(-38 12 12)"/><path d="M8.3 15.7 15.7 8.3"/><path d="m10.1 12.7 1.5 1.5M12.1 10.7l1.5 1.5"/>`,
  software: `<path d="M8.4 7.6 3.8 12l4.6 4.4"/><path d="M15.6 7.6 20.2 12l-4.6 4.4"/><path d="M13.6 5.4 10.4 18.6"/>`,
};

const CATEGORIES = {
  music:    { label: "Music",    tagline: "xaxtl · production · releases", g1: "#ff8352", g2: "#d02a12", accent: "#e2422a", icon: ICONS.music },
  video:    { label: "Video",    tagline: "films · edits · visualisers",   g1: "#7b95ff", g2: "#2540c4", accent: "#3f5fe4", icon: ICONS.video },
  design:   { label: "Design",   tagline: "cover art · visual identity",   g1: "#ad97ff", g2: "#6446cc", accent: "#7757dd", icon: ICONS.design },
  sport:    { label: "Sport",    tagline: "footy · content · analysis",    g1: "#a9dc3c", g2: "#3a8a0d", accent: "#52a018", icon: ICONS.sport },
  software: { label: "Software", tagline: "tools · builds",                g1: "#5ccbfc", g2: "#0f74cf", accent: "#1789da", icon: ICONS.software },
};
const CATEGORY_ORDER = ["music", "video", "design", "sport", "software"];

/* ------------------------------------------------------------
   PROJECTS — uniform shape, rendered identically everywhere.
   cover: image path, or null → gradient channel in category color
   ------------------------------------------------------------ */
const PROJECTS = [

  /* ================= MUSIC ================= */
  {
    slug: "xaxtl",
    title: "xaxtl",
    category: "music",
    year: "2022 — now",
    role: "artist · producer · mix · master",
    client: "independent",
    context: "My own artist project — slow, dark, atmospheric records, written and produced entirely by me.",
    cover: "assets/artwork-btr.jpg",
    embed: "https://open.spotify.com/embed/artist/59bIufijCORHrxmHd6e5ta",
    body: [
      "Everything under the xaxtl name is written, produced, mixed and mastered by me. The sound sits on the dark side — slow, melodic, atmospheric — and the visual world around it is built to match.",
      "Alongside Spotify, the project lives through Instagram and Reels, where every release gets its own visual treatment: artwork, alternate covers, a Spotify Canvas and a short visualiser.",
    ],
    credits: [
      ["written · produced · mixed", "Cristian Tassone"],
      ["artwork & visuals", "Cristian Tassone"],
    ],
    links: [{ label: "open spotify", url: "https://open.spotify.com/artist/59bIufijCORHrxmHd6e5ta" }],
  },
  {
    slug: "ai-reimagined",
    title: "AI Reimagined",
    category: "music",
    year: "2024 — now",
    role: "production · ai vocal conversion",
    client: "self-initiated series",
    context: "Existing songs rebuilt from the ground up, with AI-performed vocals and completely new production.",
    cover: "assets/snooze-face.jpg",
    gallery: ["assets/snooze-alt.jpg", "assets/reimagined-duo.jpg"],
    body: [
      "With AI, I've never had more creative freedom. This series reimagines existing songs with new vocals and completely new production. The one I'm proudest of: 'Snooze' by SZA, AI-performed by Rihanna and Chris Brown — a pop song turned into a deep, dark, slow melodic and atmospheric journey.",
      "The process: extract the vocals, run the a cappella through an AI voice converter, then rebuild the entire song in Logic Pro with new instrumentation and processing.",
      "In the vault: 'When She Loved Me' performed by Taylor Swift & Harry Styles, 'Sign of the Times' performed by Taylor Swift, and 'Saturn' performed by Justin Bieber.",
    ],
    credits: [["production & conversion pipeline", "Cristian Tassone"]],
  },
  {
    slug: "khaled-rohaim",
    title: "Khaled Rohaim — EP",
    category: "music",
    year: "2023",
    role: "executive producer · creative director",
    client: "Nastrokid",
    context: "A six-track EP executive-produced end to end — from instrumentals to artwork to radio.",
    cover: "assets/khaled-rohaim.jpg",
    gallery: ["assets/khaled-rohaim-alt.jpg"],
    embed: "https://open.spotify.com/embed/album/3k8ZZE23Rnued4ed5gDU4K",
    body: [
      "An EP I executive-produced and creative-directed for my friend Nastrokid, made to showcase his talent in a modern and unique way.",
      "I mixed and mastered the record, produced four of the six instrumentals, designed the artwork and promotional material, built the Spotify Canvas, submitted to streaming services, ran and monitored ads across platforms, and contacted radio — which landed us airplay on 2RRR, twice.",
    ],
    credits: [
      ["artist", "Nastrokid"],
      ["exec production · mix · master", "Cristian Tassone"],
      ["artwork · canvas · promo", "Cristian Tassone"],
    ],
  },
  {
    slug: "song-second-life",
    title: "Song Second Life",
    category: "music",
    year: "2024 — now",
    role: "production · reimagining",
    client: "self-initiated series",
    context: "Unreleased songs that deserve to be heard, reimagined in my style and given a release.",
    cover: "assets/second-life.jpg",
    gallery: ["assets/second-life-alt.jpg"],
    body: [
      "I've immersed myself in so much music that I ended up deep in unreleased songs — and some of them are too good to stay buried. Second Life takes an unreleased track, reimagines it in my style, and gives it a release.",
      "The Drake and Billie Eilish song — originally a thumping, loud track — became this beautiful, mellow piece of art. The artwork does the opposite on purpose: while the music is slow, calm and soothing, the covers are jarring and creepy.",
    ],
    credits: [["production · artwork", "Cristian Tassone"]],
  },

  /* ================= VIDEO ================= */
  {
    slug: "july-7",
    title: "July 7",
    category: "video",
    year: "2021",
    role: "direction · edit",
    client: "short film",
    context: "A COVID-era short film cut entirely from recycled footage — the constraint became the style.",
    cover: null,
    tileMedia: "assets/july-7-short-film.webp",
    tileHoverTitle: "JULY 7 SHORT FILM",
    caseStyle: "feature",
    body: [
      "A short film made for media class during COVID. I couldn't leave the house to shoot, so I recycled old footage and presented it in a completely new way. One of the pieces I'm most proud of.",
    ],
    credits: [["direction · edit", "Cristian Tassone"]],
    links: [{ label: "youtube", url: "https://www.youtube.com/@cristiantassone02" }],
  },
  {
    slug: "the-bullying",
    title: "The Bullying",
    category: "video",
    year: "2019",
    role: "direction · camera · edit",
    client: "with Tyler",
    context: "A school assignment that turned into something we kept building for fun.",
    cover: null,
    tileMedia: "assets/the-bullying.gif",
    tileHoverTitle: "THE BULLYING",
    caseStyle: "feature",
    body: [
      "Started as a school assignment, ended up as something my friend Tyler and I kept building for fun. The first time making videos stopped feeling like homework.",
    ],
    credits: [["made with", "Tyler"]],
  },
  {
    slug: "visualisers",
    title: "Visualisers & Reels",
    category: "video",
    year: "ongoing",
    role: "edit · motion",
    client: "xaxtl",
    context: "Every release gets a Reel and a visualiser cut in Final Cut Pro — the moving half of the artwork.",
    cover: "assets/faces-banner.jpg",
    tileMedia: "assets/visualisers-reels.gif",
    tileHoverTitle: "VISUALISERS & REELS",
    caseStyle: "feature",
    body: [
      "Every xaxtl release gets a Reel and a short visualiser cut in Final Cut Pro — the moving half of the artwork. TikTok is next.",
    ],
    credits: [["edit", "Cristian Tassone"]],
    links: [{ label: "@xaxtl", url: "https://www.instagram.com/xaxtl/" }],
  },

  /* ================= DESIGN ================= */
  {
    slug: "cover-art",
    title: "Cover Art",
    category: "design",
    year: "2022 — now",
    role: "art direction · design",
    client: "xaxtl · Nastrokid",
    context: "Covers built to juxtapose the music — the songs are calm, so the art gets to be jarring.",
    cover: "assets/lose-you.jpg",
    gallery: [
      "assets/find-you.jpg", "assets/doomed.jpg", "assets/heart.jpg",
      "assets/street-scene.jpg", "assets/bench-collage.jpg", "assets/faces-banner.jpg",
    ],
    body: [
      "Artwork for my own releases and for the artists I produce, made in Photoshop, Lightroom and Snapseed. The covers are built to juxtapose the music — the songs are slow, calm and soothing, so the art gets to be jarring and creepy.",
      "Each release also gets a uniform Instagram treatment — a short visual of the track's key moment, a screenshot of the Logic Pro session, alternate covers — plus a Spotify Canvas so the music moves even when it's standing still.",
    ],
    credits: [["design & art direction", "Cristian Tassone"]],
  },

  /* ================= SPORT =================
     (placeholder copy — swap in real details & imagery) */
  {
    slug: "local-footy-hub",
    title: "Local Footy Hub",
    category: "sport",
    year: "2025 — now",
    role: "founder · builder",
    client: "independent",
    context: "A digital home for local Aussie Rules — fixtures, results, content and community in one place.",
    cover: null,
    body: [
      "Local footy deserves better coverage. Local Footy Hub is where I'm building it — one place for the fixtures, results, stories and faces of community Aussie Rules.",
      "Full case study coming soon — this page is a placeholder while the project grows.",
    ],
    credits: [["everything", "Cristian Tassone"]],
  },
  {
    slug: "sfnl-footy-show",
    title: "SFNL Footy Show",
    category: "sport",
    year: "2024 — now",
    role: "production team · camera",
    client: "GameFace Media / SFNL",
    context: "Monday-night league footy show — produced with the GameFace Media team.",
    cover: null,
    body: [
      "Every Monday night in season, the SFNL Footy Show goes out — and I'm part of the team that makes it happen, from gameday footage through to the studio production.",
      "The show sits on top of the weekend's filming: games shot across metro Melbourne, cut and delivered on deadline.",
    ],
    credits: [["production", "GameFace Media"]],
  },
  {
    slug: "gameday",
    title: "Gameday",
    category: "sport",
    year: "2024 — now",
    role: "team leader · camera operator",
    client: "GameFace Media",
    context: "Winter weekends at grounds across Melbourne — filming Aussie Rules across multiple leagues.",
    cover: null,
    body: [
      "Started as a camera operator filming Aussie Rules games across metro Melbourne leagues — delivering footage to server on deadline and liaising with match-day officials and umpires.",
      "Now team leader: supporting operators across designated regions on gameday and running camera training for new team members.",
    ],
    credits: [["team", "GameFace Media"]],
  },
  {
    slug: "match-analysis",
    title: "Match Analysis",
    category: "sport",
    year: "2025 — now",
    role: "analysis · data",
    client: "placeholder",
    context: "Reading the game through numbers — stats, trends and match breakdowns for local footy.",
    cover: null,
    body: [
      "Placeholder case study — match and performance analysis work for community footy: numbers, patterns and the stories they tell.",
    ],
    credits: [["analysis", "Cristian Tassone"]],
  },

  /* ================= SOFTWARE ================= */
  {
    slug: "scorebug",
    title: "Scorebug",
    category: "software",
    year: "2025",
    role: "design · build",
    client: "placeholder",
    context: "Live score graphics for local footy broadcasts — built, not bought.",
    cover: null,
    body: [
      "Placeholder case study — broadcast-style score graphics tooling for local footy streams.",
    ],
    credits: [["design & build", "Cristian Tassone"]],
  },
];

/* ------------------------------------------------------------ */
const ABOUT = {
  portrait: "assets/portrait.jpg",
  lead: "I'm Cristian Tassone — a Melbourne-based creative working across music, video, design and sport.",
  body: [
    "I hold a Bachelor of Arts in Music Production and a Certificate III in Sport and Recreation — a double life I have no plans to simplify.",
    "I'm always experimenting with new things and writing ideas down in my notes to one day put into action. Everything on this site comes from that list.",
  ],
  experience: [
    { role: "Team Leader", org: "GameFace Media", period: "2025 — now",
      points: ["Support camera operators across designated regions on gameday", "Run camera-operation training for new team members", "Assist producing the SFNL Footy Show on Monday nights"] },
    { role: "Camera Operator", org: "GameFace Media", period: "2024 — 2025",
      points: ["Film Aussie Rules games across metro Melbourne leagues", "Deliver and upload game footage to server on deadline", "Liaise with match-day officials and umpires"] },
    { role: "Warehouse", org: "Nason Engine Parts", period: "2022 — now",
      points: ["Order picking, finished-goods production and assembly", "Stock-take coordination, cross-skilled across departments"] },
    { role: "Team Member", org: "Coles Supermarkets", period: "2017 — now",
      points: ["Vendor goods receipt and stock replenishment", "Cross-skilled across multiple departments"] },
  ],
  tools: ["logic pro", "final cut pro", "photoshop", "lightroom", "snapseed", "ai voice conversion", "javascript", "spotify canvas"],
};

/* Admin publishes a complete local snapshot. The portfolio consumes it on
   load, so a Deploy in admin is reflected on the index without a build step. */
try {
  const adminPreview = new URLSearchParams(location.search).has("preview");
  const published = JSON.parse(localStorage.getItem(adminPreview ? "ct-portfolio-preview-v1" : "ct-portfolio-live-v1") || "null");
  if (published?.projects && Array.isArray(published.projects)) {
    PROJECTS.splice(0, PROJECTS.length, ...published.projects);
    if (published.site) Object.assign(SITE, published.site);
    if (published.about) Object.assign(ABOUT, published.about);
    if (published.categories) Object.entries(published.categories).forEach(([id, values]) => {
      if (CATEGORIES[id]) Object.assign(CATEGORIES[id], values);
    });
  }
} catch (_) {
  /* localStorage is unavailable in a restricted file:// context */
}
