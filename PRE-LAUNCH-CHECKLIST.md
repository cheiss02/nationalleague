# Pre-launch checklist

## 1. Club and partner logo permission — done

Written permission for 7 of the 8 club crests and the Wame Sports logo **has been confirmed by the client.** The footer and Terms & Conditions no longer assert "...are used with permission" at all — that claim was removed site-wide rather than kept in sync per club.

- **Club América** now shows its official academy crest ("Nido Águila") instead of the first-team crest, supplied by the client (`_source-assets/club-america-nido-aguila.jpg`, processed by `processCrestFromWhiteBg()` in `scripts/process-assets.mjs`). It's unhidden (`hiddenClubLogos` is empty in `js/site-config.js`) and shows normally everywhere.
- The social-share image (`nl-share.jpg`) intentionally always uses the crest-free `banner-national-league.jpg` now rather than the old `banner-convocatoria.jpg` group photo, because that photo still has Club América's old first-team crest baked into its pixels and can't be selectively updated. If/when the client provides a new group photo with the current crest set, `process-assets.mjs`'s share-image logic can go back to using a real banner photo.
- The other crest/logo files (everything but Club América) were still cut out of the league's promotional flyer and are lower resolution than official brand files — replace them with official files (same filename) once available. See `assets/images/README.md`.
- **Still pending, not yet actionable:** the client mentioned (1) adding an "Academias Invitadas" (guest academies) section/concept to the Academies page, and (2) per-club venue/location info once each confirmed club's field is known. Neither has concrete content yet — the client said more clubs will be confirmed "next week" — so nothing was added; revisit once there's an actual list of guest academies and/or venues to publish.

## 2. Legal pages — done

The client confirmed their lawyer has reviewed the legal pages, so the draft banner is gone. Effective date is January 1, 2027 on all five legal pages (`EFFECTIVE_DATE` at the top of each file, one value per language).

## 3. Legal entity name and address — done

`ENTITY` is "National League USA" and `ADDRESS` is "2884 Marie Dr, Riverside, CA 92509", in both `scripts/pages/privacy-policy.mjs` and `scripts/pages/terms-conditions.mjs`. (Earlier the client said the league's own registration/trademark was still in progress — worth double-checking with them that "National League USA" is the name they want on legal pages specifically, as opposed to just a working/brand name, since trademark registration being separate from "has a legal name to operate under" is a nuance an attorney should confirm during the item 2 review.)

## 4. Registration fees and refund terms — done

The client confirmed the model: **fees are never published publicly on the site.** Once a team's or player's registration form is submitted and they meet the league's eligibility requirements, the fee is communicated to them directly. The Join page, About FAQ, and Refund Policy's "Registration fees" section all reflect this now.

Refunds follow the same model: the client confirmed all refunds and prices are handled in person at enrollment, including cancelled or postponed seasons, tournaments and matches. The Refund Policy publishes no deadlines, amounts or cancellation promises.

## 5. Contact info and social links — done

`js/site-config.js` now has the league's email, phone, Instagram, and Facebook (TikTok/YouTube/X left empty, so those icons stay hidden). They're live in the footer, Contact page, JSON-LD, and `llms.txt` on every rebuild.

## 6. Google Forms — done (client confirmed)

See `FORMS-CHECKLIST.md` for the exact fields and consent checkboxes to add inside both Google Forms before launch. The website's own consent checkboxes are a gate to opening the form, not the legal record of consent — that record has to live in the form itself.

## 7. Domain and hosting

- Confirm `CNAME` (`nationalleagueusa.com`) matches the actual GoDaddy DNS setup (see README's DNS section).
- In GitHub → Settings → Pages, set the custom domain and turn on **Enforce HTTPS** once the certificate issues.
- After launch, submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools (see README).

## 8. Final build + smoke test

After all of the above, run `node scripts/build-site.mjs` once more, spot-check a few pages in both languages, and confirm no `[TODO:` or `mark.todo` content remains that should have been filled in.
