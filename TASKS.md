# TASKS.md

## Development Task Checklist

### Setup & Infrastructure
- [x] Inspect existing workspace and analyze `maazzalii.vercel.app`
- [x] Copy authentic assets (`maaz-ali-photo.png`, `Maaz_Ali_Resume.pdf`, app and project screenshots)
- [x] Install Vite, React 18, TypeScript, Three.js, Lucide React, Canvas Confetti
- [x] Create project documentation (REQUIREMENTS, AGENTS, ARCHITECTURE, PLAN, TASKS, TESTING, README, DESIGN_SYSTEM_PROMPT, SESSION_HANDOFF)
- [x] Save Master UI/UX Specification to `DESIGN_SYSTEM_PROMPT.md`
- [x] Push all individual file commits to GitHub: [https://github.com/MaazzAlii/maaz-ali-3d](https://github.com/MaazzAlii/maaz-ali-3d)

### Apple HIG & Liquid Glass Theme System (Phase 1)
- [x] Create `src/styles/tokens.css` with full Apple HIG tokens (`--bg-base`, `--surface-1`, `--surface-glass`, `--glass-blur`, `--glass-specular`, `--focus-ring`)
- [x] Support Light Mode default base with seamless Dark Mode (`[data-theme="dark"]`, `.dark`)
- [x] Implement `useTheme.ts` with `localStorage` key `"theme"` and `prefers-color-scheme` listener
- [x] Add zero-flash pre-paint script to `<head>` in `index.html`

### Surface Hierarchy & Materials (Phase 2 & 3)
- [x] Implement Level 1 Elevated Surface (`.liquid-card`) for high-contrast data readability in `global.css`
- [x] Implement Level 4 Chrome Surface (`.liquid-glass-chrome`) for navigation in `global.css`
- [x] Calibrate typography to Apple SF Pro system stack with accurate letter-spacing and WCAG AA contrast
- [x] Update `Navbar.tsx` with liquid glass chrome and Apple capsule buttons
- [x] Update `Hero.tsx` with liquid card metrics and Apple typography
- [x] Update `About.tsx` with liquid card quick facts and 3D depth frame
- [x] Update `Projects.tsx` with liquid card project items and Apple HIG search
- [x] Update `AppsShowcase.tsx` with liquid card Google Play cards
- [x] Update `Skills.tsx` with liquid card skill groups
- [x] Update `Experience.tsx` with liquid card career timeline and credentials

### 3D Creative Development
- [x] `HeroScene3D.tsx`: Central **Agentic Neural Core** with 3 orbital rings
- [x] `HeroScene3D.tsx`: Real-time 3D projected technology labels (`LangGraph`, `ChromaDB RAG`, `n8n Automations`, `FastAPI Backend`)
- [x] `HeroScene3D.tsx`: Interactive wireframe shell toggle, orbit rotation toggle, and telemetry status
- [x] `TechCosmos3D.tsx`: 3D spherical Fibonacci constellation with interactive node click and category filtering
- [x] `WorkflowSimulator.tsx`: Interactive LangGraph & Automation state machine simulator with real-time logs

### Phase 4 Polish & Final Refinements
- [x] Refine `Channels.tsx` cards with `.liquid-card` and Apple typography
- [x] Refine `Contact.tsx` inputs and form card with Apple HIG styling and tokens
- [x] Refine `ProjectModal.tsx` with Level 3 liquid glass overlay and spring scale entrance
- [x] Refine `Footer.tsx` with Apple HIG design tokens and social links
- [x] Run full browser QA and responsive inspection across themes and 3D scenes
- [x] Verified zero-regression production build (`npm run build`) in 4.5s
