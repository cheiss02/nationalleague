/* Mobile menu, sticky-header state, back-to-top, the fade-in that runs as
   sections scroll into view, the "¿Prefieres español?" hint banner, and the
   once-on-load date-badge pulse. Header/footer markup is already static
   HTML (baked in per language by the build script) — this file only wires
   up interactivity on top of it. */

(function () {
  var header = document.querySelector("[data-header]");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector("[data-menu-toggle]");
  var backdrop = document.querySelector(".nav-backdrop");
  var toTop = document.querySelector("[data-to-top]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- mobile menu ---- */
  function openMenu() {
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", toggle.getAttribute("data-label-close"));
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", toggle.getAttribute("data-label-open"));
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) backdrop.addEventListener("click", closeMenu);

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1280) closeMenu();
    });
  }

  /* ---- sticky-header shadow + back-to-top visibility ---- */
  var ticking = false;

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
  }

  function requestScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }

  onScroll();
  window.addEventListener("scroll", requestScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---- smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- fade sections in as they scroll into view ---- */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".split, .section-head, .card-grid, .callout, .band-content, .explore-grid, .home-intro-inner, .faq-list, .club-grid, .join-grid, .news-grid, .contact-grid, .key-dates"
    )
  );

  function revealAll() {
    revealTargets.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  if ("IntersectionObserver" in window) {
    var primed = revealTargets.filter(function (el) {
      return el.getBoundingClientRect().top > window.innerHeight * 0.85;
    });
    primed.forEach(function (el) {
      el.classList.add("will-reveal");
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    primed.forEach(function (el) {
      observer.observe(el);
    });

    window.setTimeout(revealAll, 1800);
    window.addEventListener("load", function () {
      window.setTimeout(revealAll, 300);
    });
  }

  /* ---- date badge: pulse once after first paint ---- */
  var badge = document.querySelector(".date-badge");
  if (badge && !reduceMotion) {
    window.requestAnimationFrame(function () {
      badge.classList.add("pulse-once");
    });
  }

  /* ---- "¿Prefieres español?" hint banner ----
     Shown once, only on English pages, only when the browser's language
     prefers Spanish, and only if the visitor hasn't dismissed it before.
     Never auto-redirects — it's just a dismissible suggestion. */
  var hint = document.querySelector("[data-lang-hint]");
  if (hint) {
    var HINT_KEY = "nl-lang-hint-dismissed";
    var dismissed = false;
    try {
      dismissed = localStorage.getItem(HINT_KEY) === "1";
    } catch (e) {
      /* ignore */
    }
    var prefersSpanish = (navigator.languages || [navigator.language || ""]).some(function (l) {
      return /^es/i.test(l);
    });
    if (prefersSpanish && !dismissed) {
      hint.hidden = false;
    }
    var dismissBtn = hint.querySelector("[data-lang-hint-dismiss]");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        hint.hidden = true;
        try {
          localStorage.setItem(HINT_KEY, "1");
        } catch (e) {
          /* ignore */
        }
      });
    }
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
