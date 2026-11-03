import { renderPageHero, SITE_URL } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const howItems = t("about.howItems")
    .map(
      (item, i) =>
        `<li class="feature-card"><span class="feature-num">0${i + 1}</span><h3>${item.title}</h3><p>${item.body}</p></li>`
    )
    .join("");

  const faqItems = t("about.faqItems")
    .map(
      (item) =>
        `<details class="faq-item"><summary>${item.q}</summary><div class="faq-answer"><p>${item.a}</p></div></details>`
    )
    .join("");

  return `
${renderPageHero({ t, eyebrow: t("about.eyebrow"), title: t("about.title"), lead: t("about.lead") })}

<div class="wrap back-top-bar">
  <a class="back-home-top" href="${pagePath("index", lang)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>${t("common.backHome")}</a>
</div>

<section class="section">
  <div class="wrap split">
    <div class="split-copy">
      <p class="eyebrow">${t("about.missionEyebrow")}</p>
      <h2>${t("about.missionTitle")}</h2>
      <p>${t("about.missionP1")}</p>
      <p>${t("about.missionP2")}</p>
    </div>
    <div class="split-media split-media-logo split-media-logo-crest">
      <img src="${pagePath.asset("assets/images/brand/nl-crest.png")}" alt="" loading="lazy" width="582" height="640">
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="callout">${t("about.visionTitle")}</div>
    <p class="lead lead-wide">${t("about.visionP1")}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="section-head section-head-center">
      <p class="eyebrow eyebrow-center">${t("about.howEyebrow")}</p>
      <h2>${t("about.howTitle")}</h2>
    </header>
    <ol class="card-grid">${howItems}</ol>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <header class="section-head section-head-center">
      <p class="eyebrow eyebrow-center">${t("about.categoriesEyebrow")}</p>
      <h2>${t("about.categoriesTitle")}</h2>
    </header>
    <p class="lead lead-center">${t("about.categoriesText")}</p>
  </div>
</section>

<section class="section" id="faq">
  <div class="wrap">
    <header class="section-head section-head-center">
      <p class="eyebrow eyebrow-center">${t("about.faqEyebrow")}</p>
      <h2>${t("about.faqTitle")}</h2>
    </header>
    <div class="faq-list">${faqItems}</div>
  </div>
</section>
`;
}

export function render(ctx) {
  const { t, pagePath, lang } = ctx;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: pagePath.abs("index", lang) },
          { "@type": "ListItem", position: 2, name: t("nav.about"), item: pagePath.abs("about", lang) },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: t("about.faqItems").map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return { bodyHtml: renderMain(ctx), jsonLd, scripts: [] };
}
