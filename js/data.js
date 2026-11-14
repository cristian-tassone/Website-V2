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
    role: "production",
    client: "self-initiated series",
    context: "Existing songs rebuilt from the ground up, with AI-performed vocals and completely new production.",
    cover: "assets/ai-reimagined-hero.gif",
    gallery: ["assets/snooze-alt.jpg", "assets/reimagined-duo.jpg"],
    embed: "https://open.spotify.com/playlist/5Pfzss77aATVEaoqayUDfH?si=OWUMbvaeRDWZwoAe_j6vuw",
    embedNote: "Listen to the released songs apart of this series here!",
    body: ["This series reimagines existing songs with new vocals and completely new production. It allows me to have the creative freedom to make new music, whilst still having the familiarity of recognisable vocals and artists."],
    storyModules: [{
      title: "About the series",
      text: "The inspiration behind this series is having the creative freedom to work with familiar songs and artists, but completely reimagine how they sound.\n\nThe process starts with an existing song, whether it's released or unreleased. I extract the original vocals and run them through AI to change the artist's voice. From there, I take the new acapella into Logic Pro and build an entirely new instrumental around it.\n\nOne of my favourite things about doing this is experimenting with different genres and vibes. I might take a really up-tempo, rap-heavy song and completely slow it down, remove the drums and turn it into something more atmospheric. I like seeing how differently a song can feel when you change everything around the vocals.\n\nOne example is my track 'IT'S OK', where I challenged myself to create an entire song without using any drums. Instead, I used heavily processed vocals as instruments, turning them into background pads, atmospheric textures and other sounds to build the instrumental.\n\nI think it's easy to brush these projects aside because AI is involved, but in reality, AI only makes up a tiny part of the process, probably around 5%. It's really just used to change the voice. All the vocal processing, production, and instruments are created by me from scratch.\n\nAt the end of the day, it's just a fun creative exercise that I enjoy doing. I don't make any money from these tracks, and while they're currently on Spotify, I'm aware that there are potential copyright and licensing issues with having them there. For me, it's simply a hobby and another way to experiment with music production.",
    }],
    credits: [["production & conversion pipeline", "Cristian Tassone"]],
  },
  {
    slug: "nastrokid",
    title: "Nastrokid",
    category: "music",
    year: "2024–2025",
    role: "producer",
    client: "Nastrokid",
    context: "My close mate who I often make music alongside.",
    cover: null,
    body: ["Nastrokid is a Melbourne-based melodic rapper-singer with pop-inspired production. What sets him apart from other artists is the high standards he sets for himself when it comes to the presentation and creation of his music."],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "spotify", url: "https://open.spotify.com/embed/artist/29UzBHtEV38CwhVRtvZ4lP?utm_source=generator&theme=0&si=7cb561bddd264bb1", text: "Listen to his most popular tracks here." },
      { type: "story", title: "My role in his music", text: "Nastrokid is one of my great mates, and I've been involved in his music journey for a while now. I mix and master all his songs and demos, produce beats for him, find beats on YouTube, and sometimes even help out with lyrics.\n\nBeyond the music itself, I also help with the creative direction of his projects, from coming up with the name of his EP to creating visuals and helping with promotion. It's not really a formal role, more just two mates working together to make music and bring ideas to life.\n\nHe's also had a few achievements along the way, including radio play on 2Triple RRR, a few YouTubers reacting to his music, and some solid streaming numbers. His track By Your Side has reached over 1,500 streams, while Find You has passed 1,300. He also featured on Melbourne artist Silas GaYe's track Cant Go, appearing in the music video as well. It's been pretty cool seeing his music reach new people and getting to be involved in the process." },
      { type: "media", kind: "spotify", url: "https://open.spotify.com/album/3NODDyIZ0RgfJglCtncIIS?si=X0qHqLT_QJedIa3ev0DZ-A", text: "The first real piece of recognition that was 2+ years in the making" },
      { type: "gallery", items: ["assets/nastrokid-gallery-1.png", "assets/nastrokid-gallery-2.png", "assets/nastrokid-gallery-3.jpg"] },
      { type: "media", kind: "spotify", url: "https://open.spotify.com/track/54UdP9AyyMaYZ8GPIcnEni?si=76de13cd90164123", text: "His biggest song that I had a major part in production wise." },
      { type: "media", kind: "youtube", url: "https://www.youtube.com/watch?v=AmTdjxsC5fg&pp=ygUJbmFzdHJva2lk", text: "The song he got featured on with Melbourne based rapper 'SILAS GaYe'. My role in this was mixing Nastrokid's vocals." },
      { type: "media", kind: "youtube", url: "https://youtu.be/wX44x0Ce9sg", text: "BTS video I filmed on set of the music video" },
    ],
    credits: [],
  },
  {
    slug: "one-and-only-music-video",
    title: "One & Only Music Video",
    tileTitle: "One & Only Music Video",
    category: "video",
    year: "2024",
    role: "director · editor · videographer",
    client: "Nastrokid",
    context: "A music video I filmed and edited for Nastrokid's single 'One & Only', while also contributing to the song's production and creative direction.",
    cover: "assets/one-and-only-music-video-hero.gif",
    body: ["Made fresh out of high school, we filmed the video at local landmarks around our local area. The unique song structure is what set it apart from other ones in its genre. The video is appraoching 1,000 views."],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "https://www.youtube.com/watch?v=6OoxRFCOCnk&pp=0gcJCccHAYcqIYzv", text: "Shot over two days in and around Berwick, Victoria" },
      { type: "story", title: "The editing room", text: "I used Final Cut Pro to edit the music video, experimenting with a range of effects and editing techniques, including keyframing, speed ramping, layered effects, and beat-synced visuals and transitions. A big part of the editing process was making sure the visuals worked alongside the music, timing cuts, effects and transitions to certain parts of the song. I also played around with different speeds, layering effects on top of each other and using keyframes to create movement within shots.\n\nUnfortunately, because the video is now nearing six years old, I no longer have the original project files or raw footage. This means I can't show screenshots of the editing timeline or give a proper behind-the-scenes look at how everything was put together. However, the finished music video is still available to watch, and it's a pretty good example of the different editing techniques I was experimenting with at the time." },
      { type: "media", kind: "spotify", url: "https://open.spotify.com/track/3ZIOHfzhwdxnOapNuNcFfj?si=5bf57fa25df14e4a", text: "Chorus, verse, bridge, verse, chorus!" },
    ],
    credits: [],
  },
  {
    slug: "khaled-rohaim",
    title: "Khaled Rohaim — EP",
    category: "music",
    year: "2023",
    role: "executive producer · creative director",
    client: "Nastrokid",
    context: "An EP I worked on with Nastrokid, contributing to its production, creative direction and release.",
    cover: "assets/khaled-rohaim-hero.gif",
    gallery: ["assets/khaled-rohaim-alt.jpg"],
    embed: "https://open.spotify.com/album/3k8ZZE23Rnued4ed5gDU4K?si=_nldUCdsSmGl-cUT7v7XEg",
    embedNote: "Listen and view the original project here",
    mediaModules: [
      { type: "spotify", url: "https://open.spotify.com/album/3NODDyIZ0RgfJglCtncIIS?si=3WYjxltSTL2FTp6YMCE7Jw", text: "Listen to the 2RRR Radio spot here!" },
      { type: "youtube", url: "https://www.youtube.com/shorts/DyzrjgxEUAY", text: "Quickly view and listen the tracklist here" },
    ],
    body: ["I worked alongside my mate Nastrokid on his EP Khaled Rahim, helping with the creative direction, production, mixing, mastering and promotion. The project was named after an Australian music producer we hoped to catch the attention of, and one of our biggest highlights was getting played on Triple R radio."],
    storyModules: [{
      title: "About the project",
      text: "Nastrokid is one of my great mates, and we've worked on music together for a while. For this EP, my role was mainly helping with the creative direction and shaping the overall style of the project. It wasn't really a managerial role, more just having creative input as a mate and helping bring everything together.\n\nOn the production side, I mixed and mastered the tracks, as well as producing the instrumentals for 'Hidden Feelings', 'Simulation' and the outro track, completely from scratch. Most of the other songs were made using beats from YouTube.\n\nI also helped with the release itself, creating visuals and promotional content to help get the music out there.\n\nOne of my biggest contributions to the project was actually coming up with the project name, 'Khaled Rohaim'. Khaled Rohaim is an Australian music producer who makes music in a similar style to what we were creating. The idea was pretty simple. Rather than releasing just another EP and messaging him asking to listen, we thought naming the entire project after him might be a better way to catch his attention.\n\nIn theory, we thought it was a great idea, and we had pretty high hopes for it. Unfortunately, his response wasn't quite what we were hoping for, and he wasn't particularly appreciative of the gesture, to say the least.\n\nDespite that, one of the biggest highlights of the project was getting our music played on Triple R, a Melbourne radio station. It was a pretty cool achievement and something we were both really happy with.\n\nOverall, it was a fun project to be involved in, especially getting to contribute to so many different parts of the process, from the initial creative direction and production through to the final release and promotion.",
    }],
    credits: [
      ["artist", "Nastrokid"],
      ["exec production · mix · master", "Cristian Tassone"],
      ["artwork · canvas · promo", "Cristian Tassone"],
    ],
  },
  {
    slug: "song-second-life",
    title: "Second Life Series",
    category: "music",
    year: "2024 — now",
    role: "production",
    client: "self-initiated series",
    context: "Unreleased songs that deserve to be heard, reimagined in my style and given a release.",
    cover: "assets/song-second-life-hero.gif",
    gallery: ["assets/second-life-alt.jpg"],
    embed: "https://open.spotify.com/playlist/4mx1xHe1R1SeuptT5MC1o9?si=9nwVnjzSSNiJahWEUKdJGA",
    embedNote: "Listen to the released songs here!",
    body: ["Second Life takes unreleased tracks and reimagines them in my own style. I've done this mostly with Nastrokid, a friend of mine, taking his older songs and giving them a new sound with completely reworked production."],
    storyModules: [{
      title: "About the series",
      text: "Song Second Life is a series where I take existing songs that never quite made the cut and give them a second life through completely new production.\n\nThe idea came about through my mate Nastrokid, who has made a bunch of songs over the years, with a few that never ended up being released. Rather than letting those songs go to waste, I decided to take the original vocals and build something new around them.\n\nThe process is pretty similar to my AI Reimagined series, except there's no AI involved. I take the existing vocals, create an entirely new instrumental and experiment with different genres, sounds and vibes. Sometimes that means completely changing the feel of a song from what it was originally intended to be.\n\nFor me, it's another fun creative exercise. I enjoy seeing how much a song can change just by reworking the production behind it, while still keeping the original vocals and lyrics intact. It's also a way to give songs that might have otherwise been forgotten another chance to be heard.",
    }],
    credits: [["production · artwork", "Cristian Tassone"]],
  },
  {
    slug: "movie-score",
    title: "Movie Score",
    category: "music",
    year: "2022",
    role: "producer",
    client: "University Assignment",
    context: "Assigned a silent short film, I created an original musical score to bring it to life.",
    cover: "assets/movie-score-hero.gif",
    youtube: "https://youtu.be/4OAK7cZP1gY?si=yS8cy974qYTD7Fuy",
    youtubeHeading: "Built track by track",
    youtubeNote: "The score consisted of over 30 tracks and took nearly a month to perfect.",
    body: [
      "Using Logic Pro, this completely original score was made entirely from software instruments — in other words, just me and my computer.",
      "I had never made a piece that did not fit a traditional 4/4 time, which I expected to be difficult with a film's many moving parts. Luckily, it came together well and received a 95% grade.",
    ],
    credits: [["original score · production", "Cristian Tassone"]],
  },

  /* ================= VIDEO ================= */
  {
    slug: "brady-series",
    title: "Brady Series",
    tileTitle: "Brady Series",
    category: "video",
    year: "2026",
    role: "editor · videographer",
    client: "Brady Niezgodka",
    context: "A series of fight-day videos I've filmed and edited for amateur 3-0 fighter Brady Niezgodka, documenting the early stages of his career.",
    cover: "assets/brady-series-hero.gif",
    body: ["Brady Niezgodka is one of my great mates and an absolute weapon. I've been documenting his early journey, capturing everything from the pre-fight preparation to the fights themselves, and turning the footage into videos for his socials. Each video has its own style, as I try to experiment with different editing techniques rather than making the same video every time."],
    pageModules: [
      { type: "overview" },
      { type: "story", title: "The process", text: "For his first two fights, I've been there with a camera, following him around in the rooms before the fight, capturing the preparation, and then filming from the audience during the fight itself. Afterwards, I take all the footage home and turn it into a vlog or short video that he can share on his socials.\n\nOne thing I've really tried to do with these videos is make each one feel different. At the end of the day, every fight follows a pretty similar routine, with the preparation, getting strapped up, the walkout and the fight itself. So I've tried to experiment with different styles and editing techniques to keep things interesting." },
      { type: "media", kind: "youtube", url: "https://youtu.be/WkefqOecFX8?si=qlaucB7WNrYEZz2l", text: "The best of the 3. When he went 2-0. Strictly Business." },
      { type: "story", title: "The difference", text: "The first video, Just the Beginning, really feels like a high the whole way through. It was his first fight, and both of us were pretty new to the whole experience. I think that comes through in the editing as well. It's a much longer, more in-depth video that builds towards a massive, celebratory climax at the end.\n\nComparatively, his second video, Standing Tall, has a much more serious, business-like feel to it. It's definitely my favourite of the three. I experimented more with the editing, using flashbacks to his first fight and weaving together my own footage with vision from the official broadcast. I also used broadcast footage in the first video, but I think I managed to bring everything together much better the second time around." },
      { type: "media", kind: "youtube", url: "https://youtu.be/YDN42PlD4ls?si=mdGcPPaiKw2fwQIn", text: "His first fight. A wild wild way to start." },
      { type: "story", title: "Going forward", text: "For his third fight, I took a different approach again. I didn't film this one myself, but I edited a shorter mini vlog using footage of Brady talking, with clips from the fight playing over the top. It's a much simpler video compared to the first two.\n\nOne of the things I enjoy most about this series is getting to work with someone who's still at the very beginning of his career. There's always the possibility that he could go on to do something pretty big, and if he does, he'll have all these videos to look back on and see where it started.\n\nGoing forward, I want to keep experimenting with different styles of video production. Rather than repeating the same formula for every fight, I'd love to try different editing techniques, storytelling approaches and even completely different genres of videos. For me, that's what makes the whole project fun." },
      { type: "media", kind: "youtube", url: "https://youtu.be/dHCwylPieGU?si=u7MhI3D11Y429k_7", text: "Most recent, vlog 3." },
      { type: "gallery", items: [
        { src: "assets/brady-series-gallery-8-1.jpg", context: "Pregame to debut win" },
        { src: "assets/brady-series-gallery-8-2.jpg", context: "Pregame to debut win" },
        { src: "assets/brady-series-gallery-8-3.jpg", context: "Pregame to debut win" },
      ] },
    ],
    credits: [],
  },
  {
    slug: "july-7",
    title: "July 7",
    category: "video",
    year: "2021",
    role: "direction · edit",
    client: "short film",
    context: "A COVID-era short film cut entirely from recycled footage.",
    cover: "assets/july-7-hero.gif",
    tileMedia: "assets/july-7-hero.gif",
    tileTitle: "July 7 Media Film",
    caseStyle: "feature",
    body: [
      "A short film made for media class during COVID. I couldn't leave the house to shoot, so I recycled old footage and presented it in a completely new way. One of the pieces I'm most proud of; because the style of the film WAS the constraint I was put under.",
    ],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "https://youtu.be/0ComU_gVSwU?si=qfYvC8qFSMfJAgKQ", text: "Gotta make do with what you got" },
      {
        type: "story",
        title: "How it came about",
        text: "I had a certain set of criteria to follow for my end-of-year Media Short Film. The original vision for the film was to be a trippy hallucination. But when the state was plunged into lockdown, I wasn't able to leave the house to get my footage. The music video scene was filmed illegally in order to get a pass, in the hope that restrictions would eventually lift and I could finish my film. That wasn't to be the case.\n\nSo I improvised. Threw out the script and created the video above. I weaved in the music video, along with other short films from back in the day, to create a cohesive, contextually accurate story.\n\nOn an unrelated note, I actually failed this assignment because I used recycled footage. Stiff. Still reckon it's pretty cool."
      },
      {
        type: "gallery",
        items: [
          { src: "assets/july-7-gallery-4-1.png", context: "Original vision" },
          { src: "assets/july-7-gallery-4-2.png", context: "Deleted scene from film for obvious reasons, red paint" },
          { src: "assets/july-7-gallery-4-3.png", context: "Original script" },
          { src: "assets/july-7-gallery-4-4.png", context: "Storyboard from my media portfolio" },
          { src: "assets/july-7-gallery-4-5.png", context: "Original script" },
          { src: "assets/july-7-gallery-4-6.png", context: "Original script" },
          { src: "assets/july-7-gallery-4-7.png", context: "Original script" },
        ],
      },
      { type: "media", kind: "youtube", url: "https://www.youtube.com/watch?v=WUAlJtwQcD4", text: "A test screening I had to submit halfway through the editing process." },
    ],
    credits: [],
  },
  {
    slug: "the-bullying",
    title: "The Bullying",
    category: "video",
    year: "2019",
    role: "direction · camera · edit",
    client: "with Tyler",
    context: "A school assignment that ended up being a hilarious mockumentary.",
    cover: "assets/the-bullying-hero.gif",
    tileMedia: "assets/the-bullying-hero.gif",
    tileTitle: "bullying.com Documentary",
    caseStyle: "feature",
    body: [
      "When Tyler and I decided to partner up and create an anti-bullying PSA, we didn't know we'd get carried away and create a documentary that is as ridiculous as it is funny.",
    ],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "https://youtu.be/6iv9opA6FpQ?si=Pyss_VOeRxQnvGar", text: "A grounded thriller that has interwoven stories and firsthand accounts." },
      { type: "story", title: "The premise", text: "The film follows Tyler, a news reporter who visits a school to investigate its bullying culture, hearing firsthand from witnesses and victims. But as he digs deeper, he quickly discovers that the issues run far deeper than he first expected." },
      { type: "media", kind: "youtube", url: "https://www.youtube.com/watch?v=H8Tx5Eu957k", text: "All the interviews" },
    ],
    credits: [],
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
  {
    slug: "music-posters",
    title: "Music Posters",
    category: "design",
    year: "",
    role: "",
    client: "",
    context: "Project details coming soon.",
    cover: null,
    body: [],
    credits: [],
  },
  {
    slug: "test-project",
    title: "Test Project",
    category: "design",
    year: "2026",
    role: "creative direction · design · production",
    client: "Experimental Studio",
    context: "A deliberately full project page used to test every part of the portfolio system in one place.",
    cover: "assets/visualisers-reels.gif",
    tileMedia: "assets/visualisers-reels.gif",
    tileHoverTitle: "FULL MODULE TEST",
    embed: "https://open.spotify.com/embed/album/3k8ZZE23Rnued4ed5gDU4K",
    embedHeading: "Sound for the room",
    embedNote: "A loose collection of textures, half-finished ideas and late-night decisions that set the project's pace.",
    youtube: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    youtubeHeading: "A moving sketchbook",
    youtubeNote: "This video is here to test the full-width player, its side panel and the alternating rhythm between modules.",
    gallery: [
      "assets/find-you.jpg", "assets/doomed.jpg", "assets/heart.jpg",
      "assets/street-scene.jpg", "assets/bench-collage.jpg", "assets/faces-banner.jpg",
    ],
    body: [
      "This is placeholder copy for a full-page test. It lets us judge the spacing, hierarchy and rhythm of a project without waiting for a real brief.",
      "Every module is intentionally populated: a moving hero, music, video, a gallery and external links. Once this feels right, the system is ready for the real projects.",
    ],
    storyModules: [
      {
        title: "The long way around",
        text: "A full-width Story Module for longer thoughts, process notes or a moment that needs room to breathe. It sits between the media and gallery modules without breaking the page rhythm.",
      },
    ],
    credits: [["test build", "Cristian Tassone"]],
    links: [
      { label: "project archive", url: "https://example.com" },
      { label: "view process", url: "https://example.com" },
    ],
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
    year: "2026",
    role: "design · vibe coded",
    client: "GameFace",
    context: "An on-screen scorebug I built for local football broadcasts, featuring a range of detailed statistics and graphics.",
    cover: "assets/scorebug-hero.gif",
    body: [
      "Local football broadcasts often have pretty basic on-screen graphics, so I decided to build my own. What started as a small design exercise turned into a fully functioning scorebug that we now sometimes use on game days, with the potential to take it even further.",
    ],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "https://youtu.be/y1ERU8vf7JM", text: "Here is a quick demo of all the features the scorebug can show" },
      { type: "gallery", items: ["assets/scorebug-gallery-5.png", "assets/scorebug-gallery-4.png", "assets/scorebug-gallery-6.jpg"] },
      { type: "story", title: "About the project", text: "When it comes to local football broadcasting, the on-screen graphics are admittedly pretty basic. So I took it upon myself to build my own.\n\nWhat sets mine apart is the amount of detail and stats it provides. Apart from the basics of scoring and time, I created a system where every score input generates a stat pack that can be accessed and displayed throughout the game.\n\nIt was imporant that the controls for the software were simple, as it was an inital goal of mine to sell it to leagues and teams. The bug itself and controls are all ran via a HTML file that is accessable via a link. As seen in the images below, there is a desktop, and phone version that both offer the same functions.\n\nWhat started as a small design exercise for myself turned into a product that we now sometimes use on game days, and hopefully can use more in the future. It's also something I'm very interested in eventually selling to leagues, teams, and local broadcasters." },
      { type: "gallery", items: ["assets/scorebug-gallery-3.png", "assets/scorebug-gallery-1.png", "assets/scorebug-gallery-2.png"] },
    ],
    credits: [["design & build", "Cristian Tassone"]],
  },
  {
    slug: "stat-deck",
    title: "Stat Deck",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "GameFace",
    context: "A live stats dashboard I built for local football commentators, connected directly to my on-screen scoreboard.",
    cover: "assets/stat-deck-hero.gif",
    body: ["Commentators in local sport don't have access to many stats, and most of the information they use is stuff they've had to dig up themselves. So I built the Commentary Desk, a live stats dashboard that connects and runs directly from the scorebug I created, automatically updating throughout the game with no extra work required."],
    pageModules: [
      { type: "overview" },
      { type: "gallery", items: ["assets/stat-deck-gallery-2-1.png", "assets/stat-deck-gallery-2-2.png"] },
      { type: "story", title: "How it works", text: "This single page website is a companion site to the main scorebug I created. As each score is plotted, the Stat Deck site updates with stats and auto generates notes. The idea is that the commentator can have this infront of them during the game, and at a glace have access to states and game notes without having to do any extra work themselves." },
    ],
    credits: [["design & build", "Cristian Tassone"]],
  },
  {
    slug: "how2win-analyser",
    title: "How2Win Analyser",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "Personal",
    context: "A 10-step football data analyser I built to break down matchups, identify key statistics and predict which team is most likely to win.",
    cover: null,
    body: ["How2Win is a software tool I built to analyse local football matches using real match statistics. Through a 10-step process, I can import data, compare teams and identify the key areas that could decide a game. The software then produces a detailed report that helps predict the winner and explain why."],
    storyModules: [{
      title: "How it came about",
      text: "I've always been interested in using statistics to understand football beyond just the final score. So I decided to build How2Win, a software tool that takes real match data and uses it to work out what each team needs to do to win.\n\nThe software works through a 10-step process, starting with importing the ladder, match results and detailed team statistics from Premier Data. One of the biggest parts of building it was creating a data parser that could take all this information, sort it, clean it up and make sure everything matched correctly.\n\nOnce the data is imported, I can select the matchups I want to analyse. The software then looks through a huge range of statistics, comparing how teams perform when they win versus when they lose, their recent form, head-to-head results and which statistical trends have the biggest impact on their results.\n\nOne of my favourite features is how it can identify specific statistical targets. Rather than just saying one team is better than another, it can find things like how often a team wins when they reach a certain number of clearances, or how two different statistics work together to influence a result.\n\nThe final step generates a detailed report outlining the findings, key statistics and what each team needs to do to win. I can then use this information to help write articles and make predictions about upcoming games.\n\nFor me, the whole idea was to take the large amount of data available in local football and turn it into something that actually tells a story. Rather than just looking at numbers on a spreadsheet, How2Win helps explain why teams win, why they lose and what might happen when they face each other.",
    }],
    credits: [],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    category: "software",
    year: "",
    role: "",
    client: "",
    context: "Project details coming soon.",
    cover: null,
    body: [],
    credits: [],
  },
  {
    slug: "footyarch",
    title: "FootyArch",
    tileTitle: "FootyArch",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "Personal",
    context: "A personal application that I use to track the AFL games I attend.",
    cover: "assets/footyarch-hero.gif",
    body: ["I'm a person that loves going to the football. Since learning how to vibe code with services like Claude and Codex, I've had the creative freedom to go wild. Since 2006 I've been attending games, and with the help of Dad's diary and my memory, I have inputted every single game I have attended."],
    pageModules: [
      { type: "overview" },
      { type: "gallery", items: ["assets/footyarch-gallery-2-1.png", "assets/footyarch-gallery-2-2.png", "assets/footyarch-gallery-2-3.jpg", "assets/footyarch-gallery-2-4.png"] },
      { type: "story", title: "How it works", text: "The app is super simple to use. When it comes time to update the tracker, I go to FootyTables (an AFL stats website) and simply copy and paste the match results into my app. The app then sorts the results and gives me a simple summary of all the games. From here, I can select which games I've attended.\n\nThe real magic starts, though, with the analysis and diary pages. It's in these sections where I can get a better understanding of the types of games I've been to, as well as follow and dissect everything in more detail." },
    ],
    credits: [],
  },
  {
    slug: "gf-studio",
    title: "GF Studio",
    tileTitle: "GF Studio",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "Personal",
    context: "A design studio software I created for myself to produce consistent designs in the same style for my work at GameFace.",
    cover: "assets/gf-studio-hero.gif",
    body: ["A design studio software I built using Claude Code to create consistent designs for my work at GameFace. It allows me to work from a uniform template, make quick changes and export multiple designs at once."],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "https://youtu.be/eeUg8pqSK7I", text: "Watch a short demo here of how it works" },
      { type: "story", title: "How it came about", text: "For the longest time, when I was designing stuff for GameFace, my designs were all over the place, inconsistent and could have been better. So I decided to use Claude Code to build my own design studio software to make the whole process easier and more consistent.\n\nInstead of designing from scratch each time, I now have a template where all the text is in the same spot. I can alter the text, tinker with a few effects, drag and drop an image, and save everything in a batch.\n\nSometimes I'm designing for ten leagues at a time, so rather than doing each one individually, I can make all my changes, hit save, and export them all at once." },
      { type: "gallery", items: [
        { src: "assets/gf-studio-gallery-4-1.png", context: "Social media size ratio" },
        { src: "assets/gf-studio-gallery-4-2.png", context: "Desktop size ratio" },
      ] },
    ],
    credits: [],
  },
  {
    slug: "c95-exchange",
    title: "C95 Exchange",
    tileTitle: "C95 Exchange",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "Personal",
    context: "A personal banking and money tracker, made with a Windows 95 theme.",
    cover: "assets/c95-exchange-hero-slow.gif",
    body: ["C95 Exchange is a personal money tracker I built to keep track of my savings, interest and financial trends. What started as a simple way to view my money eventually turned into a creative project, complete with a Windows 95-inspired design."],
    pageModules: [
      { type: "overview" },
      { type: "story", title: "How it came about", text: "There are heaps of money trackers out there, but none of them really did it for me. So I decided to build my own.\n\nAt the beginning, it was just a way for me to keep track of my money, but it slowly turned into a creative project when I decided to have a bit of fun with the design. After experimenting with a few different styles, I eventually settled on a Windows 95 theme for the software.\n\nAt the end of each month, I update my savings balance and import any interest I've earned. With just that information, which I've also backdated to 2018, I can see trends, forecasts, interest earned, how different years stack up against each other, and a whole bunch of other things too." },
      { type: "gallery", items: [
        { src: "assets/c95-exchange-gallery-3-1.png", context: "Main view of savings" },
        { src: "assets/c95-exchange-gallery-3-2.png", context: "Other tables and graphs" },
        { src: "assets/c95-exchange-gallery-3-3.png", context: "Admin page" },
      ] },
    ],
    credits: [],
  },
  {
    slug: "live-ladder",
    title: "Live Ladder",
    tileTitle: "Live Ladder",
    category: "software",
    year: "2026",
    role: "vibe coded",
    client: "GameFace",
    context: "On-screen live ladder which was used for the final game of the MPFNL season.",
    cover: null,
    body: [
      "It went down to the wire for Dromana in Division 1 for the MPFNL. They needed to make a certain percentage to make finals or even sneak into the top three. So I took the audience along for the journey.",
    ],
    pageModules: [
      { type: "overview" },
      { type: "media", kind: "youtube", url: "", text: "Live Ladder highlights!" },
      { type: "gallery", items: [] },
    ],
    credits: [],
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

/* Admin previews may load a local snapshot. The normal portfolio always uses
   this source file, so a stale browser draft can never hide source updates. */
try {
  const adminPreview = new URLSearchParams(location.search).has("preview");
  const published = adminPreview ? JSON.parse(localStorage.getItem("ct-portfolio-preview-v1") || "null") : null;
  if (adminPreview && published?.projects && Array.isArray(published.projects)) {
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
