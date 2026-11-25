/* The welcome wall on the homepage and the News page (built by
   scripts/lib/welcome-wall.mjs).

   Entrance: the first time the spotlight scrolls into view, the flag
   slash drops in behind the newest academy's crest, the crest walks out of
   a blur, its name wipes in, and a small burst of red, white and blue
   confetti goes up behind the crest, inside the spotlight. It plays once
   per visit. Everything is visible by default; only a script that is
   running and allowed to animate hides it first (.is-armed), so a failed
   script never hides the crest.

   "Give them a welcome" is a shot on goal:
     1. the button runs the site's soccer-ball kick (ball-button.js): the
        ball rolls across it and the label turns to its GOAL text;
     2. as the ball leaves the button it is kicked out onto the page: a big
        ball arcs, spinning, from the button into the academy's crest;
     3. on impact the crest jumps, confetti bursts from it across the
        whole screen, more falls from the top of the window, and a polite
        live region says the welcome for screen readers.
   The page-wide pieces live in one fixed layer (.welcome-fx) above the
   header that never takes clicks and empties itself as pieces finish.
   Under prefers-reduced-motion there is no entrance, no flying ball and no
   rain: confetti fades in and out where it lands across the screen, and
   the announcement still happens. */

(function () {
  var wall = document.querySelector("[data-welcome-wall]");
  if (!wall) return;
  var stage = wall.querySelector("[data-welcome-stage]");
  var layer = stage && stage.querySelector(".welcome-confetti");
  var cheer = wall.querySelector("[data-welcome-cheer]");
  var live = wall.querySelector("[data-welcome-live]");
  if (!stage || !layer) return;

  var KICK_MS = 1000; /* matches --kick and ball-button.js */
  var FLIGHT_MS = 780;
  var STAGE_COLORS = ["#c8102e", "#ffffff", "#1e4fd8", "#c8102e", "#ffffff", "#d9dee7"];
  /* on the light page a white piece needs its thin navy edge (.is-white) */
  var PAGE_COLORS = ["#c8102e", "#1e4fd8", "#0b1f4b", "#ffffff", "#c8102e", "#1e4fd8", "#ffffff"];
  var STAR_COLORS = ["#c8102e", "#1e4fd8"];

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function makePiece(parent, i, colors) {
    var el = document.createElement("span");
    var star = i % 6 === 0;
    var color = star ? STAR_COLORS[i % STAR_COLORS.length] : colors[i % colors.length];
    el.className = "welcome-piece" + (star ? " is-star" : "") + (color === "#ffffff" ? " is-white" : "");
    el.style.background = color;
    parent.appendChild(el);
    return el;
  }

  function removeWhenDone(anim, el) {
    anim.onfinish = function () {
      el.remove();
    };
  }

  /* ---- the entrance burst, inside the spotlight ---- */
  function stageBurst(count) {
    if (!layer.animate || layer.childElementCount > 140) return;
    var w = stage.offsetWidth;
    for (var i = 0; i < count; i++) {
      var el = makePiece(layer, i, STAGE_COLORS);
      var angle = ((-90 + rand(-78, 78)) * Math.PI) / 180;
      var dist = w * rand(0.38, 0.88);
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      var fall = w * rand(0.55, 1);
      var spin = rand(-450, 450);
      var start = "translate(-50%, -50%) ";
      removeWhenDone(
        el.animate(
          [
            { transform: start + "translate(0, 0) rotate(0deg) scale(0.4)", opacity: 1, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
            { transform: start + "translate(" + dx + "px, " + dy + "px) rotate(" + spin / 2 + "deg) scale(1)", opacity: 1, offset: 0.4, easing: "cubic-bezier(0.55, 0, 0.9, 0.55)" },
            { transform: start + "translate(" + dx * 1.25 + "px, " + (dy + fall) + "px) rotate(" + spin + "deg) scale(0.85)", opacity: 0 },
          ],
          { duration: rand(1300, 2000), delay: rand(0, 90), fill: "both" }
        ),
        el
      );
    }
  }

  /* ---- the page-wide celebration ---- */
  var fx = null;
  function fxLayer() {
    if (!fx) {
      fx = document.createElement("div");
      fx.className = "welcome-fx";
      fx.setAttribute("aria-hidden", "true");
      document.body.appendChild(fx);
    }
    return fx;
  }

  function at(x, y, extra) {
    return "translate(" + x + "px, " + y + "px) " + (extra || "");
  }

  /* confetti thrown out of the crest, over the whole window */
  function pageBurst(x, y) {
    var box = fxLayer();
    if (box.childElementCount > 320) return;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var still = reduceMotion();
    var reach = Math.max(vw, vh) * 0.5;
    var count = Math.round(Math.min(96, 44 + vw / 24));
    for (var i = 0; i < count; i++) {
      var el = makePiece(box, i, PAGE_COLORS);
      var angle = ((-90 + rand(-125, 125)) * Math.PI) / 180;
      var dist = reach * rand(0.2, 1);
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      var spin = rand(-540, 540);
      if (still) {
        removeWhenDone(
          el.animate(
            [
              { transform: at(x + dx, y + dy, "rotate(" + spin + "deg)"), opacity: 0 },
              { transform: at(x + dx, y + dy, "rotate(" + spin + "deg)"), opacity: 1, offset: 0.2 },
              { transform: at(x + dx, y + dy, "rotate(" + spin + "deg)"), opacity: 0 },
            ],
            { duration: 1400, easing: "ease-out", fill: "both" }
          ),
          el
        );
        continue;
      }
      var fall = vh * rand(0.35, 0.8);
      removeWhenDone(
        el.animate(
          [
            { transform: at(x, y, "rotate(0deg) scale(0.4)"), opacity: 1, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
            { transform: at(x + dx, y + dy, "rotate(" + spin / 2 + "deg) scale(1.1)"), opacity: 1, offset: 0.35, easing: "cubic-bezier(0.5, 0, 0.85, 0.6)" },
            { transform: at(x + dx * 1.2, y + dy + fall, "rotate(" + spin + "deg) scale(0.9)"), opacity: 0 },
          ],
          { duration: rand(1700, 2700), delay: rand(0, 80), fill: "both" }
        ),
        el
      );
    }
  }

  /* and confetti coming down from the top of the window, like a stadium */
  function pageRain() {
    var box = fxLayer();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var count = Math.round(Math.min(110, vw / 11));
    for (var i = 0; i < count; i++) {
      var el = makePiece(box, i + 3, PAGE_COLORS);
      var x0 = rand(0, vw);
      var sway = rand(-80, 80);
      var spin = rand(-720, 720);
      removeWhenDone(
        el.animate(
          [
            { transform: at(x0, -30, "rotate(0deg)"), opacity: 1 },
            { transform: at(x0 + sway, vh * 0.5, "rotate(" + spin / 2 + "deg)"), opacity: 1, offset: 0.5 },
            { transform: at(x0 - sway * 0.4, vh + 30, "rotate(" + spin + "deg)"), opacity: 0.6 },
          ],
          { duration: rand(2300, 3600), delay: rand(120, 900), easing: "cubic-bezier(0.35, 0, 0.7, 1)", fill: "both" }
        ),
        el
      );
    }
  }

  /* the shot: a ball leaves the button and arcs into the crest */
  function kickBall(from, target, onImpact) {
    var box = fxLayer();
    var a = from.getBoundingClientRect();
    var b = target.getBoundingClientRect();
    var vh = window.innerHeight;
    var size = window.innerWidth < 640 ? 34 : 46;
    var sx = a.right - 6;
    var sy = a.top + a.height / 2;
    var ex = b.left + b.width / 2;
    /* if the crest has scrolled out of the window, aim at the nearest edge
       of the window so the goal is still seen */
    var ey = Math.min(Math.max(b.top + b.height / 2, 80), vh - 80);
    var peak = Math.max(Math.min(sy, ey) - Math.max(110, Math.abs(ex - sx) * 0.4), 24);
    var cx = (sx + ex) / 2;
    var cy = 2 * peak - (sy + ey) / 2;

    var ball = document.createElement("span");
    ball.className = "welcome-fx-ball";
    ball.style.width = ball.style.height = size + "px";
    var svg = from.querySelector(".ball-btn__ball svg");
    if (svg) ball.appendChild(svg.cloneNode(true));
    box.appendChild(ball);

    var frames = [];
    var steps = 28;
    var startScale = 20 / size; /* the size of the ball on the button */
    for (var k = 0; k <= steps; k++) {
      var t = k / steps;
      var u = 1 - t;
      var x = u * u * sx + 2 * u * t * cx + t * t * ex;
      var y = u * u * sy + 2 * u * t * cy + t * t * ey;
      var scale = startScale + (1 - startScale) * Math.min(1, t * 3) + 0.25 * Math.sin(Math.PI * t);
      frames.push({ transform: at(x - size / 2, y - size / 2, "rotate(" + t * 1080 + "deg) scale(" + scale + ")") });
    }
    var flight = ball.animate(frames, { duration: FLIGHT_MS, easing: "linear", fill: "forwards" });
    flight.onfinish = function () {
      onImpact(ex, ey);
      removeWhenDone(
        ball.animate(
          [
            { transform: at(ex - size / 2, ey - size / 2, "rotate(1080deg) scale(1)"), opacity: 1 },
            { transform: at(ex - size / 2, ey - size / 2, "rotate(1160deg) scale(0.2)"), opacity: 0 },
          ],
          { duration: 180, easing: "ease-in", fill: "forwards" }
        ),
        ball
      );
    };
  }

  /* ---- entrance, once ---- */
  if ("IntersectionObserver" in window && !reduceMotion()) {
    wall.classList.add("is-armed");
    var io = new IntersectionObserver(
      function (entries) {
        if (!entries.some(function (e) { return e.isIntersecting; })) return;
        io.disconnect();
        wall.classList.add("is-live");
        window.setTimeout(function () {
          stageBurst(44);
        }, 560);
      },
      { threshold: 0.5 }
    );
    io.observe(stage);
  }

  /* ---- "give them a welcome" ---- */
  if (cheer) {
    var busy = false;
    var crest = stage.querySelector(".welcome-crest") || stage;

    var celebrate = function (x, y) {
      busy = false;
      if (document.body.animate) {
        pageBurst(x, y);
        if (!reduceMotion()) pageRain();
      }
      stage.classList.remove("is-cheered");
      void stage.offsetWidth; /* restart the jump */
      stage.classList.add("is-cheered");
      if (live) {
        live.textContent = "";
        window.setTimeout(function () {
          live.textContent = cheer.getAttribute("data-cheer-message") || "";
        }, 60);
      }
    };

    cheer.addEventListener("click", function () {
      if (busy) return;
      busy = true;
      var still = reduceMotion();
      window.setTimeout(function () {
        if (!still && document.body.animate) {
          kickBall(cheer, crest, celebrate);
        } else {
          var r = crest.getBoundingClientRect();
          celebrate(r.left + r.width / 2, r.top + r.height / 2);
        }
      }, still ? 0 : KICK_MS);
    });
  }
})();
