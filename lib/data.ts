// =============================================================
// Central content data. Edit this file to update site content.
// Each section reads from here so updates stay surgical.
// =============================================================

export const site = {
  name: "Rishav Kumar",
  domain: "rishavkumarkarn.in",
  shortTagline: "Writes for B2B SaaS. Builds for the web.",
  longTagline:
    "B2B SaaS content writer and digital builder. Four plus years writing search-friendly content for HR tech, dev tools, and AI. Ships small web projects on the side.",
  location: "Kolkata, India",
  email: "hello@rishavkumarkarn.in", // update with real
  bookCall: "https://cal.com/rishavkumar", // update with real
  socials: {
    linkedin: "https://linkedin.com/in/rishavkumarkarn",
    github: "https://github.com/rkumar0101",
    x: "https://x.com/rishavkumarkarn",
    medium: "https://medium.com/@rishavkumarkarn",
  },
  authorPages: {
    geekflare: "https://geekflare.com/author/rishavkumar/",
    testlify: "https://testlify.com/author/rishav-kumar/",
  },
};

// =============================================================
// HERO
// Slideshow rotates 7 images. Text overlay rules:
//   - Image 1 (portrait): show eyebrow + headline + subline + CTA
//   - Images 2-6 (service titles burned in): show NO text overlay
//   - Image 7 (Let's Build Together): show single contact button overlay
// Counter tile stays bottom-right always.
// =============================================================
export const hero = {
  eyebrow: "Open to new projects",
  headline: ["Writer and", "digital builder."],
  subline: "Based in Kolkata, working with brands worldwide.",
  primaryCta: { label: "Let's connect", href: "#contact" },
  // Hero images — dark + light variants for both desktop and mobile
  image: "/hero/1.png",
  imageLight: "/hero/1-light.png",
  imageMobile: "/hero/1-mobile.png",
  imageMobileLight: "/hero/1-mobile-light.png",
  // Counter tile, anchored to extreme bottom-left corner of hero
  highlights: [
    { value: 250, suffix: "+", label: "Blogs written" },
    { value: 5, suffix: "", label: "Websites built and running" },
  ],
};

// =============================================================
// LOGO STRIPE
// type "logo" = image asset under /public/logos
// type "icon" = lucide icon name, paired with the company text
// =============================================================
export const companies: Array<{
  name: string;
  note: string;
  logo?: string;
  iconName?: "pen-tool" | "graduation-cap" | "briefcase";
  /** Approx logo width in px, used to size each item consistently */
  width?: number;
}> = [
  { name: "Testlify", note: "Current", logo: "/logos/testlify.svg", width: 143 },
  { name: "Writerz Zone", note: "Past", iconName: "pen-tool" },
  { name: "Geekflare", note: "Past", logo: "/logos/geekflare.svg", width: 165 },
  { name: "L.F.E.H", note: "Past", iconName: "graduation-cap" },
  { name: "GrowthAlis", note: "Side", logo: "/logos/growthalis.png", width: 154 },
  { name: "Sun Knowledge", note: "Past", logo: "/logos/sunknowledge.webp", width: 165 },
];

// =============================================================
// BIO — twin halves (writer + builder), equal weight
// =============================================================
export const bio = {
  intro: "Two halves of one brain.",
  writer: {
    label: "As a writer",
    body: "I write B2B SaaS content that ranks, gets cited by AI assistants, and converts readers into customers.",
    tags: ["HR Tech", "Dev Tools", "AI", "B2B SaaS"],
  },
  builder: {
    label: "As a builder",
    body: "I build small web projects when an idea won't leave me alone. Sites, demos, side bets.",
    tags: ["Next.js", "Tailwind", "MDX", "Framer"],
  },
  closing:
    "Computer science degree keeps the code part honest. Four plus years writing keeps the words part sharp.",
};

