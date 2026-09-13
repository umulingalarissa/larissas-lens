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

Home is the work. Header nav is **publications · about** (+ Instagram). The logo/name returns home.

| Page | Path |
|------|------|
| Work archive (numbered artist/project index) | `index.html` (`#work`) |
| Full galleries | `projects/tyla.html`, `davido.html`, `ayra-starr.html`, `tiwa-savage.html`, `black-sheriff.html`, `musa-keys.html`, `pher.html`, `natacha.html` |
| Publications (press / covers only) | `publications.html` |
| About (bio + inquire) | `about.html` |
| Quiet sitemap (redirects home) | `projects.html` |

Concert first on the home index (Tyla → Musa Keys), then two editorial entries that already have images: Pher (SPICE cover) and Natacha.

Shared chrome: `styles.css` + `site.js` (header/footer inject). Images live in `img/`.

## Design

Black `#000` + sand `#d8c8af`. Fonts: Bebas Neue, Instrument Serif (italic), Inter Tight (Google Fonts CDN).
