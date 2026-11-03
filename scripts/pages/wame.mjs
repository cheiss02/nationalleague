import { renderPageHero } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const features = t("wame.features")
    .map(
      (f, i) =>
        `<li class="feature-card"><span class="feature-num">0${i + 1}</span><h3>${f.title}</h3><p>${f.body}</p></li>`
    )
    .join("");

  return `
${renderPageHero({ t, eyebrow: t("wame.eyebrow"), title: t("wame.title"), lead: t("wame.lead") })}

<div class="wrap back-top-bar">
  <a class="back-home-top" href="${pagePath("index", lang)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>${t("common.backHome")}</a>
</div>

<section class="section">
  <div class="wrap split">
    <div class="split-media split-media-logo">
      <img src="${pagePath.asset("assets/images/partners/wame-sports-dark.png")}" alt="Wame Sports" loading="lazy" width="560" height="138">
    </div>
    <div class="split-copy">
      <p>${t("wame.introText")}</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <ul class="card-grid">${features}</ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="callout">${t("wame.noteTitle")}</div>
    <p class="lead lead-wide">${t("wame.noteText")}</p>
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
