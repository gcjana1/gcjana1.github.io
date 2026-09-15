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
    slug: "will-ai-make-all-universities-equal",
    title: "Will AI make all universities equal?",
    category: "Academia",
    date: "2026-09-15",
    tags: ["Higher Education", "AI", "Institutions", "Signaling Theory"],
    excerpt:
      "If every university can buy the same AI, why would a degree from one still outweigh a degree from another? The honest answer is that AI may equalize capability while making reputation matter even more.",
    image: "",
    readingTime: 0,
    content: `
      <figure class="anim-figure" aria-hidden="false">
        <svg viewBox="0 0 900 260" role="img" aria-label="Diagram: many scattered nodes converging toward shared AI capability, then diverging again into unequal institutional networks">
          <defs>
            <radialGradient id="glowU" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#0D9488" stop-opacity=".35"/>
              <stop offset="100%" stop-color="#0D9488" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="450" cy="130" r="90" fill="url(#glowU)"/>
          <text x="450" y="136" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" fill="#0D9488" font-weight="700" letter-spacing=".04em">SHARED AI</text>
          <g stroke="#0D9488" stroke-opacity=".55" stroke-width="1.3">
            <line class="conv-line" x1="60"  y1="35"  x2="450" y2="130"/>
            <line class="conv-line" x1="60"  y1="225" x2="450" y2="130"/>
            <line class="conv-line" x1="150" y1="60"  x2="450" y2="130"/>
            <line class="conv-line" x1="150" y1="200" x2="450" y2="130"/>
            <line class="conv-line" x1="840" y1="35"  x2="450" y2="130"/>
            <line class="conv-line" x1="840" y1="225" x2="450" y2="130"/>
            <line class="conv-line" x1="750" y1="60"  x2="450" y2="130"/>
            <line class="conv-line" x1="750" y1="200" x2="450" y2="130"/>
          </g>
          <g class="div-node" fill="#0D9488"><circle cx="60" cy="35" r="6"/><circle cx="60" cy="225" r="6"/><circle cx="150" cy="60" r="5"/><circle cx="150" cy="200" r="5"/></g>
          <g class="div-node" fill="#EA580C"><circle cx="840" cy="35" r="9"/><circle cx="840" cy="225" r="9"/><circle cx="750" cy="60" r="7"/><circle cx="750" cy="200" r="7"/></g>
          <circle cx="450" cy="130" r="7" fill="#0D9488"/>
        </svg>
        <figcaption>Every institution converges on the same AI capability (centre) — but the networks radiating back out, shown unequal on purpose, are where reputation and opportunity still diverge.</figcaption>
      </figure>

      <p>Hidden inside the AI revolution is a harder question than "will AI replace teachers?" It is this: if every
      university can buy access to the same powerful AI systems, will universities eventually become
      interchangeable? Today they plainly are not. A degree from a globally reputed research university carries a
      different weight than a degree from an unknown institution, and that weight comes from decades of accumulated
      <strong>institutional reputation</strong> — faculty, research output, alumni, industry ties, laboratories,
      rankings, and the sheer ability to attract talented people. AI could unsettle that model. Or, just as easily,
      it could entrench it further.</p>

      <h2>Democratizing capability is not the same as democratizing trust</h2>
      <p>Picture two universities: one with five hundred professors, deep industry connections, and decades of
      research infrastructure; the other with a hundred professors and a fraction of the funding. Give both identical
      access to the same advanced AI — tutors, research assistants, coding agents, automated assessment. Does the
      smaller university suddenly become the equal of the larger one? No. AI can hand every institution the same
      <em>analytical capability</em> — the ability to summarise a hundred thousand papers, say — but a research
      program still needs people who know which question is worth asking, laboratories to test the answer, funding to
      run the experiment, and a reputation that pulls in the next cohort of talent. This is the distinction that
      matters: <strong>AI may democratize access to intelligence without democratizing access to institutional
      trust.</strong></p>

      <h2>Why the degree still works as a signal</h2>
      <p>Economists have a name for what a university credential does in the labour market: it is a <em>signal</em>.
      In Michael Spence's classic formulation, education can raise a worker's market value even when it teaches
      nothing directly useful for the job, simply because it is costly to obtain and therefore correlates with
      underlying ability<sup>1</sup>. A recruiter facing fifty thousand applications cannot evaluate each one deeply,
      so the university's name becomes a cheap proxy for a costly, private evaluation the institution has already
      performed — through admissions, coursework, and years of assessment.</p>

      <p>AI attacks exactly the assumption that makes this signal reliable, because it makes individual output far
      less dependent on what someone memorised at university. A graduate of a lesser-known college who has built
      production AI agents, shipped an open-source project, and solved a real industrial problem may visibly
      outperform a graduate of a famous one. As that becomes easier to observe directly, the question a recruiter asks
      may shift from <em>where did you study</em> to <em>what can you demonstrably do</em> — and portfolios, shipped
      work, and open competition results start to compete with transcripts as signals in their own right.</p>

      <blockquote>An AI research assistant can hand every university the same analytical power. It cannot hand any of
      them the researcher who knows which question is worth asking.</blockquote>

      <h2>The Matthew effect does not go away — it may get stronger</h2>
      <p>Even so, there is a strong argument that reputation survives, and even compounds. The sociologist Robert
      Merton described a pattern in science where prestige accrues disproportionately to already-prestigious
      researchers and institutions — success breeding further success, sometimes called the "Matthew effect"<sup>2</sup>.
      A famous university attracts talented students, who attract excellent faculty, who attract funding, which builds
      better laboratories, which attracts industry partners, which strengthens alumni networks, which raises
      reputation further — a loop that reinforces itself. Nothing about cheap, widely available AI breaks this loop.
      If anything, an AI-augmented star researcher can now direct a small army of agents and accomplish what once
      required an entire department, which could make exceptional individual talent — and the institutions that host
      it — more valuable, not less.</p>

      <h2>The paradox: capability spreads while prestige concentrates</h2>
      <p>Put those two forces together and a real paradox emerges. AI can put a tutor comparable to what an elite
      university offers into the hands of a student almost anywhere — that is genuinely democratizing. At the same
      time, the best institutions may keep pulling in a disproportionate share of talent, funding, and industrial
      attention — a concentrating force working in the opposite direction. The likely outcome is not equality. It is
      that <strong>basic educational capability becomes a commodity while advanced intellectual ecosystems become
      scarcer and more valuable</strong>. Explaining calculus, summarising a paper, generating boilerplate code — AI
      distributes all of this widely. A one-of-a-kind laboratory, a globally connected research group, a uniquely
      positioned interdisciplinary network — these remain very hard to replicate, AI or not.</p>

      <h2>Where the university's advantage actually moves</h2>
      <p>Think of the competition as a stack. At the bottom, "access to AI" and "AI-enabled teaching" will soon be
      table stakes — the equivalent of campus Wi-Fi, expected everywhere and differentiating nowhere. Moving up,
      "AI-enabled research" separates some institutions from others, but the layers that are genuinely hard to copy
      sit higher still: unique datasets and physical laboratories, faculty whose judgment and networks took decades to
      build, and — hardest of all — an institution's demonstrated ability to keep producing breakthrough ideas and
      exceptional people. Competitive advantage does not disappear under AI; it migrates upward, away from access and
      toward judgment.</p>

      <h2>What this means for recruitment</h2>
      <p>None of this plays out uniformly across professions. In software, design, and entrepreneurship — fields
      where a portfolio can be inspected directly — university brand may matter progressively less, and demonstrated,
      AI-assisted output more. In medicine, law, and advanced research, where licensure, regulation, and the high
      cost of failure demand institutional trust, reputation is likely to remain close to essential. A plausible
      middle path is a résumé that stops being <em>degree or portfolio</em> and becomes <em>degree and portfolio</em>:
      a credential alongside a documented record of agents built, problems solved, and papers or patents produced —
      considerably more informative than a single number on a transcript.</p>

      <h2>What ordinary universities can still do</h2>
      <p>Institutions outside the very top tier are not necessarily competing on every axis at once. A university does
      not need to out-brand a global name to matter; it can instead build a specific, defensible identity — AI paired
      with agriculture, healthcare, manufacturing, or climate work, for instance — and become the recognised place for
      that intersection rather than a generic AI university among hundreds of similar ones. Once basic AI-enabled
      teaching is universal, that kind of specialised depth, not broad imitation, is what survives.</p>

      <h2>The question every institution should be asking</h2>
      <p>Once nearly every university can offer an AI tutor, the interesting question stops being "who has AI?" and
      becomes "what can this place produce that AI alone cannot?" A university that hands students a chatbot and
      little else has offered almost no differentiation. One that combines that same AI with exceptional faculty,
      distinctive infrastructure, live industry problems, and a genuine research culture has built something far
      harder to copy — and a much stronger answer to a student who could otherwise learn the syllabus from a model for
      free.</p>

      <p>The deepest shift, then, may be this: when intelligence becomes cheap and abundant, the scarce resources
      become good questions, trustworthy institutions, unique data, real infrastructure, and the judgment to know what
      is worth doing at all. Universities will not compete much longer on how much knowledge they can dispense — a
      model, increasingly, can do that for free. They will compete on what kind of intellectual ecosystem they can
      build around that knowledge, and on whether they can turn a student's own ability, combined with AI, into
      something neither could have produced alone.</p>

      <ol class="references">
        <li>Spence, M. (1973). Job Market Signaling. <em>The Quarterly Journal of Economics</em>, 87(3), 355–374.</li>
        <li>Merton, R. K. (1968). The Matthew Effect in Science. <em>Science</em>, 159(3810), 56–63.</li>
        <li>Frank, R. H., & Cook, P. J. (1995). <em>The Winner-Take-All Society</em>. Free Press.</li>
        <li>Autor, D. H. (2015). Why Are There Still So Many Jobs? The History and Future of Workplace Automation. <em>Journal of Economic Perspectives</em>, 29(3), 3–30.</li>
        <li>Christensen, C. M., & Eyring, H. J. (2011). <em>The Innovative University: Changing the DNA of Higher Education from the Inside Out</em>. Jossey-Bass.</li>
      </ol>
    `,
  },

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
