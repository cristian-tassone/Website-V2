# Cristian Tassone — Wii Menu portfolio

The portfolio as a **Wii Menu**. Five category channels on the home screen;
click one and it zooms open into that channel's splash page; press Start and
you're in that category's projects; click a project for its case study.
About and Contact are the two orbs on the shelf, where the console puts the
Wii and Mail buttons.

Vanilla HTML/CSS/JS. No framework, no build step, no dependencies.

## Screens

```
Wii Menu            4×3 channel grid, five categories + empty slots
  ↓ click a channel   (tile zooms out to fill the screen)
Channel splash      "The Sport Channel" · banner · Wii Menu / Start
  ↓ Start
Project grid        the same grid, filled with that category's projects
  ↓ click a project   (tile zooms out again)
Case study          normal scrolling page, leaves the console screen behind
```

## Proportions

The console renders to a fixed 16:9 screen, so the site does too: everything
lives inside a locked 16:9 stage and every measurement is a container-query
percentage of it, taken off reference screenshots of the real menu —

| | |
|---|---|
| grid | 8.8% from the top, 82.8% wide, 60.6% tall |
| tile | 19.5% × 19.0% (a 1.83 aspect), 1.56% corner radius |
| shelf | bottom 30.6%; the line sits at 72.6% at the edges and dips to 81.4% in the centre |
| orbs | 7.8% wide, clock digits 8.4% tall |

The clock straddles that dip exactly like the console's: digits above the
line, date below it. It's a real seven-segment face — each digit is drawn
from seven rounded segments and the colon blinks on the second.

## Run it

```bash
npx --yes serve -l 4173 .
```

Then open **http://localhost:4173**. (Opening `index.html` directly works too —
hash routing is fine on `file://` — but Spotify embeds need the http server.)

## Structure

```
index.html        shell: dock (wave + orbs + clock), overlays, sound toggle
css/wii.css       the whole design system
js/data.js        ALL content — categories, projects, about  ← edit this
js/sfx.js         Wii-style UI sounds, synthesized in WebAudio
js/app.js         router, the three views, the channel-zoom transition
assets/           project imagery
```

## Adding a project

Push one object into `PROJECTS` in [js/data.js](js/data.js). That's the whole
job — it becomes a channel in its category, joins that channel's splash
banner, and gets a case-study page at `#/<category>/<slug>` automatically.
Nothing else to touch. (One reserved word: a project can't be slugged
`start`, since `#/<category>/start` is the project grid.)

```js
{
  slug:     "new-thing",          // required · the URL
  title:    "New Thing",          // required
  category: "music",              // required · music | video | design | sport | software
  year:     "2026",
  role:     "director · edit",
  client:   "someone",
  context:  "One-line summary, shown big under the title.",
  cover:    "assets/new-thing.jpg",   // or null → gradient channel in the category color
  body:     ["Paragraph one.", "Paragraph two."],
  gallery:  ["assets/a.jpg", "assets/b.jpg"],           // optional
  embed:    "https://open.spotify.com/embed/album/…",   // optional · click-to-load
  credits:  [["role", "person"]],                       // optional
  links:    [{ label: "watch", url: "https://…" }],     // optional
}
```

Every field except `slug`, `title` and `category` is optional — the case-study
page renders whichever sections have data and skips the rest, so a
half-finished project still looks deliberate. `cover: null` is the graceful
fallback: the channel becomes a colored gradient tile with the title on it,
which is how the Sport and Software projects render until you shoot imagery.

**Categories** are defined at the top of the same file. Each has a two-stop
gradient for its channel tile (`g1`/`g2`), a brighter `accent` that tints the
splash title, a `tagline`, and an `icon` (SVG path markup drawn on a 24×24
grid, stroked in white). `CATEGORY_ORDER` controls the order on the home
screen and which way the side arrows page.

## How the Wii-ness works

**The zoom.** Clicking a channel clones its face into a fixed-position
element sitting exactly over the tile, then animates that clone's rect to
fullscreen while the real view swaps underneath. When you go back, the same
move runs in reverse and the clone shrinks into the slot the project came
from. It's the console's transition, done with plain CSS rect animation —
no library.

**The sounds** are synthesized with WebAudio rather than sampled from the
console: short enveloped sine and triangle tones, a rising two-note press,
a sweep for the channel opening, a falling sweep for back. Real Wii audio is
Nintendo's, so this gets the feel without shipping their files. Toggle in the
top-right corner; the choice persists.

**The screen** is the console's light gray with fine scanlines that run over
the tiles as well as the background, a soft centre light, and a cyan
selection glow on hover. The shelf is one SVG wave carrying the two orbs, the
SD-card slot (which doubles as the sound switch) and the clock.

**Type** is M PLUS Rounded 1c, the closest free match to the console's
rounded gothic.

## Known edges

- A category can hold about 12 projects before tiles start getting short —
  the grid keeps everything on one screen by shrinking rows rather than
  scrolling. Past that, the real fix is paging the grid the way the console
  does, which isn't built yet.
- Sport and Software still carry placeholder copy from the old site.
- `prefers-reduced-motion` turns off the zoom, the pulse and the blinking
  clock colon; navigation stays instant and everything remains readable.
