import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = "[TODO: set before publishing]";

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "Registration fees",
      html: `<p>Registration fees are not published on this website. Once your team's or player's registration form is submitted and reviewed, and you meet the league's eligibility requirements, the applicable fee is communicated to you directly.</p>`,
    },
    {
      heading: "Refund terms",
      html: `<p>Refund terms, including deadlines and how to request a refund, are shared and discussed with each team or player personally at the time of enrollment.</p>`,
    },
    {
      heading: "If the League cancels a season or tournament",
      html: `<p>If the League cancels a season or a specific tournament before it begins, registered teams and players will be offered a full refund or credit toward a future season, at the registrant's choice.</p>`,
    },
    {
      heading: "Weather and other disruptions",
      html: `<p>Matches postponed or affected by weather or similar circumstances will be rescheduled when possible. This does not, on its own, entitle a registrant to a refund.</p>`,
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
      html: `<p>Las condiciones de reembolso, incluidos los plazos y la forma de solicitarlo, se comparten y conversan personalmente con cada equipo o jugador al momento de su inscripción.</p>`,
    },
    {
      heading: "Si la Liga cancela una temporada o torneo",
      html: `<p>Si la Liga cancela una temporada o un torneo específico antes de que comience, a los equipos y jugadores registrados se les ofrecerá un reembolso completo o un crédito para una temporada futura, a elección de quien se registró.</p>`,
    },
    {
      heading: "Clima y otras interrupciones",
      html: `<p>Los partidos pospuestos o afectados por el clima u otras circunstancias similares se reprogramarán cuando sea posible. Esto, por sí solo, no da derecho a un reembolso.</p>`,
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
