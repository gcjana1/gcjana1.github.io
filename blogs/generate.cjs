/* =============================================================================
   generate.cjs — builds "The Signal" from assets/posts.js
   Run:  node blogs/generate.cjs   (or let the GitHub Action do it on push)
   Outputs: index.html, <slug>/index.html, assets/covers/<slug>.svg,
            sitemap.xml, feed.xml
   You never edit this file to publish — only assets/posts.js.
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const { SITE, POSTS } = require("./assets/posts.js");

const OUT = __dirname;
const BASE = SITE.basePath.endsWith("/") ? SITE.basePath : SITE.basePath + "/";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = (s) => esc(s).replace(/"/g, "&quot;");
const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const rt = (p) => p.readingTime && p.readingTime > 0 ? p.readingTime : Math.max(1, Math.round(p.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length / 200));
const purl = (slug) => BASE + encodeURIComponent(slug) + "/";
const cat = (name) => SITE.categories[name] || { color: "#4B3FE4", color2: "#8B5CF6", motif: "default" };
const initials = SITE.author.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

/* ---------- deterministic cover art ---------- */
function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function motif(kind, r) {
  const W = 1200, H = 800; let s = "";
  if (kind === "ai") {
    const pts = []; const n = 16;
    for (let i = 0; i < n; i++) pts.push([120 + r() * (W - 240), 100 + r() * (H - 200)]);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1];
      if (Math.hypot(dx, dy) < 260) s += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[j][0].toFixed(1)}" y2="${pts[j][1].toFixed(1)}" stroke="#fff" stroke-opacity=".16" stroke-width="1.4"/>`;
    }
    pts.forEach((p, i) => { const rad = 3 + (i % 4) * 2.2; s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${rad}" fill="#fff" fill-opacity="${0.35 + r() * 0.5}"/>`; });
  } else if (kind === "research") {
    const cx = W * 0.72, cy = H * 0.5;
    for (let i = 1; i <= 6; i++) s += `<circle cx="${cx}" cy="${cy}" r="${i * 82}" fill="none" stroke="#fff" stroke-opacity="${0.18 - i * 0.015}" stroke-width="1.6"/>`;
    for (let i = 0; i < 7; i++) { const ang = r() * Math.PI * 2, rad = (1 + Math.floor(r() * 5)) * 82; s += `<circle cx="${(cx + Math.cos(ang) * rad).toFixed(1)}" cy="${(cy + Math.sin(ang) * rad).toFixed(1)}" r="${(5 + r() * 6).toFixed(1)}" fill="#fff" fill-opacity="${0.4 + r() * 0.5}"/>`; }
  } else if (kind === "academia") {
    for (let i = 0; i < 5; i++) { const cx = 150 + r() * (W - 300), cy = 150 + r() * (H - 300), rad = 120 + r() * 180; s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>`; }
    for (let i = 0; i < 5; i++) s += `<circle cx="${(150 + r() * (W - 300)).toFixed(1)}" cy="${(150 + r() * (H - 300)).toFixed(1)}" r="6" fill="#fff" fill-opacity=".7"/>`;
  } else if (kind === "students") {
    const base = H - 150, bw = 74, gap = 34, x0 = W * 0.32; const hs = [140, 210, 300, 400, 520];
    hs.forEach((h, i) => { const x = x0 + i * (bw + gap); s += `<rect x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="16" fill="#fff" fill-opacity="${0.28 + i * 0.11}"/>`; });
    const sx = x0 + 5 * (bw + gap) + 10, sy = base - 560; s += `<path d="M${sx} ${sy} l14 40 l42 4 l-32 28 l10 42 l-34 -24 l-34 24 l10 -42 l-32 -28 l42 -4 z" fill="#fff" fill-opacity=".85"/>`;
  } else {
    for (let i = 0; i < 4; i++) s += `<ellipse cx="${(r() * W).toFixed(1)}" cy="${(r() * H).toFixed(1)}" rx="${(180 + r() * 220).toFixed(1)}" ry="${(140 + r() * 160).toFixed(1)}" fill="#fff" fill-opacity=".08"/>`;
  }
  return s;
}
function coverSVG(p) {
  const c = cat(p.category); const r = rng(p.slug);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="${escA(p.category)} cover">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${c.color}"/><stop offset="1" stop-color="${c.color2}"/>
</linearGradient>
<radialGradient id="glow" cx="30%" cy="24%" r="80%">
<stop offset="0" stop-color="#ffffff" stop-opacity=".28"/><stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="1200" height="800" fill="url(#g)"/>
${motif(c.motif, r)}
<rect width="1200" height="800" fill="url(#glow)"/>
</svg>`;
}
function coverFor(p) {
  if (p.image) return p.image;
  const dir = path.join(OUT, "assets", "covers");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, p.slug + ".svg"), coverSVG(p));
  return BASE + "assets/covers/" + p.slug + ".svg";
}