// =============================================================
// SKILLS — 3 orbiting skill rings (writing, web dev, tools/AI)
// =============================================================
export type SkillItem = {
  id: string;
  label: string;
};

export type SkillOrbitConfig = {
  id: string;
  title: string;
  subtitle: string;
  centerIcon: "pen-tool" | "code" | "sparkles";
  items: SkillItem[];
  /** Seconds for one full rotation */
  duration: number;
  /** 1 = clockwise, -1 = counter-clockwise */
  direction: 1 | -1;
};

export const skillOrbits: SkillOrbitConfig[] = [
  {
    id: "writing",
    title: "Writing & Content",
    subtitle: "How I think and ship words",
    centerIcon: "pen-tool",
    items: [
      { id: "wordpress", label: "WordPress" },
      { id: "notion", label: "Notion" },
      { id: "markdown", label: "Markdown" },
      { id: "grammarly", label: "Grammarly" },
      { id: "semrush", label: "Semrush" },
      { id: "gsc", label: "Search Console" },
    ],
    duration: 32,
    direction: 1,
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "What I build with",
    centerIcon: "code",
    items: [
      { id: "html", label: "HTML5" },
      { id: "css", label: "CSS3" },
      { id: "javascript", label: "JavaScript" },
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "tailwind", label: "Tailwind" },
    ],
    duration: 36,
    direction: -1,
  },
  {
    id: "tools",
    title: "Tools & AI",
    subtitle: "Daily stack",
    centerIcon: "sparkles",
    items: [
      { id: "vscode", label: "VS Code" },
      { id: "github", label: "GitHub" },
      { id: "vercel", label: "Vercel" },
      { id: "chatgpt", label: "ChatGPT" },
      { id: "claude", label: "Claude" },
      { id: "gemini", label: "Gemini" },
    ],
    duration: 40,
    direction: 1,
  },
];

// =============================================================
// HOW I WORK — Process Atlas
// 4 disciplines × 4 stages. Same playbook across every deliverable.
// =============================================================
export const howIWork = {
  intro: {
    headline: "Four hats. One workflow.",
    body: "Research, Build, Ship, Improve. Whether the deliverable is words, code, a campaign, or a workflow, the process stays the same.",
  },
  stages: ["Research", "Build", "Ship", "Improve"] as const,
  disciplines: [
    {
      key: "writing",
      label: "Writing",
      iconName: "pen-tool" as const,
      status: "live" as const,
      cells: {
        Research: ["SERP audit", "AI Overview map", "Product trial"],
        Build: ["Plain-English draft", "Specific examples", "Honest tradeoffs"],
        Ship: ["On-page SEO", "Schema + links", "Internal-link map"],
        Improve: ["Post-publish edits", "Data review", "GSC tuning"],
      },
    },
    {
      key: "web",
      label: "Web Dev",
      iconName: "code" as const,
      status: "live" as const,
      cells: {
        Research: ["User flow", "Design tokens", "Tech stack pick"],
        Build: ["Components", "Tailwind + TS", "Type-safe data"],
        Ship: ["Vercel deploy", "Edge functions", "DNS + SSL"],
        Improve: ["Lighthouse audit", "Core Web Vitals", "Bug patches"],
      },
    },
    {
      key: "marketing",
      label: "Digital Marketing",
      iconName: "trending-up" as const,
      status: "soon" as const,
      cells: {
        Research: ["Audience research", "Keyword cluster", "Competitor gap"],
        Build: ["Content calendar", "Campaign assets", "GA4 + GTM setup"],
        Ship: ["Distribution stack", "Paid + organic", "Newsletter ship"],
        Improve: ["GSC + GA4 review", "A/B tests", "Copy iteration"],
      },
    },
    {
      key: "automation",
      label: "Automation",
      iconName: "workflow" as const,
      status: "soon" as const,
      cells: {
        Research: ["Trigger map", "ROI math", "Workflow audit"],
        Build: ["Workflow design", "Sandbox tests", "Error handling"],
        Ship: ["Production deploy", "Alerts + monitors", "Failover paths"],
        Improve: ["Health check", "Edge patches", "Performance tune"],
      },
    },
  ],
};

