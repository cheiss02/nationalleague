/* Pre-launch QA pass over the already-built static site (run
   node scripts/build-site.mjs first). Checks every page under the site
   root, es/, news/, and es/news/ for:
     - exactly one <h1> and a site-wide-unique <title>
     - a canonical tag equal to the page's own URL
     - hreflang en/es/x-default present, pointing to files that exist,
       and reciprocal (the EN and ES pages of a pair agree on both URLs)
     - every JSON-LD <script> block parses as valid JSON
     - no internal .html link (in an <a href>) points to a missing file
     - no page references the crest file of a club listed in
       SITE_CONFIG.hiddenClubLogos

   Exits 1 and prints every issue found; exits 0 and prints a one-line
   summary when the site is clean.

   Run: node scripts/verify-site.mjs */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONFIG } from "../js/site-config.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = SITE_CONFIG.siteUrl.replace(/\/$/, "");

function listHtmlFiles() {
  const dirs = [".", "es", "news", "es/news"];
  const files = [];
  for (const d of dirs) {
    const full = join(ROOT, d);
    if (!existsSync(full)) continue;
    for (const name of readdirSync(full)) {
      if (!name.endsWith(".html")) continue;
      files.push(d === "." ? name : `${d}/${name}`);
    }
  }
  return files;
}

function siteRelFromUrl(url) {
  if (!url.startsWith(SITE_URL)) return null;
  let rel = url.slice(SITE_URL.length).replace(/^\/+/, "");
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  return rel;
}

function expectedCanonicalFor(relPath) {
  if (relPath === "index.html") return `${SITE_URL}/`;
  if (relPath === "es/index.html") return `${SITE_URL}/es/`;
  return `${SITE_URL}/${relPath}`;
}

const files = listHtmlFiles();
const fileSet = new Set(files);
const errors = [];
const warn = (msg) => errors.push(msg);

const titleMap = new Map(); // title -> [relPath]
const pageData = new Map(); // relPath -> { hreflang: {en,es,"x-default"} }

for (const relPath of files) {
  const html = readFileSync(join(ROOT, relPath), "utf8");

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) warn(`${relPath}: expected exactly one <h1>, found ${h1Count}`);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  if (!titleMatch) {
    warn(`${relPath}: missing <title>`);
  } else {
    const title = titleMatch[1];
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(relPath);
  }

  const canMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
  const expected = expectedCanonicalFor(relPath);
  if (!canMatch) warn(`${relPath}: missing canonical link`);
  else if (canMatch[1] !== expected) warn(`${relPath}: canonical is "${canMatch[1]}", expected "${expected}"`);

  const hreflang = {};
  const hreflangRe = /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g;
  let m;
  while ((m = hreflangRe.exec(html))) hreflang[m[1]] = m[2];
  for (const key of ["en", "es", "x-default"]) {
    if (!hreflang[key]) {
      warn(`${relPath}: missing hreflang="${key}"`);
      continue;
    }
    const target = siteRelFromUrl(hreflang[key]);
    if (!target || !fileSet.has(target)) warn(`${relPath}: hreflang="${key}" points to a missing file (${hreflang[key]})`);
  }
  pageData.set(relPath, { hreflang });

  const ldRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  while ((m = ldRe.exec(html))) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      warn(`${relPath}: invalid JSON-LD — ${e.message}`);
    }
  }

  const linkRe = /<a[^>]+href="([^"]+\.html[^"]*)"/g;
  while ((m = linkRe.exec(html))) {
    const href = m[1].split("#")[0].split("?")[0];
    if (!href) continue;
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith(SITE_URL)) continue; // external, out of scope
      const rel = siteRelFromUrl(href);
      if (!rel || !fileSet.has(rel)) warn(`${relPath}: link to missing file (${href})`);
      continue;
    }
    const dir = posix.dirname(relPath);
    const resolved = posix.normalize(posix.join(dir === "." ? "" : dir, href)).replace(/^\/+/, "");
    if (!fileSet.has(resolved)) warn(`${relPath}: link to missing file (${href} -> ${resolved})`);
  }

  for (const slug of SITE_CONFIG.hiddenClubLogos) {
    if (html.includes(slug)) warn(`${relPath}: references "${slug}" (should be hidden — it's in hiddenClubLogos)`);
  }
}

for (const [title, list] of titleMap) {
  if (list.length > 1) warn(`Duplicate <title> "${title}" on: ${list.join(", ")}`);
}

/* reciprocal hreflang pairs: the EN file and ES file of a pair must be the
   only two pages claiming that exact (en-url, es-url) combination */
const pairGroups = new Map();
for (const [relPath, { hreflang }] of pageData) {
  if (relPath === "404.html") continue; // single bilingual file, no real ES mirror
  if (!hreflang.en || !hreflang.es) continue;
  const key = `${hreflang.en}|${hreflang.es}`;
  if (!pairGroups.has(key)) pairGroups.set(key, new Set());
  pairGroups.get(key).add(relPath);
}
for (const [key, set] of pairGroups) {
  const [enUrl, esUrl] = key.split("|");
  const enRel = siteRelFromUrl(enUrl);
  const esRel = siteRelFromUrl(esUrl);
  const ok = set.size === 2 && enRel && esRel && set.has(enRel) && set.has(esRel);
  if (!ok) warn(`hreflang pair (${enUrl} , ${esUrl}) not reciprocal — claimed by: ${[...set].join(", ") || "(nobody)"}`);
}

if (errors.length) {
  console.error(`${errors.length} issue(s) found across ${files.length} pages:\n`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
} else {
  console.log(`OK — ${files.length} pages checked, no issues found.`);
}
