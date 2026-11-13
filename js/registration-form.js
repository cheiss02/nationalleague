/* The site's own forms: Teams and Players registration (join.html) and the
   message form (contact.html).

   Validates in the browser with bilingual messages from data attributes,
   then sends the answers in the background to FormSubmit (the form's
   data-endpoint, https://formsubmit.co/ajax/<league email>), which emails
   them to the league. Each answer is sent under its visible question, so
   the email reads like the form. The visitor's email app is never opened.
   No credentials are sent, so no FormSubmit cookies are sent or set.

   The very first submission to a new address makes FormSubmit email that
   inbox an "Activate Form" link; nothing is delivered until someone clicks
   it (see REGISTRATION-FORM-SETUP.md).

   The submit button runs the same ball "kick" as every other .btn;
   ball-button.js leaves form submit buttons to this file. On success the
   form is replaced by a thank-you note; on failure the answers stay and the
   league's email is offered. */

(function () {
  var forms = document.querySelectorAll("form[data-registration]");
  if (!forms.length) return;

  var KICK_MS = 1000;

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  forms.forEach(function (form) {
    var btn = form.querySelector('button[type="submit"]');
    var status = form.querySelector("[data-form-status]");
    var success = form.parentNode.querySelector("[data-form-success]");
    var msg = function (name) {
      return form.getAttribute("data-msg-" + name) || "";
    };

    function controls() {
      return Array.prototype.filter.call(form.elements, function (el) {
        /* a radio group is represented by its first radio, which carries the id */
        if (el.type === "radio" && !el.id) return false;
        return el.name && el.name !== "_honey" && el.willValidate;
      });
    }

    function checkedRadio(el) {
      return form.querySelector('input[type="radio"][name="' + el.name + '"]:checked');
    }

    function problemWith(el) {
      if (el.type === "radio") return el.required && !checkedRadio(el) ? msg("select") : "";
      if (el.type === "checkbox") return el.required && !el.checked ? el.getAttribute("data-missing") || msg("required") : "";
      var value = el.value.trim();
      if (el.required && !value) return el.tagName === "SELECT" ? msg("select") : msg("required");
      if (el.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return msg("email");
      if (el.type === "tel" && value && value.replace(/\D/g, "").length < 7) return msg("phone");
      return "";
    }

    function mark(el, text) {
      var err = document.getElementById(el.id + "-error");
      if (text) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
      if (err) {
        err.textContent = text;
        err.hidden = !text;
      }
    }

    function setStatus(html, isError) {
      status.innerHTML = html;
      status.classList.toggle("is-error", !!isError);
    }

    /* the visible question for a control, without its "(optional)" tag */
    function questionFor(el) {
      var source = el.type === "radio" ? el.closest("fieldset").querySelector("legend") : form.querySelector('label[for="' + el.id + '"]');
      if (!source) return el.name;
      var copy = source.cloneNode(true);
      copy.querySelectorAll(".field-optional").forEach(function (tag) {
        tag.remove();
      });
      return copy.textContent.replace(/\s+/g, " ").trim();
    }

    function answerFor(el) {
      if (el.type === "checkbox") return el.checked ? msg("yes") : msg("no");
      if (el.type === "radio") return checkedRadio(el) ? checkedRadio(el).value : "";
      if (el.tagName === "SELECT") return el.value ? el.options[el.selectedIndex].text : "";
      return el.value.trim();
    }

    /* FormSubmit's JSON: one entry per question, plus its own _ settings */
    function payload() {
      var data = {};
      var first = "";
      var replyTo = "";
      controls().forEach(function (el) {
        var answer = answerFor(el);
        if (!first && answer && el.type !== "checkbox") first = answer;
        if (!replyTo && el.type === "email") replyTo = answer;
        data[questionFor(el)] = answer || "-";
      });
      data._subject = form.getAttribute("data-subject") + (first ? " - " + first : "");
      if (replyTo) data._replyto = replyTo;
      data._template = "table";
      data._captcha = "false";
      return data;
    }

    /* once a field has been flagged, re-check it as the person fixes it */
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") mark(e.target, problemWith(e.target));
    });
    form.addEventListener("change", function (e) {
      var el = e.target;
      if (el.type === "radio") el = form.querySelector('input[type="radio"][name="' + el.name + '"]');
      if (el.getAttribute("aria-invalid") === "true") mark(el, problemWith(el));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;

      var firstBad = null;
      controls().forEach(function (el) {
        var problem = problemWith(el);
        mark(el, problem);
        if (problem && !firstBad) firstBad = el;
      });
      if (firstBad) {
        setStatus(msg("fix"), true);
        firstBad.focus();
        return;
      }

      /* the hidden trap field only gets filled in by bots */
      if (form.elements._honey && form.elements._honey.value) return;

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        setStatus(msg("failed"), true);
        return;
      }

      form.classList.add("is-sending");
      btn.setAttribute("aria-disabled", "true");
      if (!reduceMotion()) btn.classList.add("is-running");
      setStatus(msg("sending"), false);

      var request = fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload()),
        credentials: "omit",
      }).then(function (res) {
        return res.json().then(function (json) {
          if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "HTTP " + res.status);
          return json;
        });
      });

      /* let the ball finish its roll even when the answer comes back fast */
      Promise.all([request, wait(reduceMotion() ? 0 : KICK_MS)])
        .then(function () {
          form.hidden = true;
          success.hidden = false;
          success.focus({ preventScroll: true });
          success.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
        })
        .catch(function () {
          setStatus(msg("failed"), true);
        })
        .then(function () {
          form.classList.remove("is-sending");
          btn.classList.remove("is-running");
          btn.removeAttribute("aria-disabled");
        });
    });
  });
})();
