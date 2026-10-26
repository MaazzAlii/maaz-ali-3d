# AGENTS.md

## Persistent Project Instructions for AI Coding Agents

### 1. Project Purpose & Scope
This project is the official 3D interactive portfolio for **Maaz Ali** — AI Engineer, Automation Specialist, and Final-Year CS student at NUML Islamabad. It serves as both a high-converting professional portfolio and a creative technical showcase highlighting real 3D graphics (Three.js), modern micro-interactions, dark/light mode theming, and comprehensive case studies for all 43 shipped projects.

### 2. Technology Stack & Directory Structure
- **Framework**: Vite + React 18 + TypeScript
- **3D Graphics Engine**: Three.js (`three`) with customized shaders, particle systems, procedural geometry, and orbit interactions.
- **Styling**: Vanilla CSS with strict design tokens defined at `:root` (CSS Custom Properties). Avoid Tailwind classes unless explicitly mandated.
- **Icons**: Lucide React (`lucide-react`)
- **Directory Layout**:
  ```
  ├── public/                 # Static assets (images, PDFs, 3D textures, icons)
  │   ├── maaz-ali-photo.png  # Authentic profile portrait
  │   ├── Maaz_Ali_Resume.pdf # Official downloadable PDF resume
  │   ├── apps/               # Mobile app screenshots (Google Play)
  │   └── projects/           # High-resolution project screenshots
  ├── src/
  │   ├── assets/             # Bundled visual assets
  │   ├── components/         # Modular UI & 3D components
  │   │   ├── 3d/             # Three.js canvas & scene implementations
  │   │   ├── layout/         # Header, Navigation, Footer, ThemeToggle
  │   │   ├── sections/       # Hero, About, Projects, TechGalaxy, Experience, etc.
  │   │   └── ui/             # GlassCard, Modal, Badge, Button, Tabs
  │   ├── data/               # Single source of truth (portfolio data & project catalog)
  │   ├── hooks/              # Custom hooks (useTheme, useIntersectionObserver, etc.)
  │   ├── styles/             # Global CSS, design tokens, animations
  │   ├── App.tsx             # Main application orchestrator
  │   └── main.tsx            # Vite root entry
  ├── index.html              # HTML5 entry with SEO tags & schema.org JSON-LD
  ├── REQUIREMENTS.md         # Full project specifications
  ├── ARCHITECTURE.md         # Technical architecture documentation
  ├── IMPLEMENTATION_PLAN.md  # Multi-phase execution plan
  ├── TASKS.md                # Task tracking checklist
  ├── TESTING.md              # Test specifications and commands
  └── README.md               # User & developer guide
  ```

### 3. Coding Standards & Conventions
- **TypeScript**: Strict type safety. Define explicit interfaces for all data structures (Projects, Socials, Certifications, Skills).
- **Vanilla CSS & Tokens**: Always use CSS variables from `src/styles/tokens.css` for colors, surfaces, spacing, shadows, and radiuses. No arbitrary hardcoded hex codes.
- **Performance**:
  - Three.js animation loops must automatically pause when canvases are not visible in viewport (`IntersectionObserver`).
  - Honor `prefers-reduced-motion` to disable spinning or particle vortex animations for sensitive users.
- **Accessibility (WCAG 2.1 AA)**:
  - All interactive elements must have semantic HTML tags, accessible names, visible focus outlines, and appropriate ARIA attributes.
  - Colors must meet 4.5:1 minimum contrast ratio in both Light and Dark themes.
- **Git Commit Standards**:
  - Every file must be committed individually with its own focused, clear commit message.
  - Never stage and commit all files in a single generic bulk commit.
  - Push individual commits so the Git history provides clean per-file change tracking.
- **Prohibited Destructive Actions**:
  - Never fabricate fake user testimonials or client stats.
  - Never remove or overwrite Maaz Ali's real project metadata, certifications, or links.
