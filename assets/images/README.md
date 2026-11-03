# Images

| Folder | What's inside |
|---|---|
| `brand/` | `nl-crest.png` (+ `.webp`): the National League crest, transparent background. `nl-crest-light.png` (+ `.webp`): a dark-background variant — the navy shield fill is keyed to transparent so the white outline, lettering, and stripes stay crisp on dark sections. `icon-32/192/512.png`, `apple-touch-icon.png`: the favicon set. `nl-share.jpg`: the 1200×630 social share image. |
| `clubs/` | One crest per participating club, named after the club's slug (see `js/site-config.js`). Transparent PNG, except `atlas.svg` which is a real vector file. |
| `partners/` | `wame-sports-dark.png` (navy text, for light backgrounds) and `wame-sports-light.png` (white text, for dark backgrounds). |
| `hero/` | Hero background photos, processed as WebP + JPG pairs. |
| `news/` | One image per news post, named after the post's slug — referenced from the post's front matter (`image:` field), not auto-discovered. |

Naming rule: lowercase, words joined with hyphens, named after what the image shows.

## Regenerating processed assets

`scripts/process-assets.mjs` is the pipeline that produced everything in `brand/`, `clubs/`, `partners/`, and `hero/` from the raw files in `_source-assets/`. Run it again after replacing a source file:

```
node scripts/process-assets.mjs
```

It trims each crest to its real bounding box, caps club crests at 480px and the main crest at 640px, builds the favicon set and share image, and writes a WebP sibling next to every PNG/JPG. It prints `scripts/asset-manifest.json` with the final width/height of everything it wrote — use those for `<img width height>` attributes.

**Before launch:** the club crests and the Wame logo were cut out of the league's promotional flyer, so they're lower resolution than an official brand file would be. Replace each one with the official file from the club (same file name) once logo permission is confirmed — see `PRE-LAUNCH-CHECKLIST.md`.
