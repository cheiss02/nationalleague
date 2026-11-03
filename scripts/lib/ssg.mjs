/* Core static-site-generator helpers shared by scripts/build-site.mjs and
   every page renderer in scripts/pages/*.mjs. Two languages, no bundler:
   each page is written as a small .mjs module exporting renderBody(ctx);
   this file supplies the <head>/<header>/<footer> wrapper, the relative
   link resolver (so the same template works whether the output file is at
   the site root, under /es/, or under /es/news/), and the SITE_CONFIG /
   translations plumbing. */

import { posix } from "node:path";
import { translations, lookup } from "../../js/i18n.js";
import { renderHeader, renderFooter, NAV_ITEMS, SOCIAL_ICONS, ballButtonInner } from "../../js/layout.js";
import { SITE_CONFIG, CLUBS } from "../../js/site-config.js";

export { translations, NAV_ITEMS, SITE_CONFIG, CLUBS, SOCIAL_ICONS, ballButtonInner };

export const SITE_URL = SITE_CONFIG.siteUrl.replace(/\/$/, "");

/* Every "simple" page (one template, EN at root + ES under /es/, same file
   name both places). News post pages and legal pages also go through this
   table so sitemap/hreflang generation has one source of truth. */
export const ROUTES = [
  { slug: "index", file: "index.html" },
  { slug: "about", file: "about.html" },
  { slug: "academies", file: "academies.html" },
  { slug: "wame", file: "wame.html" },
  { slug: "news", file: "news.html" },
  { slug: "documents", file: "documents.html" },
  { slug: "join", file: "join.html" },
  { slug: "contact", file: "contact.html" },
  { slug: "privacy-policy", file: "privacy-policy.html" },
  { slug: "terms-conditions", file: "terms-conditions.html" },
  { slug: "cookie-policy", file: "cookie-policy.html" },
  { slug: "refund-policy", file: "refund-policy.html" },
  { slug: "accessibility", file: "accessibility.html" },
];

export function routeFile(slug, lang) {
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) throw new Error(`Unknown route slug "${slug}"`);
  return lang === "es" ? `es/${route.file}` : route.file;
}

/* Relative href from one site-root-relative path to another, e.g.
   relHref("es/about.html", "news/kickoff.html") -> "../news/kickoff.html"
   A target ending in "/" (or "") is treated as a directory, so the
   trailing slash is preserved — needed for runtime JS that concatenates
   a fetched filename onto the result (e.g. assetBase + "assets/x.jpg"). */
export function relHref(fromSiteRel, toSiteRel) {
  const fromDir = posix.dirname(fromSiteRel);
  const isDir = toSiteRel === "" || toSiteRel.endsWith("/");
  const target = isDir ? toSiteRel.slice(0, -1) || "." : toSiteRel;
  let rel = posix.relative(fromDir, target);
  if (isDir) return rel === "" ? "" : rel + "/";
  if (rel === "") rel = posix.basename(toSiteRel);
  return rel;
}

/* Builds the pagePath(slug, lang) + pagePath.asset(rootRelPath) +
   pagePath.abs(slug, lang) helper bound to one output file, for use by a
   single renderBody() call. */
export function makePagePath(currentSiteRel) {
  const pagePath = (slug, lang) => relHref(currentSiteRel, routeFile(slug, lang));
  pagePath.asset = (rootRelPath) => relHref(currentSiteRel, rootRelPath);
  pagePath.abs = (slug, lang) => `${SITE_URL}/${routeFile(slug, lang)}`.replace(/index\.html$/, "");
  pagePath.absPath = (rootRelPath) => `${SITE_URL}/${rootRelPath}`;
  /* relative path prefix back to the site root, e.g. "" at root, "../"
     under /es/, "../../" under /es/news/ — for runtime JS that builds
     asset URLs after fetching data it couldn't know about at build time */
  pagePath.base = () => relHref(currentSiteRel, "");
  return pagePath;
}

/* Same shape as makePagePath, but every href is absolute
   (https://nationalleagueusa.com/...). GitHub Pages serves the single
   root 404.html for ANY unmatched URL on the whole site, at whatever
   depth that URL was — so a relative "about.html" link or "css/style.css"
   asset on that page would resolve against the broken URL's location, not
   the site root, and 404 again. The 404 page is the one place every link
   and asset must be absolute. */
