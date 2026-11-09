import { renderMarquee, ballButtonInner, keyDateEvents, SITE_URL } from "../lib/ssg.mjs";

function renderMain({ lang, t, pagePath, config, recentPosts = [] }) {
  const heroJpg = pagePath.asset("assets/images/hero/hero-pitch.jpg");
  const heroWebp = pagePath.asset("assets/images/hero/hero-pitch.webp");
  const sloganLines = t("hero.title")
    .split(/(?<=\.)\s+/)
    .map((line) => `<span>${line}</span>`)
    .join(" ");

  const categories = t("hero.categories")
    .map((c) => `<li class="category-chip">${c}</li>`)
    .join("");

  const pillars = t("home.pillars")
    .map((p) => `<li class="pillar"><div class="pillar-inner"><h3>${p.title}</h3><p>${p.body}</p></div></li>`)
    .join("");

  const exploreTargets = ["about", "academies", "wame", "news", "documents", "join"];
  const exploreItems = t("home.exploreItems")
    .map(
      (item, i) =>
        `<li><a class="explore-card" href="${pagePath(exploreTargets[i], lang)}"><h3>${item.title}</h3><p>${item.text}</p></a></li>`
    )
    .join("");

  const newsCards = recentPosts
    .map((post) => {
      const title = post[`title_${lang}`] || post.title_en;
      const excerpt = post[`excerpt_${lang}`] || post.excerpt_en;
      const dateStr = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(
        new Date(post.date + "T00:00:00")
      );
      const img = post.image
        ? `<div class="news-card-media"><img src="${pagePath.asset("assets/images/news/" + post.image)}" alt="${post[`image_alt_${lang}`] || ""}" loading="lazy" width="640" height="400"></div>`
        : "";
      const href = lang === "es" ? pagePath.asset(`es/news/${post.slug_es}.html`) : pagePath.asset(`news/${post.slug_en}.html`);
      return `<li><a class="news-card" href="${href}">${img}<div class="news-card-body"><span class="news-card-date">${dateStr}</span><h3>${title}</h3><p class="news-card-excerpt">${excerpt}</p>${post.sample ? `<span class="news-sample-tag">${t("news.sample")}</span>` : ""}</div></a></li>`;
    })
    .join("");

  return `
${renderMarquee({ lang, pagePath, t })}

<section class="hero" aria-label="${t("meta.siteName")}">
  <div class="hero-media">
    <picture>
      <source srcset="${heroWebp}" type="image/webp">
      <img src="${heroJpg}" alt="" width="1440" height="468" loading="eager">
    </picture>
  </div>
  <div class="hero-shade"></div>
  <div class="wrap hero-grid">
  <div class="hero-content">
    <h1 class="hero-strap"><span>${t("hero.h1")}</span></h1>
    <p class="hero-title">${sloganLines}</p>
    <p class="lead">${t("hero.body")}</p>
    <div class="hero-badge-row">
      <a class="btn btn-lg" href="${pagePath("join", lang)}">${ballButtonInner(t("hero.cta"))}</a>
      <div class="date-badge">
        <span class="date-badge-line1">${t("hero.badgeLine1")}</span>
        <span class="date-badge-line2">${t("hero.badgeLine2")}</span>
      </div>
      <ul class="category-chips">${categories}</ul>
    </div>
  </div>
  <img class="hero-crest" src="${pagePath.asset("assets/images/brand/nl-crest.png")}" alt="" width="582" height="640">
  </div>
</section>

<section class="pillars">
  <div class="wrap">
    <h2>${t("home.commitmentHeading")}</h2>
  </div>
  <ul class="pillars-row">${pillars}</ul>
</section>

<section class="section section-alt">
  <div class="wrap split">
    <div class="split-media split-media-logo">
      <img src="${pagePath.asset("assets/images/partners/wame-sports-light.png")}" alt="Wame Sports" loading="lazy" width="560" height="138">
    </div>
    <div class="split-copy">
      <h2>${t("home.wameTitle")}</h2>
      <p>${t("home.wameText")}</p>
      <a class="inline-link" href="${pagePath("wame", lang)}">${t("home.wameCta")}</a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("home.exploreTitle")}</h2>
    </header>
    <ul class="explore-grid">${exploreItems}</ul>
  </div>
</section>

${
  newsCards
    ? `<section class="section">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("home.newsTitle")}</h2>
    </header>
    <ul class="news-grid">${newsCards}</ul>
  </div>
</section>`
    : ""
}

<section class="band band-cta">
  <div class="wrap band-content">
    <h2>${t("home.ctaTitle")}</h2>
    <p class="lead">${t("home.ctaBody")}</p>
    <div class="band-cta-row">
      <a class="btn btn-lg" href="${pagePath("join", lang)}#teams">${ballButtonInner(t("home.registerTeam"))}</a>
      <a class="btn btn-lg" href="${pagePath("join", lang)}#players">${ballButtonInner(t("home.registerPlayer"))}</a>
    </div>
  </div>
</section>
`;
}

export function render(ctx) {
  const { lang, config, pagePath } = ctx;
  const sameAs = Object.values(config.social).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "National League Official Academies",
        alternateName: "NL Official Academies",
        url: `${SITE_URL}/`,
        logo: pagePath.absPath("assets/images/brand/nl-crest.png"),
        sport: "Soccer",
        areaServed: "US",
        knowsLanguage: ["es", "en"],
        ...(sameAs.length ? { sameAs } : {}),
        ...(config.email ? { email: config.email } : {}),
        ...(config.phone ? { telephone: config.phone } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "National League Official Academies",
        inLanguage: lang === "es" ? "es" : "en",
      },
      ...keyDateEvents(lang),
    ],
  };

  return {
    bodyHtml: renderMain(ctx),
    jsonLd,
    scripts: ["js/logo-marquee.js"],
  };
}
