/* Prepares the images for a news post from a source file in _source-assets/
   (run it on your computer, not on Vercel: it needs sharp, a dev dependency):

     node scripts/process-news-images.mjs

   For each entry in NEWS_IMAGES it writes, into assets/images/news/:
     <out>.jpg / .webp          full banner, max 1600px wide (post page, desktop)
     <out>-800.jpg / .webp      800px wide (news cards, tablets)
     <out>-mobile.jpg / .webp   optional close crop for phones, so the text
                                baked into a wide banner stays readable
   The post page picks these up automatically when they exist; a post whose
   image was uploaded straight to assets/images/news/ (no variants) still
   works, it just ships the single file.

   For each entry in CRESTS it cuts a round crest out of a banner onto a
   transparent background, into assets/images/clubs/<out>.png / .webp, for
   the welcome wall on the News page. */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "_source-assets");
const NEWS = join(ROOT, "assets", "images", "news");
const CLUBS = join(ROOT, "assets", "images", "clubs");

const NEWS_IMAGES = [
  {
    src: "welcome-nido-aguila-hesperia.jpg",
    out: "welcome-nido-aguila-hesperia",
    /* "¡WELCOME!", both crests and the academy name; leaves out the QR code
       and the web address, which are too small to use on a phone anyway */
    mobileCrop: { left: 440, top: 50, width: 720, height: 690 },
  },
];

const CRESTS = [
  {
    src: "welcome-nido-aguila-hesperia.jpg",
    out: "nido-aguila-hesperia",
    /* the round Nido Hesperia crest on the left of the banner */
    circle: { cx: 595, cy: 417, r: 154 },
  },
];

async function jpgWebp(pipeline, base) {
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(base + ".jpg");
  await pipeline.clone().webp({ quality: 80 }).toFile(base + ".webp");
  const { width, height } = await pipeline.clone().jpeg().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  console.log(`${base.slice(ROOT.length + 1)}.{jpg,webp}  ${width}x${height}`);
}

async function run() {
  for (const { src, out, mobileCrop } of NEWS_IMAGES) {
    const file = join(SRC, src);
    await jpgWebp(sharp(file).resize({ width: 1600, withoutEnlargement: true }), join(NEWS, out));
    await jpgWebp(sharp(file).resize({ width: 800, withoutEnlargement: true }), join(NEWS, `${out}-800`));
    if (mobileCrop) await jpgWebp(sharp(file).extract(mobileCrop), join(NEWS, `${out}-mobile`));
  }

  for (const { src, out, circle } of CRESTS) {
    const { cx, cy, r } = circle;
    const size = r * 2 + 2;
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r - 0.5}" fill="#fff"/></svg>`
    );
    const cut = await sharp(join(SRC, src))
      .extract({ left: cx - r - 1, top: cy - r - 1, width: size, height: size })
      .ensureAlpha()
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer();
    await sharp(cut).png({ compressionLevel: 9 }).toFile(join(CLUBS, `${out}.png`));
    await sharp(cut).webp({ quality: 88 }).toFile(join(CLUBS, `${out}.webp`));
    console.log(`assets/images/clubs/${out}.{png,webp}  ${size}x${size}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
