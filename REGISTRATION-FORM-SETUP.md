# Website forms setup

The Join page has its own Teams and Players forms, and the Contact page has a message form. They send in the background to [FormSubmit](https://formsubmit.co), a free form-to-email service, which emails each submission to `info@nationalleagueusa.com`. The visitor never leaves the page and their email app never opens.

The address is set in `js/site-config.js` as `forms.endpoint`.

## One-time activation (do this right after the site goes live)

FormSubmit won't deliver anything to a new address until that inbox confirms it.

1. On the live site, send one test message from the Contact page form.
2. Open the `info@nationalleagueusa.com` inbox. FormSubmit sends an email with an **Activate Form** button. Click it. (The test message itself may not arrive. That's expected.)
3. Send one test from each form: Teams, Players, and Contact. Check that all three emails arrive.

Until step 2 is done, visitors who press Send see the "couldn't send" message with the league's email address, so do it as soon as the site is live.

## Good to know

- **Replying:** each email's Reply-To is the person's own email, so pressing Reply answers them directly.
- **Hiding the address (optional):** after activation, FormSubmit can give you a random string to use instead of the email address. Replace the address in `forms.endpoint` with it (`https://formsubmit.co/ajax/<random-string>`) and rebuild. Spam bots then can't read the address from the page code.
- **Where submissions live:** only in the info@ inbox. There's no spreadsheet copy. The Privacy Policy says registrations are kept up to 24 months after the season ends, so delete older ones from the inbox after that.
- **Spam:** each form has a hidden trap field that only bots fill in. Anything that fills it is dropped before sending.
- **Privacy Policy:** it names FormSubmit and links to [FormSubmit's privacy policy](https://formsubmit.co/privacy.pdf). The lawyer should see that wording.
- **Changing a question:** update `scripts/pages/join.mjs` or `scripts/pages/contact.mjs` (the field) and `js/i18n.js` (its label in both languages), then rebuild. The email always uses the questions exactly as they appear on the page.
