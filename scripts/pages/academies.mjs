import { renderPageHero, visibleClubs } from "../lib/ssg.mjs";

function clubCard(club, lang, pagePath, t) {
  let crest;
  if (club.showCrest) {
    const ext = club.ext === "svg" ? "svg" : "png";
    const alt = lang === "es" ? `Escudo de ${club.name}` : `${club.name} crest`;
    crest = `<div class="club-card-crest"><img src="${pagePath.asset(`assets/images/clubs/${club.slug}.${ext}`)}" alt="${alt}" loading="lazy" width="120" height="120"></div>`;
  } else {
    crest = `<div class="club-card-crest is-text-chip">${club.name}</div>`;
  }
  const leagueLabel = t(club.league === "liga-mx" ? "academies.ligaMxLabel" : "academies.mlsLabel");
  return `<li class="club-card">${crest}<p class="club-card-name">${club.name}</p><p class="club-card-league">${leagueLabel}</p></li>`;
}

function renderMain({ t, pagePath, lang }) {
  const clubs = visibleClubs();
  const cards = clubs.map((c) => clubCard(c, lang, pagePath, t)).join("");

  return `
${renderPageHero({ t, eyebrow: t("academies.eyebrow"), title: t("academies.title"), lead: t("academies.lead") })}

<div class="wrap back-top-bar">
  <a class="back-home-top" href="${pagePath("index", lang)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>${t("common.backHome")}</a>
</div>

<section class="section">
  <div class="wrap">
    <ul class="club-grid">${cards}</ul>
    <p class="fine-print">${t("academies.note")}</p>
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
      { "@type": "ListItem", position: 2, name: t("nav.academies"), item: pagePath.abs("academies", lang) },
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: [] };
}
