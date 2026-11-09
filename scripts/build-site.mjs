/* Regenerates every derived part of the site:

   1. index.html, about.html, ... (+ es/ mirrors) from scripts/pages/*.mjs,
      using js/i18n.js for copy and js/layout.js for the shared header/
      footer — English at the site root, Spanish under /es/, both fully
      static HTML (not a client-side-only language toggle).
   2. content/news/*.md -> content/news.json + news/<slug>.html +
      es/news/<slug>.html (static post pages, so each one is indexable).
   3. assets/documents/<category>/*.pdf -> assets/documents/documents.json
   4. sitemap.xml, robots.txt, llms.txt, site.webmanifest

   Run by the "Build" GitHub Action; also runs locally:
     node scripts/build-site.mjs  */

import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ROUTES,
  routeFile,
  makePagePath,
  makeAbsolutePagePath,
  makeT,
  renderDocument,
  SITE_CONFIG,
  SITE_URL,
  translations,
} from "./lib/ssg.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function writeRoute(siteRelPath, html) {
  const outPath = join(ROOT, siteRelPath);
  ensureDir(dirname(outPath));
  writeFileSync(outPath, html);
}

/* ---------------------------------------------------------- news.json --- */

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([\w]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim();
  }
  return { data, body: match[2] };
}

