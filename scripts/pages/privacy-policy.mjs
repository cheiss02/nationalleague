import { renderLegalPage } from "../lib/ssg.mjs";

const EFFECTIVE_DATE = { en: "January 1, 2027", es: "1 de enero de 2027" };
const ENTITY = "National League USA";
const ADDRESS = "2884 Marie Dr, Riverside, CA 92509";

function sectionsEn(t, pagePath, lang, config) {
  const termsHref = pagePath("terms-conditions", lang);
  return [
    {
      heading: "Who we are",
      html: `<p>National League Official Academies ("the League," "we," "us") operates this website and the youth soccer league it describes. The League is operated by ${ENTITY}, ${ADDRESS}.</p>`,
    },
    {
      heading: "What we collect, and why",
      html: `<p>We collect information through two Google Forms linked from the Join page:</p>
      <ul>
        <li><strong>Team/academy registration:</strong> academy name, affiliated club, city/state, categories entered, and a contact person's name, role, email, and phone.</li>
        <li><strong>Player registration:</strong> player name, birth year, current academy/club, position, and a parent or guardian's name, email, and phone. We do not ask for a home address, SSN or ID numbers, school, medical information, immigration status, or photos/videos at sign-up.</li>
      </ul>
      <p>We use this information to review and process registrations, place players in the correct age category, organize the competition, and communicate with academies and guardians about the league.</p>`,
    },
    {
      heading: "Legal basis for processing",
      html: `<p>We process this information based on your consent (collected via the checkboxes on the Join page) and to take steps requested by you before entering into a registration with the League.</p>`,
    },
    {
      heading: "Google Forms as a processor",
      html: `<p>Registration forms are hosted by Google Forms. Google processes form submissions on our behalf as a data processor. Google's own privacy practices apply to how the form itself operates; see Google's Privacy Policy for details. We do not embed these forms on our site — the Join page links to them in a new tab.</p>`,
    },
    {
      heading: "Wame Sports",
      html: `<p>Wame Sports is the League's technology partner, providing the analytics tools, match video, and player-profile infrastructure behind ProyecTal, the League's own player-development platform. Player information needed for league operations (category, academy, match history) may be shared with Wame Sports to provide these tools. Wame Sports is operated by WAAKAT, SL, a legally constituted company based in Madrid, Spain; once a player's data is in Wame Sports' systems to build their sports profile, it is also governed by Wame Sports' own privacy policy, available at <a href="https://www.wame.is/terms/privacy" target="_blank" rel="noopener noreferrer">wame.is/terms/privacy</a>. Any use of a player's photo or video beyond league operations requires the separate, optional media-consent checkbox described on the Join page — it is never required to register.</p>`,
    },
    {
      heading: "Retention",
      html: `<p>We keep registration data for up to 24 months after the season ends, unless a longer period is required by law or needed to resolve a dispute.</p>`,
    },
    {
      heading: "Security",
      html: `<p>We limit access to registration data to league staff who need it to run the league. No method of transmission or storage is 100% secure, but we take reasonable steps to protect the information we hold.</p>`,
    },
    {
      heading: "Children's data (COPPA)",
      html: `<p>Some registered players are under 13. Player registration is completed by a parent or legal guardian, not the child, and the form requires the guardian to confirm this. We collect only the information described above — never more than is reasonably necessary to register a player and place them in the correct category.</p>`,
    },
    {
      heading: "Your rights",
      html: `<p>Depending on where you live, you may have the right to access, delete, or correct your information, and to opt out of certain uses. To exercise these rights, contact us using the details on the Contact page. We do not sell or share personal information for cross-context behavioral advertising, and we honor the <strong>Global Privacy Control</strong> signal where legally required.</p>`,
    },
    {
      heading: "California residents (CCPA/CPRA, CalOPPA)",
      html: `<p>California residents have the rights described above under the CCPA/CPRA. We do not sell personal information. This site discloses its data practices under CalOPPA in this policy.</p>`,
    },
    {
      heading: "Changes to this policy",
      html: `<p>We may update this policy as the League's practices change. The effective date below reflects the most recent version. Material changes will be reflected on this page.</p>`,
    },
    {
      heading: "Contact",
      html: `<p>Questions about this policy or your information can be sent through the <a href="${pagePath("contact", lang)}">Contact page</a>${config.email ? ` or to ${config.email}` : ""}.</p><p class="fine-print">See also the <a href="${termsHref}">Terms &amp; Conditions</a>.</p>`,
    },
  ];
}

