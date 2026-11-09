# National League Official Academies

Bilingual (English default / Spanish at `/es/`) website for National League Official Academies, a youth soccer league for the official academies of Liga MX and MLS clubs, run in partnership with Wame Sports.

Plain HTML/CSS/vanilla JS, no framework, no build step at runtime — `scripts/build-site.mjs` is a small static-site generator that runs in Node and writes plain `.html` files, so what ships to GitHub Pages is just static files.

## File map

```
index.html, about.html, academies.html, wame.html, news.html,       ← generated — see below
documents.html, join.html, contact.html, privacy-policy.html,
terms-conditions.html, cookie-policy.html, refund-policy.html,
accessibility.html, 404.html
es/                          Spanish mirror of every page above
news/<slug>.html             English news post pages (generated)
es/news/<slug>.html          Spanish news post pages (generated)

css/style.css                 ALL styles — tokens/palette at the top, one component per section
js/
  site-config.js               Contact info, social links, form URLs, logo visibility switches
  i18n.js                      All bilingual UI copy (nav, buttons, labels — not legal prose)
  layout.js                    Header/footer templates (shared by the browser and the build script) + the clickjacking guard
  main.js                      Mobile menu, sticky header, scroll-reveal, back-to-top, language hint banner
  logo-marquee.js               Keeps the logo strip's scroll speed constant + reduced-motion swap
  ball-button.js                The soccer-ball kick click animation + the join-page consent gate
  news.js                       Renders news.html + the key-dates block from the generated JSON
  documents.js                  Renders documents.html (search + category grouping) from the generated JSON

scripts/
  build-site.mjs                The generator — run this after any content change: `node scripts/build-site.mjs`
  process-assets.mjs            One-time/as-needed image pipeline (crests, favicons, share image, hero photos)
  lib/ssg.mjs                   Shared build-time helpers (routing, <head> boilerplate, header/footer wiring, marquee, legal-page layout)
  pages/*.mjs                   One template per page — this is the actual page "source," not the generated .html

content/
  news/*.md                     One Markdown file per post — see HOW-TO-UPDATE.md
  news.json                     Generated manifest — don't hand-edit
  key-dates.json                The "Key dates" block on the News page

assets/
  images/brand|clubs|partners|hero|news/   See assets/images/README.md
  documents/reglamentos|convocatorias|calendarios|formatos/   PDFs, plus a generated documents.json
  fonts/                         Self-hosted DM Sans, Barlow Condensed (woff2)

_source-assets/                 Raw source art (crest, banners) — process-assets.mjs reads from here
.github/workflows/build.yml     Rebuilds generated files on every push to main
```

## How the shared parts work

- **Header/footer** are built once, as plain string templates, in `js/layout.js` — and used two ways: `scripts/build-site.mjs` calls them at build time to bake the real header/footer into every static HTML file (so nav text is real, crawlable HTML, not injected by client JS), and the same file still runs in the browser purely as a clickjacking guard.
- **All UI copy** (nav labels, buttons, section headings, form field text) lives in `js/i18n.js` as one `{ en: {...}, es: {...} }` object. The five legal pages are the one exception — their long-form prose lives directly in `scripts/pages/*-policy.mjs` etc., since nothing else on the site reuses it.
- **Every page is generated**, not hand-written HTML. `scripts/pages/<slug>.mjs` exports a `render(ctx)` function that returns the page's `<main>` content; `build-site.mjs` wraps it with the shared `<head>`/header/footer and writes both the English file (at root) and the Spanish file (under `/es/`) from the same template + `js/i18n.js`. **To change a page's structure, edit its file in `scripts/pages/`, then run the build** — editing the generated `.html` files directly will just be overwritten.
- **Theme variables** are at the top of `css/style.css`, each with a comment giving its computed WCAG contrast ratio against the backgrounds it's used on.

## Running the build

```
npm install          # once, pulls in sharp (image processing) as a dev-only dependency
node scripts/build-site.mjs
```

This regenerates every `.html` file, `content/news.json`, `assets/documents/documents.json`, `sitemap.xml`, `robots.txt`, `llms.txt`, and `site.webmanifest`. It runs automatically on every push to `main` via `.github/workflows/build.yml`.

To re-process images (after replacing something in `_source-assets/` or `assets/images/`):

```
node scripts/process-assets.mjs
```

## Changing form links

Edit `js/site-config.js` → `forms.teams` / `forms.players`, then rebuild. Both the Join page and this file are the only places these URLs live.

## Changing colors / fonts

Edit the `:root` block at the top of `css/style.css`. Each color variable has a comment with its contrast ratio — if you change one, recheck the pairs it's used in (the comments say which).

## Add your email, phone and social links

