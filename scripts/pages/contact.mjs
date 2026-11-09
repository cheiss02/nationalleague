import { renderPageHero, SOCIAL_ICONS } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang, config }) {
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

  const cardsHtml = cards.length ? cards.join("") : `<p class="fine-print">${t("contact.noneYet")}</p>`;

  return `
${renderPageHero({ title: t("contact.title"), lead: t("contact.lead") })}

<section class="section">
  <div class="wrap">
    <div class="contact-grid">${cardsHtml}</div>
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
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: [] };
}
