import { renderPageHero, SITE_URL } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const howItems = t("about.howItems")
    .map((item) => `<li class="feature-card"><h3>${item.title}</h3><p>${item.body}</p></li>`)
    .join("");

  const categoryYears = t("about.categoryYears")
    .map((c) => `<li><span class="cat-code">${c.code}</span><span class="cat-years">${c.years}</span></li>`)
    .join("");

  const faqItems = t("about.faqItems")
    .map(
      (item) =>
        `<details class="faq-item"><summary>${item.q}</summary><div class="faq-answer"><p>${item.a}</p></div></details>`
    )
    .join("");

  return `
${renderPageHero({ title: t("about.title"), lead: t("about.lead") })}

<section class="section">
  <div class="wrap editorial">
    <div>
      <h2>${t("about.whoEyebrow")}</h2>
      <p class="statement">${t("about.whoTitle")}</p>
    </div>
    <div class="prose">
      <p>${t("about.whoP1")}</p>
      <p>${t("about.whoP2")}</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap editorial">
    <div>
      <h2>${t("about.identityEyebrow")}</h2>
      <p class="statement">${t("about.identityTitle")}</p>
    </div>
    <div class="prose">
      <p>${t("about.identityP1")}</p>
      <p>${t("about.identityP2")}</p>
      <p>${t("about.identityP3")}</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap duo">
    <div>
      <h2>${t("about.missionEyebrow")}</h2>
      <p class="statement">${t("about.missionTitle")}</p>
      <p>${t("about.missionP1")}</p>
      <p>${t("about.missionP2")}</p>
    </div>
    <div>
      <h2>${t("about.visionEyebrow")}</h2>
      <p class="statement">${t("about.visionTitle")}</p>
      <p>${t("about.visionP1")}</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("about.howEyebrow")}</h2>
      <p class="statement">${t("about.howTitle")}</p>
    </header>
    <ol class="card-grid">${howItems}</ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("about.categoriesEyebrow")}</h2>
      <p class="statement">${t("about.categoriesTitle")}</p>
    </header>
    <p class="prose">${t("about.categoriesText")}</p>
    <ul class="cat-board">${categoryYears}</ul>
    <p class="prose">${t("about.categoriesP2")}</p>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap editorial">
    <div>
      <h2>${t("about.techEyebrow")}</h2>
      <p class="statement">${t("about.techTitle")}</p>
    </div>
    <div class="prose">
      <p>${t("about.techText")}</p>
      <a class="inline-link" href="${pagePath("wame", lang)}">${t("about.techCta")}</a>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap band-content">
    <h2>${t("about.commitmentEyebrow")}</h2>
    <p class="statement statement-ondark">${t("about.commitmentTitle")}</p>
    <p class="lead lead-after">${t("about.commitmentP1")}</p>
    <p class="band-closing">${t("about.commitmentClosing")}</p>
  </div>
</section>

<section class="section" id="faq">
  <div class="wrap">
    <header class="section-head">
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
