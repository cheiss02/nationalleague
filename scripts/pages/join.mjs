import { renderPageHero, CLUBS } from "../lib/ssg.mjs";
import { attr, input, textarea, radios, select, checkbox, renderForm } from "../lib/forms.mjs";

function withHrefs(html, privacyHref, termsHref) {
  return html.replace(/PRIVACY_HREF/g, privacyHref).replace(/TERMS_HREF/g, termsHref);
}

function birthYearOptions(t) {
  const out = [];
  for (const cat of t("about.categoryYears")) {
    const [from, to] = cat.years.split(/[–-]/).map(Number);
    for (let y = from; y <= to; y++) out.push([String(y), `${y} · ${cat.code}`]);
  }
  return out.sort((a, b) => Number(a[0]) - Number(b[0]));
}

function registrationForm({ t, lang, kind, privacyHref, termsHref, email }) {
  const f = t("join.form");
  const k = f[kind];
  const consentLabel = withHrefs(t(`join.${kind}.consentLabel`), privacyHref, termsHref);
  const fields =
    kind === "teams"
      ? [
          input({ form: kind, name: "academy", label: k.academy, autocomplete: "organization", wide: true }),
          input({ form: kind, name: "club", label: k.club, list: "club-names", wide: true }),
          input({ form: kind, name: "state", label: k.state, autocomplete: "address-level1" }),
          input({ form: kind, name: "city", label: k.city, autocomplete: "address-level2" }),
          textarea({ form: kind, name: "facilitiesAddress", label: k.facilitiesAddress }),
          radios({ form: kind, name: "ownFacilities", label: k.ownFacilities, options: [[k.yes, k.yes], [k.no, k.no]] }),
          textarea({ form: kind, name: "categoriesPlayers", label: k.categoriesPlayers }),
          textarea({ form: kind, name: "links", label: k.links, required: false }),
          input({ form: kind, name: "contactName", label: k.contactName, autocomplete: "name", wide: true }),
          input({ form: kind, name: "contactRole", label: k.contactRole, autocomplete: "organization-title", wide: true }),
          input({ form: kind, name: "contactPhone", label: k.contactPhone, type: "tel", autocomplete: "tel", maxlength: 30 }),
          input({ form: kind, name: "contactEmail", label: k.contactEmail, type: "email", autocomplete: "email", maxlength: 254 }),
        ]
      : [
          input({ form: kind, name: "playerName", label: k.playerName, wide: true }),
          select({ form: kind, name: "birthYear", label: k.birthYear, options: birthYearOptions(t), choose: f.choose }),
          select({ form: kind, name: "position", label: k.position, options: k.positions.map((p) => [p, p]), choose: f.choose }),
          input({ form: kind, name: "currentClub", label: k.currentClub, list: "club-names", wide: true }),
          input({ form: kind, name: "guardianName", label: k.guardianName, autocomplete: "name", wide: true }),
          input({ form: kind, name: "guardianEmail", label: k.guardianEmail, type: "email", autocomplete: "email", maxlength: 254 }),
          input({ form: kind, name: "guardianPhone", label: k.guardianPhone, type: "tel", autocomplete: "tel", maxlength: 30 }),
        ];
  const checks =
    kind === "teams"
      ? [
          checkbox({ form: kind, name: "consentTerms", label: consentLabel, missing: t("join.missingTerms") }),
          checkbox({ form: kind, name: "contactByPhone", label: k.contactByPhone, required: false }),
        ]
      : [
          checkbox({ form: kind, name: "consentTerms", label: consentLabel, missing: t("join.missingTerms") }),
          checkbox({ form: kind, name: "consentGuardian", label: t("join.players.guardianLabel"), missing: t("join.missingGuardian") }),
          checkbox({ form: kind, name: "consentMedia", label: k.mediaLabel, required: false }),
        ];

  return renderForm({ kind, lang, msgs: f, email, fields, checks, submitLabel: k.submit, successTitle: f.successTitle, successBody: f.successBody, mailSubject: k.mailSubject });
}

function renderCards({ t, lang, privacyHref, termsHref, contactHref, config }) {
  const noJs = `<noscript><p class="consent-error is-visible">${t("join.noJs").replace(/CONTACT_HREF/g, contactHref)}</p></noscript>`;
  const card = (kind) => {
    const c = t(`join.${kind}`);
    return `
<article class="join-card" id="${kind}" data-join-card="${kind}">
  <h2>${c.title}</h2>
  <p>${c.audience}</p>
  ${c.formIntro ? `<p>${c.formIntro}</p>` : ""}
  <div class="privacy-notice">${withHrefs(c.privacyNotice, privacyHref, termsHref)}</div>
  ${noJs}
  ${registrationForm({ t, lang, kind, privacyHref, termsHref, email: config.email })}
</article>`;
  };
  const clubList = `<datalist id="club-names">${CLUBS.map((c) => `<option value="${attr(c.name)}"></option>`).join("")}</datalist>`;
  return card("teams") + card("players") + clubList;
}

function renderMain(ctx) {
  const { t, pagePath, lang } = ctx;
  const privacyHref = pagePath("privacy-policy", lang);
  const termsHref = pagePath("terms-conditions", lang);
  const refundHref = pagePath("refund-policy", lang);
  const contactHref = pagePath("contact", lang);
  const feesNote = t("join.feesNote").replace(/REFUND_HREF/g, refundHref).replace(/CONTACT_HREF/g, contactHref);
  const hrefs = { privacyHref, termsHref, contactHref };
  const cards = renderCards({ ...ctx, ...hrefs });

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
      ${cards}
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
  return { bodyHtml: renderMain(ctx), jsonLd, scripts: ["js/registration-form.js"] };
}
