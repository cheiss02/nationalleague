/* Shared header and footer — built once, here, as plain string templates so
   the exact same markup can be used two ways:
     1. scripts/build-site.mjs imports renderHeader()/renderFooter() at
        build time and bakes the result into the static HTML for every
        page, in both languages — so nav text and links are real,
        crawlable HTML from the first byte (no client-side injection the
        way the single-language reference project used).
     2. This file still runs in the browser on every page, purely as a
        defensive clickjacking guard (see below). It does not re-render
        the header/footer — they are already static markup.

   NAV_ITEMS and the social icon set are the single source other modules
   (build-site.mjs, main.js) read from, so adding a nav link or a social
   icon only ever happens in one place. */

export const NAV_ITEMS = [
  { slug: "index", file: "index.html", navKey: "nav.home" },
  { slug: "about", file: "about.html", navKey: "nav.about" },
  { slug: "academies", file: "academies.html", navKey: "nav.academies" },
  { slug: "wame", file: "wame.html", navKey: "nav.wame", showInHeader: false },
  { slug: "news", file: "news.html", navKey: "nav.news" },
  { slug: "documents", file: "documents.html", navKey: "nav.documents" },
  { slug: "contact", file: "contact.html", navKey: "nav.contact" },
];

/* The soccer-ball pattern used by the click-kick animation (see
   js/ball-button.js) — a real pentagon-and-seams ball, not a plain dot. */
/* Font Awesome Free "futbol" glyph (CC BY 4.0 / MIT — free for commercial
   use, https://fontawesome.com/license/free), self-hosted inline rather
   than loaded from a CDN. A white backing circle sits behind the path so
   its panel gaps read as white on every button background, not whatever
   color is behind it. */
const BALL_SVG =
  '<svg viewBox="0 0 512 512" aria-hidden="true"><circle cx="256" cy="256" r="256" fill="#fff"/><path fill="#111" d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"/></svg>';

/* Wraps a button's visible label + the hidden kick-animation track. Every
   primary button on the site uses this so the markup (and therefore the
   behavior js/ball-button.js attaches to it) is identical everywhere.
   goalText: shown briefly after the kick for a button with no href (none
   currently exist, but the behavior is supported); pass the localized
   "GOAL! ⚽" / "¡GOL! ⚽" string. */
export function ballButtonInner(label, goalText) {
  return `<span class="ball-btn__label" data-ball-label="${label.replace(/"/g, "&quot;")}"${goalText ? ` data-goal-text="${goalText.replace(/"/g, "&quot;")}"` : ""}>${label}</span><span class="ball-btn__track" aria-hidden="true"><span class="ball-btn__fill"></span><span class="ball-btn__ball">${BALL_SVG}</span></span>`;
}

export const SOCIAL_ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.05 15.58 2.04 15.2 2.04 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 2.16c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.19a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.75-.07zm0 3.68a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.16a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68zm6.24-.66a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.29-1.73 1.76-1.73z"/></svg>',
  tiktok:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2h-3.2v13.4a2.8 2.8 0 1 1-2-2.68V9.4a6 6 0 1 0 5.2 5.95V8.2a7.4 7.4 0 0 0 4.4 1.46V6.4a4.2 4.2 0 0 1-4.4-4.4z"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16 4 12 4 12 4h0s-4 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9 2 10.7v1.6C2 14 2.2 15.8 2.2 15.8s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.1 7.1.2 7.1.2s4 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 3h3.2l-7 8 8.2 10h-6.4l-5-6.5-5.8 6.5H2.3l7.5-8.5L2 3h6.6l4.5 6 5.2-6zm-1.1 16h1.8L7 5H5.1l12.1 14z"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/></svg>',
};

/* lang: "en" | "es". currentSlug: one of NAV_ITEMS[].slug, or "404".
   pagePath(slug, lang): resolves a nav slug to its href from wherever the
   current page lives — passed in by build-site.mjs, which knows the full
   routing table (root EN files, /es/ mirrors). t(path): translation
   lookup for the target language. siteUrl: absolute origin, used for the
   crest/logo alt-text-only cases; everything else is relative. */
