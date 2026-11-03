/* The scrolling club/partner logo strip. The markup itself (two duplicated
   tracks for a seamless loop, the second copy aria-hidden) is static HTML
   baked in at build time — this file only does two things a static
   @keyframes animation can't:

   1. Keeps the scroll speed a constant px/s regardless of how wide the
      track ends up (item count, viewport width) by measuring the track
      and setting animation-duration directly, instead of a fixed seconds
      value that would drift slower/faster per page.
   2. Swaps to the static wrapped grid under prefers-reduced-motion, and
      keeps that in sync if the OS-level setting changes live. */

(function () {
  var PX_PER_SECOND = 42;
  var sections = document.querySelectorAll("[data-marquee]");
  if (!sections.length) return;

  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function applyMotionPreference() {
    sections.forEach(function (section) {
      section.classList.toggle("is-static", reduceQuery.matches);
    });
  }

  function sizeTrack(track) {
    var fullWidth = track.scrollWidth; // two copies back to back
    var singleWidth = fullWidth / 2;
    if (!singleWidth) return;
    var duration = singleWidth / PX_PER_SECOND;
    track.style.animationDuration = duration + "s";
  }

  function sizeAll() {
    sections.forEach(function (section) {
      section.querySelectorAll(".marquee-track").forEach(sizeTrack);
    });
  }

  applyMotionPreference();
  if (!reduceQuery.matches) sizeAll();

  if (typeof reduceQuery.addEventListener === "function") {
    reduceQuery.addEventListener("change", function () {
      applyMotionPreference();
      if (!reduceQuery.matches) sizeAll();
    });
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (!reduceQuery.matches) sizeAll();
    }, 200);
  });
})();
