/* One-time / re-run-as-needed asset pipeline. Takes the raw files a human
   dropped into _source-assets/ and assets/images/**, and produces the
   optimized, correctly-sized files the site actually ships:
     - club crests trimmed to their real bounding box and capped at a
       sane max size, PNG + WebP
     - the NL crest, cleaned up, plus a flat-white "light" silhouette for
       dark backgrounds
     - the favicon set (ico/32/192/512/apple-touch) from the crest
     - a 1200x630 social share image from the convocatoria banner
     - hero backgrounds (WebP + JPG fallback, max width 1920)
     - the Wame partner lockups, trimmed + resized

   Run once after dropping new source art in:  node scripts/process-assets.mjs
   Prints a JSON summary of final width/height for every file it writes, so
   that can be pasted into <img width height> attributes without re-measuring. */

import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = join(ROOT, "assets", "images");
const SRC = join(ROOT, "_source-assets");

const summary = {};

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

/* Find the real bounding box of non-transparent pixels so crests cropped
   out of a flyer (lots of empty margin) end up tightly framed. */
async function alphaBBox(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * channels + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { left: 0, top: 0, width, height };
  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.02);
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const right = Math.min(width, maxX + pad + 1);
  const bottom = Math.min(height, maxY + pad + 1);
  return { left, top, width: right - left, height: bottom - top };
}

async function writePngWebp(pipeline, outBasePath, label) {
  const png = pipeline.clone().png({ compressionLevel: 9, quality: 92 });
  const webp = pipeline.clone().webp({ quality: 88 });
  const meta = await png.metadata();
  await png.toFile(outBasePath + ".png");
  await webp.toFile(outBasePath + ".webp");
  summary[label] = { width: meta.width, height: meta.height, files: [outBasePath + ".png", outBasePath + ".webp"] };
}

async function processCrest(file, maxDim, outBase, label) {
  const bbox = await alphaBBox(file);
  const buffer = await sharp(file)
    .extract(bbox)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();
  await writePngWebp(sharp(buffer), outBase, label);
}

/* Same trim-and-cap treatment as processCrest(), but for a source with a
   flat white background instead of real alpha (e.g. a JPEG export) — keys
   near-white pixels out to transparent first, then trims/resizes exactly
   like the other crests so the output matches them. */
async function processCrestFromWhiteBg(file, maxDim, outBase, label) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const keyed = Buffer.from(data);
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 244 && g > 244 && b > 244) keyed[i + 3] = 0;
  }
  const keyedBuffer = await sharp(keyed, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
  await processCrest(keyedBuffer, maxDim, outBase, label);
}