function sectionsEs(t, pagePath, lang, config) {
  const termsHref = pagePath("terms-conditions", lang);
  return [
    {
      heading: "Quiénes somos",
      html: `<p>National League Official Academies ("la Liga", "nosotros") opera este sitio web y la liga de fútbol juvenil que describe. La Liga es operada por ${ENTITY}, ${ADDRESS}.</p>`,
    },
    {
      heading: "Qué recopilamos y por qué",
      html: `<p>Recopilamos información a través de dos formularios de Google enlazados desde la página Forma Parte:</p>
      <ul>
        <li><strong>Registro de equipo/academia:</strong> nombre de la academia, club afiliado, ciudad/estado, categorías en las que participará, y el nombre, cargo, correo y teléfono de una persona de contacto.</li>
        <li><strong>Registro de jugador:</strong> nombre del jugador, año de nacimiento, academia/club actual, posición, y el nombre, correo y teléfono de un padre, madre o tutor. No pedimos dirección particular, números de identificación, escuela, información médica, estatus migratorio, ni fotos/videos al momento del registro.</li>
      </ul>
      <p>Usamos esta información para revisar y procesar los registros, ubicar a los jugadores en la categoría correcta, organizar la competencia y comunicarnos con academias y tutores sobre la liga.</p>`,
    },
    {
      heading: "Base legal para el tratamiento",
      html: `<p>Tratamos esta información con base en tu consentimiento (recopilado mediante las casillas en la página Forma Parte) y para tomar los pasos que solicites antes de formalizar un registro con la Liga.</p>`,
    },
    {
      heading: "Google Forms como encargado del tratamiento",
      html: `<p>Los formularios de registro están alojados en Google Forms. Google procesa las respuestas en nuestro nombre como encargado del tratamiento. Las propias prácticas de privacidad de Google aplican al funcionamiento del formulario; consulta el Aviso de Privacidad de Google para más detalles. No incrustamos estos formularios en nuestro sitio — la página Forma Parte enlaza a ellos en una pestaña nueva.</p>`,
    },
    {
      heading: "Wame Sports",
      html: `<p>Wame Sports es el socio tecnológico de la Liga y proporciona las herramientas de análisis, video de partidos y la infraestructura de perfiles de jugador detrás de ProyecTal, la plataforma propia de la Liga para el desarrollo de jugadores. La información del jugador necesaria para la operación de la liga (categoría, academia, historial de partidos) puede compartirse con Wame Sports para brindar estas herramientas. Wame Sports es operada por WAAKAT, SL, una empresa legalmente constituida con sede en Madrid, España; una vez que los datos de un jugador están en los sistemas de Wame Sports para construir su perfil deportivo, también se rigen por el aviso de privacidad propio de Wame Sports, disponible en <a href="https://www.wame.is/terms/privacy" target="_blank" rel="noopener noreferrer">wame.is/terms/privacy</a>. Cualquier uso de la foto o video de un jugador más allá de la operación de la liga requiere la casilla de consentimiento de medios, separada y opcional, descrita en la página Forma Parte — nunca es obligatoria para registrarse.</p>`,
    },
    {
      heading: "Conservación de datos",
      html: `<p>Conservamos los datos de registro hasta 24 meses después de que termine la temporada, a menos que la ley exija un plazo mayor o sea necesario para resolver una disputa.</p>`,
    },
    {
      heading: "Seguridad",
      html: `<p>Limitamos el acceso a los datos de registro al personal de la liga que lo necesita para operarla. Ningún método de transmisión o almacenamiento es 100% seguro, pero tomamos medidas razonables para proteger la información que resguardamos.</p>`,
    },
    {
      heading: "Datos de menores (COPPA)",
      html: `<p>Algunos jugadores registrados son menores de 13 años. El registro del jugador lo completa un padre, madre o tutor legal, no el menor, y el formulario exige que el tutor lo confirme. Recopilamos únicamente la información descrita arriba — nunca más de lo razonablemente necesario para registrar a un jugador y ubicarlo en la categoría correcta.</p>`,
    },
    {
      heading: "Tus derechos",
      html: `<p>Dependiendo de dónde vivas, puedes tener derecho a acceder, eliminar o corregir tu información, y a oponerte a ciertos usos. Para ejercer estos derechos, contáctanos usando los datos en la página de Contacto. No vendemos ni compartimos información personal con fines de publicidad conductual entre contextos, y honramos la señal <strong>Global Privacy Control</strong> donde la ley lo exija.</p>`,
    },
    {
      heading: "Aviso de Privacidad (México — LFPDPPP)",
      html: `<p>Para familias en México, este aviso también funciona como Aviso de Privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Puedes ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) contactándonos en los datos de la página de Contacto. No transferimos tus datos personales a terceros salvo lo descrito en este aviso (Google Forms como encargado, y Wame Sports como se explica arriba).</p>`,
    },
    {
      heading: "Residentes de California (CCPA/CPRA, CalOPPA)",
      html: `<p>Los residentes de California tienen los derechos descritos arriba conforme a la CCPA/CPRA. No vendemos información personal. Este sitio divulga sus prácticas de datos conforme a CalOPPA en este aviso.</p>`,
    },
    {
      heading: "Cambios a este aviso",
      html: `<p>Podemos actualizar este aviso conforme cambien las prácticas de la Liga. La fecha de vigencia abajo refleja la versión más reciente. Los cambios importantes se reflejarán en esta página.</p>`,
    },
    {
      heading: "Contacto",
      html: `<p>Preguntas sobre este aviso o tu información pueden enviarse a través de la <a href="${pagePath("contact", lang)}">página de Contacto</a>${config.email ? ` o a ${config.email}` : ""}.</p><p class="fine-print">Consulta también los <a href="${termsHref}">Términos y Condiciones</a>.</p>`,
    },
  ];
}

export function render({ t, pagePath, lang, config }) {
  const sections = lang === "es" ? sectionsEs(t, pagePath, lang, config) : sectionsEn(t, pagePath, lang, config);
  const bodyHtml = renderLegalPage({
    lang,
    pagePath,
    t,
    title: lang === "es" ? "Aviso de Privacidad" : "Privacy Policy",
    effectiveDate: EFFECTIVE_DATE,
    sections,
  });
  return { bodyHtml, jsonLd: null, scripts: [] };
}
