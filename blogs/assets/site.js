/* site.js — shared behaviour for the generated pages. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  /* ---- theme ---- */
  var tbtn = $("#theme-toggle");
  function themeIcon(t) {
    return t === "dark"
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }
  function setTheme(t) { root.setAttribute("data-theme", t); if (tbtn) { tbtn.innerHTML = themeIcon(t); tbtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode"); } }
  setTheme(localStorage.getItem("blog-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  if (tbtn) tbtn.addEventListener("click", function () { var n = root.getAttribute("data-theme") === "dark" ? "light" : "dark"; setTheme(n); localStorage.setItem("blog-theme", n); });

  /* ---- mobile menu ---- */
  var mbtn = $("#menu-btn"), links = $("#nav-links");
  if (mbtn && links) mbtn.addEventListener("click", function () { links.classList.toggle("open"); });

  /* ---- reading progress ---- */
  var bar = $("#progress");
  if (bar && $(".article-body")) {
    var upd = function () { var h = root, m = h.scrollHeight - h.clientHeight; bar.style.width = (m > 0 ? (h.scrollTop / m) * 100 : 0) + "%"; };
    addEventListener("scroll", upd, { passive: true }); upd();
  }

  /* ---- home: category + search filter ---- */
  var grid = $("#grid");
  if (grid) {
    var search = $("#search"), chips = $("#chips"), cur = "All";
    var cards = $$(".card", grid);
    function apply() {
      var q = (search && search.value || "").trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var cat = (c.getAttribute("data-cat") || "").toLowerCase();
        var txt = (c.getAttribute("data-text") || "").toLowerCase();
        var okC = cur === "All" || cat === cur.toLowerCase();
        var okQ = !q || txt.indexOf(q) > -1;
        var vis = okC && okQ; c.style.display = vis ? "" : "none"; if (vis) shown++;
      });
      var e = $("#empty"); if (e) e.style.display = shown ? "none" : "";
      var st = $("#grid-title"); if (st) st.textContent = cur === "All" ? "Latest articles" : cur;
    }
    if (search) search.addEventListener("input", apply);
    if (chips) chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      cur = b.getAttribute("data-cat");
      $$(".chip", chips).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      apply();
    });
  }

  /* ---- share ---- */
  var share = $("#share");
  if (share) {
    var url = share.getAttribute("data-url") || location.href;
    var title = share.getAttribute("data-title") || document.title;
    var enc = encodeURIComponent;
    var x = $("[data-net=x]", share); if (x) x.href = "https://twitter.com/intent/tweet?text=" + enc(title) + "&url=" + enc(url);
    var li = $("[data-net=linkedin]", share); if (li) li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + enc(url);
    var native = $("[data-net=native]", share);
    if (native) {
      if (navigator.share) native.addEventListener("click", function () { navigator.share({ title: title, url: url }).catch(function () {}); });
      else native.style.display = "none";
    }
    var copy = $("[data-net=copy]", share), note = $(".copied", share);
    if (copy) copy.addEventListener("click", function () {
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        if (note) { note.style.display = ""; setTimeout(function () { note.style.display = "none"; }, 1800); }
      }).catch(function () { window.prompt("Copy this link:", url); });
    });
  }
})();
