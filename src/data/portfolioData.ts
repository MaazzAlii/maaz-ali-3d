// lib/data.ts — single source of truth. Edit here only.

export const profile = {
  name: "Maaz Ali",
  title: "AI Engineer · Automation (n8n & GHL) · Content Creator",
  tagline: "Building AI systems, automating businesses, and teaching it all in public.",
  location: "Rawalpindi, Pakistan",
  email: "maazalisshahid@gmail.com",
  linkedin: "https://www.linkedin.com/in/maazzalii/",
  github: "https://github.com/MaazzAlii",
  resumeUrl: "/Maaz_Ali_Resume.pdf",
  photo: "/maaz-ali-photo.png",
};

export type SocialLink = {
  label: string;
  url: string;
  icon: "linkedin" | "github" | "mail" | "instagram" | "telegram" | "tiktok" | "youtube" | "facebook";
  blurb?: string;
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", url: profile.linkedin, icon: "linkedin" },
  { label: "GitHub", url: profile.github, icon: "github" },
  { label: "Instagram", url: "https://www.instagram.com/maazali.ai/", icon: "instagram", blurb: "Behind-the-scenes builds, reels, and quick AI/automation tips." },
  { label: "YouTube", url: "https://www.youtube.com/@Maazali_ai", icon: "youtube", blurb: "Full walkthroughs — building AI agents and automations end-to-end." },
  { label: "TikTok", url: "https://www.tiktok.com/@maazali_ai", icon: "tiktok", blurb: "Fast, bite-sized AI and automation clips." },
  { label: "Telegram", url: "https://t.me/Maazinex", icon: "telegram", blurb: "Updates, resources, and direct community chat." },
  { label: "Facebook", url: "https://www.facebook.com/maazaliai", icon: "facebook", blurb: "Project updates and community posts." },
];

export const hero = {
  headlinePrefix: "AI Engineer building ",
  headlineHighlight: "agentic systems",
  headlineSuffix: " and automating businesses end-to-end with n8n and GoHighLevel.",
  subheadline: "Production AI systems, client automations, and published mobile apps — 43 shipped projects, one place.",
  meta: "NUML Islamabad · open to relocation & remote",
  stats: [
    { value: "43", label: "Projects Shipped" },
    { value: "10+", label: "Client Engagements" },
    { value: "2", label: "Published Apps" },
  ],
};

export const about = {
  eyebrow: "About",
  heading: "AI Engineer, automation builder, and content creator",
  paragraphs: [
    "I'm a final-year Computer Science student who builds production-grade AI systems — agentic RAG pipelines, multi-agent orchestration with LangGraph, and LLM-powered backends — for startups, agencies, and internal ventures.",
    "Alongside engineering, I design end-to-end business automations with n8n and GoHighLevel: lead pipelines, AI voice/chat agents, CRM workflows, and content systems that run without manual upkeep.",
    "I also document the build process publicly on YouTube, Instagram, TikTok, and Telegram — breaking down how these systems are actually built, for anyone who wants to learn or is evaluating my work.",
  ],
};

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "AI & LLM Engineering",
    items: ["LangGraph", "LangChain", "RAG", "ChromaDB", "Ollama", "Mistral AI", "Prompt Engineering", "Multi-Agent Systems"],
  },
  {
    label: "Automation & Workflows",
    items: ["n8n", "GoHighLevel (GHL)", "Webhooks", "API Integrations", "WhatsApp/Telegram Bots", "CRM Automation"],
  },
  {
    label: "Backend Engineering",
    items: ["Python", "FastAPI", "Node.js", "SQLAlchemy", "JWT Authentication", "REST APIs"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React", "Next.js", "Flutter", "TypeScript", "JavaScript"],
  },
  {
    label: "Databases & Tools",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Docker", "Git"],
  },
];

export type ProjectCategory =
  | "Client & Freelance Work"
  | "AI & Agentic Systems"
  | "Automation & Workflows"
  | "Enterprise Full-Stack & SaaS"
  | "Mobile Apps"
  | "Personal Ventures"
  | "Python Core & Utilities";

// Order here drives both the Projects section grouping and the category filter bar.
export const categories: { key: ProjectCategory; blurb: string }[] = [
  { key: "Client & Freelance Work", blurb: "Confidential engagements — described here to show scope of work; repos are private." },
  { key: "AI & Agentic Systems", blurb: "Agentic RAG, multi-agent orchestration, and LLM-powered applications." },
  { key: "Automation & Workflows", blurb: "n8n pipelines and business-process automation." },
  { key: "Enterprise Full-Stack & SaaS", blurb: "Production-shaped full-stack apps with real auth, payments, and data." },
  { key: "Mobile Apps", blurb: "Cross-platform mobile engineering." },
  { key: "Personal Ventures", blurb: "Products built and kept closed-source as personal/venture work." },
  { key: "Python Core & Utilities", blurb: "Focused tools, dashboards, and fundamentals." },
];

