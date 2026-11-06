import { renderMarquee, ballButtonInner, keyDateEvents, SITE_URL } from "../lib/ssg.mjs";

function renderMain({ lang, t, pagePath, config, recentPosts = [] }) {
  const heroJpg = pagePath.asset("assets/images/hero/hero-national-league.jpg");
  const heroWebp = pagePath.asset("assets/images/hero/hero-national-league.webp");
  const heroAlt =
    lang === "es"
      ? "Estadio al anochecer con la bandera de Estados Unidos y el escudo de la National League"
      : "A stadium at night with the American flag and the National League crest";

  const categories = t("hero.categories")
    .map((c) => `<li class="category-chip">${c}</li>`)
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
      return `<li><a class="news-card" href="${href}">${img}<div class="news-card-body"><span class="news-card-date">${dateStr}</span><h3>${title}</h3><p class="news-card-excerpt">${excerpt}</p></div></a></li>`;
    })
    .join("");

  return `
${renderMarquee({ lang, pagePath, t })}

<section class="hero" aria-label="${t("meta.siteName")}">
  <div class="hero-media">
    <picture>
      <source srcset="${heroWebp}" type="image/webp">
      <img src="${heroJpg}" alt="${heroAlt}" width="1440" height="827" loading="eager" fetchpriority="high">
    </picture>
  </div>
  <div class="hero-shade"></div>
  <div class="wrap hero-content">
    <h1 class="eyebrow eyebrow-ondark eyebrow-center">${t("hero.h1")}</h1>
    <p class="hero-title">${t("hero.title")}</p>
    <p class="lead">${t("hero.body")}</p>
    <div class="hero-badge-row">
      <a class="btn btn-lg" href="${pagePath("join", lang)}">${ballButtonInner(t("hero.cta"))}</a>
      <div class="date-badge">
        <span class="date-badge-line1">${t("hero.badgeLine1")}</span>
        <span class="date-badge-line2">${t("hero.badgeLine2")}</span>
      </div>
    </div>
    <ul class="category-chips">${categories}</ul>
  </div>
</section>

<section class="section home-intro">
  <div class="wrap">
    <div class="home-intro-inner">
      <p class="eyebrow eyebrow-center">${t("home.introEyebrow")}</p>
      <h2>${t("home.introTitle")}</h2>
      <p>${t("home.introText")}</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap split">
    <div class="split-media split-media-logo">
      <img src="${pagePath.asset("assets/images/partners/wame-sports-dark.png")}" alt="Wame Sports" loading="lazy" width="400" height="98">
    </div>
    <div class="split-copy">
      <p class="eyebrow">${t("home.wameEyebrow")}</p>
      <h2>${t("home.wameTitle")}</h2>
      <p>${t("home.wameText")}</p>
      <a class="inline-link" href="${pagePath("wame", lang)}">${t("home.wameCta")}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="callout">${t("home.commitmentText")}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <header class="section-head section-head-center">
      <p class="eyebrow eyebrow-center">${t("home.exploreEyebrow")}</p>
      <h2>${t("home.exploreTitle")}</h2>
    </header>
    <ul class="explore-grid">${exploreItems}</ul>
  </div>
</section>

${
  newsCards
    ? `<section class="section">
  <div class="wrap">
    <header class="section-head section-head-center">
      <p class="eyebrow eyebrow-center">${t("home.newsEyebrow")}</p>
      <h2>${t("home.newsTitle")}</h2>
    </header>
    <ul class="news-grid">${newsCards}</ul>
  </div>
</section>`
    : ""
}

<section class="band band-cta">
  <div class="band-shade"></div>
  <div class="wrap band-content">
    <p class="eyebrow eyebrow-ondark eyebrow-center">${t("home.ctaEyebrow")}</p>
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
