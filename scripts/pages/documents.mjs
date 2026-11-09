import { renderPageHero } from "../lib/ssg.mjs";

function renderMain({ t, pagePath, lang }) {
  const categories = t("documents.categories");
  const categoryLabels = Object.entries(categories)
    .map(([key, label]) => `<span hidden data-doc-category-label="${key}">${label}</span>`)
    .join("");

  return `
${renderPageHero({ title: t("documents.title"), lead: t("documents.lead") })}

<section class="section">
  <div class="wrap" data-documents data-lang="${lang}" data-src="${pagePath.asset("assets/documents/documents.json")}" data-asset-base="${pagePath.base()}" data-coming-soon="${t("documents.comingSoon")}">
    ${categoryLabels}
    <label class="doc-search" for="doc-search-input">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input type="search" id="doc-search-input" data-doc-search placeholder="${t("documents.searchPlaceholder")}">
    </label>
    <div data-doc-groups></div>
    <p class="doc-empty" data-doc-empty hidden>${t("documents.empty")}</p>
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
      { "@type": "ListItem", position: 2, name: t("nav.documents"), item: pagePath.abs("documents", lang) },
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: ["js/documents.js"] };
}
