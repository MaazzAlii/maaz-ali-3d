# ARCHITECTURE.md

## System Architecture & Technical Specifications

### 1. Architectural Overview
The application is structured as a client-side reactive Single Page Application (SPA) utilizing Vite, React 18, TypeScript, and Three.js. It delivers real-time 3D rendering alongside an accessible, semantic HTML UI layer with zero layout shift.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                 Browser                                │
├────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐      ┌─────────────────────────────────┐  │
│  │   UI DOM Layer (React)  │      │  Three.js WebGL Layer (Canvas)  │  │
│  │  - Semantic HTML5 Nav   │◄────►│  - Neural Agentic AI Core       │  │
│  │  - Glassmorphic Cards   │      │  - Tech Skill Constellation     │  │
│  │  - Project Modals       │      │  - Dynamic Starfield / Matrix   │  │
│  │  - Theme Orchestrator   │      │  - Low-power requestAnimationFrame││
│  └───────────┬─────────────┘      └────────────────┬────────────────┘  │
│              │                                     │                   │
│              ▼                                     ▼                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │               Design System & Token Engine (tokens.css)          │  │
│  │  - Light Mode Tokens / Dark Mode Tokens / Responsive Breakpoints │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     ▼                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │          Data & State Layer (src/data/portfolioData.ts)          │  │
│  │  - 43 Shipped Projects / 7 Categories / Certifications / Stats   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### 2. Key Architectural Modules

#### 2.1 Three.js 3D Rendering Engine
- **Canvas Lifecycle**: Encapsulated within specialized React lifecycle hooks with automatic canvas resizing, pixel ratio bounding (capped at `Math.min(window.devicePixelRatio, 2)` to avoid mobile thermal throttling), and resource disposal (`geometry.dispose()`, `material.dispose()`) on unmount.
- **Scene 1: Neural Agentic Core (Hero)**:
  - Central icosahedron core with glowing wireframe shader and dynamic pulse frequency.
  - 3 Concentric orbital rings with orbiting agent nodes representing multi-agent orchestration (Supervisor, Coder, Reviewer).
  - Volumetric particle cloud reacting to pointer coordinates with dampened spring easing.
- **Scene 2: 3D Tech Constellation (Skills)**:
  - Interactive spherical tech cloud with hovering labels and glowing connection arcs.
- **Power Optimization**: An `IntersectionObserver` disconnects the rendering loop when the 3D scene leaves the viewport, maintaining negligible CPU/GPU footprint while reading project case studies.

#### 2.2 Design Token & Theme Engine
- Managed through `src/styles/tokens.css` via custom CSS variables:
  - `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-glass`
  - `--accent-primary`, `--accent-glow`, `--accent-secondary`
  - `--text-primary`, `--text-secondary`, `--text-muted`
  - `--border-subtle`, `--border-glow`
- Themes are controlled via `data-theme="dark"` and `data-theme="light"` on the document root element with instant persistence in `localStorage`.

#### 2.3 Data Architecture (Single Source of Truth)
- `src/data/portfolioData.ts` holds all structured records:
  - Profile metadata (NUML BS CS, Rawalpindi, email, socials)
  - 43 detailed project entries categorized into 7 domains
  - Educational background & Microsoft AZ-901 / NAVTTC / Cisco certifications
  - Google Play published apps metadata
  - Career milestones & engineering achievements

#### 2.4 Modal & Interactive State Management
- Lightweight React state (`useState`, `useCallback`) manages modal drawer state for project deep-dives without heavy external state libraries.
- Accessible keyboard traps: Pressing `Escape` or clicking the backdrop dismisses modals with smooth transition timing.
