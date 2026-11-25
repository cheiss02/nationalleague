/* The welcome wall, shared by the News page and the homepage. */

import { ballButtonInner } from "./ssg.mjs";

function attr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function crestHtml(team, pagePath, size, loading) {
  if (!team.team_crest) {
    const initials = team.team.split(/\s+/).map((w) => w[0]).join("").slice(0, 3);
    return `<span class="welcome-monogram" aria-hidden="true">${initials}</span>`;
  }
  const src = (f) => pagePath.asset("assets/images/clubs/" + f);
  const webp = team.team_crest_webp ? `<source srcset="${src(team.team_crest_webp)}" type="image/webp">` : "";
  return `<picture>${webp}<img src="${src(team.team_crest)}" alt="" width="${size}" height="${size}" loading="${loading}"></picture>`;
}

/* The welcome wall: every academy with a welcome post (category
   "bienvenida" plus a "team" field), newest in the spotlight, then the
   open spot that invites the next academy, then everyone else.
   js/welcome-wall.js runs the entrance and the "give them a welcome" kick.
   tone "alt" sits on the light-gray section background (News page);
   "plain" on white (homepage, between the pillars and the gray sections). */
export function renderWelcomeWall({ t, pagePath, lang, posts, tone = "alt" }) {
  const teams = posts.filter((p) => p.category === "bienvenida" && p.team);
  if (!teams.length) return "";
  const w = t("news.welcome");
  const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const postHref = (p) => pagePath.asset(lang === "es" ? `es/news/${p.slug_es}.html` : `news/${p.slug_en}.html`);
  const joined = (p) => w.joined.replace("DATE", `<time datetime="${p.date}">${fmt.format(new Date(p.date + "T00:00:00"))}</time>`);
  const [star, ...rest] = teams;
  const note = star[`team_note_${lang}`];

  const roster = rest.length
    ? `<div class="welcome-roster">
        <h3>${w.rosterTitle}</h3>
        <ul>${rest
          .map(
            (p) => `<li><a href="${postHref(p)}">${crestHtml(p, pagePath, 56, "lazy")}<span><span class="welcome-roster-name">${p.team}</span><span class="welcome-roster-date">${joined(p)}</span></span></a></li>`
          )
          .join("")}</ul>
      </div>`
    : "";

  return `
<section class="section welcome-wall${tone === "alt" ? " section-alt" : " is-plain"}" aria-labelledby="welcome-wall-title" data-welcome-wall>
  <div class="wrap">
    <header class="section-head">
      <h2 id="welcome-wall-title">${w.title}</h2>
      <p class="lead">${w.lead}</p>
    </header>
    <div class="welcome-board">
      <article class="welcome-spotlight">
        <div class="welcome-pitch" aria-hidden="true">
          <picture>
            <source srcset="${pagePath.asset("assets/images/hero/hero-pitch.webp")}" type="image/webp">
            <img src="${pagePath.asset("assets/images/hero/hero-pitch.jpg")}" alt="" width="1440" height="468" loading="lazy">
          </picture>
        </div>
        <div class="welcome-stage" data-welcome-stage>
          <span class="welcome-slash" aria-hidden="true"></span>
          <div class="welcome-crest">${crestHtml(star, pagePath, 310, "eager")}</div>
          <div class="welcome-confetti" aria-hidden="true"></div>
        </div>
        <div class="welcome-copy">
          <h3>${star.team}</h3>
          <p class="welcome-meta">${note ? `${note}<br>` : ""}${joined(star)}</p>
          <div class="welcome-actions">
            <button type="button" class="btn" data-welcome-cheer data-cheer-message="${attr(w.cheerMessage.replace("TEAM", star.team))}">${ballButtonInner(w.cheer, w.cheerGoal)}</button>
          </div>
          <p class="visually-hidden" aria-live="polite" data-welcome-live></p>
        </div>
      </article>
      <aside class="welcome-next">
        <svg class="welcome-next-shield" viewBox="0 0 64 72" aria-hidden="true">
          <path class="welcome-next-outline" d="M32 3 58 11v22c0 17-11 29-26 36C17 62 6 50 6 33V11Z"/>
          <path class="welcome-next-plus" d="M32 25v22M21 36h22"/>
        </svg>
        <h3>${w.nextTitle}</h3>
        <a class="btn" href="${pagePath("join", lang)}#teams">${ballButtonInner(w.nextCta)}</a>
      </aside>
    </div>
    ${roster}
  </div>
</section>`;
}
