import { renderPageHero, SOCIAL_ICONS } from "../lib/ssg.mjs";
import { input, textarea, renderForm } from "../lib/forms.mjs";

function contactCards({ t, config }) {
  const cards = [];
  if (config.email) {
    cards.push(`<div class="contact-card"><h2>${t("contact.emailTitle")}</h2><a href="mailto:${config.email}">${config.email}</a></div>`);
  }
  if (config.phone) {
    cards.push(`<div class="contact-card"><h2>${t("contact.phoneTitle")}</h2><a href="tel:${config.phone.replace(/[^+\d]/g, "")}">${config.phone}</a></div>`);
  }
  const socials = Object.entries(config.social).filter(([, url]) => url);
  if (socials.length) {
    const links = socials
      .map(([key, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${SOCIAL_ICONS[key] || ""}<span>${key}</span></a></li>`)
      .join("");
    cards.push(`<div class="contact-card"><h2>${t("contact.socialTitle")}</h2><ul class="social">${links}</ul></div>`);
  }
  return cards.length ? cards.join("") : `<p class="fine-print">${t("contact.noneYet")}</p>`;
}

/* message form; see REGISTRATION-FORM-SETUP.md for how it sends */
function messageForm({ t, lang, pagePath, config }) {
  const c = t("contact.form");
  const msgs = { ...t("join.form"), sending: c.sending, failed: c.failed };
  const kind = "contact";
  const notice = c.notice.replace(/PRIVACY_HREF/g, pagePath("privacy-policy", lang));
  const fields = [
    input({ form: kind, name: "name", label: c.name, autocomplete: "name", wide: true }),
    input({ form: kind, name: "email", label: c.email, type: "email", autocomplete: "email", maxlength: 254 }),
    input({ form: kind, name: "phone", label: c.phone, type: "tel", autocomplete: "tel", maxlength: 30, required: false }),
    textarea({ form: kind, name: "message", label: c.message, maxlength: 2000, rows: 6 }),
  ];
  return `
<div class="join-card contact-form-card">
  <h2>${c.title}</h2>
  <div class="privacy-notice">${notice}</div>
  <noscript><p class="consent-error is-visible">${c.noJs.replace(/EMAIL/g, `<a href="mailto:${config.email}">${config.email}</a>`)}</p></noscript>
  ${renderForm({ kind, lang, msgs, email: config.email, fields, submitLabel: c.submit, successTitle: c.successTitle, successBody: c.successBody, mailSubject: c.mailSubject })}
</div>`;
}

function renderMain(ctx) {
  const { t, pagePath, lang } = ctx;
  const cards = contactCards(ctx);

  return `
${renderPageHero({ title: t("contact.title"), lead: t("contact.lead") })}

<section class="section">
  <div class="wrap contact-layout">
    ${messageForm(ctx)}
    <div class="contact-grid is-stacked">${cards}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <h2>${t("contact.joinTitle")}</h2>
    <p class="lead">${t("contact.joinText")}</p>
    <a class="inline-link" href="${pagePath("join", lang)}">${t("contact.joinCta")}</a>
  </div>
</section>
`;
}

export function render(ctx) {
  const { t, pagePath, lang } = ctx;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: pagePath.abs("index", lang) },
      { "@type": "ListItem", position: 2, name: t("nav.contact"), item: pagePath.abs("contact", lang) },
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: ["js/registration-form.js"] };
}
