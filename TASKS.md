# TASKS.md

## Development Task Checklist

### Setup & Infrastructure
- [x] Inspect existing workspace and analyze `maazzalii.vercel.app`
- [x] Copy authentic assets (`maaz-ali-photo.png`, `Maaz_Ali_Resume.pdf`, app and project screenshots)
- [x] Install Vite, React 18, TypeScript, Three.js, Lucide React, Canvas Confetti
- [x] Create project documentation (REQUIREMENTS, AGENTS, ARCHITECTURE, PLAN, TASKS, TESTING, README)

### Design System & Theming
- [x] Create `src/styles/tokens.css` with CSS custom properties for Cyber Dark & Pure Light themes
- [x] Create global resets, typography scales (Outfit, Inter, Fira Code), and glassmorphism helpers
- [x] Build `useTheme` hook with persistence in `localStorage` and default Cyber Dark theme

### Data Architecture
- [x] Create `src/data/portfolioData.ts` with authentic profile, 43 projects, 7 categories, certifications, skills, and stats

### 3D Creative Engineering
- [x] Build `src/components/3d/HeroScene3D.tsx` (Agentic AI Hologram Core, orbital rings, agent nodes, particle cloud)
- [x] Build `src/components/3d/TechCosmos3D.tsx` (Spherical interactive tech constellation)
- [x] Implement camera damping, mouse/touch reactive physics, color switching, wireframe toggle, and performance off-screen throttling

### UI Components & Sections
- [x] Build `src/components/layout/Navbar.tsx` (Glassmorphic bar, mobile nav drawer, theme toggle)
- [x] Build `src/components/sections/Hero.tsx` (3D scene, dynamic badges, stats row, CTAs)
- [x] Build `src/components/sections/About.tsx` (Photo with 3D depth, NUML facts, social pills)
- [x] Build `src/components/sections/WorkflowSimulator.tsx` (Visual LangGraph interactive pipeline)
- [x] Build `src/components/sections/Projects.tsx` (Category pills, search filter, project grid, details modal)
- [x] Build `src/components/sections/AppsShowcase.tsx` (Google Play published Flutter apps)
- [x] Build `src/components/sections/Skills.tsx` (Grouped tech pills + 3D cosmos view)
- [x] Build `src/components/sections/Experience.tsx` (Career trajectory, certifications verification)
- [x] Build `src/components/sections/Channels.tsx` (YouTube, Instagram, TikTok, Telegram community hub)
- [x] Build `src/components/sections/Contact.tsx` (Interactive form, copy email, mailto, confetti feedback)
- [x] Build `src/components/layout/Footer.tsx` (Semantic footer, quick links, back to top)

### Verification & Testing
- [x] TypeScript typecheck (`tsc --noEmit` - passed with 0 errors)
- [x] Production build (`npm run build` - passed with optimized chunks in 3.97s)
- [x] Start development server (`npm run dev` running smoothly at http://127.0.0.1:3000/)
- [x] Browser visual and responsive inspection (Screenshots captured and verified for Hero, About, Projects, Modals, Simulator, Skills)
- [x] Accessibility & WCAG contrast audit (Semantic tags, contrast ratios, and keyboard traps verified)
