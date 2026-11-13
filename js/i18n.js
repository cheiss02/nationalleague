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
        title: "Invited Academies | National League Official Academies",
        description: "The official Liga MX and MLS club academies invited to the National League.",
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
        description: "Registration fees, refund terms, and season cancellations for National League Official Academies.",
      },
      accessibility: {
        title: "Accessibility | National League Official Academies",
        description: "Our accessibility commitment and how to report a problem.",
      },
    },

    news: {
      title: "News",
      lead: "Updates from the National League Official Academies.",
      keyDatesTitle: "Key dates",
      filters: { all: "All", torneo: "Tournament", convocatoria: "Call for registration", resultados: "Results", general: "General" },
      empty: "No news posts match this filter yet.",
      sample: "Sample",
    },

    documents: {
      title: "Documents",
      lead: "Rules, calls for registration, and calendars. Files are added here as they're published — no separate login required.",
      searchPlaceholder: "Search documents…",
      categories: { reglamentos: "Rules & Regulations", convocatorias: "Calls for Registration", calendarios: "Calendars", formatos: "Forms" },
      empty: "No documents match your search.",
      comingSoon: "Coming soon.",
    },

    join: {
      title: "Join the National League",
      lead: "Two ways to join: register your academy's team, or register a player. Pick one below and fill out the short form.",
      chooserTitle: "Who's registering?",
      missingTerms: "Accept the Privacy Policy and Terms &amp; Conditions to continue.",
      missingGuardian: "Confirm you're the player's parent or legal guardian, or that the player is 18 or older.",
      chooseAcademy: "I run an academy",
      chooseAcademyHint: "Register your official academy's teams.",
      choosePlayer: "I'm registering a player",
      choosePlayerHint: "Players and guardians start here.",
      noJs: "The registration form needs JavaScript to send. Turn it on and reload this page, or <a href=\"CONTACT_HREF\">contact us</a>.",
      feesNote: "Registration fees aren't published on this site. Once your team's or player's registration form is submitted and you meet the league's eligibility requirements, the applicable fee is communicated to you directly — see the <a href=\"REFUND_HREF\">Refund Policy</a> page for how refunds work, or <a href=\"CONTACT_HREF\">contact us</a> with questions.",
      teams: {
        title: "Teams / Academies",
        audience: "For official academies of Liga MX or MLS clubs that want to enter the league.",
        consentLabel: "I have read and accept the <a href=\"PRIVACY_HREF\">Privacy Policy</a> and the <a href=\"TERMS_HREF\">Terms &amp; Conditions</a>.",
        formIntro: "Through this form we get to know your organization, its representatives, the categories it has today, and the ones it plans to add. Our team will contact you with more information about the project, participation requirements, and next steps.",
        privacyNotice: "We collect this information to review your academy's registration and contact you about it. Your answers are sent to National League Official Academies by email and kept in the league's records for up to 24 months after the season ends. See the <a href=\"PRIVACY_HREF\">Privacy Policy</a> for details. We never sell this information.",
      },
      players: {
        title: "Players",
        audience: "For players who want to be registered with an invited academy. A parent or legal guardian must complete this form for anyone under 18.",
        consentLabel: "I have read and accept the <a href=\"PRIVACY_HREF\">Privacy Policy</a> and the <a href=\"TERMS_HREF\">Terms &amp; Conditions</a>.",
        guardianLabel: "I am the player's parent, mother, father, or legal guardian, or the player is 18 or older.",
        privacyNotice: "We collect this information to place the player in the correct category and register them with the league. Your answers are sent to National League Official Academies by email and kept in the league's records for up to 24 months after the season ends. We do not ask for a home address, ID numbers, school, medical information, or photos at sign-up. See the <a href=\"PRIVACY_HREF\">Privacy Policy</a> for details. We never sell this information.",
      },
      form: {
        "allRequired": "All fields are required unless marked optional.",
        "choose": "Select…",
        "optional": "optional",
        "required": "Fill in this field.",
        "requiredSelect": "Choose an option.",
        "email": "Enter a valid email address, like name@example.com.",
        "phone": "Enter a phone number with at least 7 digits.",
        "fix": "Some answers need attention. Check the highlighted fields.",
        "sending": "Sending your registration…",
        "failed": "We couldn't send your registration. Your answers are still here, so try again, or email us at EMAIL.",
        "successTitle": "Registration sent",
        "successBody": "Thank you. The league will review your registration and contact you using the details you gave.",
        "website": "Leave this field empty",
        "yes": "Yes",
        "no": "No",
        "teams": {
          "academy": "Official name of the club or academy",
          "club": "Club it's affiliated with",
          "state": "State or province",
          "city": "City",
          "facilitiesAddress": "Address or location of your sports facilities",
          "ownFacilities": "Do you currently have your own facilities or training fields available?",
          "yes": "Yes",
          "no": "No",
          "categoriesPlayers": "How many categories do you have running today, and how many players?",
          "links": "Links to your social media and website, if you have them",
          "contactName": "Full name of the person responsible for the club or academy",
          "contactRole": "Their role at the organization",
          "contactPhone": "Phone number",
          "contactEmail": "Contact email",
          "contactByPhone": "You may contact me about the registration by phone as well as email.",
          "submit": "Send team registration",
          "mailSubject": "Team registration"
        },
        "players": {
          "playerName": "Player's full name",
          "birthYear": "Birth year",
          "position": "Position",
          "positions": [
            "Goalkeeper",
            "Defender",
            "Midfielder",
            "Forward"
          ],
          "currentClub": "Current academy or club",
          "guardianName": "Parent or guardian's full name",
          "guardianEmail": "Parent or guardian's email",
          "guardianPhone": "Parent or guardian's phone",
          "mediaLabel": "I consent to National League Official Academies and Wame Sports using the player's photo/video in league media and player profiles.",
          "submit": "Send player registration",
          "mailSubject": "Player registration"
        }
      },
    },

    contact: {
      title: "Get in touch",
      lead: "Questions about registration, categories, or the league in general? Send us a message, or use any of the channels on this page.",
      emailTitle: "Email",
      phoneTitle: "Phone",
      socialTitle: "Social",
      joinTitle: "Want to register instead?",
      joinText: "Team and player registration happens on the Join page, not by email.",
      joinCta: "Go to the Join page",
      noneYet: "Contact details will be published here before launch.",
      form: {
        "title": "Send us a message",
        "notice": "We use your details only to answer your message. Messages are sent to the league by email and kept only as long as needed to respond. See the <a href=\"PRIVACY_HREF\">Privacy Policy</a>.",
        "name": "Full name",
        "email": "Email",
        "phone": "Phone",
        "message": "Message",
        "submit": "Send message",
        "mailSubject": "Website message",
        "sending": "Sending your message…",
        "failed": "We couldn't send your message. It's still here, so try again, or email us at EMAIL.",
        "successTitle": "Message sent",
        "successBody": "Thank you. We'll reply to the email you gave.",
        "noJs": "This form needs JavaScript to send. You can also email us at EMAIL."
      },
    },

    wame: {
      title: "Built with Wame Sports.",
      lead: "Wame Sports is the league's technology partner, bringing data and visibility tools to every academy and player in the National League.",
      introText: "Through technological innovation and our partnership with Wame Sports, we bring in analytics tools, match video, and player profiles that aim to expand the visibility of young talent and open new paths for projection.",
      features: [
        { title: "Analytics", body: "Match and performance data tools that help coaches and academies track player development over a season, not just a single result." },
        { title: "Match Video", body: "Video from league matches, so a player's performances can be reviewed, shared, and used to support their development." },
        { title: "Player Profiles", body: "A profile for each registered player that brings together their category, academy, and match history in one place." },
      ],
      featuresTitle: "What Wame brings to the league",
      noteTitle: "What this means for families",
      noteText: "Wame Sports tools are provided through the league's technology partnership and are used to support player development and visibility. Any use of a player's photo, video, or profile beyond league operations requires the separate, optional media consent described on the Join page and in the Privacy Policy — it is never required to register.",
      cta: "See how to join",
    },

    academies: {
      title: "Invited academies",
      lead: "National League Official Academies brings together the official youth academies of these Liga MX and MLS clubs. Participation refers to each club's official academy program, not the first team.",
      ligaMxLabel: "Liga MX Academy",
      mlsLabel: "MLS Academy",
      note: "Club names and crests are shown to identify each invited academy. This list does not imply that Liga MX, MLS, or any club sponsors, endorses, or operates the National League.",
    },

    about: {
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
      categoriesTitle: "U17 · U15 · U13 · U11",
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
      heading: "Invited academies",
      pause: "Pause the logos",
      play: "Play the logos",
    },

    home: {
      commitmentHeading: "Our commitment",
      pillars: [
        { title: "One league.", body: "Raise the competitive level." },
        { title: "Great academies.", body: "Drive the growth of official academies." },
        { title: "One shared vision.", body: "Build a platform where talent, development, and technology come together to contribute to the future of soccer." },
      ],
      wameTitle: "Built with Wame Sports.",
      wameText: "Through technological innovation and our partnership with Wame Sports, we bring in analytics tools, match video, and player profiles that aim to expand the visibility of young talent and open new paths for projection.",
      wameCta: "More about Wame Sports",
      exploreTitle: "Get to know the National League",
      exploreItems: [
        { title: "About", text: "Our mission, vision, and how the league works." },
        { title: "Academies", text: "The invited Liga MX and MLS academies." },
        { title: "Wame Sports", text: "Analytics, match video, and player profiles." },
        { title: "News", text: "Tournament updates, calls, and results." },
        { title: "Documents", text: "Rules, calls for registration, and calendars." },
        { title: "Join", text: "Register a team or a player." },
      ],
      newsTitle: "What's happening in the league",
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
        title: "Academias Invitadas | National League Official Academies",
        description: "Las academias oficiales de clubes de Liga MX y MLS invitadas a la National League.",
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
        description: "Cuotas de registro, condiciones de reembolso y cancelación de temporadas de National League Official Academies.",
      },
      accessibility: {
        title: "Accesibilidad | National League Official Academies",
        description: "Nuestro compromiso de accesibilidad y cómo reportar un problema.",
      },
    },

    news: {
      title: "Noticias",
      lead: "Novedades de National League Official Academies.",
      keyDatesTitle: "Fechas importantes",
      filters: { all: "Todas", torneo: "Torneo", convocatoria: "Convocatoria", resultados: "Resultados", general: "General" },
      empty: "Todavía no hay publicaciones para este filtro.",
      sample: "Ejemplo",
    },

    documents: {
      title: "Documentos",
      lead: "Reglamentos, convocatorias y calendarios. Los archivos se agregan aquí conforme se publican — no requiere inicio de sesión aparte.",
      searchPlaceholder: "Buscar documentos…",
      categories: { reglamentos: "Reglamentos", convocatorias: "Convocatorias", calendarios: "Calendarios", formatos: "Formatos" },
      empty: "Ningún documento coincide con tu búsqueda.",
      comingSoon: "Próximamente.",
    },

    join: {
      title: "Forma parte de la National League",
      lead: "Dos formas de unirte: registra el equipo de tu academia, o registra a un jugador. Elige una abajo y llena el formulario corto.",
      chooserTitle: "¿Quién se registra?",
      missingTerms: "Acepta el Aviso de Privacidad y los Términos y Condiciones para continuar.",
      missingGuardian: "Confirma que eres el padre, madre o tutor legal del jugador, o que el jugador es mayor de 18 años.",
      chooseAcademy: "Dirijo una academia",
      chooseAcademyHint: "Registra los equipos de tu academia oficial.",
      choosePlayer: "Voy a registrar a un jugador",
      choosePlayerHint: "Jugadores, padres y tutores empiezan aquí.",
      noJs: "El formulario de registro necesita JavaScript para enviarse. Actívalo y recarga esta página, o <a href=\"CONTACT_HREF\">contáctanos</a>.",
      feesNote: "Las cuotas de registro no se publican en este sitio. Una vez que se envíe el formulario de registro de tu equipo o jugador y cumplas los requisitos de elegibilidad de la liga, la cuota correspondiente se te comunicará directamente — consulta la página de <a href=\"REFUND_HREF\">Política de Reembolsos</a> para saber cómo funcionan los reembolsos, o <a href=\"CONTACT_HREF\">contáctanos</a> si tienes preguntas.",
      teams: {
        title: "Equipos / Academias",
        audience: "Para academias oficiales de clubes de Liga MX o MLS que quieran inscribirse en la liga.",
        consentLabel: "He leído y acepto el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> y los <a href=\"TERMS_HREF\">Términos y Condiciones</a>.",
        formIntro: "A través de este formulario podremos conocer tu institución, establecer contacto con sus representantes y conocer las categorías con las que cuenta, así como aquellas que tiene proyectado integrar. Nuestro equipo se pondrá en contacto contigo para brindarte más información sobre el proyecto, los requisitos de participación y los siguientes pasos.",
        privacyNotice: "Recopilamos esta información para revisar el registro de tu academia y contactarte al respecto. Tus respuestas se envían por correo a National League Official Academies y se conservan en los registros de la liga hasta 24 meses después de que termine la temporada. Consulta el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> para más detalles. Nunca vendemos esta información.",
      },
      players: {
        title: "Jugadores",
        audience: "Para jugadores que quieran registrarse con una academia invitada. Un padre, madre o tutor legal debe completar este formulario para cualquier persona menor de 18 años.",
        consentLabel: "He leído y acepto el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> y los <a href=\"TERMS_HREF\">Términos y Condiciones</a>.",
        guardianLabel: "Soy el padre, madre o tutor legal del jugador, o el jugador es mayor de 18 años.",
        privacyNotice: "Recopilamos esta información para ubicar al jugador en la categoría correcta y registrarlo en la liga. Tus respuestas se envían por correo a National League Official Academies y se conservan en los registros de la liga hasta 24 meses después de que termine la temporada. No pedimos dirección particular, números de identificación, escuela, información médica ni fotos al momento del registro. Consulta el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a> para más detalles. Nunca vendemos esta información.",
      },
      form: {
        "allRequired": "Todos los campos son obligatorios, salvo los marcados como opcionales.",
        "choose": "Selecciona…",
        "optional": "opcional",
        "required": "Completa este campo.",
        "requiredSelect": "Elige una opción.",
        "email": "Escribe un correo válido, como nombre@ejemplo.com.",
        "phone": "Escribe un teléfono de al menos 7 dígitos.",
        "fix": "Algunas respuestas necesitan atención. Revisa los campos marcados.",
        "sending": "Enviando tu registro…",
        "failed": "No pudimos enviar tu registro. Tus respuestas siguen aquí; inténtalo de nuevo o escríbenos a EMAIL.",
        "successTitle": "Registro enviado",
        "successBody": "Gracias. La liga revisará tu registro y se pondrá en contacto contigo con los datos que nos diste.",
        "website": "Deja este campo vacío",
        "yes": "Sí",
        "no": "No",
        "teams": {
          "academy": "Nombre oficial del club o academia",
          "club": "Nombre del club al que está afiliado",
          "state": "Estado o provincia",
          "city": "Ciudad",
          "facilitiesAddress": "Dirección o ubicación de sus instalaciones deportivas",
          "ownFacilities": "¿Actualmente cuenta con instalaciones propias o campos de entrenamiento disponibles?",
          "yes": "Sí",
          "no": "No",
          "categoriesPlayers": "¿Cuántas categorías tiene actualmente en funcionamiento y cuántos jugadores?",
          "links": "Links de redes sociales y sitio web, si tiene",
          "contactName": "Nombre completo del responsable del club o academia",
          "contactRole": "Cargo que desempeña dentro de la institución",
          "contactPhone": "Número de teléfono",
          "contactEmail": "Correo electrónico de contacto",
          "contactByPhone": "Pueden contactarme sobre el registro tanto por teléfono como por correo electrónico.",
          "submit": "Enviar registro de equipo",
          "mailSubject": "Registro de equipo"
        },
        "players": {
          "playerName": "Nombre completo del jugador",
          "birthYear": "Año de nacimiento",
          "position": "Posición",
          "positions": [
            "Portero",
            "Defensa",
            "Mediocampista",
            "Delantero"
          ],
          "currentClub": "Academia o club actual",
          "guardianName": "Nombre completo del padre, madre o tutor",
          "guardianEmail": "Correo del padre, madre o tutor",
          "guardianPhone": "Teléfono del padre, madre o tutor",
          "mediaLabel": "Autorizo a National League Official Academies y a Wame Sports a usar la foto o el video del jugador en medios de la liga y perfiles de jugador.",
          "submit": "Enviar registro de jugador",
          "mailSubject": "Registro de jugador"
        }
      },
    },

    contact: {
      title: "Ponte en contacto",
      lead: "¿Preguntas sobre el registro, las categorías o la liga en general? Envíanos un mensaje o usa cualquiera de los medios de esta página.",
      emailTitle: "Correo electrónico",
      phoneTitle: "Teléfono",
      socialTitle: "Redes sociales",
      joinTitle: "¿Quieres registrarte?",
      joinText: "El registro de equipos y jugadores se hace en la página Forma Parte, no por correo electrónico.",
      joinCta: "Ir a Forma Parte",
      noneYet: "Los datos de contacto se publicarán aquí antes del lanzamiento.",
      form: {
        "title": "Envíanos un mensaje",
        "notice": "Usamos tus datos solo para responder tu mensaje. Los mensajes se envían por correo a la liga y se conservan solo el tiempo necesario para responder. Consulta el <a href=\"PRIVACY_HREF\">Aviso de Privacidad</a>.",
        "name": "Nombre completo",
        "email": "Correo electrónico",
        "phone": "Teléfono",
        "message": "Mensaje",
        "submit": "Enviar mensaje",
        "mailSubject": "Mensaje desde el sitio web",
        "sending": "Enviando tu mensaje…",
        "failed": "No pudimos enviar tu mensaje. Sigue aquí; inténtalo de nuevo o escríbenos a EMAIL.",
        "successTitle": "Mensaje enviado",
        "successBody": "Gracias. Te responderemos al correo que nos diste.",
        "noJs": "Este formulario necesita JavaScript para enviarse. También puedes escribirnos a EMAIL."
      },
    },

    wame: {
      title: "Construida junto a Wame Sports.",
      lead: "Wame Sports es el socio tecnológico de la liga y aporta herramientas de datos y visibilidad a cada academia y jugador de la National League.",
      introText: "Mediante la innovación tecnológica y nuestra alianza con Wame Sports, incorporamos herramientas de análisis, videos de partidos y perfiles deportivos que buscan ampliar la visibilidad del talento juvenil y generar nuevas oportunidades de proyección.",
      features: [
        { title: "Análisis", body: "Herramientas de datos de partidos y rendimiento que ayudan a entrenadores y academias a dar seguimiento al desarrollo del jugador durante toda la temporada, no solo en un resultado." },
        { title: "Video de Partidos", body: "Video de los partidos de la liga, para que el rendimiento de un jugador pueda revisarse, compartirse y usarse para apoyar su desarrollo." },
        { title: "Perfiles de Jugador", body: "Un perfil para cada jugador registrado que reúne su categoría, academia e historial de partidos en un solo lugar." },
      ],
      featuresTitle: "Lo que Wame aporta a la liga",
      noteTitle: "Qué significa esto para las familias",
      noteText: "Las herramientas de Wame Sports se brindan a través de la alianza tecnológica de la liga y se usan para apoyar el desarrollo y la visibilidad del jugador. Cualquier uso de la foto, video o perfil de un jugador más allá de la operación de la liga requiere el consentimiento de medios por separado y opcional descrito en la página Forma Parte y en el Aviso de Privacidad — nunca es obligatorio para registrarse.",
      cta: "Ver cómo unirte",
    },

    academies: {
      title: "Academias invitadas",
      lead: "National League Official Academies reúne a las academias juveniles oficiales de estos clubes de Liga MX y MLS. La participación se refiere al programa de academia oficial de cada club, no al primer equipo.",
      ligaMxLabel: "Academia de Liga MX",
      mlsLabel: "Academia de MLS",
      note: "Los nombres y escudos de los clubes se muestran para identificar a cada academia invitada. Esta lista no implica que la Liga MX, la MLS o algún club patrocinen, avalen u operen la National League.",
    },

    about: {
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
      heading: "Academias invitadas",
      pause: "Pausar los logotipos",
      play: "Reproducir los logotipos",
    },

    home: {
      commitmentHeading: "Nuestro compromiso",
      pillars: [
        { title: "Una liga.", body: "Elevar el nivel competitivo." },
        { title: "Grandes academias.", body: "Impulsar el crecimiento de las academias oficiales." },
        { title: "Una misma visión.", body: "Construir una plataforma donde el talento, la formación y la tecnología se unan para contribuir al futuro del fútbol." },
      ],
      wameTitle: "Construida junto a Wame Sports.",
      wameText: "Mediante la innovación tecnológica y nuestra alianza con Wame Sports, incorporamos herramientas de análisis, videos de partidos y perfiles deportivos que buscan ampliar la visibilidad del talento juvenil y generar nuevas oportunidades de proyección.",
      wameCta: "Más sobre Wame Sports",
      exploreTitle: "Conoce la National League",
      exploreItems: [
        { title: "La Liga", text: "Nuestra misión, visión y cómo funciona la liga." },
        { title: "Academias", text: "Las academias invitadas de Liga MX y MLS." },
        { title: "Wame Sports", text: "Análisis, video de partidos y perfiles de jugadores." },
        { title: "Noticias", text: "Novedades del torneo, convocatorias y resultados." },
        { title: "Documentos", text: "Reglamentos, convocatorias y calendarios." },
        { title: "Forma Parte", text: "Registra un equipo o a un jugador." },
      ],
      newsTitle: "Lo que pasa en la liga",
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
