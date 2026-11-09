import { renderPageHero } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const features = t("wame.features")
    .map(
      (f) =>
        `<li class="feature-card"><h3>${f.title}</h3><p>${f.body}</p></li>`
    )
    .join("");

  return `
${renderPageHero({ title: t("wame.title"), lead: t("wame.lead") })}

<section class="section">
  <div class="wrap split">
    <div class="split-media split-media-logo">
      <img src="${pagePath.asset("assets/images/partners/wame-sports-light.png")}" alt="Wame Sports" loading="lazy" width="560" height="138">
    </div>
    <div class="split-copy">
      <p>${t("wame.introText")}</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("wame.featuresTitle")}</h2>
    </header>
    <ul class="card-grid">${features}</ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>${t("wame.noteTitle")}</h2>
    <p class="lead">${t("wame.noteText")}</p>
    <a class="inline-link" href="${pagePath("join", lang)}">${t("wame.cta")}</a>
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
      { "@type": "ListItem", position: 2, name: t("nav.wame"), item: pagePath.abs("wame", lang) },
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: [] };
}
