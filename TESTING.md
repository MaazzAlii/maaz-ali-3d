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
- [ ] Verify WebGL canvas initializes without errors in console.
- [ ] Confirm canvas responds smoothly to mouse movement and touch drag.
- [ ] Check performance when scrolling past the hero (render loop should throttle when off-screen).
- [ ] Test graceful fallback if WebGL is unavailable or when `prefers-reduced-motion` is enabled.

#### 2.2 Responsive Layout Verification
- [ ] Mobile (360px — 400px): Verify hamburger navigation drawer, touch scrolling, no horizontal overflow.
- [ ] Tablet (768px): Verify 2-column project grid, responsive stats row.
- [ ] Desktop (1024px — 1440px+): Verify side-by-side hero composition, 3-column project grid, glassmorphic hover effects.

#### 2.3 Theme Verification
- [ ] Toggle from Cyber Dark to Pure Light mode.
- [ ] Confirm text legibility, card backgrounds, borders, and badge contrasts in both themes.
- [ ] Confirm preference persists on page refresh via `localStorage`.

#### 2.4 Interactive Functionality
- [ ] Project Category Filters: Switching between all 7 categories updates the displayed projects immediately.
- [ ] Project Search: Typing query filters projects by title, description, or technology tag.
- [ ] Project Detail Modal: Clicking any card opens full details (Overview, Architecture, Results) and closes via close button or Escape key.
- [ ] Contact Form: Validates inputs, copies email to clipboard, and triggers confetti celebration.
- [ ] Resume Download: Clicking "Resume" downloads `/Maaz_Ali_Resume.pdf`.
