# REQUIREMENTS.md

## Project: Maaz Ali — 3D Interactive AI Engineer Portfolio

### 1. Project Purpose & Scope
This project is an immersive, high-performance 3D portfolio website for **Maaz Ali**, a final-year Computer Science student at NUML Islamabad, AI Engineer, and Automation Architect. The objective is to establish an industry-leading visual and technical demonstration of Maaz Ali's expertise in Agentic AI systems (LangGraph, multi-agent swarms, RAG), enterprise business automation (n8n, GoHighLevel), and full-stack software development.

### 2. Confirmed Client Information & Qualifications
- **Full Name**: Maaz Ali
- **Primary Roles**: AI Engineer · Automation Architect (n8n & GoHighLevel) · Full-Stack Developer · Content Creator
- **Location**: Rawalpindi, Pakistan (Open to relocation & remote globally)
- **Education**: BS Computer Science, National University of Modern Languages (NUML) Islamabad (Graduating January 2027)
- **Certifications**:
  - Microsoft Certified: Azure Fundamentals (AZ-900) — Score: 983 / 1000 (2025)
  - Cisco Networking Academy: Python Essentials 1 (2024)
  - NAVTTC: Artificial Intelligence Training (2024)
- **Key Statistics**:
  - 43 Shipped Projects across 7 domains
  - 10+ Client & Freelance Engagements
  - 2 Apps Published on Google Play Store (Prayer Times & Azan Finder, Pakistani GPA & CGPA Calculator)
- **Contact & Socials**:
  - Email: `maazalisshahid@gmail.com`
  - LinkedIn: `https://www.linkedin.com/in/maazzalii/`
  - GitHub: `https://github.com/MaazzAlii`
  - YouTube: `https://www.youtube.com/@Maazali_ai`
  - Instagram: `https://www.instagram.com/maazali.ai/`
  - TikTok: `https://www.tiktok.com/@maazali_ai`
  - Telegram: `https://t.me/Maazinex`
  - Facebook: `https://www.facebook.com/maazaliai`
  - Resume: `/Maaz_Ali_Resume.pdf` (Downloadable)

---

### 3. Target Audience & User Journeys
1. **Tech Recruiters & Talent Acquisition**:
   - Needs instant verification of qualifications, education, certifications, and core skills within 5 seconds.
   - Requires easy 1-click resume download and direct email/LinkedIn contact.
2. **Engineering Leaders & CTOs**:
   - Seeks architectural depth, proof of production AI systems (LangGraph, vector databases, FastAPI), and code structure.
   - Evaluates project case studies with architectural summaries, metrics, and technology breakdowns.
3. **Clients Seeking Automation & AI Solutions**:
   - Needs to see proven client work (SaaS platforms, CRM automations, voice agents, offline systems) and clear business ROI.
4. **Developers & Content Community**:
   - Explores tutorials, social links, open-source repositories, and interactive 3D web features.

---

### 4. Functional Requirements
- **Navigation**: Sticky glassmorphic top navigation with smooth section scrolling, mobile drawer menu, and live theme switch.
- **Hero Section**:
  - Interactive WebGL/Three.js 3D Neural / Agentic Core that responds to pointer movement, rotation, and dynamic particle effects.
  - Quick action buttons (View Work, Download Resume, Contact).
  - Live metric counters (43 Projects, 10+ Client Engagements, 2 Published Apps).
- **Interactive 3D Technology Cosmos**:
  - Spherical 3D constellation of core technologies with orbit controls, interactive hover halos, and category filtering.
- **Interactive Agentic Workflow Simulator**:
  - Visual interactive node graph demonstrating an autonomous LangGraph agent pipeline with real-time simulated packet flow.
- **Categorized Projects Showcase (All 43 Projects)**:
  - 7 Interactive categories with active filtering and search:
    1. Client & Freelance Work
    2. AI & Agentic Systems
    3. Automation & Workflows
    4. Enterprise Full-Stack & SaaS
    5. Mobile Apps
    6. Personal Ventures
    7. Python Core & Utilities
  - Rich project cards with tags, descriptions, visibility badges (Public/Private), and links.
  - Deep-dive Modal drawer with 3 tabs: Overview, Architecture & Stack, and Impact/Results.
- **Featured Google Play Apps Showcase**:
  - Dedicated interactive presentation of both published Flutter apps with feature badges and direct Play Store badges/links.
- **Professional Timeline & Experience**:
  - Interactive career path highlighting LangGraph multi-agent engineering, FastAPI microservices, and n8n automations.
- **Certifications & Education**:
  - Detailed verification cards for Microsoft AZ-900 (983/1000), NAVTTC, Cisco, and NUML BS CS degree.
- **Channels & Social Hub**:
  - YouTube, Instagram, TikTok, Telegram community cards with subscriber/follower context.
- **Contact & Booking Section**:
  - Interactive message form with client-side validation, direct email copying, mailto fallback, and celebration particle feedback.

---

### 5. Visual & UI/UX Requirements
- **Visual Aesthetic**: Futuristic, high-tech, sleek dark mode by default with glowing cyber-indigo (`#6366f1`) and quantum-cyan (`#06b6d4`) accents.
- **Design Tokens**: Standardized CSS variables for surfaces, text hierarchy, border-glows, and backdrop-filter glassmorphism.
- **Theming**: Complete dual-theme support:
  - Cyber Dark (Deep slate `#090d16`, radiant neon glows)
  - Pure Light (Crisp frost `#f8fafc`, hyper cobalt accents)
  - Persistent preference stored in `localStorage`.
- **Typography**: Google Fonts Outfit & Inter paired with JetBrains Mono for code metrics.
- **Responsiveness**: Flawless responsive layout tested across mobile (360px-420px), tablet (768px-1024px), and desktop (1280px-1920px).

---

### 6. 3D & Animation Requirements
- **Three.js Core**: Hardware-accelerated canvas rendering with graceful fallback when WebGL is unavailable or when reduced motion is preferred.
- **Performance Budget**: Target 60 FPS on desktop and mobile; auto-throttling when canvas is off-screen (IntersectionObserver).
- **Camera Controls**: Smooth dampening, bounded rotation angles, touch-to-drag orbit on mobile.

---

### 7. Acceptance Criteria
- [x] All 43 projects documented and accessible with search & category filters.
- [x] Verified user credentials, certifications, resume, and photos correctly embedded.
- [x] Three.js 3D canvas loads smoothly without frame drops or console errors.
- [x] Dark/Light mode switches seamlessly with zero layout shift or illegible contrast.
- [x] Mobile menu and touch interactions fully operational.
- [x] Production build passes cleanly with zero TypeScript or bundle errors.
