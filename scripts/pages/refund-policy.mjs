import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = { en: "January 1, 2027", es: "1 de enero de 2027" };

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "Registration fees",
      html: `<p>Registration fees are not published on this website. Once your team's or player's registration form is submitted and reviewed, and you meet the league's eligibility requirements, the applicable fee is communicated to you directly.</p>`,
    },
    {
      heading: "Refund terms",
      html: `<p>All refunds are handled in person with each team or player at the time of enrollment. This includes deadlines, how to request a refund, and what happens if a season, tournament, or match is cancelled or postponed.</p>`,
    },
    {
      heading: "Contact",
      html: `<p>Questions about this policy can be sent through the <a href="${pagePath("contact", lang)}">Contact page</a>.</p>`,
    },
  ];
}

function sectionsEs(t, pagePath, lang) {
  return [
    {
      heading: "Cuotas de registro",
      html: `<p>Las cuotas de registro no se publican en este sitio web. Una vez que se envíe y revise el formulario de registro de tu equipo o jugador, y cumplas con los requisitos de elegibilidad de la liga, la cuota correspondiente se te comunicará directamente.</p>`,
    },
    {
      heading: "Condiciones de reembolso",
      html: `<p>Todos los reembolsos se manejan en persona con cada equipo o jugador al momento de su inscripción. Esto incluye los plazos, la forma de solicitar un reembolso y lo que sucede si se cancela o pospone una temporada, un torneo o un partido.</p>`,
    },
    {
      heading: "Contacto",
      html: `<p>Preguntas sobre este aviso pueden enviarse a través de la <a href="${pagePath("contact", lang)}">página de Contacto</a>.</p>`,
    },
  ];
}

export function render({ t, pagePath, lang }) {
  const sections = lang === "es" ? sectionsEs(t, pagePath, lang) : sectionsEn(t, pagePath, lang);
  const bodyHtml = renderLegalPage({
    lang,
    pagePath,
    t,
    title: lang === "es" ? "Política de Reembolsos" : "Refund Policy",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
