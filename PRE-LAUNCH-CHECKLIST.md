# Pre-launch checklist

## 1. Club and partner logo permission — confirm first

The site currently shows all 8 club crests and the Wame Sports logo (in the marquee, on the Academies page, and in the footer trademark line). **Written permission for every club crest and the Wame logo has not yet been confirmed.** Until it is:

- The footer and Terms & Conditions currently read "...are used with permission" — that line is only accurate once permission is actually confirmed.
- If a club's permission doesn't come through, add that club's slug to `hiddenClubLogos` in `js/site-config.js` (or set `logos.clubs: false` to hide all of them) and rebuild — the crest is dropped from the published site, the sitemap, the JSON-LD, and the share image, and that club shows as a text-only chip instead. See the README's "Hiding or showing a club's logo" section.
- The crest/logo files themselves were cut out of the league's promotional flyer and are lower resolution than official brand files — replace them with official files (same filename) once available. See `assets/images/README.md`.

## 2. Legal pages — attorney review

Every page under **Legal** in the footer (Privacy Policy, Terms & Conditions, Cookie Policy, Refund Policy, Accessibility) currently shows a draft banner: *"Draft: have an attorney review before publishing."* Have an attorney review all five, then remove the banner (`renderLegalPage` in `scripts/lib/ssg.mjs`) and set each page's effective date (`EFFECTIVE_DATE` constant at the top of each `scripts/pages/*-policy.mjs` / `terms-conditions.mjs` / `accessibility.mjs` file).

## 3. Legal entity name and address

Search the codebase for `[TODO: legal entity name]` and `[TODO: mailing address]` (they appear as highlighted `<mark>` text on the Privacy Policy and Terms & Conditions pages) and fill them in. They currently appear in:
- `scripts/pages/privacy-policy.mjs`
- `scripts/pages/terms-conditions.mjs`

## 4. Registration fees and refund terms

The Refund Policy page is a complete template with every number and deadline marked as a visible fill-in: `[REGISTRATION FEE]`, `[REFUND DEADLINE]`, `[PARTIAL-REFUND WINDOW]`, `[HOW TO REQUEST A REFUND]`, `[REFUND PROCESSING TIME]`. Fill these in in `scripts/pages/refund-policy.mjs` (both the English and Spanish sections) once the league decides on amounts and windows. No prices appear anywhere else on the site until this page is complete.

## 5. Contact info and social links

`js/site-config.js` has empty `email`, `phone`, and `social` fields — each is hidden automatically on the live site until filled in. Add them, then run `node scripts/build-site.mjs` to propagate them into the footer, Contact page, JSON-LD, and `llms.txt`.

## 6. Google Forms — data minimization and consent questions

See `FORMS-CHECKLIST.md` for the exact fields and consent checkboxes to add inside both Google Forms before launch. The website's own consent checkboxes are a gate to opening the form, not the legal record of consent — that record has to live in the form itself.

## 7. Domain and hosting

- Confirm `CNAME` (`nationalleagueusa.com`) matches the actual GoDaddy DNS setup (see README's DNS section).
- In GitHub → Settings → Pages, set the custom domain and turn on **Enforce HTTPS** once the certificate issues.
- After launch, submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools (see README).

## 8. Final build + smoke test

After all of the above, run `node scripts/build-site.mjs` once more, spot-check a few pages in both languages, and confirm no `[TODO:` or `mark.todo` content remains that should have been filled in.
