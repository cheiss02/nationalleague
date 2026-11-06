# Pre-launch checklist

## 1. Club and partner logo permission

Written permission for 7 of the 8 club crests and the Wame Sports logo **has been confirmed by the client.** The footer and Terms & Conditions no longer assert "...are used with permission," though — that claim was removed site-wide (see the commit that did it) rather than left in place, so there's nothing left to keep in sync here if a club's permission status changes later.

- **Club América is the exception.** Its logo-use permission is still unconfirmed, so its slug (`club-america`) has been added to `hiddenClubLogos` in `js/site-config.js`. It now shows as a text-only chip (same size/position as a crest) in the homepage marquee and on the Academies page, in both languages, and is excluded from the sitemap and JSON-LD.
- **To re-enable it** once permission comes through: remove `"club-america"` from `hiddenClubLogos` in `js/site-config.js`, run `node scripts/build-site.mjs` to rebuild every page, then run `node scripts/process-assets.mjs` (needs `sharp`: `npm install --no-save sharp` if it's not already installed) to regenerate `assets/images/brand/nl-share.jpg` with the full 8-crest banner again.
- Hiding a crest this way does **not** delete the file — `assets/images/clubs/club-america.*`, `_source-assets/banner-convocatoria.jpg`, and `assets/images/hero/hero-convocatoria.*` all still contain the crest and remain reachable by anyone who has or guesses the direct URL. That's expected and fine while permission is pending (nothing links to them), but delete those files yourself if Club América's permission is denied outright rather than just pending.
- The crest/logo files themselves were cut out of the league's promotional flyer and are lower resolution than official brand files — replace them with official files (same filename) once available, Club América included if/when it's re-enabled. See `assets/images/README.md`.

## 2. Legal pages — attorney review

Every page under **Legal** in the footer (Privacy Policy, Terms & Conditions, Cookie Policy, Refund Policy, Accessibility) currently shows a draft banner: *"Draft: have an attorney review before publishing."* Have an attorney review all five, then remove the banner (`renderLegalPage` in `scripts/lib/ssg.mjs`) and set each page's effective date (`EFFECTIVE_DATE` constant at the top of each `scripts/pages/*-policy.mjs` / `terms-conditions.mjs` / `accessibility.mjs` file).

## 3. Legal entity name and address

Search the codebase for `[TODO: legal entity name]` and `[TODO: mailing address]` (they appear as highlighted `<mark>` text on the Privacy Policy and Terms & Conditions pages) and fill them in. They currently appear in:
- `scripts/pages/privacy-policy.mjs`
- `scripts/pages/terms-conditions.mjs`

## 4. Registration fees and refund terms

The Refund Policy page is a complete template with every number and deadline marked as a visible fill-in: `[REGISTRATION FEE]`, `[REFUND DEADLINE]`, `[PARTIAL-REFUND WINDOW]`, `[HOW TO REQUEST A REFUND]`, `[REFUND PROCESSING TIME]`. Fill these in in `scripts/pages/refund-policy.mjs` (both the English and Spanish sections) once the league decides on amounts and windows. No prices appear anywhere else on the site until this page is complete.

## 5. Contact info and social links — done

`js/site-config.js` now has the league's email, phone, Instagram, and Facebook (TikTok/YouTube/X left empty, so those icons stay hidden). They're live in the footer, Contact page, JSON-LD, and `llms.txt` on every rebuild.

## 6. Google Forms — data minimization and consent questions

See `FORMS-CHECKLIST.md` for the exact fields and consent checkboxes to add inside both Google Forms before launch. The website's own consent checkboxes are a gate to opening the form, not the legal record of consent — that record has to live in the form itself.

## 7. Domain and hosting

- Confirm `CNAME` (`nationalleagueusa.com`) matches the actual GoDaddy DNS setup (see README's DNS section).
- In GitHub → Settings → Pages, set the custom domain and turn on **Enforce HTTPS** once the certificate issues.
- After launch, submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools (see README).

## 8. Final build + smoke test

After all of the above, run `node scripts/build-site.mjs` once more, spot-check a few pages in both languages, and confirm no `[TODO:` or `mark.todo` content remains that should have been filled in.
