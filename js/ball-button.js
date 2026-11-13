/* Soccer-ball "kick" click animation for every .btn.

   Kick sequence: label fades, a tinted band fills the button while the
   ball rolls across (spinning, with a small hop) over 1s. Then the
   button's link is followed, respecting target="_blank", or, for a button
   with no href, "GOAL! ⚽" shows briefly. Under prefers-reduced-motion the
   whole sequence is skipped straight to the outcome (no delay).

   Form submit buttons are left to registration-form.js, which runs the
   same kick while it sends. */

(function () {
  var KICK_MS = 1000;
  var GOAL_RESET_MS = 2000;

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function runKick(btn, onDone) {
    if (btn.classList.contains("is-running")) return;
    var ms = reduceMotion() ? 0 : KICK_MS;
    btn.classList.add("is-running");
    window.setTimeout(function () {
      btn.classList.remove("is-running");
      onDone();
    }, ms);
  }

  function followLink(btn) {
    var href = btn.getAttribute("href");
    if (!href) {
      var label = btn.querySelector("[data-ball-label]");
      var goalText = label ? label.getAttribute("data-goal-text") : null;
      if (label && goalText) {
        var original = label.getAttribute("data-ball-label");
        btn.classList.add("is-done");
        label.textContent = goalText;
        window.setTimeout(function () {
          btn.classList.remove("is-done");
          label.textContent = original;
        }, GOAL_RESET_MS);
      }
      return;
    }
    if (btn.getAttribute("target") === "_blank") {
      var rel = (btn.getAttribute("rel") || "").split(/\s+/);
      var features = rel.indexOf("noopener") !== -1 || rel.indexOf("noreferrer") !== -1 ? "noopener,noreferrer" : "";
      window.open(href, "_blank", features);
    } else {
      window.location.href = href;
    }
  }

  document.querySelectorAll(".btn").forEach(function (btn) {
    if (btn.type === "submit" && btn.form) return;

    btn.addEventListener("click", function (e) {
      /* let ctrl/cmd/shift/middle-click open in a new tab the normal way —
         only intercept a plain click to run the kick animation first */
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      runKick(btn, function () {
        followLink(btn);
      });
    });
  });
})();