function buildNews() {
  const newsDir = join(ROOT, "content", "news");
  ensureDir(newsDir);
  const files = readdirSync(newsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = readFileSync(join(newsDir, file), "utf8");
    const { data, body } = parseFrontMatter(raw);
    const [bodyEs, bodyEn] = body.split(/<!--\s*en\s*-->/);
    const slugMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    const slugEs = slugMatch ? slugMatch[1] : file.replace(/\.md$/, "");
    const slugEn = data.slug_en || slugEs;
    return {
      slug_en: slugEn,
      slug_es: slugEs,
      date: data.date,
      category: data.category || "general",
      title_en: data.title_en,
      title_es: data.title_es,
      excerpt_en: (bodyEn || bodyEs || "").trim().split(/\n\s*\n/)[0],
      excerpt_es: (bodyEs || "").trim().split(/\n\s*\n/)[0],
      body_en: (bodyEn || bodyEs || "").trim(),
      body_es: (bodyEs || "").trim(),
      image: data.image || "",
      image_alt_en: data.image_alt_en || "",
      image_alt_es: data.image_alt_es || "",
      sample: data.sample === "true",
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  const manifest = posts.map(({ body_en, body_es, ...rest }) => rest);
  writeFileSync(join(ROOT, "content", "news.json"), JSON.stringify(manifest, null, 2) + "\n");
  return posts;
}

function truncateWords(text, maxLen) {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

function paragraphsHtml(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("\n");
}

function renderNewsPostPage(post, lang) {
  const t = makeT(lang);
  const enRel = `news/${post.slug_en}.html`;
  const esRel = `es/news/${post.slug_es}.html`;
  const slugRel = lang === "es" ? esRel : enRel;
  const pagePath = makePagePath(slugRel);
  const title = post[`title_${lang}`] || post.title_en;
  const body = post[`body_${lang}`] || post.body_en;
  const dateStr = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date + "T00:00:00"));

  const img = post.image
    ? `<img src="${pagePath.asset("assets/images/news/" + post.image)}" alt="${post[`image_alt_${lang}`] || ""}" width="1200" height="700" loading="eager">`
    : "";

  const sampleNote = post.sample
    ? `<p class="fine-print">${lang === "es" ? "Esta es una publicación de ejemplo." : "This is a sample post."}</p>`
    : "";

  const bodyHtml = `<article class="section post-article">
    <div class="wrap">
      <div class="back-top-bar"><a class="back-home-top" href="${pagePath("news", lang)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>${t("nav.news")}</a></div>
      <h1>${title}</h1>
      <p class="post-meta"><span>${dateStr}</span></p>
      ${img}
      ${paragraphsHtml(body)}
      ${sampleNote}
    </div>
  </article>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    datePublished: post.date,
    inLanguage: lang,
    image: post.image ? [pagePath.absPath("assets/images/news/" + post.image)] : undefined,
    publisher: { "@type": "Organization", name: "National League Official Academies" },
    mainEntityOfPage: pagePath.absPath(slugRel),
  };

  return renderDocument({
    lang,
    slug: "news",
    currentSiteRel: slugRel,
    title,
    description: truncateWords(post[`excerpt_${lang}`] || post.excerpt_en || "", 160),
    bodyHtml,
    jsonLd,
    alternates: { en: enRel, es: esRel },
  });
}

/* ------------------------------------------------------ documents.json -- */

function buildDocuments() {
  const docsRoot = join(ROOT, "assets", "documents");
  const categories = ["reglamentos", "convocatorias", "calendarios", "formatos"];
  const manifest = {};
  for (const cat of categories) {
    const dir = join(docsRoot, cat);
    ensureDir(dir);
    const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"));
    manifest[cat] = files.map((file) => {
      const stat = statSync(join(dir, file));
      return { file, size: stat.size, date: stat.mtime.toISOString().slice(0, 10) };
    });
  }
  writeFileSync(join(docsRoot, "documents.json"), JSON.stringify(manifest, null, 2) + "\n");
  return manifest;
}

/* ------------------------------------------------------------ sitemap --- */

function buildSitemapAndRobots(newsPairs) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const route of ROUTES) {
    for (const lang of ["en", "es"]) {
      const loc = `${SITE_URL}/${routeFile(route.slug, lang)}`.replace(/index\.html$/, "");
      const altEn = `${SITE_URL}/${routeFile(route.slug, "en")}`.replace(/index\.html$/, "");
      const altEs = `${SITE_URL}/${routeFile(route.slug, "es")}`.replace(/index\.html$/, "");
      urls.push(
        `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="en" href="${altEn}"/>\n    <xhtml:link rel="alternate" hreflang="es" href="${altEs}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${altEn}"/>\n    <lastmod>${today}</lastmod>\n    <priority>${route.slug === "index" ? "1.0" : "0.7"}</priority>\n  </url>`
      );
    }
  }
  /* each news post is its own EN/ES pair of files (independent slugs, see
     renderNewsPostPage) — give each one the same reciprocal hreflang
     treatment as the regular routes above, instead of a bare <loc>. */
  for (const { enFile, esFile } of newsPairs) {
    const locEn = `${SITE_URL}/${enFile}`;
    const locEs = `${SITE_URL}/${esFile}`;
    for (const loc of [locEn, locEs]) {
      urls.push(
        `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>\n    <xhtml:link rel="alternate" hreflang="es" href="${locEs}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>\n    <lastmod>${today}</lastmod>\n    <priority>0.6</priority>\n  </url>`
      );
    }
  }

  writeFileSync(
    join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
  );
  writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

/* ------------------------------------------------------------ llms.txt -- */

function buildLlmsTxt() {
  const lines = [
    "# National League Official Academies",
    "",
    "> A youth soccer league in the United States for the official academies of Liga MX and MLS clubs, run in partnership with Wame Sports.",
    "",
    "## Facts",
    "- Categories: U17, U15, U13, U11 (Sub 17, Sub 15, Sub 13, Sub 11)",
    "- Season start: February 2027",
    "- Website: " + SITE_URL + "/",
    "- Languages: English (default) and Spanish (" + SITE_URL + "/es/)",
    "",
    "## How to join",
    "- Teams/academies register at: " + SITE_CONFIG.forms.teams,
    "- Players register (guardian required for minors) at: " + SITE_CONFIG.forms.players,
    "- Full details: " + SITE_URL + "/join.html",
    "",
    "## Technology partner",
    "Wame Sports provides analytics tools, match video, and player profiles for the league. Details: " + SITE_URL + "/wame.html",
    "",
    SITE_CONFIG.email ? "## Contact\n" + SITE_CONFIG.email : "",
  ].filter(Boolean);
  writeFileSync(join(ROOT, "llms.txt"), lines.join("\n") + "\n");
}

