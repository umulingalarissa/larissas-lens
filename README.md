# Larissa’s Lens — static site

Concert photography site for **Larissa Umulinga**. Pure static HTML/CSS/JS — no build step, no CMS fees. Designed as a long-term, free-hosting replacement for Squarespace.

Information architecture: one landing page, `index.html`, is a scattered grid of every project's photo — live and editorial together, no separate pages for each. Hovering/focusing a photo closes a corner-bracket frame around it and reveals its name; clicking opens that project's gallery page.

## Open locally

```bash
cd larissas-lens-site
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

All paths are relative, so the folder works from any static root (subfolder or domain root).

## Deploy (free)

Upload this whole folder (or connect the repo) to any static host:

- **Netlify** — drag-and-drop the folder, or connect Git
- **Vercel** — import project; no build command needed
- **GitHub Pages** — serve from `/` or `/docs` on any branch
- **here.now** / Cloudflare Pages / any S3+CDN bucket

No Node, no npm, no environment variables required.

## Site map

Header nav is **curations · about** (+ Instagram). The logo/name returns to the landing page.

| Page | Path |
|------|------|
| Landing — every project, scattered grid, corner-bracket hover | `index.html` |
| Project gallery (one reusable template, driven by slug) | `projects/artist.html?a=<slug>` |
| Curations / Publications (exhibitions + press) | `publications.html` |
| About (bio + inquire) | `about.html` |
| Quiet sitemap (redirects to `index.html`) | `projects.html` |

`index.html` renders `<section class="scatter-grid" id="scatter-grid">`; `initScatterGrid()` in `site.js` builds one photo per project in `window.ARTISTS`, each with a hidden corner-bracket frame + name that animate in on hover/focus, linking straight to that project's gallery page.

`projects/artist.html` is a filmstrip carousel: one large photo at a time (`#carousel-track`, sliding smoothly between photos), a thumbnail strip below it to switch between a project's photos (also arrow-key and scroll navigable), and a "View info" toggle that reveals the title/credit/lede. Prev/next buttons at the bottom move between projects.

Shared chrome: `styles.css` + `site.js` (header/footer inject). Every project's photos live under `img/<slug>/`, numbered `01.jpg`, `02.jpg`, ... — the same order they appear in the carousel strip, with one file named `hero.jpg` (or suffixed `_hero`, e.g. `03_hero.jpg`) doubling as the cover shown on the landing grid.

Each entry in `projects/artists-data.js` also carries a `category` (`"live"` or `"editorial"`) — this is descriptive metadata only now (nothing on the site filters by it), there to record what kind of shoot it was.

### Adding a new project

No new HTML file needed:

1. Drop its photos in `img/<slug>/` (e.g. `img/burna-boy/01.jpg`, `02.jpg`, ..., with one `hero.jpg` or `_hero`-suffixed file).
2. Run `node scripts/sync-artists.js` — it adds a new entry to `projects/artists-data.js` for any new `img/<slug>/` folder (defaulting to `category: "live"`), and resyncs the `images` list for existing ones to match what's actually in the folder.

That's it. The landing grid, the carousel, the "Project 0X / NN" numbering, and the prev/next nav on every project page are all generated from that one array in `projects/artist.html` + `site.js`.

## Design

Black `#000` + sand `#d8c8af`. Fonts: Bebas Neue, Instrument Serif (italic), Inter Tight (Google Fonts CDN).
