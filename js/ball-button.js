/* Soccer-ball "kick" click animation for every .btn, plus the consent
   checkbox gate used on join.html.

   Kick sequence: label fades, a tinted band fills the button while the
   ball rolls across (spinning, with a small hop) over 1s. Then the
   button's link is followed — respecting target="_blank" so the Google
   Form still opens in a new tab rather than navigating the current page —
   or, for a button with no href, "GOAL! ⚽" shows briefly. Under
   prefers-reduced-motion the whole sequence is skipped straight to the
   outcome (no delay).

   The consent gate (aria-disabled pattern: focusable, but intercepted) is
   handled in the same click listener so a gated button never kicks while
   disabled. Gated buttons carry the form address in data-form-url rather
   than an href, so without this script there is no link to follow. */

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
    var group = btn.getAttribute("data-consent-for");
    var checkboxes = group ? Array.prototype.slice.call(document.querySelectorAll('[data-consent-group="' + group + '"]')) : [];
    var error = document.getElementById(btn.getAttribute("aria-describedby") || "");
    var errorText = error ? error.querySelector("[data-consent-text]") : null;

    function firstUnchecked() {
      return checkboxes.find(function (cb) {
        return !cb.checked;
      });
    }

    function nameMissing() {
      var missing = firstUnchecked();
      if (errorText && missing) errorText.textContent = missing.getAttribute("data-consent-missing");
    }

    if (checkboxes.length) {
      var sync = function () {
        var ready = checkboxes.every(function (cb) {
          return cb.checked;
        });
        btn.setAttribute("aria-disabled", ready ? "false" : "true");
        if (error) {
          error.classList.toggle("is-ready", ready);
          if (ready) error.classList.remove("is-visible");
          else if (error.classList.contains("is-visible")) nameMissing();
        }
      };
      checkboxes.forEach(function (cb) {
        cb.addEventListener("change", sync);
      });
      sync();
    }

    btn.addEventListener("click", function (e) {
      /* let ctrl/cmd/shift/middle-click open in a new tab the normal way —
         only intercept a plain click to run the kick animation first */
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      if (btn.getAttribute("aria-disabled") === "true") {
        if (error) error.classList.add("is-visible");
        nameMissing();
        var missing = firstUnchecked();
        if (missing) missing.focus();
        return;
      }

      /* opened inside the click itself so pop-up blockers allow the new tab */
      var formUrl = btn.getAttribute("data-form-url");
      if (formUrl) {
        window.open(formUrl, "_blank", "noopener,noreferrer");
        runKick(btn, function () {});
        var next = btn.parentNode.querySelector("[data-join-next]");
        if (next) {
          next.hidden = false;
          var again = next.querySelector("a");
          if (again) again.href = formUrl;
        }
        return;
      }

      runKick(btn, function () {
        followLink(btn);
      });
    });
  });
})();