export type HowIWorkStage = (typeof howIWork.stages)[number];
export type HowIWorkDiscipline = (typeof howIWork.disciplines)[number];

// =============================================================
// PORTFOLIO — unified bento grid
// Type-tagged items, optional `featured` for larger bento cells.
// Architecture supports future "marketing" type without code changes.
// =============================================================
export type PortfolioType = "writing" | "web" | "marketing";
export type PortfolioStatus = "live" | "building";

export type PortfolioItem = {
  id: string;
  type: PortfolioType;
  featured?: boolean;
  title: string;
  description: string;
  href: string;

  // Writing-specific
  publication?: string;
  category?: string;

  // Web-specific
  role?: string;
  stack?: string;
  status?: PortfolioStatus;

  // Marketing-specific (future)
  metric?: string;
  metricLabel?: string;

  /** Optional screenshot slideshow images (auto-rotating in WebCard) */
  images?: string[];
};

export const portfolio: PortfolioItem[] = [
  // ─── Featured writing piece ───
  {
    id: "w1",
    type: "writing",
    featured: true,
    title: "Why AI Overviews changed content forever",
    publication: "Testlify",
    category: "AI",
    description:
      "The SERP is no longer ten blue links. What that means for writers, content teams, and the search-friendly playbook.",
    href: "https://testlify.com/",
  },
  // ─── Featured web project ───
  {
    id: "p1",
    type: "web",
    featured: true,
    title: "GrowthAlis",
    role: "Co-founder, Full build",
    stack: "Next.js, Tailwind",
    status: "live",
    description: "Boutique digital marketing studio site. Copy, design, and code, all me.",
    href: "https://growthalis.com",
    images: [
      "/portfolio/growthalis-1-homepage.png",
      "/portfolio/growthalis-2-serp.png",
    ],
  },

  // ─── Regular items ───
  {
    id: "w2",
    type: "writing",
    title: "Hiring with AI without losing the candidate",
    publication: "Testlify",
    category: "HR Tech",
    description: "Honest take on where AI helps recruiters and where it backfires.",
    href: "https://testlify.com/",
  },
  {
    id: "p2",
    type: "web",
    title: "Narayani Thoughts",
    role: "Owner, Writer, Builder",
    stack: "Next.js, MDX",
    status: "live",
    description: "Personal essays on spirituality and self-work.",
    href: "#",
    images: [
      "/portfolio/narayani-thoughts-1.png",
      "/portfolio/narayani-thoughts-2.png",
      "/portfolio/narayani-thoughts-3.png",
    ],
  },
  {
    id: "w3",
    type: "writing",
    title: "The best open-source devtools in 2026",
    publication: "Geekflare",
    category: "Dev Tools",
    description: "Tested 30+ tools. Listed the 12 that actually save time.",
    href: "https://geekflare.com/",
  },
  {
    id: "p3",
    type: "web",
    title: "Samz Fitness Hub",
    role: "Designer + Developer",
    stack: "React, Tailwind",
    status: "live",
    description: "Local fitness brand site with class schedule.",
    href: "#",
    images: [
      "/portfolio/samz-1.png",
      "/portfolio/samz-2.png",
      "/portfolio/samz-3-serp.png",
    ],
  },
  {
    id: "w4",
    type: "writing",
    title: "Schema markup for SaaS landing pages",
    publication: "Testlify",
    category: "SEO",
    description: "Which schema types actually move the needle for SaaS.",
    href: "https://testlify.com/",
  },
  {
    id: "p4",
    type: "web",
    title: "Dumbphones",
    role: "Sample build",
    stack: "Next.js, Tailwind",
    status: "live",
    description: "Ecommerce sample for minimal-phone enthusiasts.",
    href: "#",
    images: [
      "/portfolio/dumbphones-1.png",
      "/portfolio/dumbphones-2.png",
      "/portfolio/dumbphones-3.png",
    ],
  },
  {
    id: "w5",
    type: "writing",
    title: "Skills assessments that do not feel like a test",
    publication: "Testlify",
    category: "HR Tech",
    description: "Designing assessments candidates do not dread.",
    href: "https://testlify.com/",
  },
  {
    id: "p5",
    type: "web",
    title: "Narayani Sena",
    role: "Founder, Building",
    stack: "Next.js, Tailwind",
    status: "building",
    description: "Community platform for grassroots culture work. In active build.",
    href: "#",
  },
  {
    id: "w6",
    type: "writing",
    title: "Writing for AI assistants: the GEO playbook",
    publication: "Geekflare",
    category: "AI",
    description: "How to structure content so ChatGPT, Gemini, and Perplexity cite you.",
    href: "https://geekflare.com/",
  },
  {
    id: "p6",
    type: "web",
    title: "Travel Buddy",
    role: "Co-founder, Building",
    stack: "Next.js, MDX",
    status: "building",
    description: "Trip planning tool for solo travellers. In active build.",
    href: "#",
  },
];

