/* Shared markup for the on-site forms (Join page registrations and the
   Contact page message form). js/registration-form.js validates every form
   built here and sends it to FormSubmit (SITE_CONFIG.forms.endpoint), which
   emails it to the league. See REGISTRATION-FORM-SETUP.md. */

import { ballButtonInner, FORM_ENDPOINT } from "./ssg.mjs";

/* placeholder swapped for the translated "(optional)" in renderForm */
const OPTIONAL = "(OPTIONAL)";

export function attr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function optionalTag(required) {
  return required ? "" : ` <span class="field-optional">${OPTIONAL}</span>`;
}

export function input({ form, name, label, type = "text", autocomplete = "off", list = "", wide = false, maxlength = 120, required = true }) {
  const id = `${form}-${name}`;
  return `<div class="form-field${wide ? " is-wide" : ""}">
    <label for="${id}">${label}${optionalTag(required)}</label>
    <input id="${id}" name="${name}" type="${type}"${required ? " required" : ""} maxlength="${maxlength}" autocomplete="${autocomplete}"${list ? ` list="${list}"` : ""} aria-describedby="${id}-error">
    <p class="field-error" id="${id}-error" hidden></p>
  </div>`;
}

export function textarea({ form, name, label, required = true, maxlength = 1000, rows = 3 }) {
  const id = `${form}-${name}`;
  return `<div class="form-field is-wide">
    <label for="${id}">${label}${optionalTag(required)}</label>
    <textarea id="${id}" name="${name}" rows="${rows}"${required ? " required" : ""} maxlength="${maxlength}" aria-describedby="${id}-error"></textarea>
    <p class="field-error" id="${id}-error" hidden></p>
  </div>`;
}

export function radios({ form, name, label, options }) {
  const id = `${form}-${name}`;
  const items = options
    .map(([value, text], i) => `<label class="form-radio"><input type="radio" name="${name}" value="${attr(value)}"${i === 0 ? ` id="${id}"` : ""} required aria-describedby="${id}-error"> ${text}</label>`)
    .join("");
  return `<fieldset class="form-field is-wide form-radios">
    <legend>${label}</legend>
    <div class="form-radio-row">${items}</div>
    <p class="field-error" id="${id}-error" hidden></p>
  </fieldset>`;
}

export function select({ form, name, label, options, choose, wide = false }) {
  const id = `${form}-${name}`;
  const opts = options.map(([value, text]) => `<option value="${attr(value)}">${text}</option>`).join("");
  return `<div class="form-field${wide ? " is-wide" : ""}">
    <label for="${id}">${label}</label>
    <select id="${id}" name="${name}" required aria-describedby="${id}-error"><option value="">${choose}</option>${opts}</select>
    <p class="field-error" id="${id}-error" hidden></p>
  </div>`;
}

export function checkbox({ form, name, label, missing = "", required = true }) {
  const id = `${form}-${name}`;
  return `<div class="consent-field form-check">
    <input type="checkbox" id="${id}" name="${name}"${required ? ` required data-missing="${attr(missing)}"` : ""} aria-describedby="${id}-error">
    <label for="${id}">${label}${optionalTag(required)}</label>
  </div>
  <p class="field-error" id="${id}-error" hidden></p>`;
}

/* The <form> itself plus its thank-you panel.
   msgs: the shared messages (t("join.form")), optionally overridden per form
   (e.g. the contact form says "message" where registrations say
   "registration"). */
export function renderForm({ kind, lang, msgs, email, fields = [], checks = [], submitLabel, successTitle, successBody, mailSubject }) {
  const failed = msgs.failed.replace(/EMAIL/g, `<a href="mailto:${email}">${email}</a>`);
  const optional = (html) => html.split(OPTIONAL).join(`(${msgs.optional})`);

  return `<form class="reg-form" data-registration="${kind}" data-lang="${lang}" data-endpoint="${attr(FORM_ENDPOINT)}" novalidate
    data-msg-required="${attr(msgs.required)}" data-msg-select="${attr(msgs.requiredSelect)}" data-msg-email="${attr(msgs.email)}" data-msg-phone="${attr(msgs.phone)}" data-msg-fix="${attr(msgs.fix)}" data-msg-sending="${attr(msgs.sending)}" data-msg-failed="${attr(failed)}"
    data-subject="${attr(mailSubject)}" data-msg-yes="${attr(msgs.yes)}" data-msg-no="${attr(msgs.no)}">
    <p class="form-hint">${msgs.allRequired}</p>
    <div class="form-grid">${optional(fields.join(""))}</div>
    ${checks.length ? `<div class="form-checks">${optional(checks.join(""))}</div>` : ""}
    <div class="hp-field" aria-hidden="true"><label for="${kind}-honey">${msgs.website}</label><input id="${kind}-honey" name="_honey" type="text" tabindex="-1" autocomplete="off"></div>
    <button type="submit" class="btn">${ballButtonInner(submitLabel)}</button>
    <p class="form-status" data-form-status aria-live="polite"></p>
  </form>
  <div class="form-success" data-form-success tabindex="-1" hidden>
    <h3>${successTitle}</h3>
    <p>${successBody}</p>
  </div>`;
}
