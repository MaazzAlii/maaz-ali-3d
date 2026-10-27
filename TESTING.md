# TESTING.md

## Testing Protocols & Verification Commands

### 1. Build & Type Checking Commands
Run these commands inside `/home/maazzalii/Desktop/100 days of code/101- 3D website `:

- **Type Check**:
  ```bash
  npm run typecheck
  # or: npx tsc --noEmit
  ```
- **Production Build Verification**:
  ```bash
  npm run build
  ```
- **Local Dev Server Execution**:
  ```bash
  npm run dev
  ```

---

### 2. Verification Checklist

#### 2.1 3D WebGL Rendering
- [x] Verify WebGL canvas initializes without errors in console.
- [x] Confirm canvas responds smoothly to mouse movement and touch drag.
- [x] Check performance when scrolling past the hero (render loop automatically throttles when off-screen via IntersectionObserver).
- [x] Test graceful fallback if WebGL is unavailable or when `prefers-reduced-motion` is enabled.

#### 2.2 Responsive Layout Verification
- [x] Mobile (360px — 400px): Verify hamburger navigation drawer, touch scrolling, no horizontal overflow.
- [x] Tablet (768px): Verify 2-column project grid, responsive stats row, balanced camera composition.
- [x] Desktop (1024px — 1440px+): Verify cinematic architectural hero composition, 3-column project grid, smooth pointer parallax.

#### 2.3 Theme Verification
- [x] Toggle from Cyber Dark to Pure Light mode.
- [x] Confirm text legibility, card backgrounds, borders, and badge contrasts in both themes.
- [x] Confirm preference persists on page refresh via `localStorage`.

#### 2.4 Interactive Functionality
- [x] Project Category Filters: Switching between all 7 categories updates the displayed projects immediately.
- [x] Project Search: Typing query filters projects by title, description, or technology tag.
- [x] Project Detail Modal: Clicking any card opens full details (Overview, Architecture, Results) and closes via close button or Escape key.
- [x] Contact Form: Validates inputs, copies email to clipboard, and triggers confetti celebration.
- [x] Resume Download: Clicking "Resume" downloads `/Maaz_Ali_Resume.pdf`.