export type ProjectLink = { label: string; url: string };

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  visibility: "public" | "private";
  description: string;
  /** Detail-page tab: what it is and the problem it solves. Falls back to `description`. */
  overview?: string;
  /** Detail-page tab: how it's built — key architectural/technical decisions. */
  architecture?: string;
  /** Detail-page tab: outcome, impact, or what shipping it proved. */
  results?: string;
  tech: string[];
  metrics?: string[];
  github?: string;
  links?: ProjectLink[];
  demo?: string;
  huggingface?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  // ───────────────────────── Client & Freelance Work (private, anonymized) ─────────────────────────
  {
    slug: "hospital-management-system",
    title: "Offline Hospital Management System",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Desktop HMS built for a real clinic client — offline-first, local database, PDF invoicing/reports, multi-role staff workflows.",
    overview:
      "A real clinic needed patient records, billing, and staff scheduling to keep working even when their internet connection dropped — a common problem outside major cities. I built a desktop application that runs entirely offline, syncing only when a connection is available.",
    architecture:
      "Electron wraps a Next.js front-end so the clinic gets a familiar, installable desktop app rather than a browser tab. All patient records, invoices, and appointment data live in a local SQLite database, with a role-based permission layer separating receptionist, doctor, and admin views. PDF generation runs entirely client-side for invoices and reports, so nothing depends on a server being reachable.",
    results:
      "Delivered as a working desktop build the clinic's staff use daily for patient intake, billing, and reporting — proof that a full multi-role business system doesn't need constant connectivity or cloud infrastructure to be reliable.",
    tech: ["Electron", "Next.js", "SQLite"],
    featured: true,
  },
  {
    slug: "ai-voice-receptionist-saas",
    title: "AI Voice Receptionist SaaS",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Multi-tenant voice-agent platform letting local service businesses (clinics, salons, hotels) deploy customizable phone receptionists.",
    overview:
      "Small service businesses — clinics, salons, hotels — lose bookings to missed calls but can't justify a full-time receptionist. This platform gives them an AI phone receptionist they can configure themselves: business hours, services, FAQ answers, and booking flow, without touching code.",
    architecture:
      "A FastAPI backend hosts per-tenant configuration and call-routing logic, with the Web Speech API layer handling real-time speech-to-text and text-to-speech during live calls. Multi-tenancy is handled at the data layer so each business's scripts, hours, and booking rules stay isolated from every other tenant on the same platform.",
    results:
      "Proved out a self-serve configuration model — a business owner can stand up their own AI receptionist without an engineer in the loop, which is the difference between a one-off client build and an actual SaaS product.",
    tech: ["Python", "FastAPI", "Web Speech API"],
    featured: true,
  },
  {
    slug: "geospatial-intelligence-platform",
    title: "Geospatial Intelligence Agentic AI Platform",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Agentic AI platform for a Dubai-based client engagement, delivered with a contracted development partner.",
    overview:
      "A Dubai-based client needed an agentic AI layer over geospatial data — location intelligence queries answered in natural language instead of a GIS dashboard. I led this engagement and brought in a contracted developer to help deliver it, since my own machine was down for repairs at a critical point in the build.",
    architecture:
      "LangGraph coordinates the agent's reasoning over geospatial API calls, translating natural-language questions into the right sequence of location/data queries and summarizing the results back in plain language.",
    results:
      "Delivered a working agentic platform for a genuine paid client engagement — one of the clearer examples of taking an AI system from spec to delivery under real client constraints and deadlines.",
    tech: ["LangGraph", "Python", "Geospatial APIs"],
  },
  {
    slug: "voice-taxi-booking-agent",
    title: "AI Voice & Taxi-Booking Agent",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Conversational voice agent handling taxi-booking flows end-to-end, delivered with a contracted development partner.",
    overview:
      "A conversational voice agent that takes a rider from \"I need a taxi\" to a confirmed booking entirely by voice — pickup location, destination, and confirmation, without an app or a human dispatcher.",
    architecture:
      "A voice AI pipeline drives a structured booking-slot flow (pickup, destination, time, confirmation), backed by a booking engine that validates and commits the request once all slots are filled.",
    results:
      "Delivered as a real paid engagement, built together with a contracted developer to hit the client's timeline.",
    tech: ["Python", "Voice AI", "Booking Engine"],
  },
  {
    slug: "ai-shopping-voice-assistant",
    title: "AI Shopping Assistant Voice Agent",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Retail voice assistant combining LLM function-calling with retrieval-augmented product Q&A for a client's storefront.",
    overview:
      "A voice assistant for a retail client's storefront that can answer product questions and take action — not just chat — by combining function-calling with a retrieval layer grounded in the client's actual catalog.",
    architecture:
      "Retell AI handles the real-time voice layer; product Q&A is grounded via OpenAI embeddings over the catalog so answers stay accurate to what's actually in stock, and function-calling lets the agent act (look up an item, start checkout) rather than just describe.",
    results:
      "Shipped as a working voice-commerce assistant for the client's storefront, demonstrating LLM function-calling combined with retrieval in a real commercial setting rather than a demo.",
    tech: ["Retell AI", "OpenAI Embeddings", "RAG"],
  },
  {
    slug: "ocr-document-processing-pipeline",
    title: "OCR & Document Processing Pipeline",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Automated pipeline extracting structured data from scanned documents and receipts during a company internship engagement.",
    overview:
      "Built during a company internship to remove manual data entry from scanned receipts and documents — turning unstructured images into structured, usable records automatically.",
    architecture:
      "A vision-LLM + OCR pipeline extracts raw text and layout from scanned documents, with spaCy handling entity extraction to pull structured fields (dates, amounts, line items) out of the raw OCR output.",
    results:
      "Delivered as a working internal tool during the internship, cutting manual document processing down to a review-and-approve step instead of full manual entry.",
    tech: ["Vision LLMs", "OCR", "spaCy"],
  },
  {
    slug: "accounting-firm-website-audit",
    title: "Website Audit for an Accounting Firm",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Full front-end audit deliverable — written report plus before/after screenshots — for an accounting firm client.",
    overview:
      "An accounting firm client wanted an honest technical and UX audit of their existing website before deciding whether to rebuild it. I audited the live site and delivered a full report rather than just a verbal opinion.",
    architecture:
      "The audit itself was backed by a small React/Vite build used to prototype and demonstrate specific fixes (navigation, performance, accessibility issues) directly rather than describing them abstractly in the report.",
    results:
      "Delivered a written audit report with before/after screenshots the client could act on directly — the kind of deliverable that turns into a rebuild contract once the client sees the gap between current and possible.",
    tech: ["React", "Vite"],
  },
  {
    slug: "multilanguage-booking-demo",
    title: "Multi-Language Booking Platform (Demo)",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Paid multi-language booking demo built for a client; on hold pending the client's production budget.",
    overview:
      "A paid engagement to build a working, multi-language booking platform demo — proof that the concept works end-to-end before the client committed further budget to a full production build.",
    architecture:
      "The demo covers the full booking flow with language switching built in from the start, rather than bolted on afterward, so localization wasn't an afterthought if the project moved to production.",
    results:
      "The client paid for and received a working demo; the project is currently on hold while they secure production budget — a real, ongoing client relationship rather than a one-off.",
    tech: ["Full-Stack Web"],
  },
  {
    slug: "hotel-concierge-bot",
    title: "Hotel Booking Concierge Bot",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "AI voice and chat concierge for real-time hotel room reservations, delivered as an internship project.",
    overview:
      "An AI concierge — voice and chat — for a hotel booking platform, handling real-time room availability, reservations, and guest questions conversationally instead of through a traditional booking form.",
    architecture:
      "A FastAPI backend and Node/Express services handle booking logic and availability, with a React front-end and a conversational AI layer on top so guests can book by talking or typing instead of filling out forms.",
    results:
      "Completed as a full-stack internship deliverable — the concierge experience works end-to-end, from a natural-language request through to a confirmed reservation.",
    tech: ["FastAPI", "Node.js/Express", "React", "Voice/Chat AI"],
  },
  {
    slug: "ecommerce-support-bot",
    title: "E-Commerce Customer Support & Return Handler Bot",
    category: "Client & Freelance Work",
    visibility: "private",
    description: "Knowledge-base-driven support bot handling customer service and return-flow queries for an e-commerce client.",
    overview:
      "A support bot for an e-commerce client that handles the two things that generate the most support tickets — general customer questions and return/refund requests — grounded in the store's own knowledge base.",
    architecture:
      "Responses are grounded against a curated knowledge base specific to the client's policies and products, so the bot answers with the store's actual return windows and policies rather than generic assumptions.",
    results:
      "Delivered as a working support automation layer, reducing the volume of repetitive questions that would otherwise need a human agent.",
    tech: ["Conversational AI"],
  },

  // ───────────────────────── AI & Agentic Systems ─────────────────────────
  {
    slug: "vision-rag",
    title: "LangGraph Agentic Vision RAG System",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Agentic Vision RAG for scanned PDFs, handwritten documents, and complex layouts — 7-node LangGraph StateGraph with self-correcting retrieval.",
    overview:
      "Most RAG systems fail quietly on scanned PDFs, handwritten notes, and multi-column layouts because they only understand text, not the document's visual structure. This system ingests documents visually first, so it actually understands what it's reading before it retrieves anything.",
    architecture:
      "A 7-node LangGraph StateGraph controls the whole pipeline: vision-based ingestion parses scanned pages and handwriting into structured content, which is embedded into a ChromaDB vector store. The key node is a self-correction loop — when the retrieval step returns low-confidence matches, the graph routes back to re-query with a reformulated question instead of forwarding a weak answer to the user.",
    results:
      "Correctly handles document types that break naive text-only RAG — scanned pages, handwriting, and irregular layouts — and demonstrates a self-correcting retrieval pattern that generalizes beyond this specific project.",
    tech: ["LangGraph", "Python", "ChromaDB", "Mistral AI", "Ollama"],
    metrics: ["Self-Correcting Retrieval", "7-Node StateGraph", "Open Source"],
    github: "https://github.com/MaazzAlii/langchain-agentic-vision-rag",
    image: "/projects/vision-rag-1.png",
    images: [
      "/projects/vision-rag-1.png",
      "/projects/vision-rag-2.png",
      "/projects/vision-rag-3.png",
      "/projects/vision-rag-4.png",
      "/projects/vision-rag-5.png",
      "/projects/vision-rag-6.png",
      "/projects/vision-rag-7.png",
    ],
    featured: true,
  },
  {
    slug: "document-comparison",
    title: "Intelligent Document Comparison Platform",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Upload 2 documents, ask questions, and watch a LangGraph ReAct agent reason across dual ChromaDB vector stores using Mistral AI.",
    overview:
      "Comparing two long documents by hand — a contract revision, two research papers, two policy drafts — is slow and error-prone. DocCompare AI lets you upload both and ask direct comparison questions instead of reading both cover to cover.",
    architecture:
      "Each document gets its own independent ChromaDB vector store, so the two documents are never conflated. A LangGraph ReAct agent plans its own tool calls at query time, deciding which store (or both) to query based on the question, then synthesizes a single grounded, cited answer from whatever it retrieves.",
    results:
      "Answers stay traceable back to source — the agent cites which document a claim came from — which is the difference between a usable comparison tool and a black-box summary.",
    tech: ["LangGraph", "Python", "Streamlit", "ChromaDB", "Mistral AI"],
    metrics: ["ReAct Agent", "Dual Vector Stores", "Open Source"],
    github: "https://github.com/MaazzAlii/docagent-ai",
    image: "/projects/doc-comp-1.png",
    images: [
      "/projects/doc-comp-1.png",
      "/projects/doc-comp-2.png",
      "/projects/doc-comp-3.png",
      "/projects/doc-comp-4.png",
      "/projects/doc-comp-5.png",
    ],
    featured: true,
  },
  {
    slug: "hr-automation",
    title: "Enterprise HR Service Automation Engine",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "LangGraph-orchestrated HR engine that classifies employee requests, enforces deterministic approval policy, and integrates Google Workspace + WhatsApp.",
    overview:
      "HR teams answer the same handful of questions constantly — leave balances, payroll, onboarding steps — through whatever channel employees prefer (chat, WhatsApp, a web form). This engine handles that volume automatically, while keeping actual policy decisions deterministic rather than left to an LLM's judgment.",
    architecture:
      "The system strictly separates concerns: LLMs handle intent classification, entity extraction, and natural language responses, while all business rules — leave-balance checks, approval thresholds, escalation triggers — run as deterministic Python logic and LangGraph edges the LLM cannot override. It classifies 8 HR intents, integrates Google Sheets/Gmail/Calendar/Drive for real data, and ships WhatsApp adapters for both Twilio and Meta's Cloud API.",
    results:
      "Because policy logic is deterministic rather than LLM-decided, the system can auto-approve routine requests (e.g. short leave) while reliably escalating anything above a threshold to a human manager — the kind of guarantee that matters once real employee data and approvals are on the line.",
    tech: ["LangGraph", "FastAPI", "PostgreSQL", "Redis", "React"],
    metrics: ["8 HR Intents", "Human Approval Gates", "WhatsApp Integration"],
    github: "https://github.com/MaazzAlii/enterprise-hr-automation-engine",
    image: "/projects/hr-automation-1.jpg",
    images: ["/projects/hr-automation-1.jpg"],
    featured: true,
  },
  {
    slug: "content-pipeline",
    title: "Multi-Agent Content Generation Platform",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Researcher → Writer → Reviewer agents coordinated by a LangGraph state machine router — full content pipeline from query to polished output.",
    overview:
      "A single LLM call asked to \"research and write a good article\" tends to produce shallow, unreviewed output. Splitting the job into three specialist agents — one per stage — with an explicit handoff between them produces noticeably more coherent, fact-checked content.",
    architecture:
      "A LangGraph state machine router passes work between three agents in sequence: a Researcher gathers and structures source material, a Writer drafts from that structured research, and a Reviewer critiques and requests revisions before the pipeline considers the output final.",
    results:
      "The explicit Researcher → Writer → Reviewer handoff — with the Reviewer able to send work back for revision — produces a self-correcting content pipeline rather than a single unreviewed generation pass.",
    tech: ["LangGraph", "Mistral AI", "Streamlit", "Python"],
    metrics: ["3 Specialist Agents", "State Machine Router", "Open Source"],
    github: "https://github.com/MaazzAlii/orchestr-ai",
    image: "/projects/content-pipeline.png",
    images: ["/projects/content-pipeline.png"],
    featured: true,
  },
  {
    slug: "ai-context-saver",
    title: "AI Context Saver",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Preserves AI conversations across ChatGPT, Claude, Gemini, and Copilot with intelligent context compression. Live on the Chrome Web Store.",
    overview:
      "Long AI chat sessions get cut off, lost on refresh, or hit context limits — and switching between ChatGPT, Claude, Gemini, and Copilot means losing continuity entirely. This extension preserves that context locally, across all of them.",
    architecture:
      "A Chrome extension built on the browser's extension APIs intercepts and stores conversation state locally rather than routing it through a third-party server — a local-first architecture, so your conversation history never leaves your machine. Mistral AI handles the context-compression step so long histories stay within model context limits without losing the important parts.",
    results:
      "Shipped and published live on the Chrome Web Store — not just a working prototype, but a real product with real installs, subject to Chrome's review process and public user feedback.",
    tech: ["JavaScript", "Chrome APIs", "Mistral AI"],
    metrics: ["Published on Chrome Web Store", "Local-First Architecture", "Open Source"],
    github: "https://github.com/MaazzAlii/context-saver-extension",
    demo: "https://chromewebstore.google.com/detail/ai-context-saver-%E2%80%93-chatgp/lfeeefcainjkdadjjcgchjknlbgepfnm",
    image: "/projects/context-saver.png",
    images: ["/projects/context-saver.png"],
    featured: true,
  },
  {
    slug: "ai-voice-chatbot",
    title: "Real-Time AI Voice Assistant",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Continuous speech-to-text and text-to-speech with Mistral AI — real-time voice conversation in a Streamlit interface.",
    overview: "A browser-based voice assistant for genuinely conversational back-and-forth — speak, get a spoken reply, keep talking — rather than a push-to-talk transcription tool.",
    architecture: "Continuous speech-to-text feeds directly into Mistral AI for the response, with text-to-speech streaming the reply back, all inside a Streamlit interface that keeps the loop tight enough to feel like a real conversation.",
    results: "Demonstrates a full real-time voice loop — capture, understand, respond, speak — as a reusable pattern behind several of the voice-agent client projects.",
    tech: ["Python", "Streamlit", "Mistral AI"],
    metrics: ["Real-Time STT/TTS", "Open Source"],
    github: "https://github.com/MaazzAlii/ai-voice-chatbot-python",
    image: "/projects/voice-assistant.png",
    images: ["/projects/voice-assistant.png"],
  },
  {
    slug: "techbazaar-shopping-assistant",
    title: "TechBazaar AI Shopping Assistant",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Full-stack AI shopping assistant with native LLM function-calling, live checkout, and n8n order-automation workflows.",
    overview: "A shopping assistant that can actually complete a purchase, not just describe products — the LLM calls real functions (search catalog, add to cart, checkout) instead of only generating text.",
    architecture: "Native function-calling across multiple LLM providers (Mistral, Gemini, Groq) drives catalog search and cart actions, Stripe handles checkout, and n8n workflows pick up after purchase to automate order processing.",
    results: "A working end-to-end purchase flow driven by conversational AI, with the post-purchase order handling automated rather than manual.",
    tech: ["Streamlit", "Mistral AI", "Google Gemini", "Groq", "Stripe", "n8n"],
    github: "https://github.com/MaazzAlii/techbazaar-ai-shopping-assistant",
  },
  {
    slug: "safex-rag-chatbot",
    title: "SafeX RAG Knowledge Assistant",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Enterprise-grade knowledge-retrieval assistant that scrapes and refreshes its own knowledge base for document query resolution.",
    overview: "Built during a company internship to answer internal knowledge questions without a human digging through documentation each time.",
    architecture: "ChromaDB and sentence-transformers embeddings power retrieval over a knowledge base that a Playwright scraper keeps refreshed automatically, so answers don't go stale as source documents change; FastAPI exposes the whole thing as a service.",
    results: "A working internal RAG assistant that keeps its own knowledge base current without manual re-indexing.",
    tech: ["RAG", "ChromaDB", "sentence-transformers", "FastAPI", "Playwright"],
    github: "https://github.com/MaazzAlii/Rag-Chatbot-Safex",
  },
  {
    slug: "ai-talent-advisor",
    title: "AI Talent Advisor — Resume Screener",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Recruiting agent that parses CVs via Mistral OCR and ranks candidates against job criteria across weighted evaluation dimensions.",
    overview: "A recruiting agent that screens CVs against a job description the way a hiring manager would — scoring candidates across multiple weighted criteria instead of keyword-matching.",
    architecture: "Mistral's OCR pipeline extracts structured text from CVs (including scanned/PDF formats via python-docx handling), and Groq-hosted models score each candidate across weighted evaluation dimensions defined for the role.",
    results: "Turns a stack of CVs into a ranked shortlist with visible per-dimension scoring, rather than a single opaque \"fit\" number.",
    tech: ["Groq", "Mistral AI", "FastAPI", "python-docx"],
    github: "https://github.com/MaazzAlii/ai-talent-advisor",
  },
  {
    slug: "ollamastream-studio",
    title: "OllamaStream Studio — Local LLM Interface",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Local desktop playground for chatting with and testing open-source LLMs fully offline, with a cloud-API mode via Mistral AI.",
    overview: "A playground for testing open-source LLMs locally through Ollama, with a toggle to switch to Mistral's cloud API when you want a stronger model instead of a local one.",
    architecture: "Streamlit provides the chat UI, with a dual-provider switch: Ollama for fully offline local inference, or Mistral AI's cloud API for cases needing a larger model, with Pandas handling any session/log analysis.",
    results: "A genuinely useful daily-driver tool for comparing local vs. cloud model behavior side by side, not just a demo.",
    tech: ["Streamlit", "Ollama", "Mistral AI", "Pandas"],
    github: "https://github.com/MaazzAlii/OllamaStream-Local-LLM-Interface",
  },
  {
    slug: "mediquant-llm-finetuning",
    title: "MediQuant — Medical LLM Fine-Tuning",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Real LoRA/PEFT fine-tuning pipeline (not just inference) producing a clinical-QA specialized LLM with tracked evaluation metrics.",
    overview: "Most \"AI medical\" projects just prompt a general model. This one actually fine-tunes a model on clinical-QA data — a meaningfully different (and harder) exercise than inference-only projects.",
    architecture: "Unsloth and Hugging Face's TRL/PEFT libraries drive LoRA fine-tuning on top of an open-source base model in PyTorch, with evaluation metrics tracked across training runs to measure real improvement on clinical-QA tasks rather than assuming it.",
    results: "A genuine fine-tuning pipeline with tracked before/after evaluation — proof of working with model weights directly, not just prompting an API.",
    tech: ["PyTorch", "Unsloth", "Hugging Face TRL/PEFT", "LoRA"],
    github: "https://github.com/MaazzAlii/MediQuant-Medical-LLM-FineTuning",
  },
  {
    slug: "agentic-vision-numpy-lab",
    title: "Agentic Vision RAG (NumPy Lab)",
    category: "AI & Agentic Systems",
    visibility: "public",
    description:
      "Interactive experimentation repository exploring array manipulation and early vector-extraction techniques for multi-modal RAG.",
    overview: "An early, foundational lab exploring how images become vectors — the groundwork that later fed into the full Vision RAG system.",
    architecture: "Pure NumPy array manipulation exercises exploring vector extraction techniques, intentionally kept dependency-light to focus on the underlying math rather than a framework.",
    results: "A learning-stage repository, kept in the portfolio for transparency about the progression from fundamentals to the production Vision RAG system.",
    tech: ["Python", "NumPy"],
    github: "https://github.com/MaazzAlii/Agentic-Vision-RAG",
  },

  // ───────────────────────── Automation & Workflows ─────────────────────────
  {
    slug: "telegram-content-pipeline",
    title: "Telegram AI Content Automation Pipeline",
    category: "Automation & Workflows",
    visibility: "public",
    description:
      "Human-in-the-loop content curation built on n8n: research → draft → sheet queue → human approval → scheduled Telegram post.",
    overview:
      "Fully automated content pipelines tend to either need constant babysitting or post things nobody reviewed. This n8n workflow automates the busywork — research, drafting, scheduling — while keeping one human approval gate before anything goes live.",
    architecture:
      "n8n orchestrates the flow: a research step gathers source material, a drafting step produces the post, then it lands in a Google Sheets queue for human review before a scheduled node publishes approved posts to Telegram.",
    results:
      "Removes the manual research-and-draft cycle while keeping editorial control intact — the human only has to approve or reject, not write from scratch.",
    tech: ["n8n", "Google Sheets API", "Python"],
    github: "https://github.com/MaazzAlii/telegram-ai-content-pipeline",
  },

  // ───────────────────────── Enterprise Full-Stack & SaaS ─────────────────────────
  {
    slug: "multivendor-ecommerce-platform",
    title: "Multi-Vendor E-Commerce Platform",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description:
      "Multi-role (buyer/seller/admin) marketplace with split-by-vendor orders, Stripe payments, and automated test coverage.",
    overview: "A marketplace where multiple independent vendors sell through one storefront — the hard part isn't the storefront, it's correctly splitting a single order across vendors, roles, and payouts.",
    architecture: "Node.js/Express and MongoDB back three distinct role views (buyer/seller/admin) with JWT auth gating access; Stripe handles payment splitting per vendor within a single checkout, and Cloudinary manages product media at scale. Jest tests cover the order-splitting logic specifically, since that's where multi-vendor systems tend to break.",
    results: "A functioning multi-vendor checkout with per-vendor order splitting and automated test coverage on the logic most likely to have edge-case bugs.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Stripe", "Cloudinary", "Jest"],
    github: "https://github.com/MaazzAlii/mern-multivendor-ecommerce-api",
    links: [{ label: "Frontend repo", url: "https://github.com/MaazzAlii/multivendor-ecommerce-frontend-react-vite" }],
  },
  {
    slug: "edupulse-lms",
    title: "EduPulse LMS — Production Next.js 15 App",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description:
      "Full-stack Learning Management System: auth, course creation, progress tracking, video, payments, and its own e2e test suite.",
    overview: "A learning management system covering the full instructor-to-student loop: create a course, take payment for it, track a student's progress through it.",
    architecture: "Built on Next.js 15 with MongoDB for course/user data and JWT for auth; Stripe handles course payments and Resend handles transactional email (enrollment confirmations, progress notices). Playwright end-to-end tests cover the critical paths — enrollment, payment, progress tracking — rather than relying on manual QA.",
    results: "A production-shaped LMS with its own e2e test suite, not just a CRUD demo — the payment and progress-tracking flows are actually verified automatically.",
    tech: ["Next.js 15", "MongoDB", "JWT", "Stripe", "Resend", "Playwright"],
    github: "https://github.com/MaazzAlii/edupulse-lms-nextjs",
  },
  {
    slug: "taskflow-devops-pipeline",
    title: "TaskFlow — Containerized MERN DevOps Pipeline",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "Task manager containerized with Docker, featuring a real CI/CD deployment pipeline.",
    overview: "A task manager where the interesting part isn't the app itself but getting it deployed reliably — this project is as much a DevOps exercise as a product build.",
    architecture: "A React/TypeScript front-end and Express backend are both containerized with Docker, wired into a real CI/CD pipeline that builds, tests, and deploys on push rather than requiring manual deployment steps.",
    results: "A working example of taking a full-stack app from local development to an automated, containerized deployment pipeline.",
    tech: ["React", "TypeScript", "Docker", "Express"],
    github: "https://github.com/MaazzAlii/taskflow-mern-devops-pipeline",
  },
  {
    slug: "taskflow-typescript",
    title: "TaskFlow API (TypeScript)",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "Strictly-typed TaskFlow rewrite with generics, superseding the plain-JS version.",
    overview: "A full rewrite of the TaskFlow API in TypeScript — the same product, but with the type safety that catches bugs the plain-JS version couldn't.",
    architecture: "Express and MongoDB stay the same as the JS version, but the API layer now uses TypeScript generics for reusable, type-safe request/response handling and JWT auth, rather than untyped objects passed around.",
    results: "A cleaner, more maintainable codebase than the original JS version — the kind of technical-debt paydown that matters once a project needs to keep growing.",
    tech: ["TypeScript", "Express", "MongoDB", "JWT"],
    github: "https://github.com/MaazzAlii/taskflow-api-typescript-express-mongodb",
    links: [{ label: "Frontend repo", url: "https://github.com/MaazzAlii/taskflow-frontend-typescript-react-vite" }],
  },
  {
    slug: "movie-ticket-booking",
    title: "Movie Ticket Booking System",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "Seat-level ticketing platform with role-based access control.",
    overview: "A ticketing system where the actual hard problem is concurrency — two people shouldn't be able to book the same seat at the same time.",
    architecture: "Node.js/Express and MongoDB back seat-level booking logic with role-based access control separating admin (showtime/theater management) from customer booking flows, with JWT securing both.",
    results: "A working seat-level booking flow with proper role separation between who manages showtimes and who books seats.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/MaazzAlii/movie-ticket-booking-api-node-express-mongodb",
    links: [{ label: "Frontend repo", url: "https://github.com/MaazzAlii/movie-ticket-booking-frontend-react-vite" }],
  },
  {
    slug: "hotel-booking-engine",
    title: "Hotel Booking Engine & REST API",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "Real-time availability checks, authentication, bookings, and reviews.",
    overview: "A hotel booking API handling the core reservation lifecycle: checking real availability, booking a room, and collecting a review afterward.",
    architecture: "Express and MongoDB power real-time availability checks against existing bookings before confirming a new one, with JWT-secured auth gating the booking and review endpoints.",
    results: "A working reservation API that correctly checks availability before confirming — the detail that separates a real booking system from a toy CRUD app.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/MaazzAlii/hotel-booking-api-node-express-mongodb-jwt",
    links: [{ label: "Frontend repo", url: "https://github.com/MaazzAlii/hotel-booking-frontend-react-vite" }],
  },
  {
    slug: "trading-post",
    title: "Trading Post Platform",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "Storefront demonstrating both Context API and Redux Toolkit — with async thunks for live API data — side by side.",
    overview: "A storefront built deliberately to compare two React state-management approaches side by side rather than defaulting to one.",
    architecture: "React Context API handles simpler local UI state while Redux Toolkit — with async thunks — manages live API data fetching for listings, letting the project directly demonstrate when each approach is the right tool.",
    results: "A working comparison of two state-management patterns in one real app, rather than two separate toy examples.",
    tech: ["React", "Redux Toolkit", "Context API", "Vite"],
    github: "https://github.com/MaazzAlii/Trading-Post",
  },
  {
    slug: "personal-portfolio-v2",
    title: "Maaz Ali — AI Engineer Portfolio (v2)",
    category: "Enterprise Full-Stack & SaaS",
    visibility: "public",
    description: "This site — a data-driven portfolio with per-project detail pages, dark/light themes, and optimized Web Vitals.",
    overview: "This portfolio itself: every project as structured data driving a real detail page per project, not a static one-page resume site.",
    architecture: "Next.js 15 with statically generated per-project routes (generateStaticParams), TypeScript throughout, Tailwind for styling, and Framer Motion for the reveal/carousel animations. Resend powers the contact form's email delivery.",
    results: "A portfolio that's actually maintainable — adding a project means adding one data entry, not hand-building a new page.",
    tech: ["Next.js 15", "TypeScript", "Tailwind", "Framer Motion", "Resend"],
    github: "https://github.com/MaazzAlii/Maaz-Ali-Portfolio",
  },

  // ───────────────────────── Mobile Apps ─────────────────────────
  {
    slug: "ridewave-ride-sharing",
    title: "RideWave — Real-Time Car Booking Platform",
    category: "Mobile Apps",
    visibility: "public",
    description: "Full-stack mobile ride-hailing app with real-time geolocation tracking, driver matching, and fare estimation.",
    overview: "A ride-hailing app covering the full rider-to-driver loop: request a ride, get matched, track it live, see a fare estimate before committing.",
    architecture: "React Native drives the mobile client, with a Node.js backend and WebSockets handling the real-time piece — live driver location updates and matching — that a plain REST API can't deliver fast enough for.",
    results: "A working real-time ride-hailing flow with live location tracking, the core technical challenge any ride-sharing app has to solve.",
    tech: ["React Native", "Node.js", "WebSockets"],
    github: "https://github.com/MaazzAlii/ridewave-react-native-ride-sharing-app",
  },
  {
    slug: "book-tracker-app",
    title: "Book Tracker Mobile App",
    category: "Mobile Apps",
    visibility: "public",
    description: "Library and reading-goal tracker with progress tracking, built on Expo and Appwrite.",
    overview: "A personal library tracker for people who want to actually finish their reading goals instead of just setting them.",
    architecture: "Built on Expo for fast cross-platform iteration, with Appwrite as the backend-as-a-service handling user accounts and book/progress data instead of a custom backend.",
    results: "A working cross-platform reading tracker shipped without building or hosting a custom backend.",
    tech: ["React Native", "Expo", "Appwrite"],
    github: "https://github.com/MaazzAlii/react-native-expo-appwrite-book-tracker",
  },

  // ───────────────────────── Personal Ventures (private) ─────────────────────────
  {
    slug: "handlescope",
    title: "HandleScope",
    category: "Personal Ventures",
    visibility: "private",
    description: "Domain and social-handle availability checker product, kept closed-source.",
    overview: "A tool that checks whether a name is available as a domain and across social handles in one search, instead of checking each platform manually.",
    tech: ["Python"],
  },
  {
    slug: "ai-business-os",
    title: "AI Business OS",
    category: "Personal Ventures",
    visibility: "private",
    description: "All-in-one AI operating system for small businesses: internal document RAG, dashboards, and workflow automation.",
    overview: "An attempt at a single operating layer for a small business's internal knowledge and workflows — document Q&A, dashboards, and automation in one place instead of scattered tools.",
    architecture: "FastAPI backend with ChromaDB powering internal document RAG, and Mistral AI providing the conversational layer over dashboards and automated workflows.",
    tech: ["FastAPI", "ChromaDB", "Mistral AI"],
  },
  {
    slug: "innoventix-crm-saas",
    title: "Innoventix — Multi-Tenant CRM & Project Management SaaS",
    category: "Personal Ventures",
    visibility: "private",
    description: "Multi-tenant SaaS combining CRM pipelines with project/task management, built as a personal venture.",
    overview: "A personal SaaS venture combining CRM and project management in one multi-tenant product, rather than building two separate tools.",
    architecture: "Next.js front-end, FastAPI backend, and MongoDB for data, with tenant isolation built in from the schema level up so each business's CRM pipeline and tasks stay separate.",
    tech: ["Next.js", "FastAPI", "MongoDB"],
  },
  {
    slug: "enterprise-voice-agent-scaffold",
    title: "Enterprise AI Voice Agent Platform",
    category: "Personal Ventures",
    visibility: "private",
    description: "Early-stage platform scaffold for a self-serve enterprise AI voice receptionist product.",
    overview: "An early-stage scaffold exploring what a self-serve, enterprise-grade version of the AI voice receptionist concept could look like as its own product.",
    architecture: "LangGraph for agent orchestration, Qdrant as the vector store, and Twilio for telephony — the foundation pieces for a voice platform, still in scaffold stage rather than production.",
    tech: ["LangGraph", "Qdrant", "Twilio"],
  },
  {
    slug: "local-image-upscaler",
    title: "Local Image Upscaler & Resizer",
    category: "Personal Ventures",
    visibility: "private",
    description: "Offline tool for image upscaling, batch processing, and resolution management.",
    overview: "A simple offline tool for upscaling and batch-processing images without uploading them to a third-party service.",
    tech: ["Streamlit", "Python", "Pillow"],
  },

  // ───────────────────────── Python Core & Utilities ─────────────────────────
  {
    slug: "karmax-ml-microapps",
    title: "Karmax Internship — ML Micro-Apps",
    category: "Python Core & Utilities",
    visibility: "public",
    description: "Four classical-ML micro-apps served via FastAPI: resume screening, churn prediction, fraud detection, and chatbot NLP.",
    overview: "Four separate classical machine-learning problems, each shipped as its own trained model behind a FastAPI endpoint, during an ML internship.",
    architecture: "scikit-learn models (one per task: resume screening, churn prediction, fraud detection, chatbot NLP) are trained offline, serialized with joblib, and served through individual FastAPI endpoints — trained models, not LLM prompting.",
    tech: ["FastAPI", "scikit-learn", "joblib", "pandas"],
    github: "https://github.com/MaazzAlii/Karmax-Intership",
  },
  {
    slug: "delivery-sales-forecast-dashboard",
    title: "Delivery Partner Sales Forecast Dashboard",
    category: "Python Core & Utilities",
    visibility: "public",
    description: "Forecasting dashboard pairing a Python model with a Next.js UI (synthetic data, no real-brand affiliation).",
    overview: "A sales-forecasting dashboard pairing a trained Python model with a real dashboard UI, built on synthetic data as a portfolio demonstration rather than tied to any real company.",
    tech: ["Next.js", "Python"],
    github: "https://github.com/MaazzAlii/delivery-partner-sales-forecast-dashboard",
  },
  {
    slug: "markitdown-web-ui",
    title: "MarkItDown Web UI — Document Converter",
    category: "Python Core & Utilities",
    visibility: "public",
    description: "Web GUI wrapper for converting PDFs, Office documents, and web pages into clean Markdown.",
    overview: "A web front-end over Microsoft's MarkItDown library, for converting PDFs, Office docs, and web pages to Markdown without touching a command line.",
    tech: ["Streamlit", "Microsoft MarkItDown"],
    github: "https://github.com/MaazzAlii/markitdown-web-ui",
  },
  {
    slug: "pdf-ppt-image-merger",
    title: "PDF/PPT/Image Merger",
    category: "Python Core & Utilities",
    visibility: "public",
    description: "Utility for merging and converting between PDF, PowerPoint, and image formats.",
    overview: "A utility for merging and converting between PDF, PowerPoint, and image files without needing separate tools for each format.",
    tech: ["Streamlit", "pypdf", "python-pptx", "reportlab"],
    github: "https://github.com/MaazzAlii/pdf-ppt-image-merger",
  },
  {
    slug: "python-fundamentals-collection",
    title: "Python Fundamentals Collection",
    category: "Python Core & Utilities",
    visibility: "public",
    description: "Turtle-graphics and core-syntax exercises: Pizza Deliveries, Tip Calculator, and Treasure Island.",
    overview: "Early Python fundamentals exercises — turtle graphics and core syntax practice — kept here for a transparent view of the learning path, not presented as production work.",
    tech: ["Python"],
    github: "https://github.com/MaazzAlii/python-pizza-deliveries",
    links: [
      { label: "Tip Calculator", url: "https://github.com/MaazzAlii/python-tip-calculator" },
      { label: "Treasure Island", url: "https://github.com/MaazzAlii/python-treasure-island" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

// FYP — separate type because it has many more images and dedicated section
export type FYPImage = {
  path: string;
  caption: string;
};

export const fyp: {
  title: string;
  shortDescription: string;
  tech: string[];
  metrics: string[];
  github: string;
  demo?: string;
  images: FYPImage[];
} = {
  title: "AI-Assisted Tourism Recommendation & Booking System for Northern Pakistan",
  shortDescription:
    "Full-stack Final Year Project — AI-powered tourism platform for Gilgit-Baltistan with a TF-IDF/SVD recommendation engine, FastAPI backend, React web app, and Flutter mobile app.",
  tech: ["FastAPI", "React", "Flutter", "SQLite", "JWT", "TF-IDF", "SVD", "Python"],
  metrics: [
    "Recommendation Engine",
    "JWT Authentication",
    "Booking Management",
    "Real-Time Availability",
    "Multi-Currency",
    "Flutter Mobile App",
  ],
  github: "https://github.com/MaazzAlii",
  // Each image has a path + caption describing what it shows.
  // Real screenshots were never dropped in public/projects/fyp/, which made every
  // slide 404 against the same missing file on every render — collapsed to the
  // one existing placeholder until real screenshots are added.
  // To restore the full gallery: drop files in public/projects/fyp/ and re-add
  // entries like { path: "/projects/fyp/landing.png", caption: "Landing Page — Hero & Navigation" }.
  images: [
    { path: "/temp.png", caption: "AI-Assisted Tourism Recommendation & Booking System" },
  ] as FYPImage[],
};

export type AndroidApp = {
  name: string;
  description: string;
  tags: string[];
  metrics?: string[];
  playStoreUrl?: string;
  image: string;
  images?: string[];
};

export const androidApps: AndroidApp[] = [
  {
    name: "Prayer Times, Azan & Adhkar",
    description:
      "Prayer times, Qibla direction, Azan notifications, and a full Quran audio player — localized in Arabic and Urdu with RTL support.",
    tags: ["Flutter", "AdMob", "Localization"],
    metrics: ["Published on Google Play", "RTL Support", "Qibla + Azan Features"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.maazinex.prayer_time_azan_qibla_finder",
    image: "/apps/prayer-times.png",
    images: ["/apps/prayer-times.png"],
  },
  {
    name: "Pakistani GPA & CGPA Calculator",
    description:
      "GPA and CGPA calculator for Pakistani university grading systems with multi-university support and PDF report generation.",
    tags: ["Flutter", "AdMob", "PDF Generation"],
    metrics: ["Published on Google Play", "Multi-University Support", "PDF Export"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.maazinex.pakistani_gpa_calculator",
    image: "/apps/gpa-calculator.png",
    images: ["/apps/gpa-calculator.png"],
  },
];

export const experience = {
  role: "Agentic AI Developer & Full Stack Engineer",
  location: "Rawalpindi, Pakistan",
  period: "2025 — Present",
  points: [
    "Architected and deployed multi-agent AI systems using LangGraph StateGraphs — including self-correcting RAG pipelines, ReAct tool-use agents, and orchestrated Researcher/Writer/Reviewer workflows.",
    "Built production-grade LLM applications integrating ChromaDB vector stores, Mistral AI, and Ollama for semantic retrieval, document intelligence, and real-time conversational AI.",
    "Designed and shipped n8n and GoHighLevel automations for client businesses — lead routing, AI voice/chat agents, and CRM workflows that run unattended.",
    "Engineered scalable backend services with FastAPI, SQLAlchemy, JWT authentication, and REST APIs — deployed and serving real users.",
    "Shipped cross-platform software to production: Chrome Web Store extension, two Google Play Store apps, and a full-stack tourism platform with a TF-IDF/SVD recommendation engine.",
  ],
};

export type Certification = {
  title: string;
  provider: string;
  date?: string;
  marks?: string;
  status?: string;
  // Uncomment credentialUrl and replace "#" with your real certificate/post URL when available
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Azure Fundamentals (AZ-900)",
    provider: "Microsoft",
    date: "2025",
    marks: "983 / 1000",
    status: "Completed",
    // credentialUrl: "https://www.linkedin.com/in/maazzalii/",  // Replace with actual certificate URL
  },
  {
    title: "Artificial Intelligence Training",
    provider: "NAVTTC",
    date: "2024",
    status: "Completed",
    // credentialUrl: "#",  // Replace with actual certificate URL
  },
  {
    title: "Python Essentials 1",
    provider: "Cisco Networking Academy",
    date: "2024",
    status: "Completed",
    // credentialUrl: "#",  // Replace with actual certificate URL
  },
];

export const contact = {
  heading: "Let's build something",
  body: "Open to AI Engineer roles, internships, software engineering positions, and freelance / automation projects.",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Channels", href: "#channels" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
