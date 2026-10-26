# Maaz Ali — 3D Interactive AI Engineer Portfolio

A cutting-edge, high-performance 3D portfolio website for **Maaz Ali** — AI Engineer, Automation Specialist, and final-year Computer Science student at NUML Islamabad.

Featuring real-time WebGL 3D graphics (Three.js), modern glassmorphism, responsive architecture, dark/light mode theming, and an interactive case-study browser for all 43 shipped projects.

---

## 🚀 Key Highlights & Features

- **Interactive 3D Agentic Neural Core**: Hardware-accelerated Three.js 3D scene visualizing autonomous agent swarms (Supervisor, Coder, Reviewer) orbiting a pulsing neural core with dynamic particles.
- **Interactive 3D Technology Cosmos**: Orbiting spherical constellation of technologies with hover focus and category filter rings.
- **Visual Agentic Workflow Simulator**: Live interactive demonstration of LangGraph state machine execution (Trigger → Supervisor Agent → Tool Execution → Output).
- **All 43 Shipped Projects**: Grouped into 7 domains with instant category switching, real-time keyword search, and detailed modal case studies (Overview, Architecture, Results).
- **Google Play Apps Showcase**: Dedicated interactive cards for published Flutter applications: *Prayer Times, Azan & Qibla Finder* and *Pakistani GPA & CGPA Calculator*.
- **Verified Credentials & Certifications**: Microsoft Certified Azure Fundamentals (AZ-900, Score 983/1000), Cisco Python Essentials 1, and NAVTTC AI Training.
- **Dual Cyber Themes**: Seamless switching between **Cyber Dark** and **Pure Light** modes with smooth transitions and persistent storage.
- **High Performance & Accessible**: Built strictly with semantic HTML5, WCAG 2.1 AA contrast compliance, zero-dependency CSS tokens, and off-screen 3D throttling.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js, WebGL, Custom GLSL Shaders & Particles
- **Styling**: Vanilla CSS Design System with CSS Custom Properties (`src/styles/tokens.css`)
- **Icons**: Lucide React
- **Animations**: CSS Keyframes, Three.js requestAnimationFrame with IntersectionObserver

---

## 📂 Project Structure

```
├── public/                 # Static assets (portrait, PDF resume, screenshots)
├── src/
│   ├── components/
│   │   ├── 3d/             # Three.js 3D scenes (HeroScene3D, TechCosmos3D)
│   │   ├── layout/         # Navbar, Footer, ThemeToggle
│   │   ├── sections/       # Hero, About, Projects, Apps, Skills, Experience, Contact
│   │   └── ui/             # Modals, Badges, Tabs, GlassCards
│   ├── data/               # portfolioData.ts (Single source of truth)
│   ├── styles/             # tokens.css, global.css
│   ├── App.tsx             # Main application orchestrator
│   └── main.tsx            # Vite root entry
├── index.html              # HTML5 entry with SEO and Schema.org
├── REQUIREMENTS.md         # Full project specifications
├── ARCHITECTURE.md         # Architecture and design patterns
├── IMPLEMENTATION_PLAN.md  # Milestones and progression
├── TASKS.md                # Task tracking checklist
└── TESTING.md              # Testing guide & checklist
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ (tested on v20.18.0)
- npm 9+

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Type-check
npm run typecheck

# 4. Build for production
npm run build
```

---

## 👤 Profile & Contact

- **Maaz Ali** — Rawalpindi, Pakistan (Open to relocation & remote)
- **Email**: [maazalisshahid@gmail.com](mailto:maazalisshahid@gmail.com)
- **LinkedIn**: [linkedin.com/in/maazzalii](https://www.linkedin.com/in/maazzalii/)
- **GitHub**: [github.com/MaazzAlii](https://github.com/MaazzAlii)
- **YouTube**: [@Maazali_ai](https://www.youtube.com/@Maazali_ai)
