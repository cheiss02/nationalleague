import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = "[TODO: set before publishing]";
const DEADLINE = '<mark class="todo">[REFUND DEADLINE: __ days before season start]</mark>';
const PARTIAL_WINDOW = '<mark class="todo">[PARTIAL-REFUND WINDOW: __ to __ days before season start]</mark>';
const HOW_TO_REQUEST = '<mark class="todo">[HOW TO REQUEST A REFUND — e.g. email address or form link]</mark>';
const PROCESSING_TIME = '<mark class="todo">[REFUND PROCESSING TIME]</mark>';

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "Registration fees",
      html: `<p>Registration fees are not published on this website. Once your team's or player's registration form is submitted and reviewed, and you meet the league's eligibility requirements, the applicable fee is communicated to you directly.</p>`,
    },
    {
      heading: "Refund window",
      html: `<p>A full refund can be requested up until ${DEADLINE}. A partial refund may be available ${PARTIAL_WINDOW}. No refunds are available after that window closes, except as described below.</p>`,
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
      heading: "How to request a refund",
      html: `<p>To request a refund, contact ${HOW_TO_REQUEST}. Please include the academy or player name used at registration. Approved refunds are processed within ${PROCESSING_TIME}.</p>`,
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
      heading: "Ventana de reembolso",
      html: `<p>Se puede solicitar un reembolso completo hasta ${DEADLINE}. Puede haber un reembolso parcial disponible ${PARTIAL_WINDOW}. No hay reembolsos disponibles después de que cierre esa ventana, salvo lo descrito abajo.</p>`,
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
      heading: "Cómo solicitar un reembolso",
      html: `<p>Para solicitar un reembolso, contacta a ${HOW_TO_REQUEST}. Incluye el nombre de la academia o del jugador usado al registrarse. Los reembolsos aprobados se procesan en ${PROCESSING_TIME}.</p>`,
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
    eyebrow: "Legal",
    title: lang === "es" ? "Política de Reembolsos" : "Refund Policy",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
