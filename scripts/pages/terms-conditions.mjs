import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = { en: "January 1, 2027", es: "1 de enero de 2027" };
const ENTITY = "National League USA";

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "Use of this website",
      html: `<p>This website is operated by ${ENTITY} for National League Official Academies. By using it, you agree to these terms.</p>`,
    },
    {
      heading: "Eligibility",
      html: `<p>Team/academy registration is open to official youth academies of Liga MX and MLS clubs. Player registration must be completed by a parent or legal guardian for anyone under 18.</p>`,
    },
    {
      heading: "Registration is not acceptance",
      html: `<p>Submitting a registration form is a request to join the League, not confirmation. Academies and players are notified separately once a registration has been reviewed and accepted.</p>`,
    },
    {
      heading: "Code of conduct",
      html: `<p>Academies, coaches, players, and families are expected to conduct themselves with respect and good sportsmanship at all league activities. The League may decline or remove a registration for conduct that endangers players or undermines the competition.</p>`,
    },
    {
      heading: "Intellectual property",
      html: `<p>The National League crest and site content belong to the League. Club names and crests shown on this site are trademarks of their respective owners. Nothing on this site should be read as the clubs, Liga MX, or MLS sponsoring, endorsing, or operating the League beyond what is stated here.</p>`,
    },
    {
      heading: "Disclaimers",
      html: `<p>This site and the League's services are provided "as is." We make no guarantee that registration will result in acceptance into a specific team, category, or tournament.</p>`,
    },
    {
      heading: "Limitation of liability",
      html: `<p>To the fullest extent permitted by law, ${ENTITY} is not liable for indirect, incidental, or consequential damages arising from use of this site or participation in the League.</p>`,
    },
    {
      heading: "Governing law",
      html: `<p>These terms are governed by the laws of the State of California, without regard to conflict-of-law principles.</p>`,
    },
    {
      heading: "Changes",
      html: `<p>We may update these terms as the League evolves. The effective date below reflects the most recent version.</p>`,
    },
    {
      heading: "Contact",
      html: `<p>Questions about these terms can be sent through the <a href="${pagePath("contact", lang)}">Contact page</a>.</p>`,
    },
  ];
}

function sectionsEs(t, pagePath, lang) {
  return [
    {
      heading: "Uso de este sitio web",
      html: `<p>Este sitio web es operado por ${ENTITY} para National League Official Academies. Al usarlo, aceptas estos términos.</p>`,
    },
    {
      heading: "Elegibilidad",
      html: `<p>El registro de equipos/academias está abierto a academias juveniles oficiales de clubes de Liga MX y MLS. El registro de jugadores debe completarlo un padre, madre o tutor legal para cualquier persona menor de 18 años.</p>`,
    },
    {
      heading: "El registro no es aceptación",
      html: `<p>Enviar un formulario de registro es una solicitud para unirse a la Liga, no una confirmación. Las academias y jugadores reciben una notificación por separado una vez que su registro ha sido revisado y aceptado.</p>`,
    },
    {
      heading: "Código de conducta",
      html: `<p>Se espera que academias, entrenadores, jugadores y familias se conduzcan con respeto y deportividad en todas las actividades de la liga. La Liga puede rechazar o retirar un registro por conductas que pongan en riesgo a los jugadores o afecten la competencia.</p>`,
    },
    {
      heading: "Propiedad intelectual",
      html: `<p>El escudo de National League y el contenido del sitio pertenecen a la Liga. Los nombres y escudos de los clubes que aparecen en este sitio son marcas de sus respectivos dueños. Nada en este sitio debe interpretarse como que los clubes, la Liga MX o la MLS patrocinan, avalan u operan la Liga más allá de lo aquí indicado.</p>`,
    },
    {
      heading: "Avisos legales",
      html: `<p>Este sitio y los servicios de la Liga se ofrecen "tal cual". No garantizamos que el registro resulte en la aceptación en un equipo, categoría o torneo específico.</p>`,
    },
    {
      heading: "Limitación de responsabilidad",
      html: `<p>En la máxima medida permitida por la ley, ${ENTITY} no es responsable por daños indirectos, incidentales o consecuentes derivados del uso de este sitio o la participación en la Liga.</p>`,
    },
    {
      heading: "Ley aplicable",
      html: `<p>Estos términos se rigen por las leyes del Estado de California, sin considerar sus principios de conflicto de leyes.</p>`,
    },
    {
      heading: "Cambios",
      html: `<p>Podemos actualizar estos términos conforme evolucione la Liga. La fecha de vigencia abajo refleja la versión más reciente.</p>`,
    },
    {
      heading: "Contacto",
      html: `<p>Preguntas sobre estos términos pueden enviarse a través de la <a href="${pagePath("contact", lang)}">página de Contacto</a>.</p>`,
    },
  ];
}

export function render({ t, pagePath, lang }) {
  const sections = lang === "es" ? sectionsEs(t, pagePath, lang) : sectionsEn(t, pagePath, lang);
  const bodyHtml = renderLegalPage({
    lang,
    pagePath,
    t,
    title: lang === "es" ? "Términos y Condiciones" : "Terms & Conditions",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
