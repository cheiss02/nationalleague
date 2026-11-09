import { renderPageHero, keyDateEvents } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const filters = t("news.filters");
  const filterBtns = Object.entries(filters)
    .map(
      ([key, label], i) =>
        `<button type="button" class="news-filter" data-news-filter="${key}" aria-pressed="${i === 0 ? "true" : "false"}">${label}</button>`
    )
    .join("");

  return `
${renderPageHero({ title: t("news.title"), lead: t("news.lead") })}

<section class="section">
  <div class="wrap">
    <div class="key-dates" data-key-dates data-lang="${lang}" data-src="${pagePath.asset("content/key-dates.json")}">
      <h2>${t("news.keyDatesTitle")}</h2>
      <ul class="key-dates-list" data-key-dates-list></ul>
    </div>

    <div class="news-filters">${filterBtns}</div>

    <div
      data-news-list
      data-lang="${lang}"
      data-src="${pagePath.asset("content/news.json")}"
      data-asset-base="${pagePath.base()}"
      data-detail-base="${pagePath.asset(lang === "es" ? "es/news/" : "news/")}"
      data-sample-label="${t("news.sample")}"
    >
      <ul class="news-grid" data-news-grid></ul>
      <p class="news-empty" data-news-empty hidden>${t("news.empty")}</p>
    </div>
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
          { "@type": "ListItem", position: 2, name: t("nav.news"), item: pagePath.abs("news", lang) },
        ],
      },
      ...keyDateEvents(lang),
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: ["js/news.js"] };
}
