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

  // Header + footer navigation
  nav: [
    { label: "Home",         href: "https://www.gcjana.in/" },
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
    slug: "foundation-models-scientific-computing",
    title: "Foundation models are quietly rewriting scientific computing",
    category: "Advanced Tech",
    date: "2025-06-10",
    tags: ["Foundation Models", "Scientific Computing", "AI"],
    excerpt:
      "Large pretrained models are moving from chatbots into simulation, discovery, and lab automation. Here is what changes for the people who actually run the experiments.",
    image: "",
    readingTime: 0,
    content: `
      <p>For a decade, machine learning in science meant training a small model on your
      own hard-won dataset. That era is ending. Foundation models — trained once on vast
      corpora and adapted many times — are moving into simulation, molecular design, and
      lab automation, and they change the economics of research in ways worth thinking about
      carefully.</p>

      <h2>What actually changed</h2>
      <p>The shift is not simply "bigger models." It is that a single pretrained backbone can
      be adapted to a new task with a fraction of the labelled data you used to need. For a
      lab that has always been data-poor, that is the difference between a project being
      possible and impossible.</p>

      <blockquote>The scarce resource is no longer compute or even data — it is a clear
      question and a way to check the answer.</blockquote>

      <h2>Three places it lands first</h2>
      <ol>
        <li><strong>Surrogate models.</strong> Learned approximations of expensive simulations,
        turning hours of computation into milliseconds for design-space exploration.</li>
        <li><strong>Literature at scale.</strong> Models that read thousands of papers and
        surface the three that actually matter to your hypothesis.</li>
        <li><strong>Lab automation.</strong> Planning and control loops that propose the next
        experiment rather than just recording the last one.</li>
      </ol>

      <h2>The catch</h2>
      <p>A model that is confidently wrong is more dangerous in a lab than in a chat window.
      The discipline that separates good groups from careless ones is verification: every
      generated hypothesis, structure, or number is treated as a claim to be checked, not a
      result to be trusted. Build the checking step into the workflow from day one.</p>

      <p>The labs that win the next few years will not be the ones with the largest models.
      They will be the ones that pair these tools with sharp questions and honest evaluation —
      which is, reassuringly, what good science always rewarded.</p>
    `,
  },

  {
    slug: "reproducible-research-code",
    title: "Reproducibility is a feature, not a chore",
    category: "Research",
    date: "2025-05-28",
    tags: ["Reproducibility", "Open Science", "Engineering"],
    excerpt:
      "Research code that someone else can run a year later is worth more than a clever result nobody can reproduce. A practical checklist for shipping work that survives.",
    image: "",
    readingTime: 0,
    content: `
      <p>Most research code is written to produce one figure, once, on one machine. Then a
      reviewer asks a question, a student inherits the project, or you return to it yourself
      six months later — and nothing runs. Reproducibility is usually framed as a moral duty.
      It is more useful to treat it as a feature that pays you back.</p>

      <h2>The minimum that actually helps</h2>
      <ul>
        <li><strong>Pin your environment.</strong> A single file that records exact versions.
        "It worked on my laptop" is not a result.</li>
        <li><strong>Seed everything.</strong> One place that sets every random seed, so a run
        is a run, not a lottery.</li>
        <li><strong>Separate data, code, and outputs.</strong> Outputs are disposable; they
        should never live in the same folder as the code that made them.</li>
        <li><strong>One command to reproduce.</strong> If a stranger cannot go from clone to
        figure with a single script, the project is not reproducible yet.</li>
      </ul>

      <pre><code class="language-python">import os, random, numpy as np

def set_seed(seed: int = 0):
    os.environ["PYTHONHASHSEED"] = str(seed)
    random.seed(seed)
    np.random.seed(seed)
    # torch.manual_seed(seed); torch.cuda.manual_seed_all(seed)
</code></pre>

      <h2>Why it compounds</h2>
      <p>Reproducible work is faster to extend, easier to hand off, and far less stressful to
      defend. The half hour you spend making a project runnable is repaid every single time
      you — or anyone else — comes back to it. Treat it as infrastructure, not virtue.</p>

      <ol class="references">
        <li>Sandve, G. K. et al. (2013). Ten Simple Rules for Reproducible Computational Research. <em>PLOS Computational Biology</em>.</li>
      </ol>
    `,
  },

  {
    slug: "read-ml-paper-in-20-minutes",
    title: "How to read a machine-learning paper in 20 minutes",
    category: "Students",
    date: "2025-05-14",
    tags: ["Study Skills", "Machine Learning", "Reading"],
    excerpt:
      "You cannot read every paper front to back, and you should not try. A repeatable method for extracting what matters — fast — without fooling yourself.",
    image: "",
    readingTime: 0,
    content: `
      <p>New students often read papers like textbooks: first word to last, highlighter in
      hand, absorbing nothing. Experienced researchers read in passes, deciding at each stage
      whether the paper deserves more of their time. Here is the method, made explicit.</p>

      <h2>Pass 1 — five minutes: is this worth it?</h2>
      <p>Read the title, abstract, figures, and conclusion only. You are answering one
      question: does this paper solve a problem I care about, and does it look credible? If
      not, stop. Stopping is a skill, not a failure.</p>

      <h2>Pass 2 — ten minutes: what did they do?</h2>
      <p>Now read the introduction and the method, skimming the maths but studying every
      figure and table. Write one sentence each for: the problem, the key idea, the evidence.
      If you cannot, the paper is either unclear or you are missing background — note which.</p>

      <h2>Pass 3 — as long as it takes: could I rebuild it?</h2>
      <p>Only for papers you will build on. Re-derive the core equations, question every
      assumption, and imagine how you would have designed the experiments. This pass is where
      real understanding — and your own next idea — comes from.</p>

      <blockquote>Read to decide, then read to understand, then read to build. Most papers stop
      you at the first pass, and that is exactly the point.</blockquote>

      <p>Do this consistently and a reading list that felt impossible becomes a queue you can
      actually clear — while remembering what you read.</p>
    `,
  },

  {
    slug: "healthy-research-group",
    title: "The systems that make a research group healthy",
    category: "Academia",
    date: "2025-04-30",
    tags: ["Mentorship", "Culture", "Higher Education"],
    excerpt:
      "Great groups are not built on brilliant individuals but on quiet systems — for feedback, credit, and care. What those systems look like, and why they scale trust.",
    image: "",
    readingTime: 0,
    content: `
      <p>Ask anyone who left academia disillusioned and the reason is rarely the science. It
      is the environment: unclear expectations, invisible labour, credit that flows upward and
      blame that flows down. A healthy research group is not an accident of personality. It is
      a set of small, deliberate systems.</p>

      <h2>Make the implicit explicit</h2>
      <p>The most common failure in a group is unspoken expectation. When "good work" is never
      defined, students spend their energy guessing. A one-page statement of what the group
      values — and how authorship, hours, and feedback actually work — removes an enormous
      amount of anxiety.</p>

      <h2>Feedback as a habit, not an event</h2>
      <p>Annual reviews are too late to fix anything. Groups that thrive build tiny, frequent
      feedback loops: a weekly written update, a standing fifteen-minute one-on-one, a norm
      that drafts get comments in days, not weeks. Small and regular beats large and rare.</p>

      <h2>Credit generously, in public</h2>
      <p>Nothing builds trust faster than a supervisor who names contributions specifically and
      publicly, and nothing erodes it faster than the opposite. Credit is close to free to give
      and expensive to withhold.</p>

      <p>None of this requires a bigger budget or a famous name. It requires deciding that how
      people are treated is part of the research output, not a distraction from it.</p>
    `,
  },

  {
    slug: "tiny-models-edge-ai-healthcare",
    title: "Doing more with tiny models: edge AI in healthcare",
    category: "Advanced Tech",
    date: "2025-04-12",
    tags: ["Edge AI", "Healthcare", "Efficiency"],
    excerpt:
      "The most useful medical AI often runs on a wearable, not a data centre. Why small, efficient models matter — and the techniques that make them work.",
    image: "",
    readingTime: 0,
    content: `
      <p>Headlines celebrate ever-larger models, but much of the AI that touches patients has
      to run somewhere small: a wearable, a bedside monitor, a phone in a rural clinic with no
      reliable connection. Constraints like power, latency, and privacy push the interesting
      work toward efficiency rather than scale.</p>

      <h2>Why the edge, not the cloud</h2>
      <ul>
        <li><strong>Latency:</strong> an alert that arrives two seconds late can be useless.</li>
        <li><strong>Privacy:</strong> data that never leaves the device is far easier to protect.</li>
        <li><strong>Reliability:</strong> a monitor that needs the internet fails exactly when it is needed.</li>
      </ul>

      <h2>The efficiency toolkit</h2>
      <p>Three techniques do most of the heavy lifting when shrinking a model to fit:</p>
      <ol>
        <li><strong>Quantisation</strong> — representing weights with fewer bits, trading a
        little accuracy for large gains in size and speed.</li>
        <li><strong>Pruning</strong> — removing the many parameters that contribute almost
        nothing to the output.</li>
        <li><strong>Distillation</strong> — training a small "student" model to imitate a large
        "teacher," keeping much of the performance at a fraction of the cost.</li>
      </ol>

      <p>The measure of success on the edge is not a leaderboard score. It is a model that is
      accurate enough, small enough, and dependable enough to help a real person in a real
      place — which is a harder and more worthwhile problem than it first appears.</p>
    `,
  },

  {
    slug: "first-year-graduate-roadmap",
    title: "From coursework to research: a first-year roadmap",
    category: "Students",
    date: "2025-03-22",
    tags: ["Graduate School", "Research", "Advice"],
    excerpt:
      "The jump from taking classes to doing research is the hardest transition in graduate school. A month-by-month way to make it feel less like falling.",
    image: "",
    readingTime: 0,
    content: `
      <p>Coursework has clear rules: read the chapter, do the problem set, get the grade.
      Research has none of that. The problem is undefined, the answer is unknown, and nobody
      hands you a deadline until it is nearly too late. The first year is mostly about learning
      to work without those rails.</p>

      <h2>Months 1–3: read widely, build tools</h2>
      <p>Read broadly around your area, not just inside it, and get fluent with the everyday
      tools — version control, a plotting workflow, a way to keep notes you will actually find
      again. Breadth now saves you from re-inventing things later.</p>

      <h2>Months 4–8: find a question you can hold</h2>
      <p>A good first question is small enough to finish and real enough to matter. Reproduce a
      result you admire; the gap between the paper and your attempt is often where your own
      contribution hides.</p>

      <h2>Months 9–12: produce something concrete</h2>
      <p>End the year with an artefact — a short workshop paper, a clean open-source tool, a
      careful negative result honestly reported. Momentum in research comes from finishing, not
      from planning to finish.</p>

      <blockquote>Nobody feels ready for research in year one. The ones who thrive simply start
      before they feel ready, and let competence follow.</blockquote>
    `,
  },

];

/* Lets the build script (Node) read this same file. Ignored by browsers. */
if (typeof module !== "undefined" && module.exports) { module.exports = { SITE, POSTS }; }