export function renderHeader({ lang, currentSlug, pagePath, t, selfHref, otherLangHref, joinHref }) {
  const navLinks = NAV_ITEMS.filter((item) => item.showInHeader !== false)
    .map((item) => {
      const isCurrent = item.slug === currentSlug;
      const attrs = isCurrent ? ' class="is-current" aria-current="page"' : "";
      return `<li><a href="${pagePath(item.slug, lang)}"${attrs}>${t(item.navKey)}</a></li>`;
    }).join("");

  return `<header class="site-header" data-header>
    <div class="wrap header-inner">
      <a class="brand" href="${pagePath("index", lang)}" aria-label="National League Official Academies — ${lang === "es" ? "inicio" : "home"}">
        <img src="${pagePath.asset("assets/images/brand/nl-crest.png")}" alt="" width="44" height="44">
        <span class="brand-text">National <strong>League</strong></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <ul>${navLinks}</ul>
        <a class="btn nav-cta" href="${joinHref}">${ballButtonInner(t("nav.joinCta"))}</a>
      </nav>
      <div class="header-tools">
        <div class="lang-switch" role="group" aria-label="Language / Idioma">
          <a href="${lang === "en" ? selfHref : otherLangHref}" ${lang === "en" ? 'aria-current="true"' : ""} lang="en" hreflang="en">EN</a>
          <span aria-hidden="true">/</span>
          <a href="${lang === "es" ? selfHref : otherLangHref}" ${lang === "es" ? 'aria-current="true"' : ""} lang="es" hreflang="es">ES</a>
        </div>
        <button type="button" class="menu-toggle" data-menu-toggle aria-controls="site-nav" aria-expanded="false" aria-label="${t("menu.open")}" data-label-open="${t("menu.open")}" data-label-close="${t("menu.close")}">
          <span class="menu-icon"></span>
        </button>
      </div>
    </div>
  </header>
  <div class="nav-backdrop"></div>`;
}

export function renderFooter({ lang, pagePath, t, config, legalFile }) {
  const navLinks = NAV_ITEMS.map(
    (item) => `<li><a href="${pagePath(item.slug, lang)}">${t(item.navKey)}</a></li>`
  ).join("");

  const socialRows = Object.entries(config.social)
    .filter(([, url]) => url)
    .map(([key, url]) => {
      const label = `National League ${key.charAt(0).toUpperCase()}${key.slice(1)} ${t("common.opensNewTab")}`;
      return `<li><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${SOCIAL_ICONS[key] || ""}</a></li>`;
    })
    .join("");

  const contactRows = [];
  if (config.email) {
    contactRows.push(`<a class="footer-contact" href="mailto:${config.email}">${config.email}</a>`);
  }
  if (config.phone) {
    contactRows.push(`<a class="footer-contact" href="tel:${config.phone.replace(/[^+\d]/g, "")}">${config.phone}</a>`);
  }

  const legalLinks = [
    ["privacy", "privacy-policy"],
    ["terms", "terms-conditions"],
    ["cookies", "cookie-policy"],
    ["refund", "refund-policy"],
    ["accessibility", "accessibility"],
  ]
    .map(([key, slug]) => `<li><a href="${legalFile(slug, lang)}">${t(`footer.links.${key}`)}</a></li>`)
    .join("");

  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <img src="${pagePath.asset("assets/images/brand/nl-crest-light.png")}" alt="National League Official Academies" width="64" height="64">
        <p>${t("footer.tagline")}</p>
      </div>
      <nav class="footer-col" aria-label="Footer">
        <p class="footer-label">${t("footer.explore")}</p>
        <ul>${navLinks}</ul>
      </nav>
      <div class="footer-col">
        <p class="footer-label">${t("footer.follow")}</p>
        ${socialRows ? `<ul class="social">${socialRows}</ul>` : ""}
        <p class="footer-label footer-label-spaced">${t("footer.contact")}</p>
        ${contactRows.join("<br>") || ""}
      </div>
      <nav class="footer-col" aria-label="Legal">
        <p class="footer-label">${t("footer.legal")}</p>
        <ul class="footer-legal-links footer-legal-links-stacked">${legalLinks}</ul>
      </nav>
    </div>
    <div class="wrap footer-trademark">
      <p>${config.logos.clubs ? t("footer.trademarkWithLogos") : t("footer.trademarkNamesOnly")}</p>
    </div>
    <div class="wrap footer-bottom">
      <p>&copy; <span data-year>2026</span> National League Official Academies. ${t("footer.rights")}</p>
    </div>
  </footer>
  <button type="button" class="to-top" data-to-top aria-label="${t("backToTop")}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>`;
}

/* ---- runtime: clickjacking guard only (header/footer are already static
   markup baked in at build time — nothing to inject here). GitHub Pages
   cannot send an X-Frame-Options / frame-ancestors header, so this is the
   only available defense against being embedded in a hostile frame. ---- */
(function () {
  if (typeof window === "undefined") return;
  if (window.top !== window.self) {
    try {
      window.top.location.href = window.self.location.href;
    } catch (e) {
      document.documentElement.style.display = "none";
    }
  }
})();
