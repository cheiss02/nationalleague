/* Renders documents.html from assets/documents/documents.json (written by
   the build script, which scans assets/documents/<category>/*.pdf). Groups
   by category, shows a readable title/size/date, and filters live as the
   visitor types in the search box. */

(function () {
  var root = document.querySelector("[data-documents]");
  if (!root) return;

  var lang = root.getAttribute("data-lang") || "en";
  var locale = lang === "es" ? "es-MX" : "en-US";
  var assetBase = root.getAttribute("data-asset-base") || "";
  var src = root.getAttribute("data-src") || "assets/documents/documents.json";
  var search = root.querySelector("[data-doc-search]");
  var groupsEl = root.querySelector("[data-doc-groups]");
  var emptyEl = root.querySelector("[data-doc-empty]");
  var categoryLabels = {};
  root.querySelectorAll("[data-doc-category-label]").forEach(function (el) {
    categoryLabels[el.getAttribute("data-doc-category-label")] = el.textContent.trim();
  });

  var fmt = new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" });

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    var kb = bytes / 1024;
    if (kb < 1024) return Math.round(kb) + " KB";
    return (kb / 1024).toFixed(1) + " MB";
  }

  function titleFromFile(name) {
    return name
      .replace(/\.pdf$/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      });
  }

  var data = {};

  fetch(src, { cache: "no-cache" })
    .then(function (r) {
      return r.ok ? r.json() : {};
    })
    .then(function (json) {
      data = json || {};
      render("");
    })
    .catch(function () {
      render("");
    });

  function render(query) {
    var q = query.trim().toLowerCase();
    groupsEl.innerHTML = "";
    var anyResults = false;

    Object.keys(data).forEach(function (category) {
      var files = (data[category] || []).filter(function (f) {
        return !q || titleFromFile(f.file).toLowerCase().indexOf(q) !== -1;
      });
      if (!files.length) return;
      anyResults = true;

      var section = document.createElement("div");
      section.className = "doc-group";
      var label = categoryLabels[category] || category;
      var items = files
        .map(function (f) {
          var title = titleFromFile(f.file);
          var href = assetBase + "assets/documents/" + category + "/" + f.file;
          return (
            '<li><a class="doc-item" href="' + href + '" download>' +
            '<span class="doc-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 1.5V9h4.5L14 4.5z"/></svg></span>' +
            '<span class="doc-item-text"><span class="doc-item-title">' + title + "</span> " +
            '<span class="doc-item-meta">PDF &middot; ' + formatSize(f.size) + " &middot; " + fmt.format(new Date(f.date)) + "</span></span>" +
            "</a></li>"
          );
        })
        .join("");

      section.innerHTML = "<h2>" + label + '</h2><ul class="doc-list">' + items + "</ul>";
      groupsEl.appendChild(section);
    });

    if (emptyEl) emptyEl.hidden = anyResults;
  }

  if (search) {
    search.addEventListener("input", function () {
      render(search.value);
    });
  }
})();
