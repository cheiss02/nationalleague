# Forms checklist

> **No longer used by the site.** The website now has its own forms (see `REGISTRATION-FORM-SETUP.md`), and its fields come from `scripts/pages/join.mjs` and `scripts/pages/contact.mjs`. This list is kept only as a record of the data-minimization rules behind those fields.

The website links to two Google Forms rather than embedding them (see the Cookie Policy for why). The website's consent checkboxes are a **gate to opening the form**, not the legal record — the real consent record has to come from inside the Google Form itself. Make these changes directly in both forms before launch.

## Teams / Academies form

**Fields to collect — nothing more:**
- Academy name
- Affiliated club (Liga MX or MLS — a dropdown of the participating clubs is cleanest)
- City / State
- Categories entering (U17 / U15 / U13 / U11 — checkboxes, multi-select)
- Contact person: name, role, email, phone

**Add these questions at the end, all required unless noted:**
1. "I have read and accept the Privacy Policy and Terms & Conditions." — checkbox, required. Link both policies in the question text.
2. "May we contact you about registration by phone as well as email?" — optional, only if you want this.

## Players form

**Fields to collect — nothing more:**
- Player's full name
- Player's birth year (not full date of birth — a year is enough to place a player in a category; only ask for a full date of birth if the league's rules require verifying age, and if so, say why in the form)
- Current academy/club
- Position
- Guardian's full name, email, phone

**Do not collect:** home address, SSN or any government ID number, school name, medical information, immigration status, or photos/videos at sign-up.

**Add these questions at the end, all required unless noted:**
1. "I have read and accept the Privacy Policy and Terms & Conditions." — checkbox, required.
2. "I am the player's parent, mother, father, or legal guardian, or the player is 18 or older." — checkbox, required. This is the COPPA-relevant confirmation — a parent/guardian must be the one submitting for any player under 18.
3. "I consent to National League Official Academies and Wame Sports using the player's photo/video in league media and player profiles." — checkbox, **optional, left unchecked by default, and clearly separate from the two required boxes above.** Registration must work with this box left unchecked.

## Google Forms settings (both forms)

- **Turn off "Collect email addresses."** The guardian/contact's email is already a form field — collecting it a second time via Google's own setting duplicates data for no reason and makes the privacy notice less accurate.
- **Limit who can access the response sheet** to league staff who actually need it.
- **Set a deletion reminder** — e.g., 24 months after the season ends, matching the retention period stated in the Privacy Policy. Google Forms doesn't auto-delete; this has to be a manual process or calendar reminder.
- Leave **"Restrict to users in your organization"** off — families filling these out won't have an organizational Google account.

## Why this matters

The site's Privacy Policy and the Join page's "notice at collection" both describe exactly this field list and these consent questions. If the live Google Forms end up asking for more than this (or missing the consent questions), the site's privacy promises will be inaccurate — update one, update both.