/* ---------- shared chrome ---------- */
function head(o) {
  const canonical = SITE.origin + o.path;
  const img = o.image ? (o.image.startsWith("http") ? o.image : SITE.origin + o.image) : "";
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<meta name="author" content="${escA(SITE.author)}"/>
<title>${esc(o.title)}</title>
<meta name="description" content="${escA(o.desc)}"/>
<link rel="canonical" href="${escA(canonical)}"/>
<meta property="og:type" content="${o.ogType || "website"}"/>
<meta property="og:site_name" content="${escA(SITE.name)}"/>
<meta property="og:title" content="${escA(o.title)}"/>
<meta property="og:description" content="${escA(o.desc)}"/>
<meta property="og:url" content="${escA(canonical)}"/>
${img ? `<meta property="og:image" content="${escA(img)}"/>` : ""}
<meta name="twitter:card" content="${img ? "summary_large_image" : "summary"}"/>
${SITE.twitter ? `<meta name="twitter:creator" content="@${escA(SITE.twitter)}"/>` : ""}
${o.published ? `<meta property="article:published_time" content="${o.published}"/>` : ""}
<script type="application/ld+json">${JSON.stringify(o.jsonld)}</script>
<link rel="alternate" type="application/rss+xml" title="${escA(SITE.name)}" href="${BASE}feed.xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css"/>
<link rel="stylesheet" href="${BASE}assets/blog.css"/>
</head><body>
<div id="progress" aria-hidden="true"></div>`;
}
function header() {
  const links = SITE.nav.map((l) => `<a href="${escA(l.href)}">${esc(l.label)}</a>`).join("");
  return `<header class="site-header"><div class="wrap">
<a class="brand" href="${BASE}"><span class="logo" aria-hidden="true"><svg width="17" height="12" viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 8h4l2-5 3 11 3-8 2 4h4"/></svg></span><span class="name">${esc(SITE.name)}</span></a>
<nav class="nav"><span class="links" id="nav-links">${links}<a href="${BASE}feed.xml">RSS</a></span>
<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
<button class="icon-btn" id="theme-toggle" type="button" aria-label="Toggle theme"></button></nav>
</div></header>`;
}
function footer() {
  const nav = SITE.nav.map((l) => `<a href="${escA(l.href)}">${esc(l.label)}</a>`).join("");
  const soc = SITE.social.map((l) => `<a href="${escA(l.href)}" rel="noopener">${esc(l.label)}</a>`).join("");
  const cats = Object.keys(SITE.categories).map((k) => `<a href="${BASE}?c=${encodeURIComponent(k)}">${esc(k)}</a>`).join("");
  return `<footer class="site-footer"><div class="wrap">
<div class="top">
<div><div class="name"><span class="logo"><svg width="15" height="11" viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 8h4l2-5 3 11 3-8 2 4h4"/></svg></span>${esc(SITE.name)}</div>
<p>${esc(SITE.description)}</p></div>
<div class="cols">
<div><h4>Topics</h4>${cats}</div>
<div><h4>Site</h4>${nav}<a href="${BASE}feed.xml">RSS feed</a></div>
<div><h4>Elsewhere</h4>${soc}</div>
</div></div>
<div class="legal"><span>© ${new Date().getFullYear()} ${esc(SITE.author)}</span><span>${esc(SITE.name)} · ${esc(SITE.tagline)}</span></div>
</div></footer>`;
}
const enhancers = `
<script src="${BASE}assets/site.js"></script>
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js" onload="document.querySelectorAll('.article-body pre code').forEach(function(b){window.hljs&&hljs.highlightElement(b)})"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" onload="(function(){var b=document.querySelector('.article-body');if(b&&window.renderMathInElement){renderMathInElement(b,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}],throwOnError:false});}})()"></script>
</body></html>`;

function card(p) {
  const c = cat(p.category); const cover = coverFor(p);
  const data = `${p.title} ${p.excerpt} ${p.category} ${(p.tags || []).join(" ")}`;
  return `<article class="card" data-cat="${escA(p.category)}" data-text="${escA(data)}">
<a class="cover" href="${purl(p.slug)}" aria-label="${escA(p.title)}"><img src="${escA(cover)}" alt="" loading="lazy" width="1200" height="800"/></a>
<div class="pad">
<span class="cat" style="--cat:${c.color}">${esc(p.category)}</span>
<h3><a href="${purl(p.slug)}">${esc(p.title)}</a></h3>
<p class="excerpt">${esc(p.excerpt)}</p>
<div class="meta"><span>${fmtDate(p.date)}</span><span>·</span><span>${rt(p)} min read</span></div>
</div></article>`;
}

/* ---------- home ---------- */
function buildIndex() {
  const feat = sorted[0], rest = sorted.slice(1);
  const c = cat(feat.category); const featCover = coverFor(feat);
  const chips = ['<button class="chip" data-cat="All" aria-pressed="true">All</button>']
    .concat(Object.keys(SITE.categories).map((k) => `<button class="chip" data-cat="${escA(k)}">${esc(k)}</button>`)).join("");

  const html = head({
    title: `${SITE.name} — ${SITE.tagline}`,
    desc: SITE.description, path: BASE, ogType: "website", image: featCover,
    jsonld: { "@context": "https://schema.org", "@type": "Blog", name: SITE.name, description: SITE.description, url: SITE.origin + BASE, author: { "@type": "Person", name: SITE.author, url: SITE.authorUrl } },
  }) + header() + `
<main>
<section class="masthead"><div class="wrap">
<div class="eyebrow">${esc(SITE.name)}</div>
<h1>${esc(SITE.tagline)}</h1>
<p>${esc(SITE.description)}</p>
<div class="featured">
<a class="cover" href="${purl(feat.slug)}"><img src="${escA(featCover)}" alt="" width="1200" height="800"/></a>
<div class="body">
<span class="cat" style="--cat:${c.color}">${esc(feat.category)}</span>
<h2><a href="${purl(feat.slug)}">${esc(feat.title)}</a></h2>
<p class="excerpt">${esc(feat.excerpt)}</p>
<div class="meta" style="color:var(--ink-faint);font-size:.9rem">${fmtDate(feat.date)} · ${rt(feat)} min read</div>
</div></div>
</div></section>

<div class="filterbar"><div class="wrap">
<div class="chips" id="chips">${chips}</div>
<label class="search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
<input id="search" type="search" placeholder="Search articles…" aria-label="Search articles"/></label>
</div></div>

<div class="wrap">
<h2 class="section-title" id="grid-title">Latest articles</h2>
<div class="grid" id="grid">
${rest.map(card).join("\n")}
<div class="empty" id="empty" style="display:none">No articles match yet. Try another topic or search term.</div>
</div>
</div>
</main>` + footer() + `
<script>(function(){var m=new URLSearchParams(location.search).get('c');if(m){var b=document.querySelector('.chip[data-cat="'+m.replace(/"/g,'')+'"]');if(b)b.click();var g=document.getElementById('grid-title');if(g)g.scrollIntoView();}})();</script>
` + enhancers;
  fs.writeFileSync(path.join(OUT, "index.html"), html);
}

/* ---------- article ---------- */
function related(p) {
  const same = sorted.filter((x) => x.slug !== p.slug && x.category === p.category);
  const pool = (same.length ? same : sorted.filter((x) => x.slug !== p.slug)).slice(0, 3);
  return pool;
}
function buildPost(p) {
  const i = sorted.indexOf(p), newer = sorted[i - 1], older = sorted[i + 1];
  const c = cat(p.category); const cover = coverFor(p);
  const canonical = SITE.origin + purl(p.slug);
  const rel = related(p);

  const html = head({
    title: `${p.title} — ${SITE.name}`, desc: p.excerpt, path: purl(p.slug),
    ogType: "article", published: p.date, image: cover,
    jsonld: { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt, image: SITE.origin + (cover.startsWith("http") ? "" : "") + cover, datePublished: p.date, dateModified: p.date, articleSection: p.category, keywords: (p.tags || []).join(", "), url: canonical, mainEntityOfPage: canonical, author: { "@type": "Person", name: SITE.author, url: SITE.authorUrl }, publisher: { "@type": "Person", name: SITE.author } },
  }) + header() + `
<main><article>
<div class="article-hero"><div class="cover"><img src="${escA(cover)}" alt="" width="1200" height="800"/></div></div>
<header class="article-head"><div class="panel">
<span class="cat" style="--cat:${c.color}">${esc(p.category)}</span>
<h1>${esc(p.title)}</h1>
<div class="byline"><span class="avatar" aria-hidden="true">${esc(initials)}</span>
<span class="who"><b>${esc(SITE.authorShort)}</b> <span class="dot">·</span> ${fmtDate(p.date)} <span class="dot">·</span> ${rt(p)} min read</span></div>
</div></header>

<div class="article-body">${p.content}</div>

<div class="article-foot">
<div class="taglist">${(p.tags || []).map((t) => `<a href="${BASE}?c=${encodeURIComponent(p.category)}">#${esc(t)}</a>`).join("")}</div>
<div class="share" id="share" data-url="${escA(canonical)}" data-title="${escA(p.title)}">
<span class="lbl">Share</span>
<a data-net="x" target="_blank" rel="noopener" aria-label="Share on X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.84L7.01 4.13H5.03l12.05 15.64Z"/></svg></a>
<a data-net="linkedin" target="_blank" rel="noopener" aria-label="Share on LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4V9Z"/></svg></a>
<button data-net="native" aria-label="Share"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/></svg></button>
<button data-net="copy" aria-label="Copy link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg></button>
<span class="copied" style="display:none">Link copied</span>
</div>
</div>

<div class="authorbox">
<span class="avatar" aria-hidden="true">${esc(initials)}</span>
<div><div class="name">${esc(SITE.author)}</div><div class="role">${esc(SITE.authorRole)}</div><p class="bio">${esc(SITE.authorBio)}</p></div>
</div>

<nav class="post-nav">
${older ? `<a class="prev" href="${purl(older.slug)}"><div class="lbl">← Previous</div><div class="ttl">${esc(older.title)}</div></a>` : "<span></span>"}
${newer ? `<a class="next" href="${purl(newer.slug)}"><div class="lbl">Next →</div><div class="ttl">${esc(newer.title)}</div></a>` : "<span></span>"}
</nav>
</article>

<section class="related"><div class="wrap">
<h2 class="section-title" style="margin-top:0">More to read</h2>
<div class="grid">${rel.map(card).join("")}</div>
</div></section>
</main>` + footer() + enhancers;

  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

/* ---------- sitemap + rss ---------- */
function buildSitemap() {
  const urls = [SITE.origin + BASE, ...sorted.map((p) => SITE.origin + purl(p.slug))];
  fs.writeFileSync(path.join(OUT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
}
function buildFeed() {
  const items = sorted.map((p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE.origin + purl(p.slug)}</link>
    <guid>${SITE.origin + purl(p.slug)}</guid>
    <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
    <category>${esc(p.category)}</category>
    <description>${esc(p.excerpt)}</description>
  </item>`).join("\n");
  fs.writeFileSync(path.join(OUT, "feed.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>
  <title>${esc(SITE.name)}</title>
  <link>${SITE.origin + BASE}</link>
  <description>${esc(SITE.description)}</description>
  <language>en</language>
${items}
</channel></rss>\n`);
}

/* ---------- run ---------- */
buildIndex();
sorted.forEach(buildPost);
buildSitemap();
buildFeed();
console.log(`Built ${sorted.length} posts + home + covers + sitemap + feed into ${BASE}`);