async function run() {
  /* ---- club crests: trim to content, cap at 480px on the long edge ----
     Club América uses its official academy crest ("Nido Águila"), supplied
     as a white-background JPEG, not the flyer-cutout treatment the other
     seven get — see processCrestFromWhiteBg(). */
  const clubsDir = join(IMAGES, "clubs");
  const flyerCutoutClubs = ["chivas-guadalajara", "la-galaxy", "lafc", "monterrey", "san-jose-earthquakes", "tijuana"];
  for (const slug of flyerCutoutClubs) {
    await processCrest(join(clubsDir, `${slug}.png`), 480, join(clubsDir, slug), `clubs/${slug}`);
  }
  await processCrestFromWhiteBg(join(SRC, "club-america-nido-aguila.jpg"), 480, join(clubsDir, "club-america"), "clubs/club-america");

  /* atlas is a real SVG — just report its intrinsic size, nothing to raster */
  const atlasSvg = readFileSync(join(clubsDir, "atlas.svg"), "utf8");
  const vb = atlasSvg.match(/viewBox="[\d.\s-]*\s([\d.]+)\s+([\d.]+)"/);
  summary["clubs/atlas"] = { width: vb ? Math.round(+vb[1]) : 512, height: vb ? Math.round(+vb[2]) : 512, files: [join(clubsDir, "atlas.svg")] };

  /* ---- NL crest: trim, cap at 640px, plus a flat-white silhouette ---- */
  const brandDir = join(IMAGES, "brand");
  const crestBBox = await alphaBBox(join(brandDir, "nl-crest.png"));
  const crestPipeline = sharp(join(brandDir, "nl-crest.png")).extract(crestBBox).resize({
    width: 640, height: 640, fit: "inside", withoutEnlargement: true,
  });
  const crestBuffer = await crestPipeline.clone().png().toBuffer();
  await writePngWebp(sharp(crestBuffer), join(brandDir, "nl-crest"), "brand/nl-crest");

  /* "Light" dark-background variant: key the navy shield fill out to
     transparency (color-distance match against the navy palette, sampled
     from the source art) so the white outline, "NL" lettering, stars,
     stripes and ball stay crisp against a dark page background, instead of
     collapsing into a flat silhouette blob. */
  const { data: crestRaw, info: crestInfo } = await sharp(crestBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const keyed = Buffer.from(crestRaw);
  for (let i = 0; i < crestRaw.length; i += crestInfo.channels) {
    const r = crestRaw[i], g = crestRaw[i + 1], b = crestRaw[i + 2], a = crestRaw[i + 3];
    if (a < 10) continue;
    const isNavy = r < 80 && g < 110 && b < 140 && b - r > 5;
    if (isNavy) keyed[i + 3] = 0;
  }
  const keyedBuffer = await sharp(keyed, { raw: { width: crestInfo.width, height: crestInfo.height, channels: crestInfo.channels } })
    .png()
    .toBuffer();
  await writePngWebp(sharp(keyedBuffer), join(brandDir, "nl-crest-light"), "brand/nl-crest-light");

  /* ---- favicons, from the trimmed crest ---- */
  const sizes = [32, 192, 512];
  for (const size of sizes) {
    await sharp(crestBuffer)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(brandDir, `icon-${size}.png`));
  }
  summary["brand/favicons"] = { files: sizes.map((s) => join(brandDir, `icon-${s}.png`)) };

  /* apple-touch-icon needs an opaque background (iOS ignores alpha) */
  const appleBg = { r: 11, g: 31, b: 75 }; // --color-primary
  await sharp({ create: { width: 180, height: 180, channels: 4, background: { ...appleBg, alpha: 1 } } })
    .composite([{ input: await sharp(crestBuffer).resize(148, 148, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(), gravity: "center" }])
    .png()
    .toFile(join(brandDir, "apple-touch-icon.png"));

  /* favicon.ico — modern ICO container with one embedded 32x32 PNG payload */
  const png32 = await sharp(crestBuffer).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type: icon
  icoHeader.writeUInt16LE(1, 4); // 1 image
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0); // width
  dirEntry.writeUInt8(32, 1); // height
  dirEntry.writeUInt8(0, 2); // palette
  dirEntry.writeUInt8(0, 3); // reserved
  dirEntry.writeUInt16LE(1, 4); // color planes
  dirEntry.writeUInt16LE(32, 6); // bits per pixel
  dirEntry.writeUInt32LE(png32.length, 8); // data size
  dirEntry.writeUInt32LE(22, 12); // data offset (6 header + 16 dir entry)
  writeFileSync(join(IMAGES, "..", "favicon.ico"), Buffer.concat([icoHeader, dirEntry, png32]));
  writeFileSync(join(ROOT, "favicon.ico"), Buffer.concat([icoHeader, dirEntry, png32]));
  summary["favicon.ico"] = { width: 32, height: 32, files: [join(ROOT, "favicon.ico")] };

  /* ---- Wame partner lockups: trim, cap width at 560px ---- */
  const partnersDir = join(IMAGES, "partners");
  for (const variant of ["wame-sports-dark", "wame-sports-light"]) {
    const src = join(partnersDir, `${variant}.png`);
    const bbox = await alphaBBox(src);
    const buffer = await sharp(src)
      .extract(bbox)
      .resize({ width: 560, fit: "inside", withoutEnlargement: true })
      .png()
      .toBuffer();
    await writePngWebp(sharp(buffer), join(partnersDir, variant), `partners/${variant}`);
  }

  /* ---- hero backgrounds: max width 1920, WebP + JPG ---- */
  const heroDir = join(IMAGES, "hero");
  ensureDir(heroDir);
  const heroSources = [
    { src: join(SRC, "banner-national-league.jpg"), out: "hero-national-league" },
    { src: join(SRC, "banner-convocatoria.jpg"), out: "hero-convocatoria" },
  ];
  for (const { src, out } of heroSources) {
    const pipeline = sharp(src).resize({ width: 1920, withoutEnlargement: true });
    const jpg = pipeline.clone().jpeg({ quality: 82, mozjpeg: true });
    const webp = pipeline.clone().webp({ quality: 80 });
    const meta = await jpg.metadata();
    await jpg.toFile(join(heroDir, `${out}.jpg`));
    await webp.toFile(join(heroDir, `${out}.webp`));
    summary[`hero/${out}`] = { width: meta.width, height: meta.height, files: [join(heroDir, `${out}.jpg`), join(heroDir, `${out}.webp`)] };
  }

  /* ---- 1200x630 social share image ----
     The convocatoria banner carries the crest + wordmark + the 8 club
     crests baked into its pixels as a flat photo — so unlike the live
     marquee/academies grid, SITE_CONFIG.logos.clubs/hiddenClubLogos can't
     selectively add/remove one club from it, and it can't be updated to
     reflect Club América's crest now being the "Nido Águila" academy badge
     instead of the first-team crest it still shows. Until someone produces
     an updated group photo with the current crest set, always use the
     national-league banner instead, which has no club crests in it at all
     (also the right fallback whenever any club crest is hidden via
     clubs:false or hiddenClubLogos, so a hidden/unconfirmed club never
     appears in link previews either). */
  const shareSrc = join(SRC, "banner-national-league.jpg");
  const shareMeta = await sharp(shareSrc).metadata();
  const srcRatio = shareMeta.width / shareMeta.height;
  const targetRatio = 1200 / 630;
  let resizeOpts;
  if (srcRatio > targetRatio) {
    resizeOpts = { height: 630 };
  } else {
    resizeOpts = { width: 1200 };
  }
  await sharp(shareSrc)
    .resize({ ...resizeOpts, withoutEnlargement: false })
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(join(brandDir, "nl-share.jpg"));
  summary["brand/nl-share"] = { width: 1200, height: 630, files: [join(brandDir, "nl-share.jpg")] };

  writeFileSync(join(ROOT, "scripts", "asset-manifest.json"), JSON.stringify(summary, null, 2) + "\n");
  console.log(JSON.stringify(summary, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
