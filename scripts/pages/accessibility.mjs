import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = "[TODO: set before publishing]";

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "Our commitment",
      html: `<p>National League Official Academies wants this site to be usable by everyone. We target <strong>WCAG 2.2 Level AA</strong> across every page, in both English and Spanish.</p>`,
    },
    {
      heading: "What we've done",
      html: `<p>Semantic landmarks and a logical heading structure on every page; a visible "skip to content" link; full keyboard support, including the Join page's consent checkboxes and gated buttons; a 3:1-minimum focus ring on every interactive element; alt text on every image, in both languages; 44×44px minimum touch targets; text that resizes to 200% without breaking; and full support for <code>prefers-reduced-motion</code>, including the logo marquee and button animations.</p>`,
    },
    {
      heading: "Known limitations",
      html: `<p>Team and player registration forms are hosted by Google Forms, a third-party tool outside our direct control. We've linked to them (rather than embedding them) partly so that visitors always interact with Google's own accessible form interface directly, not through an iframe.</p>`,
    },
    {
      heading: "Reporting a problem",
      html: `<p>If you run into an accessibility barrier anywhere on this site, please tell us through the <a href="${pagePath("contact", lang)}">Contact page</a>. Include the page and, if you can, the browser/assistive technology you were using — it helps us fix it faster.</p>`,
    },
  ];
}

function sectionsEs(t, pagePath, lang) {
  return [
    {
      heading: "Nuestro compromiso",
      html: `<p>National League Official Academies quiere que este sitio sea usable para todas las personas. Nuestra meta es cumplir con <strong>WCAG 2.2 Nivel AA</strong> en cada página, tanto en inglés como en español.</p>`,
    },
    {
      heading: "Lo que hemos hecho",
      html: `<p>Puntos de referencia semánticos y una estructura de encabezados lógica en cada página; un enlace visible "saltar al contenido"; soporte completo de teclado, incluyendo las casillas de consentimiento y los botones condicionados de la página Forma Parte; un anillo de enfoque con contraste mínimo 3:1 en cada elemento interactivo; texto alternativo en cada imagen, en ambos idiomas; objetivos táctiles de al menos 44×44px; texto que se amplía al 200% sin romperse; y soporte completo para <code>prefers-reduced-motion</code>, incluyendo el carrusel de escudos y las animaciones de los botones.</p>`,
    },
    {
      heading: "Limitaciones conocidas",
      html: `<p>Los formularios de registro de equipos y jugadores están alojados en Google Forms, una herramienta de terceros fuera de nuestro control directo. Los enlazamos (en lugar de incrustarlos) en parte para que quien visite el sitio siempre interactúe directamente con la propia interfaz accesible de Google, no a través de un iframe.</p>`,
    },
    {
      heading: "Reportar un problema",
      html: `<p>Si encuentras una barrera de accesibilidad en cualquier parte de este sitio, avísanos a través de la <a href="${pagePath("contact", lang)}">página de Contacto</a>. Incluye la página y, si puedes, el navegador/tecnología de asistencia que usabas — nos ayuda a corregirlo más rápido.</p>`,
    },
  ];
}

export function render({ t, pagePath, lang }) {
  const sections = lang === "es" ? sectionsEs(t, pagePath, lang) : sectionsEn(t, pagePath, lang);
  const bodyHtml = renderLegalPage({
    lang,
    pagePath,
    t,
    eyebrow: lang === "es" ? "Legal" : "Legal",
    title: lang === "es" ? "Accesibilidad" : "Accessibility",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
