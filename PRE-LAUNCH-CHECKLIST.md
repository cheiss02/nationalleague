# Pre-launch checklist

## 1. Club and partner logo permission — done

Written permission for 7 of the 8 club crests and the Wame Sports logo **has been confirmed by the client.** The footer and Terms & Conditions no longer assert "...are used with permission" at all — that claim was removed site-wide rather than kept in sync per club.

- **Club América** now shows its official academy crest ("Nido Águila") instead of the first-team crest, supplied by the client (`_source-assets/club-america-nido-aguila.jpg`, processed by `processCrestFromWhiteBg()` in `scripts/process-assets.mjs`). It's unhidden (`hiddenClubLogos` is empty in `js/site-config.js`) and shows normally everywhere.
- The social-share image (`nl-share.jpg`) intentionally always uses the crest-free `banner-national-league.jpg` now rather than the old `banner-convocatoria.jpg` group photo, because that photo still has Club América's old first-team crest baked into its pixels and can't be selectively updated. If/when the client provides a new group photo with the current crest set, `process-assets.mjs`'s share-image logic can go back to using a real banner photo.
- The other crest/logo files (everything but Club América) were still cut out of the league's promotional flyer and are lower resolution than official brand files — replace them with official files (same filename) once available. See `assets/images/README.md`.
- **Still pending, not yet actionable:** the client mentioned (1) adding an "Academias Invitadas" (guest academies) section/concept to the Academies page, and (2) per-club venue/location info once each confirmed club's field is known. Neither has concrete content yet — the client said more clubs will be confirmed "next week" — so nothing was added; revisit once there's an actual list of guest academies and/or venues to publish.

## 2. Legal pages — attorney review

Every page under **Legal** in the footer (Privacy Policy, Terms & Conditions, Cookie Policy, Refund Policy, Accessibility) currently shows a draft banner: *"Draft: have an attorney review before publishing."* Have an attorney review all five, then remove the banner (`renderLegalPage` in `scripts/lib/ssg.mjs`) and set each page's effective date (`EFFECTIVE_DATE` constant at the top of each `scripts/pages/*-policy.mjs` / `terms-conditions.mjs` / `accessibility.mjs` file).

## 3. Legal entity name and address — address done, entity name still pending

The mailing address is filled in (`2884 Marie Dr, Riverside, CA 92509`, in `scripts/pages/privacy-policy.mjs`). The **legal entity name is still a `[TODO:` placeholder** in both `scripts/pages/privacy-policy.mjs` and `scripts/pages/terms-conditions.mjs` — the client said the league itself isn't formally registered/trademarked yet (Wame Sports, their tech partner, is already legally constituted as WAAKAT, SL; the league is still working on its own registration), and specifically asked not to put anything not yet confirmed. Fill in `ENTITY` in both files once that's done.

## 4. Registration fees and refund terms — model confirmed, amounts still pending

The client confirmed the model: **fees are never published publicly on the site.** Once a team's or player's registration form is submitted and they meet the league's eligibility requirements, the fee is communicated to them directly. The Join page, About FAQ, and Refund Policy's "Registration fees" section all reflect this now.

Still outstanding — the actual numbers, still marked as visible fill-ins on the Refund Policy page: `[REFUND DEADLINE]`, `[PARTIAL-REFUND WINDOW]`, `[HOW TO REQUEST A REFUND]`, `[REFUND PROCESSING TIME]`. Fill these in in `scripts/pages/refund-policy.mjs` (both languages) once the league decides on the refund window and process.

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