function buildManifest() {
  const manifest = {
    name: "National League Official Academies",
    short_name: "National League",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1f4b",
    theme_color: "#0b1f4b",
    icons: [
      { src: "/assets/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/images/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  writeFileSync(join(ROOT, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
}

/* --------------------------------------------------------------- 404 ---- */

function build404() {
  const siteRelPath = "404.html";
  const t = makeT("en");
  const pagePath = makeAbsolutePagePath(); // see renderDocument's comment: 404 can be served at any URL depth
  const bodyHtml = `
<section class="page-hero">
  <div class="page-hero-gradient"></div>
  <div class="wrap">
    <h1>This page took a wrong turn. / Esta página tomó un camino equivocado.</h1>
    <p class="lead">The page you're looking for doesn't exist, or has moved.<br>La página que buscas no existe, o fue movida.</p>
  </div>
</section>
<div class="wrap page-actions page-actions-row">
  <a class="back-home" href="${pagePath("index", "en")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Back to home</a>
  <a class="back-home" href="${pagePath("index", "es")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Volver al inicio</a>
</div>`;

  const html = renderDocument({
    lang: "en",
    slug: "404",
    currentSiteRel: siteRelPath,
    title: "Page not found | National League Official Academies",
    description: "The page you're looking for doesn't exist, or has moved.",
    bodyHtml,
    bodyAttrs: "",
    scripts: [],
  }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex, follow">');

  writeRoute(siteRelPath, html);
}

/* ------------------------------------------------------------- pages ---- */

async function buildPages(recentPosts) {
  const pagesDir = join(ROOT, "scripts", "pages");
  ensureDir(pagesDir);
  for (const route of ROUTES) {
    const modPath = join(pagesDir, `${route.slug}.mjs`);
    if (!existsSync(modPath)) {
      console.warn(`skip "${route.slug}" — no scripts/pages/${route.slug}.mjs yet`);
      continue;
    }
    const mod = await import(`./pages/${route.slug}.mjs?update=${Date.now()}`);
    for (const lang of ["en", "es"]) {
      const siteRelPath = routeFile(route.slug, lang);
      const t = makeT(lang);
      const pagePath = makePagePath(siteRelPath);
      const meta = translations[lang].pages?.[route.slug];
      const { bodyHtml, extraHead, jsonLd, scripts } = await mod.render({
        lang,
        t,
        pagePath,
        config: SITE_CONFIG,
        recentPosts: recentPosts.filter((p) => !p.sample || true).slice(0, 3),
      });
      const html = renderDocument({
        lang,
        slug: route.slug,
        currentSiteRel: siteRelPath,
        title: meta?.title || `${route.slug} | National League Official Academies`,
        description: meta?.description || "",
        bodyHtml,
        extraHead,
        jsonLd,
        scripts,
      });
      writeRoute(siteRelPath, html);
    }
  }
}

async function run() {
  const posts = buildNews();
  buildDocuments();
  await buildPages(posts);
  build404();

  for (const post of posts) {
    writeRoute(`news/${post.slug_en}.html`, renderNewsPostPage(post, "en"));
    writeRoute(`es/news/${post.slug_es}.html`, renderNewsPostPage(post, "es"));
  }

  buildSitemapAndRobots(posts.map((p) => ({ enFile: `news/${p.slug_en}.html`, esFile: `es/news/${p.slug_es}.html` })));
  buildLlmsTxt();
  buildManifest();

  console.log(`Built ${ROUTES.length} routes x 2 languages, ${posts.length} news post(s).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