// =============================================================
// SERVICES — rich per-service content for sticky-tab sections
// =============================================================
export type ServiceStatus = "live" | "soon";

export type Service = {
  id: string;
  number: string;
  title: string;
  status: ServiceStatus;
  iconName: "pen-tool" | "code" | "trending-up" | "database" | "workflow";
  tagline: string;
  whatYouGet: string[];
  bestFor: string[];
  tools: string[];
  timeline: string;
  cta: { label: string; href: string };
  /** Static poster image (always required, used as fallback + video poster) */
  image: string;
  /**
   * Optional looped video (MP4). When set, plays in the cinema hero.
   * Drop files at /public/services/videos/0N-name.mp4 and uncomment.
   */
  video?: string;
};

export const services: Service[] = [
  {
    id: "content-writing",
    number: "01",
    title: "Content Writing",
    status: "live",
    iconName: "pen-tool",
    tagline:
      "Long-form B2B SaaS content that ranks, gets cited by AI, and converts readers into customers.",
    whatYouGet: [
      "Long-form articles (1000 to 3000 words)",
      "Landing pages with on-page SEO baked in",
      "Product documentation and help-center copy",
      "Email sequences and nurture flows",
      "Editorial calendar planning",
    ],
    bestFor: [
      "B2B SaaS teams shipping weekly content",
      "Founders writing v1 of their funnel",
      "HR tech, dev tools, and AI companies",
    ],
    tools: ["Notion", "Grammarly", "GSC", "Semrush", "Surfer"],
    timeline: "1 to 2 weeks per piece",
    cta: { label: "Discuss your editorial calendar", href: "#contact" },
    image: "/services/01-content.png",
    // video: "/services/videos/01-content.mp4",
  },
  {
    id: "website-development",
    number: "02",
    title: "Website Development",
    status: "live",
    iconName: "code",
    tagline:
      "Small marketing sites, portfolios, and product landings, shipped end-to-end. Copy to deploy, all me.",
    whatYouGet: [
      "Marketing sites and portfolios",
      "Landing pages with copy + design + code",
      "MDX blogs with proper schema",
      "Performance budget (Lighthouse 95+)",
      "Vercel deploy + DNS + analytics setup",
    ],
    bestFor: [
      "Founders launching v1 of their SaaS site",
      "Marketing teams who need a fast, clean site",
      "Solo operators tired of WordPress themes",
    ],
    tools: ["Next.js", "Tailwind", "Framer Motion", "MDX", "Vercel"],
    timeline: "1 to 3 weeks",
    cta: { label: "Get a quote", href: "#contact" },
    image: "/services/02-web.png",
    // video: "/services/videos/02-web.mp4",
  },
  {
    id: "digital-marketing",
    number: "03",
    title: "Digital Marketing",
    status: "soon",
    iconName: "trending-up",
    tagline:
      "On-page SEO, GEO, AEO. Content strategy that ships, not slides.",
    whatYouGet: [
      "Technical and on-page SEO audits",
      "Content strategy with keyword cluster maps",
      "GA4 and GTM setup with conversion tracking",
      "GEO and AEO optimization for AI search",
      "Monthly performance reports",
    ],
    bestFor: [
      "B2B SaaS teams trying to grow organic without paid",
      "Founders losing traffic to AI Overviews",
      "Marketing leads who need a partner, not a tool",
    ],
    tools: ["GSC", "GA4", "Semrush", "Surfer", "Ahrefs"],
    timeline: "Ongoing engagement or one-time audit",
    cta: { label: "Get on the waitlist", href: "#contact" },
    image: "/services/03-marketing.png",
    // video: "/services/videos/03-marketing.mp4",
  },
  {
    id: "cms-setup",
    number: "04",
    title: "CMS Setup",
    status: "soon",
    iconName: "database",
    tagline:
      "Headless CMS or WordPress, picked for your team and your stack, not for trend.",
    whatYouGet: [
      "CMS evaluation and selection",
      "Schema design and content modeling",
      "Migration from existing CMS",
      "Editor onboarding and documentation",
      "Custom blocks and field types",
    ],
    bestFor: [
      "Teams outgrowing their current CMS",
      "Marketing teams stuck waiting on devs to ship a post",
      "Founders moving from WordPress to headless",
    ],
    tools: ["Sanity", "Payload", "WordPress", "Strapi", "MDX"],
    timeline: "1 to 2 weeks",
    cta: { label: "Get on the waitlist", href: "#contact" },
    image: "/services/04-cms.png",
    // video: "/services/videos/04-cms.mp4",
  },
  {
    id: "automation",
    number: "05",
    title: "Automation",
    status: "soon",
    iconName: "workflow",
    tagline:
      "Workflow automation for content and ops. Less spreadsheet, more shipping.",
    whatYouGet: [
      "Content publishing pipelines (draft to live)",
      "n8n and Zapier flows with error handling",
      "AI-assisted research and outline gen",
      "Reporting dashboards that pull live data",
      "Custom integrations between your tools",
    ],
    bestFor: [
      "Teams stuck in manual spreadsheet workflows",
      "Content ops scaling beyond 10 pieces a week",
      "Founders building internal tools on the side",
    ],
    tools: ["n8n", "Zapier", "Make", "OpenAI API", "Next.js"],
    timeline: "1 to 3 weeks",
    cta: { label: "Get on the waitlist", href: "#contact" },
    image: "/services/05-automation.png",
    // video: "/services/videos/05-automation.mp4",
  },
];

