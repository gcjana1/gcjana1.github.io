/* =============================================================================
   posts.js — THE SINGLE PLACE YOU EDIT
   -----------------------------------------------------------------------------
   Everything (home page, category filters, each article, covers, RSS, sitemap)
   is generated from the data below. To publish, copy the TEMPLATE block, fill it
   in, drop it at the TOP of POSTS, and rebuild (the GitHub Action does this on
   push, or run: node blogs/generate.cjs).

   Each post URL becomes:  https://www.gcjana.in/blogs/<slug>/
   ========================================================================== */

const SITE = {
  name: "The Signal",
  tagline: "Ideas at the edge of technology, research, and the academic world.",
  description:
    "Essays on advanced technology, recent research, the higher-education ecosystem, and student life — written for researchers, engineers, and students.",
  author: "Dr. Gopal Chandra Jana",
  authorShort: "Dr. GC Jana",
  authorRole: "Assistant Professor, CSE — Sharda University",
  authorBio:
    "Researcher and educator working on machine learning, biomedical signal analysis, and AI for healthcare. Writing here about the tools, ideas, and habits that move research and industry forward.",
  authorUrl: "https://www.gcjana.in/",
  homeUrl: "https://www.gcjana.in/",
  origin: "https://www.gcjana.in",   // no trailing slash
  basePath: "/blogs/",                // where this folder is served from
  twitter: "",                        // e.g. "gcjana" (without @) — used for share/meta; leave "" if none

  email: "gcjana@gcjana.in",

  // Header navigation (RSS now lives in the footer only)
  nav: [
    { label: "About Author", href: "https://www.gcjana.in/" },
    { label: "Research",     href: "https://www.gcjana.in/research.html" },
    { label: "Publications", href: "https://www.gcjana.in/publications.html" },
  ],
  social: [
    { label: "Google Scholar", href: "http://scholar.google.co.in/citations?user=rju8YWkAAAAJ&hl=en" },
    { label: "GitHub",         href: "https://github.com/gcjana1/" },
    { label: "ORCID",          href: "https://orcid.org/0000-0003-2793-1721" },
  ],

  // Categories drive the tag colour + the generated cover art. Add your own here.
  categories: {
    "Advanced Tech": { color: "#6D28D9", color2: "#A855F7", motif: "ai" },
    "Research":      { color: "#2563EB", color2: "#22D3EE", motif: "research" },
    "Academia":      { color: "#0D9488", color2: "#34D399", motif: "academia" },
    "Students":      { color: "#EA580C", color2: "#F59E0B", motif: "students" },
  },
};

/* -----------------------------------------------------------------------------
   TEMPLATE — copy this whole object to add a post (place it first in POSTS):

   {
     slug: "short-hyphenated-title",
     title: "Your Human-Readable Title",
     category: "Advanced Tech",          // must match a key in SITE.categories
     date: "2025-06-01",                 // YYYY-MM-DD
     tags: ["LLMs", "Tooling"],          // free-form, shown on the article
     excerpt: "One or two sentences shown on cards and in search results.",
     image: "",                          // optional: "/blogs/assets/img/photo.jpg"
                                         // leave "" to auto-generate a cover
     readingTime: 0,                     // 0 = auto-estimate
     content: `
       <p>Write in HTML. Headings <h2>/<h3>, <strong>, <em>, links, lists.</p>
       <p>Math: inline \\( x^2 \\) or display $$ E = mc^2 $$.</p>
       <pre><code class="language-python">print("auto-highlighted")</code></pre>
       <figure><img src="/blogs/assets/img/fig.png" alt="describe">
         <figcaption>Figure 1. Caption.</figcaption></figure>
       <ol class="references"><li>Author (2024). Title. <em>Venue</em>.</li></ol>
     `,
   },
   -------------------------------------------------------------------------- */