Edit `js/site-config.js` — fill in `email`, `phone`, and any of the `social` links — then rebuild. Any field left empty stays hidden on the live site (footer, Contact page, JSON-LD, `llms.txt`) — no broken links or placeholder "#" hrefs ever ship.

## Hiding or showing a club's logo

In `js/site-config.js`:

- Hide **one** club's crest (it becomes a text-only chip instead, same size/position): add its slug to `hiddenClubLogos`, e.g. `hiddenClubLogos: ["lafc"]`.
- Hide **all** club crests: set `logos.clubs: false`.
- Hide the Wame logo: set `logos.wame: false`.

Rebuild after any change. A hidden crest is dropped from every generated page, the sitemap, and the JSON-LD, and (after also re-running `node scripts/process-assets.mjs`) from the share image — but the crest file itself is not deleted from `assets/images/clubs/` and stays reachable by direct URL. Delete the file too if that matters.

## Hosting: Vercel + GoDaddy domain

The repo includes a `vercel.json` so this deploys with no manual build configuration:

1. On [vercel.com](https://vercel.com), **Add New → Project**, import this GitHub repo. Vercel reads `vercel.json` automatically:
   - Build command: `node scripts/build-site.mjs` (regenerates every page from `scripts/pages/*.mjs` + `js/i18n.js` before each deploy, so content edits — a new news post, an uploaded PDF, an updated date — always ship fresh)
   - Install command: `npm install --omit=dev` (the only devDependency, `sharp`, is a local image-processing tool, not something the live build needs)
   - Output directory: `.` (the generated `.html` files live at the repo root, same layout the reference GitHub Pages setup used)
2. Deploy once to get a `*.vercel.app` preview URL and confirm it looks right.
3. In the Vercel project → **Settings → Domains**, add `nationalleagueusa.com` (and `www.nationalleagueusa.com` if you want both). Vercel shows the exact DNS records to add.
4. In GoDaddy's DNS settings for `nationalleagueusa.com`, typically:
   - An `A` record for `@` pointing to `76.76.21.21` (Vercel's anycast IP — use whatever Vercel's Domains screen actually shows, as this can change)
   - A `CNAME` record for `www` pointing to `cname.vercel-dns.com`
   - Delete GoDaddy's default parked-domain / forwarding records
5. Once DNS propagates, Vercel issues the SSL certificate automatically — no separate "enforce HTTPS" step.
6. Every push to `main` redeploys automatically (Vercel's GitHub integration); no separate GitHub Action is needed for this path.
7. After launch, submit `sitemap.xml` in both Google Search Console and Bing Webmaster Tools.

**404 page:** Vercel serves the repo's `404.html` automatically for any unmatched path, the same way GitHub Pages does — which is exactly why that page uses absolute URLs for every link and asset (see the comment in `scripts/lib/ssg.mjs`).

<details>
<summary>Alternative: GitHub Pages instead of Vercel</summary>

The repo still supports this path too — `.github/workflows/build.yml` rebuilds and commits the generated files on every push, and `CNAME`/`.nojekyll` are already in place.

1. GoDaddy DNS: four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; a `CNAME` for `www` → `<github-username>.github.io`; remove GoDaddy's default parked/forwarding records.
2. GitHub Settings → Pages: set the custom domain to `nationalleagueusa.com`, turn on **Enforce HTTPS** once the certificate issues.
3. Optionally verify the domain under Settings → Pages → custom domain verification, to prevent domain takeover.

Only use one hosting path at a time — pointing GoDaddy's DNS at both will conflict.
</details>

## Security

- Content-Security-Policy meta tag locked to `'self'` for everything (scripts, styles, fonts, connect) — there are no third-party script/style/font hosts anywhere on the site, since fonts are self-hosted and the registration forms are *linked*, never embedded.
- `img-src 'self' data:` (the `data:` allowance is for nothing currently in use, kept as a narrow, standard allowance).
- No `X-Frame-Options`/`frame-ancestors` HTTP header is possible on GitHub Pages, so `js/layout.js` runs a JS clickjacking guard on every page instead (breaks out of a hostile frame, or hides the page if it can't).
- `rel="noopener noreferrer"` on every `target="_blank"` link.

## Cookies and third-party requests

Zero cookies, zero third-party requests. See `cookie-policy.html` for the full explanation — the short version: fonts are self-hosted, forms are linked not embedded, there's no analytics or tracking pixel of any kind. `localStorage` holds exactly one thing (the language preference), which is why there's no cookie banner.

## Still outstanding before launch

See `PRE-LAUNCH-CHECKLIST.md`, `FORMS-CHECKLIST.md`, and `HOW-TO-UPDATE.md`'s "information the league must decide" section.
