/* Single place for the league's contact details, form links, and the club/
   partner logo visibility switches. Both the browser (footer, contact page)
   and the build script (JSON-LD, llms.txt, sitemap/share-image exclusions)
   read this same file, so there is exactly one place to update any of it.

   Any contact field left empty ("") is hidden automatically — no "#"
   placeholders ever ship to the live site. */

export const SITE_CONFIG = {
  siteUrl: "https://nationalleagueusa.com",
  legalEntityName: "", // TODO: fill in before launch — used on the legal pages
  legalAddress: "", // TODO: fill in before launch — mailing address for the legal pages

  email: "nationalleague26@gmail.com",
  phone: "+1 (951) 731-2046",

  social: {
    instagram: "https://www.instagram.com/officialacademiesnl",
    facebook: "https://www.facebook.com/share/19yGj2APkp/",
    tiktok: "",
    youtube: "",
    x: "",
  },

  forms: {
    teams: "https://forms.gle/WPyyJBmizJsPh9aq5",
    players: "https://forms.gle/qmw9LNgiRo4kurkv8",
  },

  /* Club/partner crests: shown by default. Set clubs:false to hide every
     club crest (each appears as a text-only chip instead); add a club's
     slug to hiddenClubLogos to hide just that one. Hiding a crest this way
     drops it from every GENERATED page, the sitemap, JSON-LD, and (once
     process-assets.mjs is re-run) the og:image share photo — but the crest
     file itself (assets/images/clubs/<slug>.*) is not deleted and stays
     reachable by anyone who has or guesses its direct URL. Delete the file
     yourself if that matters for a given club. */
  logos: {
    clubs: true,
    wame: true,
  },
  hiddenClubLogos: ["club-america"], // pending Club América's logo-use permission — see PRE-LAUNCH-CHECKLIST.md item 1
};

/* The full club roster. "slug" matches the crest file name in
   assets/images/clubs/ (slug + ".png" or ".svg"). League is "liga-mx" or
   "mls" — used only for factual grouping, never phrased as an endorsement. */
export const CLUBS = [
  { slug: "club-america", name: "Club América", league: "liga-mx", ext: "png" },
  { slug: "chivas-guadalajara", name: "Chivas Guadalajara", league: "liga-mx", ext: "png" },
  { slug: "atlas", name: "Atlas FC", league: "liga-mx", ext: "svg" },
  { slug: "monterrey", name: "CF Monterrey", league: "liga-mx", ext: "png" },
  { slug: "tijuana", name: "Club Tijuana", league: "liga-mx", ext: "png" },
  { slug: "lafc", name: "LAFC", league: "mls", ext: "png" },
  { slug: "la-galaxy", name: "LA Galaxy", league: "mls", ext: "png" },
  { slug: "san-jose-earthquakes", name: "San Jose Earthquakes", league: "mls", ext: "png" },
];