const POSTS = [

  {
    slug: "what-is-a-classroom-for",
    title: "When the agents can do it, what is a classroom for?",
    category: "Academia",
    date: "2026-09-14",
    tags: ["Future of Education", "AI Agents", "Value Creation"],
    excerpt:
      "If AI agents can already learn and execute complex work, the reason to attend a lecture collapses — unless the classroom was never really about information. What is left is more valuable, not less.",
    image: "",
    readingTime: 0,
    content: `
      <p>A student today can point a capable AI agent at a problem set, a literature review,
      even a small research project, and get further in an hour than a diligent afternoon in
      the library once allowed. So a fair and uncomfortable question arrives: why show up? If
      the reason to sit in a classroom was ever to receive information, that reason is now
      gone — and pretending otherwise insults the student.</p>

      <h2>Information was never the point</h2>
      <p>Every generation announces the death of the lecture. The printing press was going to
      do it, then the internet, then the free online course. Each time, universities survived —
      not because they resisted change, but because the transfer of facts was only ever the
      visible surface of what they did. Cheap, instant AI removes the last excuse to confuse the
      two. When answers cost nothing and arrive in seconds, we are finally forced to say out
      loud what the room was actually for.</p>

      <h2>What stays scarce when execution is cheap</h2>
      <p>When a machine can execute, the valuable things are the ones it cannot supply on its
      own: knowing which problem is worth solving, recognising when a confident answer is
      quietly wrong, and being willing to stand behind a result. Agents generate; someone still
      has to judge. And judgment is not downloaded. It is built slowly, by attempting things,
      being corrected, and developing taste — the sense of what "good" looks like in a field
      before anyone can prove it.</p>

      <blockquote>An agent can hand you a thousand answers. It cannot tell you which question was
      worth asking. That still has to be learned — and it is learned in company.</blockquote>

      <h2>Value creation moves up the stack</h2>
      <p>In a world of cheap execution, value migrates away from doing the task and toward
      framing it, directing the tools, verifying the output, integrating it into something that
      matters, and taking responsibility for it. The engineer who only writes code now competes
      with a tireless machine. The one who decides what to build, whether it is right, and who
      it is for does not. This is not the end of skill; it is a change in which skills are
      scarce. Problem-framing, synthesis, verification, and care move to the centre.</p>

      <h2>The classroom's real product is judgment</h2>
      <p>Seen this way, a good classroom offers exactly what an agent alone cannot. It is an
      apprenticeship into a discipline's way of judging, guided by someone who already has taste.
      It provides peers to struggle beside, whose questions sharpen your own. And, quietly, it
      forms a person — the discipline to finish, the curiosity to keep asking, the habit of
      owning your conclusions rather than outsourcing them. You do not sit in the room to learn
      facts. You sit in it to become someone who can wield these tools well and be trusted with
      what they produce.</p>

      <h2>Institutional value, reconsidered</h2>
      <p>The implication for institutions is blunt. A university can no longer sell information,
      because it has lost that market for good. What it can be is precisely what a machine cannot
      be alone: a community of formation, an anchor of trust whose credential means "this
      person's judgment can be relied on," and an engine of genuinely new knowledge, where the
      frontier still needs human direction even when agents do the legwork. The institution that
      remains a lecture-and-exam dispensary is now competing head-on with something free and
      inexhaustible, and it will lose. The one that becomes a place to practise judgment — under
      mentorship, among peers, with real feedback — becomes more valuable than it was before,
      not less.</p>

      <h2>So, why sit in the classroom?</h2>
      <p>Not out of nostalgia, and not for the information. The honest answer is simpler and more
      demanding: the agents can already do the tasks, but they cannot yet become you. The room is
      where you build the judgment, the relationships, and the sense of responsibility that decide
      whether all that cheap execution adds up to anything worth having. The schools that
      understand this will matter more in an age of capable machines. The rest will slowly
      discover they were only ever selling something that is now free.</p>
    `,
  },

];

/* Lets the build script (Node) read this same file. Ignored by browsers. */
if (typeof module !== "undefined" && module.exports) { module.exports = { SITE, POSTS }; }
