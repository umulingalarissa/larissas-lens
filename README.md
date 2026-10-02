# Larissa’s Lens — static site

Concert photography site for **Larissa Umulinga**. Pure static HTML/CSS/JS — no build step, no CMS fees. Designed as a long-term, free-hosting replacement for Squarespace.

Information architecture follows a single work archive (Joshua Kissi–style): the homepage *is* the work. No parallel music / projects / editorial dumps.

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

Home is the work. Header nav is **curations · about** (+ Instagram). The logo/name returns home.

| Page | Path |
|------|------|
| Work archive (numbered artist/project index) | `index.html` (`#work`) |
| Full galleries (one reusable template, driven by slug) | `projects/artist.html?a=<slug>` |
| Curations / Publications (exhibitions + press) | `publications.html` |
| About (bio + inquire) | `about.html` |
| Quiet sitemap (redirects home) | `projects.html` |

Concert first on the home index (Wizkid → Adekunle), then one editorial entry: Pher (SPICE cover).

Shared chrome: `styles.css` + `site.js` (header/footer inject). Every artist's photos live under `img/<slug>/`, numbered `01.jpg`, `02.jpg`, ... — the same order they appear in the gallery, with `01.jpg` doubling as the hero + homepage thumbnail.

### Adding a new artist

No new HTML file needed:

1. Drop their photos in `img/<slug>/` (e.g. `img/burna-boy/01.jpg`, `02.jpg`, ...).
2. Add one entry to the `window.ARTISTS` array in `projects/artists-data.js` — name, credit line, a short lede, and the `images` list (file, alt text, caption, optional `object-position` override).

That's it. The homepage list, the hero, the gallery grid, the "Project 0X / NN" numbering, and the prev/next nav on every artist page are all generated from that one array in `projects/artist.html` + `site.js`.

## Design

Black `#000` + sand `#d8c8af`. Fonts: Bebas Neue, Instrument Serif (italic), Inter Tight (Google Fonts CDN).
