/* Bilingual copy for National League Official Academies.
   Every visible string lives here, keyed by section, with an "en" and "es"
   value. English is the default/primary language; Spanish is complete.

   This file is imported two ways:
   - In the browser (as an ES module) to drive the EN/ES hint banner and any
     client-side text that still needs it.
   - By scripts/build-site.mjs (Node ESM import) as the single source of
     copy used to generate the static English page at each route and its
     Spanish mirror under /es/ — so the shipped text in both languages is
     always generated from the same data, not hand-duplicated in HTML. */

export const translations = {
  en: {
    meta: {
      siteName: "National League Official Academies",
    },

    nav: {
      home: "Home",
      about: "About",
      academies: "Academies",
      wame: "Wame Sports",
      news: "News",
      documents: "Documents",
      join: "Join",
      contact: "Contact",
      joinCta: "Join the National League",
    },

    pages: {
      index: {
        title: "Liga MX & MLS Academy League | NL Official Academies",
        description: "National League Official Academies unites the official academies of Liga MX and MLS clubs in a regional and national youth soccer competition, built with Wame Sports.",
      },
      about: {
        title: "About the League | National League Official Academies",
        description: "Our mission, vision, categories, and how the National League Official Academies competitive structure works.",
      },
      academies: {
        title: "Participating Academies | National League Official Academies",
        description: "The official Liga MX and MLS club academies participating in the National League.",
      },
      wame: {
        title: "Wame Sports Partnership | National League Official Academies",
        description: "How the National League's partnership with Wame Sports brings analytics, match video, and player profiles to every academy.",
      },
      contact: {
        title: "Contact | National League Official Academies",
        description: "How to reach National League Official Academies.",
      },
      join: {
        title: "Join the League | National League Official Academies",
        description: "Register your academy's team or register a player for the National League Official Academies.",
      },
      news: {
        title: "News | National League Official Academies",
        description: "Tournament updates, calls for registration, and results from National League Official Academies.",
      },
      documents: {
        title: "Documents | National League Official Academies",
        description: "Rules, calls for registration, and calendars for National League Official Academies.",
      },
      "privacy-policy": {
        title: "Privacy Policy | National League Official Academies",
        description: "How National League Official Academies collects, uses, and protects information.",
      },
      "terms-conditions": {
        title: "Terms & Conditions | National League Official Academies",
        description: "The terms that apply to using this website and registering with National League Official Academies.",
      },
      "cookie-policy": {
        title: "Cookie Policy | National League Official Academies",
        description: "What this website stores in your browser.",
      },
      "refund-policy": {
        title: "Refund Policy | National League Official Academies",
        description: "Registration fees, refund windows, and cancellation terms for National League Official Academies.",
      },
      accessibility: {
        title: "Accessibility | National League Official Academies",
        description: "Our accessibility commitment and how to report a problem.",
      },
    },

    news: {
      eyebrow: "News",
      title: "News",
      lead: "Updates from the National League Official Academies.",
      keyDatesTitle: "Key dates",
      filters: { all: "All", torneo: "Tournament", convocatoria: "Call for registration", resultados: "Results", general: "General" },
      empty: "No news posts match this filter yet.",
      sample: "Sample",
    },

    documents: {
      eyebrow: "Documents",
      title: "Documents",
      lead: "Rules, calls for registration, and calendars. Files are added here as they're published — no separate login required.",
      searchPlaceholder: "Search documents…",
      categories: { reglamentos: "Rules & Regulations", convocatorias: "Calls for Registration", calendarios: "Calendars", formatos: "Forms" },
      empty: "No documents have been published in this category yet.",
    },

    join: {
      eyebrow: "Get Started",
      title: "Join the National League",
      lead: "Two ways to join: register your academy's team, or register a player. Each opens a short Google Form in a new tab.",
      feesNote: "Registration fees aren't published on this site. Once your team's or player's registration form is submitted and you meet the league's eligibility requirements, the applicable fee is communicated to you directly — see the <a href=\"REFUND_HREF\">Refund Policy</a> page for how refunds work, or <a href=\"CONTACT_HREF\">contact us</a> with questions.",
      teams: {
        title: "Teams / Academies",
        audience: "For official academies of Liga MX or MLS clubs that want to enter the league.",
        asksFor: "The form asks for your academy name, affiliated club, city/state, the categories you'll enter, and a contact person's name, role, email, and phone.",
        privacyNotice: "We collect this information to review and process your academy's registration. The form is hosted by Google; National League Official Academies receives the responses. Data is kept for up to 24 months after the season ends. See the <a href=\"PRIVACY_HREF\">Privacy Policy</a> for details. We never sell this information.",
        consentLabel: "I have read and accept the <a href=\"PRIVACY_HREF\">Privacy Policy</a> and the <a href=\"TERMS_HREF\">Terms &amp; Conditions</a>.",
        openLabel: "Open team registration form",
        errorMessage: "Please check the box above before opening the form.",
      },
      players: {
        title: "Players",
        audience: "For players who want to be registered with a participating academy. A parent or legal guardian must complete this form for anyone under 18.",
        asksFor: "The form asks for the player's name and birth year, current academy/club, position, and the guardian's name, email, and phone — plus the consent questions below. We do not ask for a home address, ID numbers, school, medical information, or photos at sign-up.",
        privacyNotice: "We collect this information to place the player in the correct category and register them with the league. The form is hosted by Google; National League Official Academies receives the responses. Data is kept for up to 24 months after the season ends. See the <a href=\"PRIVACY_HREF\">Privacy Policy</a> for details. We never sell this information.",
        consentLabel: "I have read and accept the <a href=\"PRIVACY_HREF\">Privacy Policy</a> and the <a href=\"TERMS_HREF\">Terms &amp; Conditions</a>.",
        guardianLabel: "I am the player's parent, mother, father, or legal guardian, or the player is 18 or older.",
        openLabel: "Open player registration form",
        errorMessage: "Please check both boxes above before opening the form.",
      },
      opensNewTabNote: "Opens the Google Form in a new tab.",
    },

    contact: {
      eyebrow: "Contact",
      title: "Get in touch",
      lead: "Questions about registration, categories, or the league in general — reach out through any of the channels below.",
      emailTitle: "Email",
      phoneTitle: "Phone",
      socialTitle: "Social",
      joinTitle: "Want to register instead?",
      joinText: "Team and player registration happens on the Join page, not by email.",
      joinCta: "Go to the Join page",
      noneYet: "Contact details will be published here before launch.",
    },

    wame: {
      eyebrow: "Technology Partner",
      title: "Built with Wame Sports.",
      lead: "Wame Sports is the league's technology partner, bringing data and visibility tools to every academy and player in the National League.",
      introText: "Through technological innovation and our partnership with Wame Sports, we bring in analytics tools, match video, and player profiles that aim to expand the visibility of young talent and open new paths for projection.",
      features: [
        { title: "Analytics", body: "Match and performance data tools that help coaches and academies track player development over a season, not just a single result." },
        { title: "Match Video", body: "Video from league matches, so a player's performances can be reviewed, shared, and used to support their development." },
        { title: "Player Profiles", body: "A profile for each registered player that brings together their category, academy, and match history in one place." },
      ],
      noteTitle: "What this means for families",
      noteText: "Wame Sports tools are provided through the league's technology partnership and are used to support player development and visibility. Any use of a player's photo, video, or profile beyond league operations requires the separate, optional media consent described on the Join page and in the Privacy Policy — it is never required to register.",
      cta: "See how to join",
    },

    academies: {
      eyebrow: "Academies",
      title: "Participating academies",
      lead: "National League Official Academies brings together the official youth academies of these Liga MX and MLS clubs. Participation refers to each club's official academy program, not the first team.",
      ligaMxLabel: "Liga MX Academy",
      mlsLabel: "MLS Academy",
      note: "Club names and crests are shown to identify each participating academy. This list does not imply that Liga MX, MLS, or any club sponsors, endorses, or operates the National League.",
    },

    about: {
      eyebrow: "About Us",
      title: "More than a league. A platform for development, competition, and opportunity.",
      lead: "National League Official Academies is a formative soccer league created to bring together, organize, and strengthen the official academies of Liga MX and MLS clubs under one regional and national competitive structure.",
      whoEyebrow: "Who We Are",
      whoTitle: "A community of official academies, built to grow together.",
      whoP1: "We were born with a clear vision: to build a solid community of academies that officially represent their clubs' identity, with an organized competitive space, institutional recognition, and real opportunities for growth.",
      whoP2: "We're not here to be just another league. Our purpose is to build a platform that strengthens the work official academies are already doing, creates constant competition among institutions that share the same development philosophy, and gives more young players access to quality competitive experience.",
      identityEyebrow: "Our Identity",
      identityTitle: "Official academies only.",
      identityP1: "One of our main goals is to recognize, strengthen, and distinguish academies that have an official, current relationship with their clubs.",
      identityP2: "We believe in the value of institutional identity, the backing of the clubs, and the commitment that comes with being part of an official structure. That's why National League is open exclusively to the official affiliate academies of Liga MX and MLS clubs that meet the league's requirements.",
      identityP3: "We want to build a solid network of institutions that share a commitment to developing players, strengthening their athletic projects, and proudly representing their clubs' colors and identity.",
      missionEyebrow: "Our Mission",
      missionTitle: "Strengthen competition and player development.",
      missionP1: "Our mission is to bring the official academies of Liga MX and MLS clubs together under one competitive structure, so players train and compete at a consistently higher level throughout the season.",
      missionP2: "Every match, tournament, and category is organized to support real player development — not just results — alongside the academies and coaching staffs already doing that work every day.",
      visionEyebrow: "Our Vision",
      visionTitle: "A clear path from academy to projection.",
      visionP1: "We want the National League to become the reference competitive structure for official academies in the United States — one where competing at a high level and being seen by scouts and coaches go hand in hand, supported by the tools Wame Sports brings to the league.",
      howEyebrow: "How the League Works",
      howTitle: "A regional and national structure.",
      howItems: [
        { title: "Official Academies Only", body: "Every participating team belongs to the official youth academy of a Liga MX or MLS club — there is no open/independent-club path into this competition." },
        { title: "Regional Competition", body: "Academies compete first within their region, keeping travel reasonable while raising the week-to-week level of play." },
        { title: "National Structure", body: "Regional results feed into a national structure that brings the strongest academy teams together across categories." },
        { title: "Four Mandatory Categories", body: "U17, U15, U13, and U11 — every official academy is required to enter all four, so players compete against others at the right age and stage of development." },
      ],
      categoriesEyebrow: "A Solid Competitive Structure",
      categoriesTitle: "Sub 17 · Sub 15 · Sub 13 · Sub 11",
      categoriesText: "A league's solidity is built through the commitment of its participants. That's why our model requires every official academy to enter all four age categories: this guarantees continuous competitive growth for the academy's teams and makes the academy itself more solid and stronger, season after season.",
      categoryYears: [
        { code: "U17", title: "Sub 17", years: "2010–2011" },
        { code: "U15", title: "Sub 15", years: "2012–2013" },
        { code: "U13", title: "Sub 13", years: "2014–2015" },
        { code: "U11", title: "Sub 11", years: "2016–2017" },
      ],
      categoriesP2: "Our competition begins with a regional phase, split into groups that reduce travel distances and support every academy's participation. As the league grows and new regions come online, national stages will open up, with finals between the champions of each group or region.",
      techEyebrow: "Technology & Innovation",
      techTitle: "Built with Wame Sports.",
      techText: "Through ProyecTal, our own platform built with our technology partner Wame Sports, every match a team plays as the home side is recorded — giving players match video, a personal highlight reel, and an individual sports profile that tracks their history, stats, and progress across seasons. These tools help put young talent in front of scouts, agents, and institutions looking for players.",
      techCta: "See how Wame Sports works",
      commitmentEyebrow: "Our Commitment",
      commitmentTitle: "One league. Great academies. One shared vision.",
      commitmentP1: "We believe in soccer as a tool for development, formation, and growth. We believe in the academies working every day to build players — and people. We believe in competition as a way to raise the level of play, and in technology as a way to open new possibilities.",
      commitmentClosing: "Talent unites us. Competition drives us. The future belongs to us.",
      faqEyebrow: "Questions",
      faqTitle: "Frequently asked questions",
      faqItems: [
        { q: "Who can join the National League?", a: "Participation is open to the official youth academies of Liga MX and MLS clubs. Individual players register through their academy's team; players who are not yet part of an official academy can start at the player registration link on the Join page, which is reviewed on a case-by-case basis." },
        { q: "What are the age categories?", a: "Four categories: U17, U15, U13, and U11 (Sub 17, Sub 15, Sub 13, and Sub 11)." },
        { q: "Do academies need to enter all four age categories?", a: "Yes. Every official academy is required to enter all four categories — U17, U15, U13, and U11 — to guarantee continuous competitive growth and to make the academy itself more solid and stronger." },
        { q: "When does the season start?", a: "The season is scheduled to start in February 2027." },
        { q: "Is there a cost to register?", a: "Yes. Registration fees aren't published on the site — once your academy's or player's registration form is submitted and you meet the league's eligibility requirements, the fee is communicated to you directly. See the Refund Policy page for how refunds work." },
        { q: "What is Wame Sports?", a: "Wame Sports is the league's technology partner, providing analytics tools, match video, and player profiles that support player development and projection. See the Wame Sports page for details." },
      ],
    },

    common: {
      skipToContent: "Skip to content",
      backHome: "Back to home",
      readMore: "Read more",
      opensNewTab: "(opens in a new tab)",
    },

    menu: {
      open: "Open menu",
      close: "Close menu",
    },

    backToTop: "Back to top",

    langHint: {
      text: "¿Prefieres español? Ver en español.",
      dismiss: "Dismiss",
    },

    hero: {
      h1: "The youth league for official Liga MX and MLS academies",
      title: "Compete with purpose. Develop with vision. Project the future.",
      body: "National League Official Academies is a league created to bring together the official academies of Liga MX and MLS clubs, strengthening competition, development, and the projection of young soccer players through a regional and national competitive structure.",
      cta: "Join the National League",
      badgeLine1: "Starts",
      badgeLine2: "February 2027",
      categories: ["U17", "U15", "U13", "U11"],
    },

    marquee: {
      heading: "Participating academies",
    },

    home: {
      introEyebrow: "Who We Are",
      introTitle: "One league. Great academies. One shared vision.",
      introText: "National League Official Academies brings together the official academies of Liga MX and MLS clubs under a single regional and national competitive structure, raising the level of play and creating a clear path for player development.",
      wameEyebrow: "Technology & Projection",
      wameTitle: "Built with Wame Sports.",
      wameText: "Through technological innovation and our partnership with Wame Sports, we bring in analytics tools, match video, and player profiles that aim to expand the visibility of young talent and open new paths for projection.",
      wameCta: "More about Wame Sports",
      commitmentEyebrow: "Our Commitment",
      commitmentTitle: "Academies, competition, and technology — working toward the same future.",
      commitmentText: "Our commitment is to drive the growth of official academies, raise the competitive level, and build a platform where talent, development, and technology come together to contribute to the future of soccer.",
      exploreEyebrow: "Explore",
      exploreTitle: "Get to know the National League",
      exploreItems: [
        { title: "About", text: "Our mission, vision, and how the league works." },
        { title: "Academies", text: "The participating Liga MX and MLS academies." },
        { title: "Wame Sports", text: "Analytics, match video, and player profiles." },
        { title: "News", text: "Tournament updates, calls, and results." },
        { title: "Documents", text: "Rules, calls for registration, and calendars." },
        { title: "Join", text: "Register a team or a player." },
      ],
      newsEyebrow: "Latest News",
      newsTitle: "What's happening in the league",
      ctaEyebrow: "Get Started",
      ctaTitle: "Ready to be part of the National League?",
      ctaBody: "Register your academy's team or register a player to take the first step toward joining the National League Official Academies.",
      registerTeam: "Register my team",
      registerPlayer: "Register a player",
    },

    footer: {
      tagline: "A league created for the official academies of Liga MX and MLS clubs, built with Wame Sports to strengthen competition, development, and player projection.",
      explore: "Explore",
      follow: "Follow",
      contact: "Contact",
      rights: "All rights reserved.",
      legal: "Legal",
      links: {
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        cookies: "Cookie Policy",
        refund: "Refund Policy",
        accessibility: "Accessibility",
      },
      trademarkWithLogos: "Club names and crests are trademarks of their respective owners.",
      trademarkNamesOnly: "Club names are trademarks of their respective owners. National League Official Academies is not operated by Liga MX or MLS.",
    },
  },

  es: {
    meta: {
      siteName: "National League Official Academies",
    },

    nav: {
      home: "Inicio",
      about: "La Liga",
      academies: "Academias",
      wame: "Wame Sports",
      news: "Noticias",
      documents: "Documentos",
      join: "Forma Parte",
      contact: "Contacto",
      joinCta: "Forma parte de la National League",
    },

    pages: {
      index: {
        title: "Liga de Academias Liga MX y MLS | NL Official Academies",
        description: "National League Official Academies reúne a las academias oficiales de clubes de Liga MX y MLS en una competencia juvenil regional y nacional, construida junto a Wame Sports.",
      },
      about: {
        title: "La Liga | National League Official Academies",
        description: "Nuestra misión, visión, categorías y cómo funciona la estructura competitiva de National League Official Academies.",
      },
      academies: {
        title: "Academias Participantes | National League Official Academies",
        description: "Las academias oficiales de clubes de Liga MX y MLS que participan en la National League.",
      },
      wame: {
        title: "Alianza con Wame Sports | National League Official Academies",
        description: "Cómo la alianza de la National League con Wame Sports trae análisis, video de partidos y perfiles de jugadores a cada academia.",
      },
      contact: {
        title: "Contacto | National League Official Academies",
        description: "Cómo contactar a National League Official Academies.",
      },
      join: {
        title: "Forma Parte | National League Official Academies",
        description: "Registra el equipo de tu academia o registra a un jugador para National League Official Academies.",
      },
      news: {
        title: "Noticias | National League Official Academies",
        description: "Novedades del torneo, convocatorias y resultados de National League Official Academies.",
      },
      documents: {
        title: "Documentos | National League Official Academies",
        description: "Reglamentos, convocatorias y calendarios de National League Official Academies.",
      },
      "privacy-policy": {
        title: "Aviso de Privacidad | National League Official Academies",
        description: "Cómo National League Official Academies recopila, usa y protege la información.",
      },
      "terms-conditions": {
        title: "Términos y Condiciones | National League Official Academies",
        description: "Los términos que aplican al uso de este sitio y al registro en National League Official Academies.",
      },
      "cookie-policy": {
        title: "Política de Cookies | National League Official Academies",
        description: "Qué almacena este sitio web en tu navegador.",
      },
      "refund-policy": {
        title: "Política de Reembolsos | National League Official Academies",
        description: "Cuotas de registro, ventanas de reembolso y condiciones de cancelación de National League Official Academies.",
      },
      accessibility: {
        title: "Accesibilidad | National League Official Academies",
        description: "Nuestro compromiso de accesibilidad y cómo reportar un problema.",
      },
    },

    news: {
      eyebrow: "Noticias",
      title: "Noticias",
      lead: "Novedades de National League Official Academies.",
      keyDatesTitle: "Fechas importantes",
      filters: { all: "Todas", torneo: "Torneo", convocatoria: "Convocatoria", resultados: "Resultados", general: "General" },
      empty: "Todavía no hay publicaciones para este filtro.",
      sample: "Ejemplo",
    },

    documents: {
      eyebrow: "Documentos",
      title: "Documentos",
      lead: "Reglamentos, convocatorias y calendarios. Los archivos se agregan aquí conforme se publican — no requiere inicio de sesión aparte.",
      searchPlaceholder: "Buscar documentos…",
      categories: { reglamentos: "Reglamentos", convocatorias: "Convocatorias", calendarios: "Calendarios", formatos: "Formatos" },
      empty: "Todavía no se han publicado documentos en esta categoría.",
    },

    join: {
      eyebrow: "Comienza Hoy",
      title: "Forma parte de la National League",
      lead: "Dos formas de unirte: registra el equipo de tu academia, o registra a un jugador. Cada una abre un formulario corto de Google en una pestaña nueva.",
      feesNote: "Las cuotas de registro no se publican en este sitio. Una vez que se envíe el formulario de registro de tu equipo o jugador y cumplas los requisitos de elegibilidad de la liga, la cuota correspondiente se te comunicará directamente — consulta la página de <a href=\"REFUND_HREF\">Política de Reembolsos</a> para saber cómo funcionan los reembolsos, o <a href=\"CONTACT_HREF\">contáctanos</a> si tienes preguntas.",
      teams: {
        title: "Equipos / Academias",
        audience: "Para academias oficiales de clubes de Liga MX o MLS que quieran inscribirse en la liga.",
        asksFor: "El formulario pide el nombre de tu academia, el club afiliado, ciudad/estado, las categorías en las que participarás, y el nombre, cargo, correo y teléfono de una persona de contacto.",
        privacyNotice: "Recopilamos esta información para revisar y procesar el registro de tu academia. El formulario está alojado en Google; National League Official Academies recibe las respuestas. Los datos se conservan hasta 24 meses después de que termine la temporada. Consulta el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> para más detalles. Nunca vendemos esta información.",
        consentLabel: "He leído y acepto el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> y los <a href=\"TERMS_HREF\">Términos y Condiciones</a>.",
        openLabel: "Abrir formulario de registro de equipos",
        errorMessage: "Marca la casilla de arriba antes de abrir el formulario.",
      },
      players: {
        title: "Jugadores",
        audience: "Para jugadores que quieran registrarse con una academia participante. Un padre, madre o tutor legal debe completar este formulario para cualquier persona menor de 18 años.",
        asksFor: "El formulario pide el nombre del jugador y su año de nacimiento, academia/club actual, posición, y el nombre, correo y teléfono del tutor — además de las preguntas de consentimiento de abajo. No pedimos dirección particular, números de identificación, escuela, información médica ni fotos al momento del registro.",
        privacyNotice: "Recopilamos esta información para ubicar al jugador en la categoría correcta y registrarlo en la liga. El formulario está alojado en Google; National League Official Academies recibe las respuestas. Los datos se conservan hasta 24 meses después de que termine la temporada. Consulta el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> para más detalles. Nunca vendemos esta información.",
        consentLabel: "He leído y acepto el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> y los <a href=\"TERMS_HREF\">Términos y Condiciones</a>.",
        guardianLabel: "Soy el padre, madre o tutor legal del jugador, o el jugador es mayor de 18 años.",
        openLabel: "Abrir formulario de registro de jugadores",
        errorMessage: "Marca ambas casillas de arriba antes de abrir el formulario.",
      },
      opensNewTabNote: "Abre el formulario de Google en una pestaña nueva.",
    },

    contact: {
      eyebrow: "Contacto",
      title: "Ponte en contacto",
      lead: "Preguntas sobre el registro, las categorías o la liga en general — contáctanos por cualquiera de estos medios.",
      emailTitle: "Correo electrónico",
      phoneTitle: "Teléfono",
      socialTitle: "Redes sociales",
      joinTitle: "¿Quieres registrarte?",
      joinText: "El registro de equipos y jugadores se hace en la página Forma Parte, no por correo electrónico.",
      joinCta: "Ir a Forma Parte",
      noneYet: "Los datos de contacto se publicarán aquí antes del lanzamiento.",
    },

    wame: {
      eyebrow: "Socio Tecnológico",
      title: "Construida junto a Wame Sports.",
      lead: "Wame Sports es el socio tecnológico de la liga y aporta herramientas de datos y visibilidad a cada academia y jugador de la National League.",
      introText: "Mediante la innovación tecnológica y nuestra alianza con Wame Sports, incorporamos herramientas de análisis, videos de partidos y perfiles deportivos que buscan ampliar la visibilidad del talento juvenil y generar nuevas oportunidades de proyección.",
      features: [
        { title: "Análisis", body: "Herramientas de datos de partidos y rendimiento que ayudan a entrenadores y academias a dar seguimiento al desarrollo del jugador durante toda la temporada, no solo en un resultado." },
        { title: "Video de Partidos", body: "Video de los partidos de la liga, para que el rendimiento de un jugador pueda revisarse, compartirse y usarse para apoyar su desarrollo." },
        { title: "Perfiles de Jugador", body: "Un perfil para cada jugador registrado que reúne su categoría, academia e historial de partidos en un solo lugar." },
      ],
      noteTitle: "Qué significa esto para las familias",
      noteText: "Las herramientas de Wame Sports se brindan a través de la alianza tecnológica de la liga y se usan para apoyar el desarrollo y la visibilidad del jugador. Cualquier uso de la foto, video o perfil de un jugador más allá de la operación de la liga requiere el consentimiento de medios por separado y opcional descrito en la página Forma Parte y en el Aviso de Privacidad — nunca es obligatorio para registrarse.",
      cta: "Ver cómo unirte",
    },

    academies: {
      eyebrow: "Academias",
      title: "Academias participantes",
      lead: "National League Official Academies reúne a las academias juveniles oficiales de estos clubes de Liga MX y MLS. La participación se refiere al programa de academia oficial de cada club, no al primer equipo.",
      ligaMxLabel: "Academia de Liga MX",
      mlsLabel: "Academia de MLS",
      note: "Los nombres y escudos de los clubes se muestran para identificar a cada academia participante. Esta lista no implica que la Liga MX, la MLS o algún club patrocinen, avalen u operen la National League.",
    },

    about: {
      eyebrow: "Nosotros",
      title: "Más que una liga. Una plataforma de desarrollo, competencia y oportunidad.",
      lead: "National League Official Academies es una liga de fútbol formativo creada para reunir, organizar y fortalecer a las academias oficiales de clubes de Liga MX y MLS mediante una estructura de competencia regional y nacional.",
      whoEyebrow: "¿Quiénes Somos?",
      whoTitle: "Una comunidad de academias oficiales, construida para crecer juntas.",
      whoP1: "Nacemos con una visión clara: construir una comunidad sólida de academias que representen oficialmente la identidad de sus respectivos clubes, con un espacio de competencia organizado, reconocimiento institucional y oportunidades reales de crecimiento.",
      whoP2: "No buscamos ser solamente una liga más. Nuestro propósito es construir una plataforma que fortalezca el trabajo que ya realizan las academias oficiales, genere una competencia constante entre instituciones que comparten una misma filosofía de formación, y permita que más jóvenes futbolistas tengan acceso a experiencias competitivas de calidad.",
      identityEyebrow: "Nuestra Identidad",
      identityTitle: "Solamente academias oficiales.",
      identityP1: "Uno de nuestros principales objetivos es reconocer, fortalecer y distinguir a las academias que cuentan con una relación oficial y vigente con sus respectivos clubes.",
      identityP2: "Creemos en el valor de la identidad institucional, el respaldo de los clubes y el compromiso que representa formar parte de una estructura oficial. Por ello, la National League está dirigida exclusivamente a academias filiales oficiales de clubes de Liga MX y MLS que cumplan con los requisitos establecidos.",
      identityP3: "Queremos construir una red sólida de instituciones que compartan el compromiso de desarrollar futbolistas, fortalecer sus proyectos deportivos y representar con orgullo los colores y la identidad de sus clubes.",
      missionEyebrow: "Nuestra Misión",
      missionTitle: "Fortalecer la competencia y el desarrollo del jugador.",
      missionP1: "Nuestra misión es reunir a las academias oficiales de clubes de Liga MX y MLS bajo una misma estructura competitiva, para que los jugadores entrenen y compitan a un nivel consistentemente más alto durante toda la temporada.",
      missionP2: "Cada partido, torneo y categoría está organizado para apoyar el desarrollo real del jugador — no solo los resultados — junto a las academias y cuerpos técnicos que ya hacen ese trabajo todos los días.",
      visionEyebrow: "Nuestra Visión",
      visionTitle: "Un camino claro de la academia a la proyección.",
      visionP1: "Queremos que la National League se convierta en la estructura competitiva de referencia para las academias oficiales en Estados Unidos — una donde competir a un nivel alto y ser visto por scouts y entrenadores vayan de la mano, apoyados por las herramientas que Wame Sports aporta a la liga.",
      howEyebrow: "Cómo Funciona la Liga",
      howTitle: "Una estructura regional y nacional.",
      howItems: [
        { title: "Solo Academias Oficiales", body: "Cada equipo participante pertenece a la academia juvenil oficial de un club de Liga MX o MLS — no existe un camino abierto o de clubes independientes hacia esta competencia." },
        { title: "Competencia Regional", body: "Las academias compiten primero dentro de su región, manteniendo los traslados razonables mientras elevan el nivel de juego semana a semana." },
        { title: "Estructura Nacional", body: "Los resultados regionales alimentan una estructura nacional que reúne a los equipos de academia más fuertes en cada categoría." },
        { title: "Cuatro Categorías Obligatorias", body: "Sub 17, Sub 15, Sub 13 y Sub 11 — toda academia oficial debe inscribir las cuatro, para que los jugadores compitan contra otros de su misma edad y etapa de desarrollo." },
      ],
      categoriesEyebrow: "Una Estructura Sólida de Competencia",
      categoriesTitle: "Sub 17 · Sub 15 · Sub 13 · Sub 11",
      categoriesText: "La solidez de una liga se construye a través del compromiso de sus participantes. Por ello, nuestro modelo contempla la participación de cuatro categorías obligatorias por academia: esto garantiza la continuidad competitiva de los equipos de la academia y hace que la propia academia sea más sólida y más fuerte, temporada tras temporada.",
      categoryYears: [
        { code: "Sub 17", title: "Sub 17", years: "2010–2011" },
        { code: "Sub 15", title: "Sub 15", years: "2012–2013" },
        { code: "Sub 13", title: "Sub 13", years: "2014–2015" },
        { code: "Sub 11", title: "Sub 11", years: "2016–2017" },
      ],
      categoriesP2: "Nuestra organización contempla una primera etapa regional, dividida en grupos que permiten reducir las distancias de traslado y favorecer la participación de las academias. Conforme crezca la liga y se consoliden nuevas regiones, se abrirán oportunidades para disputar instancias nacionales, con finales entre los equipos campeones de cada grupo o región.",
      techEyebrow: "Tecnología e Innovación",
      techTitle: "Construida junto a Wame Sports.",
      techText: "A través de ProyecTal, nuestra propia plataforma construida junto con nuestro socio tecnológico Wame Sports, los partidos que cada equipo juega como local son grabados — dando a los jugadores video de sus partidos, un resumen de sus mejores momentos y un perfil deportivo individual que concentra su historial, estadísticas y evolución a lo largo de las temporadas. Estas herramientas ayudan a que el talento juvenil se muestre ante scouts, agentes e instituciones que buscan jugadores.",
      techCta: "Conoce cómo funciona Wame Sports",
      commitmentEyebrow: "Nuestro Compromiso",
      commitmentTitle: "Una liga. Grandes academias. Una misma visión.",
      commitmentP1: "Creemos en el fútbol como una herramienta de desarrollo, formación y crecimiento. Creemos en las academias que trabajan día a día para formar jugadores y personas. Creemos en la competencia como un medio para elevar el nivel deportivo, y en la tecnología como una herramienta para abrir nuevas posibilidades.",
      commitmentClosing: "El talento nos une. La competencia nos impulsa. El futuro nos pertenece.",
      faqEyebrow: "Preguntas",
      faqTitle: "Preguntas frecuentes",
      faqItems: [
        { q: "¿Quién puede unirse a la National League?", a: "La participación está abierta a las academias juveniles oficiales de clubes de Liga MX y MLS. Los jugadores se registran a través del equipo de su academia; los jugadores que aún no son parte de una academia oficial pueden comenzar en el enlace de registro de jugadores en la página Forma Parte, el cual se revisa caso por caso." },
        { q: "¿Cuáles son las categorías de edad?", a: "Cuatro categorías: Sub 17, Sub 15, Sub 13 y Sub 11 (U17, U15, U13 y U11)." },
        { q: "¿Las academias deben inscribir las cuatro categorías de edad?", a: "Sí. Toda academia oficial está obligada a inscribir las cuatro categorías — Sub 17, Sub 15, Sub 13 y Sub 11 — para garantizar un crecimiento competitivo continuo y hacer que la propia academia sea más sólida y más fuerte." },
        { q: "¿Cuándo inicia la temporada?", a: "La temporada está programada para iniciar en febrero de 2027." },
        { q: "¿Tiene costo el registro?", a: "Sí. Las cuotas de registro no se publican en el sitio — una vez que se envíe el formulario de registro de tu academia o jugador y cumplas los requisitos de elegibilidad de la liga, la cuota se te comunicará directamente. Consulta la página de Política de Reembolsos para saber cómo funcionan los reembolsos." },
        { q: "¿Qué es Wame Sports?", a: "Wame Sports es el socio tecnológico de la liga y aporta herramientas de análisis, video de partidos y perfiles de jugadores que apoyan el desarrollo y la proyección de los jugadores. Consulta la página de Wame Sports para más detalles." },
      ],
    },

    common: {
      skipToContent: "Saltar al contenido",
      backHome: "Volver al inicio",
      readMore: "Leer más",
      opensNewTab: "(se abre en una pestaña nueva)",
    },

    menu: {
      open: "Abrir menú",
      close: "Cerrar menú",
    },

    backToTop: "Volver arriba",

    langHint: {
      text: "Prefer English? View in English.",
      dismiss: "Cerrar",
    },

    hero: {
      h1: "La liga juvenil de las academias oficiales de Liga MX y MLS",
      title: "Compite con propósito. Desarrolla con visión. Proyecta el futuro.",
      body: "La National League Official Academies es una liga creada para reunir a las academias oficiales de clubes de la Liga MX y la MLS, fortaleciendo la competencia, el desarrollo y la proyección de jóvenes futbolistas a través de una estructura competitiva regional y nacional.",
      cta: "Forma parte de la National League",
      badgeLine1: "Inicio",
      badgeLine2: "Febrero 2027",
      categories: ["SUB 17", "SUB 15", "SUB 13", "SUB 11"],
    },

    marquee: {
      heading: "Academias participantes",
    },

    home: {
      introEyebrow: "Quiénes Somos",
      introTitle: "Una liga. Grandes academias. Una misma visión.",
      introText: "National League Official Academies reúne a las academias oficiales de clubes de la Liga MX y la MLS bajo una misma estructura competitiva regional y nacional, elevando el nivel de juego y creando un camino claro para el desarrollo de los jugadores.",
      wameEyebrow: "Tecnología y Proyección",
      wameTitle: "Construida junto a Wame Sports.",
      wameText: "Mediante la innovación tecnológica y nuestra alianza con Wame Sports, incorporamos herramientas de análisis, videos de partidos y perfiles deportivos que buscan ampliar la visibilidad del talento juvenil y generar nuevas oportunidades de proyección.",
      wameCta: "Más sobre Wame Sports",
      commitmentEyebrow: "Nuestro Compromiso",
      commitmentTitle: "Academias, competencia y tecnología — hacia el mismo futuro.",
      commitmentText: "Nuestro compromiso es impulsar el crecimiento de las academias oficiales, elevar el nivel competitivo y construir una plataforma donde el talento, la formación y la tecnología se unan para contribuir al futuro del fútbol.",
      exploreEyebrow: "Explora",
      exploreTitle: "Conoce la National League",
      exploreItems: [
        { title: "La Liga", text: "Nuestra misión, visión y cómo funciona la liga." },
        { title: "Academias", text: "Las academias participantes de Liga MX y MLS." },
        { title: "Wame Sports", text: "Análisis, video de partidos y perfiles de jugadores." },
        { title: "Noticias", text: "Novedades del torneo, convocatorias y resultados." },
        { title: "Documentos", text: "Reglamentos, convocatorias y calendarios." },
        { title: "Forma Parte", text: "Registra un equipo o a un jugador." },
      ],
      newsEyebrow: "Últimas Noticias",
      newsTitle: "Lo que pasa en la liga",
      ctaEyebrow: "Comienza Hoy",
      ctaTitle: "¿Listo para ser parte de la National League?",
      ctaBody: "Registra el equipo de tu academia o registra a un jugador para dar el primer paso hacia la National League Official Academies.",
      registerTeam: "Registrar mi equipo",
      registerPlayer: "Registrar a un jugador",
    },

    footer: {
      tagline: "Una liga creada para las academias oficiales de clubes de Liga MX y MLS, construida junto a Wame Sports para fortalecer la competencia, el desarrollo y la proyección de los jugadores.",
      explore: "Explorar",
      follow: "Síguenos",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      legal: "Legal",
      links: {
        privacy: "Aviso de Privacidad",
        terms: "Términos y Condiciones",
        cookies: "Política de Cookies",
        refund: "Política de Reembolsos",
        accessibility: "Accesibilidad",
      },
      trademarkWithLogos: "Los nombres y escudos de los clubes son marcas de sus respectivos dueños.",
      trademarkNamesOnly: "Los nombres de los clubes son marcas de sus respectivos dueños. National League Official Academies no es operada por la Liga MX ni la MLS.",
    },
  },
};

const LANG_KEY = "nl-lang";
const SUPPORTED = ["en", "es"];

export function getStoredLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) {
    /* localStorage blocked — fall back to default */
  }
  return null;
}

export function storeLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    /* ignore */
  }
}

export function lookup(lang, path) {
  return path.split(".").reduce(function (obj, key) {
    return obj == null ? undefined : obj[key];
  }, translations[lang]);
}