// =============================================================
// BY THE NUMBERS — rich stat objects with provenance
// =============================================================
export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  caption?: string;
  source?: string;
};

export const statsUpdatedOn = "18 May 2026";

export const stats: StatItem[] = [
  {
    id: "impressions",
    value: 3.5,
    suffix: "M+",
    decimals: 1,
    label: "Monthly impressions",
    caption: "Across all published bylines, last 30 days",
    source: "Google Search Console",
  },
  {
    id: "growth",
    value: 180,
    suffix: "%",
    label: "Traffic growth",
    caption: "Year over year, owned + client domains",
    source: "GSC + Semrush",
  },
  {
    id: "clicks",
    value: 120,
    suffix: "K+",
    label: "Monthly clicks",
    caption: "Average across the last quarter",
    source: "Google Search Console",
  },
  {
    id: "articles",
    value: 250,
    suffix: "+",
    label: "Articles published",
    caption: "Across HR tech, dev tools, AI, SaaS",
    source: "Geekflare, Testlify, Writerz Zone",
  },
  {
    id: "years-writing",
    value: 4,
    suffix: "+",
    label: "Years writing",
    caption: "B2B SaaS focus since 2021",
    source: "Career",
  },
  {
    id: "years-coding",
    value: 6,
    suffix: "+",
    label: "Years coding",
    caption: "Since B.Tech in CSE, 2019",
    source: "Career",
  },
  {
    id: "companies",
    value: 6,
    suffix: "",
    label: "Companies worked with",
    caption: "Testlify, Geekflare and 4 more",
    source: "Resume",
  },
  {
    id: "industries",
    value: 7,
    suffix: "",
    label: "Industries covered",
    caption: "HR tech, dev tools, AI, healthcare, fitness, spirituality, ecom",
    source: "Portfolio",
  },
  {
    id: "domains",
    value: 7,
    suffix: "",
    label: "Domains covered",
    caption: "Where my bylines live",
    source: "Bylines",
  },
  {
    id: "languages",
    value: 3,
    suffix: "",
    label: "Languages I write in",
    caption: "English, Hindi, Maithili",
    source: "Native + fluent",
  },
  {
    id: "sites-shipped",
    value: 4,
    suffix: "",
    label: "Websites shipped",
    caption: "Live and serving real users",
    source: "Portfolio",
  },
  {
    id: "sites-building",
    value: 2,
    suffix: "",
    label: "Websites in build",
    caption: "Active development, ship Q3",
    source: "Roadmap",
  },
];