export function makeAbsolutePagePath() {
  const pagePath = (slug, lang) => `${SITE_URL}/${routeFile(slug, lang)}`.replace(/index\.html$/, "");
  pagePath.asset = (rootRelPath) => `${SITE_URL}/${rootRelPath}`;
  pagePath.abs = pagePath;
  pagePath.absPath = (rootRelPath) => `${SITE_URL}/${rootRelPath}`;
  pagePath.base = () => `${SITE_URL}/`;
  return pagePath;
}

export function makeT(lang) {
  return function t(path) {
    const value = lookup(lang, path);
    if (value === undefined) {
      throw new Error(`Missing i18n key "${path}" for lang "${lang}"`);
    }
    return value;
  };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const CSP =
  "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-src 'none'; upgrade-insecure-requests";

/* Renders one full HTML document: <head> boilerplate (CSP, OG/Twitter,
   canonical + hreflang alternates, favicons, self-hosted fonts, JSON-LD) +
   static header + the page's own <main> markup (from renderBody) + static
   footer + the EN/ES hint banner + script tags. */
export function renderDocument({ lang, slug, currentSiteRel, title, description, bodyHtml, bodyAttrs = "", extraHead = "", jsonLd = null, scripts = [] }) {
  const isIndexable = slug !== "404";
  /* the 404 page can be served at any URL depth (see makeAbsolutePagePath),
     so every link and asset on it must be absolute — swapping pagePath
     here makes every pagePath(...)/pagePath.asset(...) call below correct
     for both cases with no further special-casing */
  const pagePath = isIndexable ? makePagePath(currentSiteRel) : makeAbsolutePagePath();
  const t = makeT(lang);
  const canonical = isIndexable ? pagePath.abs(slug, lang) : pagePath.absPath(currentSiteRel);
  const enUrl = isIndexable ? pagePath.abs(slug, "en") : canonical;
  const esUrl = isIndexable ? pagePath.abs(slug, "es") : canonical;
  const shareImg = pagePath.absPath("assets/images/brand/nl-share.jpg");

  const joinHref = pagePath("join", lang);
  /* the 404 page is a single bilingual file (GitHub Pages serves one root
     404.html for the whole site, so there's no per-language mirror to
     link to) — point its lang-switch at itself rather than crash or ship
     a dead "#" link */
  const otherLangHref = isIndexable ? pagePath(slug, lang === "en" ? "es" : "en") : pagePath.absPath(currentSiteRel);

  const header = renderHeader({
    lang,
    currentSlug: slug,
    pagePath,
    t,
    selfHref: isIndexable ? pagePath(slug, lang) : pagePath.absPath(currentSiteRel),
    otherLangHref,
    joinHref,
  });

  const footer = renderFooter({ lang, pagePath, t, config: SITE_CONFIG, legalFile: (s, l) => pagePath(s, l) });

  const hintBanner =
    lang === "en" && isIndexable
      ? `<div class="lang-hint" data-lang-hint hidden role="status">
          <p>${t("langHint.text")} <a href="${otherLangHref}">Ver en español</a></p>
          <button type="button" data-lang-hint-dismiss aria-label="${t("langHint.dismiss")}">&times;</button>
        </div>`
      : "";

  const scriptTags = scripts.map((src) => `<script src="${pagePath.asset(src)}" defer></script>`).join("\n  ");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="robots" content="index, follow, max-image-preview:large">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="es" href="${esUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="National League Official Academies">
<meta property="og:locale" content="${lang === "es" ? "es_US" : "en_US"}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${shareImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${shareImg}">
<meta name="theme-color" content="#0b1f4b">
<link rel="icon" href="${pagePath.asset("favicon.ico")}" sizes="any">
<link rel="icon" type="image/png" href="${pagePath.asset("assets/images/brand/icon-32.png")}" sizes="32x32">
<link rel="icon" type="image/png" href="${pagePath.asset("assets/images/brand/icon-192.png")}" sizes="192x192">
<link rel="apple-touch-icon" href="${pagePath.asset("assets/images/brand/apple-touch-icon.png")}">
<link rel="manifest" href="${pagePath.asset("site.webmanifest")}">
<link rel="stylesheet" href="${pagePath.asset("css/style.css")}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
${extraHead}
</head>
<body data-page="${slug}"${bodyAttrs}>
<a class="skip-link" href="#main">${t("common.skipToContent")}</a>
${header}
${hintBanner}
<main id="main">
${bodyHtml}
</main>
${footer}
<script src="${pagePath.asset("js/layout.js")}" type="module" defer></script>
<script src="${pagePath.asset("js/main.js")}" defer></script>
<script src="${pagePath.asset("js/ball-button.js")}" defer></script>
${scriptTags}
</body>
</html>
`;
}

/* Visible clubs after applying the SITE_CONFIG logo switches — used by the
   marquee and the academies grid so a hidden crest is excluded from the
   rendered markup entirely, not just visually hidden. */
export function visibleClubs() {
  return CLUBS.map((club) => ({
    ...club,
    showCrest: SITE_CONFIG.logos.clubs && !SITE_CONFIG.hiddenClubLogos.includes(club.slug),
  }));
}

/* The infinite scrolling logo strip (home page). Builds two duplicated
   tracks server-side for a seamless loop (CSS handles the animation; the
   second copy is aria-hidden so screen readers only hear each crest
   once). Each item is either the real crest (PNG/SVG + alt text) or, when
   hidden via SITE_CONFIG, a text-only chip in the same size/shape. */
export function renderMarquee({ lang, pagePath, t }) {
  const clubs = visibleClubs();
  const wameShow = SITE_CONFIG.logos.wame;

  function item(inner) {
    return `<li class="marquee-item">${inner}</li>`;
  }

  function clubItem(club) {
    if (!club.showCrest) {
      return item(`<span class="is-text-chip">${club.name}</span>`);
    }
    const ext = club.ext === "svg" ? "svg" : "png";
    const src = pagePath.asset(`assets/images/clubs/${club.slug}.${ext}`);
    const alt = lang === "es" ? `Escudo de ${club.name}` : `${club.name} crest`;
    return item(`<img src="${src}" alt="${alt}" loading="lazy" width="64" height="64">`);
  }

  function wameItem() {
    if (!wameShow) return "";
    const src = pagePath.asset("assets/images/partners/wame-sports-light.png");
    return item(`<img src="${src}" alt="Wame Sports" loading="lazy" width="120" height="30">`);
  }

  function crestItem() {
    const src = pagePath.asset("assets/images/brand/nl-crest-light.png");
    const alt = "National League Official Academies";
    return item(`<img src="${src}" alt="${alt}" loading="lazy" width="48" height="52">`);
  }

  const items = [crestItem(), ...clubs.map(clubItem), wameItem()].filter(Boolean).join("");

  function track(ariaHidden) {
    return `<ul class="marquee-track"${ariaHidden ? ' aria-hidden="true"' : ""}>${items}${items}</ul>`;
  }

  return `<section class="marquee-section" data-marquee aria-label="${t("marquee.heading")}">
    <p class="marquee-heading">${t("marquee.heading")}</p>
    <div class="marquee-viewport">
      ${track(false)}
    </div>
    <ul class="marquee-static-grid">
      ${items}
    </ul>
  </section>`;
}

/* Shared layout for the five legal pages: a draft-review banner (removed
   once an attorney signs off), the page heading, and a list of
   {heading, html} sections. Legal prose is long-form and page-specific, so
   unlike nav/button copy it lives inline in each scripts/pages/*.mjs file
   rather than routed through js/i18n.js — still bilingual, just not
   centralized, since nothing else on the site reuses it. */
export function renderLegalPage({ lang, pagePath, t, eyebrow, title, effectiveDate, sections }) {
  const draftText =
    lang === "es"
      ? "Borrador: revisar con un abogado antes de publicar."
      : "Draft: have an attorney review before publishing.";

  const body = sections
    .map((s) => `<h2>${s.heading}</h2>${s.html}`)
    .join("\n");

  return `
<div class="draft-banner" role="note">${draftText}</div>
${renderPageHero({ t, eyebrow, title })}

<div class="wrap back-top-bar">
  <a class="back-home-top" href="${pagePath("index", lang)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>${t("common.backHome")}</a>
</div>

<section class="section">
  <div class="wrap legal-content">
    ${body}
    <p class="fine-print">${lang === "es" ? "Fecha de vigencia" : "Effective date"}: ${effectiveDate}</p>
  </div>
</section>
`;
}

/* Standard interior-page hero (navy band, optional dimmed photo or the
   CSS-only stripe/gradient treatment when no unique photo exists). */
export function renderPageHero({ t, eyebrow, title, lead = "", image = null, imageAlt = "" }) {
  const media = image
    ? `<div class="page-hero-media"><img src="${image}" alt="${imageAlt}" loading="eager" width="1920" height="1100"></div>`
    : `<div class="page-hero-gradient"></div>`;
  return `<section class="page-hero">
    ${media}
    <div class="wrap">
      <p class="eyebrow eyebrow-center">${eyebrow}</p>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </div>
  </section>`;
}
