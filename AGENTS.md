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
- **Versioned Repository Protocol**:
  - Whenever a distinct design or major 3D concept iteration is created (e.g., v1, v2, v3):
    - Maintain a corresponding branch locally.
    - Create and maintain a dedicated standalone GitHub repository (`maaz-ali-3d-v1`, `maaz-ali-3d-v2`, `maaz-ali-3d-v3`, etc.) with `main` as its default branch.
    - Mirror every individual commit so each repository preserves identical per-file Git history.
    - This allows one-click Vercel deployments for each version independently without branch configuration.
- **Prohibited Destructive Actions**:
  - Never fabricate fake user testimonials or client stats.
  - Never remove or overwrite Maaz Ali's real project metadata, certifications, or links.

---

### 4. Next Session Execution Plan (Trigger: "resume")
> [!IMPORTANT]
> When the user sends **"resume"** (or indicates they are ready to proceed), immediately execute the two major 3D visual and interactive enhancements detailed below without delay.

#### Feature A: Structured Orbit & Path Following in Hero 3D Scene (`src/components/3d/HeroScene3D.tsx`)
- **User Request & Objective**: Replace any random floating/scrolling behavior of the top 3D dots with structured orbital paths. Keep the central neural core aesthetic ("something cute"), while having all side circles/nodes strictly follow visible, elegant orbital lines/paths in clean parametric rotation rather than drifting unpredictably.
- **Implementation Tasks**:
  1. **Strict Parametric Orbit Mechanics**:
     - Remove unconstrained drifting/noise vectors from orbiting nodes.
     - Define distinct 3D orbital rings (inclined along X, Y, and Z planes: e.g., Orbit Alpha at 15° inclination, Orbit Beta at 45° inclination, Orbit Gamma at -30° inclination).
     - Calculate node positions along their respective orbital splines: `x = r * cos(t)`, `z = r * sin(t)`, rotated through each orbit's orientation matrix.
  2. **Visible Orbital Paths & Geometry**:
     - Render smooth orbital guide lines/paths (`THREE.LineLoop` with `THREE.BufferGeometry` or custom shader line with subtle opacity) matching the exact path of each orbiting node.
     - Add glowing orbital beads/pulses that travel along the lines in sync with the nodes.
  3. **High-Contrast Projected Badges**:
     - Ensure all orbit node labels (`FastAPI Backend`, `LangGraph Swarm`, `ChromaDB RAG`, `n8n Automations`) remain anchored to the orbiting nodes with crisp visibility in both Light Mode (`#0a0d14` text on glass pill) and Dark Mode (`#ffffff` text on dark glass pill).
  4. **Solid Shell as Permanent Default**:
     - The solid outer shell of the central neural core is confirmed by the user as good. Keep this solid shell as the default appearance (`isWireframe = false` as default), with its smooth reflective surface and glowing inner crystal. Avoid wireframe as the default state.

#### Feature B: Contextual & Interactive 3D Tech Graph in Skills Section (`src/components/3d/TechCosmos3D.tsx` & `src/components/sections/Skills.tsx`)
- **User Request & Objective**: The 3D graph below currently feels like an abstract graph that doesn't convey practical meaning. Transform it into an interactive technology architecture graph where clicking specific stacks (such as **GHL / GoHighLevel**, **n8n**, **Agentic AI / LangGraph**, **Full-Stack / Backend**) dynamically morphs the 3D animation, rotates the selected technology cluster into focus, and displays the authentic sub-technologies and tools written directly on the nodes.
- **Implementation Tasks**:
  1. **Curated Technology Clusters & Tool Nodes**:
     - **GHL (GoHighLevel)**: Lead Ingestion & Webhooks, Pipeline Automations, AI Voice/Chat Agents, Twilio SMS/Calling, CRM Custom Workflows, Calendar Booking Engines.
     - **n8n Automations**: Complex Multi-Branch Workflows, API Webhooks, Custom Python/JS Code Nodes, LangChain/LangGraph Connectors, Telegram/Slack Swarms, Postman/REST Polling.
     - **AI & Agentic Systems**: LangGraph Stateful Graphs, ChromaDB Dense Vector Search, Multi-Agent Supervisors, Ollama / Claude / OpenAI API integrations, Automated Validation & Fallbacks.
     - **Full-Stack & Backend**: FastAPI Async Microservices, Python Core, TypeScript / React, Supabase & PostgreSQL, Docker / Cloud Deployments.
  2. **Dynamic 3D Camera & Cluster Transition**:
     - When a category or stack button is clicked (e.g., GHL, n8n, AI Agentics):
       - Smoothly animate the Three.js camera / focal group to re-center on that cluster.
       - Fade in connective relationship lines between tools in that ecosystem.
       - Highlight active node labels with 3D billboarded text or high-contrast 2D projected badges.
  3. **Interactive Node Inspection & Controls**:
     - Allow clicking any node in the 3D scene or selecting the corresponding button from the right sidebar to highlight its capabilities, production use-cases, and connected tools.
     - Keep rotation smooth, interactive, and fully paused when out of viewport.
     - Validate flawless rendering in both Light and Dark modes.