// =============================================================
// BLOG PREVIEW
// =============================================================
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: number; // minutes
  featured?: boolean;
  /** Optional cover image (drop at /public/blog/...). Falls back to ghost glyph. */
  image?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-overviews-changed-content",
    title: "Why AI Overviews changed content forever",
    category: "Content & SEO",
    date: "2026-05-10",
    excerpt:
      "The SERP is no longer ten blue links. AI Overviews summarize answers above everything. Writers who do not adapt will get cited less and clicked less. Here is the playbook.",
    readTime: 7,
    featured: true,
    image: "/blog/featured-ai-overviews.png",
  },
  {
    slug: "notes-narayani-thoughts",
    title: "Notes on building Narayani Thoughts",
    category: "Web Dev",
    date: "2026-04-22",
    excerpt:
      "Why I built my spirituality blog with Next.js and MDX instead of WordPress, and the tradeoffs I made along the way.",
    readTime: 5,
  },
  {
    slug: "hinglish-feature",
    title: "Hinglish is a feature, not a bug",
    category: "Personal Views",
    date: "2026-04-08",
    excerpt:
      "Code-switching as honesty, not informality. Why I refuse to flatten my voice for an English-only audience.",
    readTime: 4,
  },
  {
    slug: "tools-i-actually-use-2026",
    title: "Tools I actually use in 2026",
    category: "AI Tools",
    date: "2026-03-20",
    excerpt:
      "Honest stack, not affiliate links. The tools I open every day, the ones I tried and dropped, and what I am betting on.",
    readTime: 6,
  },
  {
    slug: "1500-word-lie",
    title: "The 1500-word lie",
    category: "Content & SEO",
    date: "2026-03-05",
    excerpt:
      "Why word counts are vanity. What ranks now is depth, structure, and answer-first writing. A 500-word piece can outrank a 3000-word one.",
    readTime: 8,
  },
  {
    slug: "cse-to-content",
    title: "From CSE to content",
    category: "Personal Views",
    date: "2026-02-18",
    excerpt:
      "How a computer science degree shapes the way I write. The unfair advantage of understanding what you are documenting.",
    readTime: 5,
  },
];

// =============================================================
// NOW SECTION — Derek Sivers /now snapshot, but richer
// =============================================================
export type NowProject = { name: string; progress: number };

