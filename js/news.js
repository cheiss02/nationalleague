/* Renders news.html from content/news.json (written by the build script
   from content/news/*.md) and the "Key dates" block from
   content/key-dates.json. Both mount points carry data attributes set by
   the build script so this one file works unmodified on both the English
   and Spanish pages: data-lang picks which language field to read,
   data-asset-base is the relative path back to the site root (differs by
   how deeply nested the current page is), data-detail-base is the
   relative path to the post detail pages. */

(function () {
  var listEl = document.querySelector("[data-news-list]");
  var keyDatesEl = document.querySelector("[data-key-dates]");
  if (!listEl && !keyDatesEl) return;

  var lang = (listEl || keyDatesEl).getAttribute("data-lang") || "en";
  var locale = lang === "es" ? "es-MX" : "en-US";
  var fmt = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });

  function field(obj, base) {
    return obj[base + "_" + lang] || obj[base + "_en"] || "";
  }

  if (listEl) {
    var assetBase = listEl.getAttribute("data-asset-base") || "";
    var detailBase = listEl.getAttribute("data-detail-base") || "";
    var src = listEl.getAttribute("data-src") || "content/news.json";
    var grid = listEl.querySelector("[data-news-grid]");
    var emptyEl = listEl.querySelector("[data-news-empty]");
    var filters = Array.prototype.slice.call(listEl.querySelectorAll("[data-news-filter]"));
    var sampleLabel = listEl.getAttribute("data-sample-label") || "Sample";

    var allPostsCache = [];

    fetch(src, { cache: "no-cache" })
      .then(function (r) {
        return r.ok ? r.json() : [];
      })
      .then(function (posts) {
        allPostsCache = (posts || []).slice().sort(function (a, b) {
          return a.date < b.date ? 1 : -1;
        });
        renderList(allPostsCache, "all");
      })
      .catch(function () {
        renderList([], "all");
      });

    function renderList(posts, category) {
      var filtered = category === "all" ? posts : posts.filter(function (p) {
        return p.category === category;
      });

      grid.innerHTML = "";
      if (!filtered.length) {
        if (emptyEl) emptyEl.hidden = false;
        return;
      }
      if (emptyEl) emptyEl.hidden = true;

      filtered.forEach(function (post) {
        var li = document.createElement("li");
        var categoryLabel = "";
        filters.forEach(function (btn) {
          if (btn.getAttribute("data-news-filter") === post.category) categoryLabel = btn.textContent.trim();
        });

        var img = post.image
          ? '<div class="news-card-media"><img src="' + assetBase + "assets/images/news/" + post.image +
            '" alt="' + (field(post, "image_alt") || "") + '" loading="lazy" width="640" height="400"></div>'
          : "";

        var postSlug = lang === "es" ? post.slug_es : post.slug_en;
        li.innerHTML =
          '<a class="news-card" href="' + detailBase + postSlug + '.html">' +
          img +
          '<div class="news-card-body">' +
          '<span class="news-card-category">' + categoryLabel + "</span>" +
          '<span class="news-card-date">' + fmt.format(new Date(post.date + "T00:00:00")) + "</span>" +
          "<h3>" + field(post, "title") + "</h3>" +
          '<p class="news-card-excerpt">' + field(post, "excerpt") + "</p>" +
          (post.sample ? '<span class="news-sample-tag">' + sampleLabel + "</span>" : "") +
          "</div></a>";
        grid.appendChild(li);
      });
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        renderList(allPostsCache, btn.getAttribute("data-news-filter"));
      });
    });
  }

  if (keyDatesEl) {
    var kdSrc = keyDatesEl.getAttribute("data-src") || "content/key-dates.json";
    var kdList = keyDatesEl.querySelector("[data-key-dates-list]");
    fetch(kdSrc, { cache: "no-cache" })
      .then(function (r) {
        return r.ok ? r.json() : { upcoming: [] };
      })
      .then(function (data) {
        var items = (data.upcoming || []).slice().sort(function (a, b) {
          return a.date < b.date ? -1 : 1;
        });
        if (!items.length) {
          keyDatesEl.hidden = true;
          return;
        }
        kdList.innerHTML = items
          .map(function (item) {
            var d = new Date(item.date + "T00:00:00");
            var when = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(d);
            return (
              "<li><span class=\"key-date-when\">" + when + "</span><span class=\"key-date-label\">" +
              field(item, "label") + "</span></li>"
            );
          })
          .join("");
      })
      .catch(function () {
        keyDatesEl.hidden = true;
      });
  }
})();
