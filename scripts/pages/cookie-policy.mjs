import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = "[TODO: set before publishing]";

function sectionsEn(t, pagePath, lang) {
  return [
    {
      heading: "This site does not use cookies",
      html: `<p>National League Official Academies does not set any cookies, and does not use Google Analytics, Meta Pixel, or any other tracking technology. Fonts are self-hosted and registration forms are linked (not embedded), so no third-party cookies are set by visiting this site either.</p>`,
    },
    {
      heading: "What we do store",
      html: `<p>The site stores one thing in your browser's <code>localStorage</code> (not a cookie): your language preference, and whether you've dismissed the "¿Prefieres español?" hint. This is strictly necessary/functional, stays on your device, and is never sent to us or anyone else.</p>`,
    },
    {
      heading: "Why there is no cookie banner",
      html: `<p>A cookie banner is required when a site sets non-essential cookies or uses tracking technology. This site does neither, so no banner is shown. If that ever changes — for example, if we add privacy-friendly analytics or any advertising technology — this page and the site will be updated first, and any non-essential tracking will sit behind a real consent banner with equally visible Accept/Reject options.</p>`,
    },
    {
      heading: "Changes",
      html: `<p>If our use of cookies or similar technology changes, this policy will be updated to match before the change takes effect.</p>`,
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
      heading: "Este sitio no usa cookies",
      html: `<p>National League Official Academies no instala cookies, y no usa Google Analytics, Meta Pixel ni ninguna otra tecnología de rastreo. Las fuentes están alojadas en nuestro propio servidor y los formularios de registro están enlazados (no incrustados), por lo que tampoco se instalan cookies de terceros al visitar este sitio.</p>`,
    },
    {
      heading: "Qué sí almacenamos",
      html: `<p>El sitio almacena una sola cosa en el <code>localStorage</code> de tu navegador (no es una cookie): tu preferencia de idioma, y si cerraste el aviso "¿Prefieres español?". Esto es estrictamente necesario/funcional, permanece en tu dispositivo y nunca se nos envía a nosotros ni a nadie más.</p>`,
    },
    {
      heading: "Por qué no hay aviso de cookies",
      html: `<p>Un aviso de cookies es necesario cuando un sitio instala cookies no esenciales o usa tecnología de rastreo. Este sitio no hace ninguna de las dos cosas, por lo que no se muestra ningún aviso. Si esto llegara a cambiar — por ejemplo, si agregamos analítica respetuosa de la privacidad o cualquier tecnología publicitaria — primero se actualizará esta página y el sitio, y cualquier rastreo no esencial estará detrás de un aviso de consentimiento real con opciones de Aceptar/Rechazar igualmente visibles.</p>`,
    },
    {
      heading: "Cambios",
      html: `<p>Si nuestro uso de cookies o tecnología similar cambia, este aviso se actualizará para reflejarlo antes de que el cambio entre en vigor.</p>`,
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
    title: lang === "es" ? "Política de Cookies" : "Cookie Policy",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