export const now = {
  updated: "2026-05-17",
  writing: {
    body: "AI hiring guides at Testlify, weekly cadence.",
    meta: "This week",
    progressLabel: "2 / 3 pieces shipped",
    progress: 67,
  },
  building: {
    body: "Shipping this portfolio and an early build of Narayani Sena.",
    projects: [
      { name: "rishavkumarkarn.in", progress: 85 },
      { name: "Narayani Sena", progress: 30 },
      { name: "Travel Buddy", progress: 15 },
    ] as NowProject[],
  },
  learning: {
    body: "React Server Components in depth, plus a bit of Rust on the side.",
    tags: ["React", "RSC", "Rust", "WebGPU"],
  },
  reading: {
    body: "Building a Second Brain — Tiago Forte.",
    meta: "Chapter 8 of 14",
    progress: 57,
  },
  location: {
    city: "Kolkata",
    region: "West Bengal, India",
    timezone: "Asia/Kolkata",
    coords: "22.57°N · 88.36°E",
  },
};

// =============================================================
// ABOUT — long form profile with timeline + facts + languages
// =============================================================
export type AboutMilestone = {
  year: string;
  company: string;
  role: string;
  location: string;
  note: string;
};

export type AboutFact = { label: string; value: string };
export type AboutLanguage = { code: string; name: string; level: string };

export const about = {
  // Lead paragraphs — story arc (kept short, punchy)
  story: [
    "Started writing in 2020 with no plan. I trained as a computer science engineer, taught the basics for a year, did medical billing ops for the rent, then drifted into content because the SERP looked interesting and the pay was honest.",
    "Stuck around because I noticed two things: SaaS companies need writers who actually understand their product, and most writers do not. The gap is real, and it pays.",
    "Today I write for HR tech, dev tools, and AI. On the side I build small web projects because the code half of my brain never quite shut up. Goal: write things people read, ship things people use.",
  ],
  // Career timeline (in order, latest last for chronological scan)
  timeline: [
    {
      year: "2020 – 21",
      company: "L.F.E.H",
      role: "CS Faculty",
      location: "Kolkata",
      note: "Taught HTML, CSS, web basics, Google Suite. Learned to explain technical things in simple language.",
    },
    {
      year: "2021",
      company: "Sun Knowledge",
      role: "Process Associate",
      location: "Kolkata",
      note: "Durable Medical Equipment billing ops via Brightree. Precision under deadline pressure.",
    },
    {
      year: "2021 – 22",
      company: "Writerz Zone",
      role: "Content Developer",
      location: "Remote",
      note: "First content job. Editorial discipline, research-heavy briefs, deadline rigor.",
    },
    {
      year: "2023 – 24",
      company: "Geekflare",
      role: "Technical Content Writer",
      location: "Remote",
      note: "Dev tools, APIs, databases, cybersecurity, LLMOps. Sharpened the technical voice.",
    },
    {
      year: "2024 – now",
      company: "Testlify",
      role: "B2B SaaS Content Writer",
      location: "Remote",
      note: "AI recruiting, online assessments, talent tech. GEO/SEO/AEO playbook in production.",
    },
  ] as AboutMilestone[],
  facts: [
    { label: "Born", value: "Madhubani, Bihar" },
    { label: "Based in", value: "Kolkata, WB" },
    { label: "Education", value: "B.Tech CSE, MAKAUT 2019" },
    { label: "Writing since", value: "2020" },
    { label: "Building since", value: "Engineering school" },
    { label: "Open to", value: "Remote contracts" },
  ] as AboutFact[],
  languages: [
    { code: "EN", name: "English", level: "Read · Write · Speak" },
    { code: "HI", name: "Hindi", level: "Read · Write · Speak" },
    { code: "MAI", name: "Maithili", level: "Read · Write · Speak" },
    { code: "BN", name: "Bengali", level: "Speak" },
  ] as AboutLanguage[],
};
