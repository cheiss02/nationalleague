import { renderPageHero, ballButtonInner } from "../lib/ssg.mjs";

function withHrefs(html, privacyHref, termsHref) {
  return html.replace(/PRIVACY_HREF/g, privacyHref).replace(/TERMS_HREF/g, termsHref);
}

function renderMain({ t, pagePath, lang, config }) {
  const privacyHref = pagePath("privacy-policy", lang);
  const termsHref = pagePath("terms-conditions", lang);
  const refundHref = pagePath("refund-policy", lang);
  const contactHref = pagePath("contact", lang);
  const feesNote = t("join.feesNote").replace(/REFUND_HREF/g, refundHref).replace(/CONTACT_HREF/g, contactHref);
  const noJs = `<noscript><p class="consent-error is-visible">${t("join.noJs").replace(/CONTACT_HREF/g, contactHref)}</p></noscript>`;

  const teams = t("join.teams");
  const players = t("join.players");

  const teamsCard = `
<article class="join-card" id="teams" data-join-card="teams">
  <h2>${teams.title}</h2>
  <p>${teams.audience}</p>
  <p>${teams.asksFor}</p>
  <div class="privacy-notice">${withHrefs(teams.privacyNotice, privacyHref, termsHref)}</div>
  <div class="consent-field">
    <input type="checkbox" id="teams-consent-privacy" data-consent-group="teams" data-consent-missing="${t("join.missingTerms")}" aria-describedby="teams-consent-error">
    <label for="teams-consent-privacy">${withHrefs(teams.consentLabel, privacyHref, termsHref)}</label>
  </div>
  <p class="consent-error" id="teams-consent-error" aria-live="polite">
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span data-consent-text>${teams.errorMessage}</span>
  </p>
  ${noJs}
  <button type="button" class="btn" id="teams-submit" data-form-url="${config.forms.teams}" aria-disabled="true" data-consent-for="teams" aria-describedby="teams-consent-error">${ballButtonInner(`${teams.openLabel} ${t("common.opensNewTab")}`)}</button>
  <p class="join-next" role="status" hidden data-join-next>${t("join.nextSteps")}</p>
</article>`;

  const playersCard = `
<article class="join-card" id="players" data-join-card="players">
  <h2>${players.title}</h2>
  <p>${players.audience}</p>
  <p>${players.asksFor}</p>
  <div class="privacy-notice">${withHrefs(players.privacyNotice, privacyHref, termsHref)}</div>
  <div class="consent-field">
    <input type="checkbox" id="players-consent-privacy" data-consent-group="players" data-consent-missing="${t("join.missingTerms")}" aria-describedby="players-consent-error">
    <label for="players-consent-privacy">${withHrefs(players.consentLabel, privacyHref, termsHref)}</label>
  </div>
  <div class="consent-field">
    <input type="checkbox" id="players-consent-guardian" data-consent-group="players" data-consent-missing="${t("join.missingGuardian")}" aria-describedby="players-consent-error">
    <label for="players-consent-guardian">${players.guardianLabel}</label>
  </div>
  <p class="consent-error" id="players-consent-error" aria-live="polite">
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span data-consent-text>${players.errorMessage}</span>
  </p>
  ${noJs}
  <button type="button" class="btn" id="players-submit" data-form-url="${config.forms.players}" aria-disabled="true" data-consent-for="players" aria-describedby="players-consent-error">${ballButtonInner(`${players.openLabel} ${t("common.opensNewTab")}`)}</button>
  <p class="join-next" role="status" hidden data-join-next>${t("join.nextSteps")}</p>
</article>`;

  return `
${renderPageHero({ title: t("join.title"), lead: t("join.lead") })}

<section class="section">
  <div class="wrap">
    <header class="section-head">
      <h2>${t("join.chooserTitle")}</h2>
    </header>
    <nav class="join-chooser" aria-label="${t("join.chooserTitle")}">
      <a class="join-choice" href="#teams" data-join-pick="teams"><strong>${t("join.chooseAcademy")}</strong><span>${t("join.chooseAcademyHint")}</span></a>
      <a class="join-choice" href="#players" data-join-pick="players"><strong>${t("join.choosePlayer")}</strong><span>${t("join.choosePlayerHint")}</span></a>
    </nav>
    <div class="join-grid" data-join-grid>
      ${teamsCard}
      ${playersCard}
    </div>
    <p class="fees-note">${feesNote}</p>
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
      { "@type": "ListItem", position: 2, name: t("nav.join"), item: pagePath.abs("join", lang) },
    ],
  };
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: [] };
}
