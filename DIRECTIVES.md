# DIRECTIVES — Hard Rules

These rules are non-negotiable. Every file, every commit, every step must comply. Zero tolerance for violations.

## 0. Figma-First Mindset

Every decision in this project serves one goal: **clean Figma import with a shared token system and component library.** Before writing any code, ask:

1. Will this component render as a clean, self-contained Figma frame?
2. Are all visual values coming from tokens that sync to Figma Variables?
3. Is this component reused everywhere it should be (single source of truth)?
4. Does the Figma plugin know about this new token/screen?

If the answer to any of these is "no," fix it before moving on.

## 0.1 Pixel-Perfect Visual Fidelity

The refactored screens must match the predecessor project (`rycankun/extension-screens`) **pixel for pixel**. The old demo is the visual source of truth. Reference files in `docs/reference/` have the original specs. When in doubt, compare side by side. Differences are bugs.

---

## 1. CSS — Tokenized, Always

### 1.1 All Values from `tokens.css`

Every visual value in any `.module.css` file MUST reference a token from `src/tokens/tokens.css` via `var(--tid-*)`. This includes:

- Colors (text, background, border, shadow, fill, stroke)
- Font sizes, font families, font weights
- Spacing (padding, margin, gap)
- Border widths, border radii
- Outline widths, outline offsets
- Line heights, letter spacing
- Box shadows
- Z-index values
- Transition durations, easing functions
- Opacity values
- Sizing (width, height, min/max dimensions)

**Zero hardcoded values.** No hex codes, no `px` values, no `rem` values, no raw numbers outside `tokens.css` and `fonts.css`.

### 1.2 Token Namespace

All tokens use the `--tid-*` prefix (TrustID). Examples:
- `--tid-brand` (not `--brand`)
- `--tid-sp-4` (not `--sp-4`)
- `--tid-fs-base` (not `--fs-base`)

### 1.3 CSS Modules Only

- Every component gets a co-located `.module.css` file
- No global CSS except `tokens.css`, `fonts.css`, and `global.css`
- No inline styles in React components EXCEPT Storybook decorator constraints
- No CSS-in-JS, no Tailwind, no utility classes

### 1.4 Storybook Decorator Exception

Decorator or render function pixel values that constrain the preview canvas (e.g., `maxWidth`, `padding` on the decorator wrapper) get a comment:

```css
/* decorator constraint, no matching token */
```

Foundation token stories (Colors, Spacing, Typography) are exempt from this comment requirement.

### 1.5 Figma-Compatible CSS

Screens destined for Figma import must avoid CSS that html2figma cannot handle:
- `backdrop-filter: blur()` frosted glass IS used — this is a critical visual element. BannerShell and OverlayShell content layers use `background: rgba(var(--tid-surface-rgb), 0.4)` + `backdrop-filter: blur(var(--tid-blur-xl))`. Figma's html2figma plugin supports backdrop-filter natively.
- No CSS animations or transitions — Figma frames are static
- No `position: fixed` or `position: sticky` — Figma uses auto-layout
- Explicit dimensions on all containers (width, height, or flex sizing)
- Google Fonts only (Inter, Work Sans) — these are available in Figma natively

---

## 2. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Component files | PascalCase | `Button.tsx`, `ConsentEU.tsx` |
| Component directories | PascalCase | `Button/`, `ConsentEU/` |
| CSS Module files | PascalCase matching component | `Button.module.css` |
| CSS class names | camelCase (CSS Modules auto-scope) | `.primaryButton`, `.toggleTrack` |
| Story files | PascalCase | `Button.stories.tsx` |
| Token names | kebab-case with `--tid-` prefix | `--tid-color-brand`, `--tid-sp-4` |
| Constants | SCREAMING_SNAKE_CASE | `SCREENS`, `TIMING`, `JURISDICTIONS` |
| TypeScript types/interfaces | PascalCase | `ScreenId`, `JurisdictionConfig` |
| Hook files | camelCase with `use` prefix | `useTheme.ts` |
| Utility files | camelCase | `formatDate.ts` |

---

## 3. Component Rules

### 3.1 One Component Per File

Each component lives in its own directory with co-located files:
```
Button/
├── Button.tsx           # Component implementation
├── Button.module.css    # Styles (CSS Module)
└── Button.stories.tsx   # Storybook stories
```

### 3.2 Props Typed with TypeScript Interfaces

Every component exports a typed props interface:
```tsx
export interface ButtonProps {
  /** Button display text */
  label: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}
```

### 3.3 Figma-First Component Design

Every component must render as a clean, self-contained frame:
- No external state dependencies (Redux, Context, etc.) — pass everything via props
- No side effects (fetch, timers, subscriptions) — pure render only
- No animation in the default render — CSS transitions only activate on interaction
- Default props should produce a complete, visually correct component

### 3.4 Screen Components Accept Variant Props

Every screen component accepts the full variant interface:
```tsx
export interface ScreenVariantProps {
  theme?: 'light' | 'dark';
  jurisdiction?: 'eu' | 'us-strict' | 'us-standard';
  // Screen-specific state flags
  gpcDetected?: boolean;
  dntDetected?: boolean;
  // etc.
}
```

---

## 4. Code Commenting — Developer-Friendly Codebase

This codebase must be easy to navigate and understand for any developer picking it up for the first time. Comments are not optional — they are a required deliverable.

### 4.1 File Headers

Every `.tsx`, `.ts`, and `.module.css` file MUST start with a JSDoc/CSS comment block explaining:
- What the file contains
- Where it fits in the component hierarchy (atom/molecule/organism/screen)
- Key dependencies or relationships

```tsx
/**
 * ConsentEU — EU/GDPR opt-in consent screen.
 *
 * Screen component (screens/consent). Renders the GDPR-compliant consent
 * prompt with toggle controls for cookie categories. Accepts jurisdiction
 * and theme variant props for Figma export.
 *
 * @see docs/PRD.md § Screen Specifications — Consent
 * @see src/constants/jurisdictions.ts for EU legal text
 */
```

### 4.2 Section Comments

Group related code blocks with section dividers:
```tsx
/* ── Props & Types ── */
/* ── Subcomponents ── */
/* ── Main Component ── */
/* ── Helpers ── */
```

```css
/* ── Layout ── */
/* ── Typography ── */
/* ── Interactive States ── */
/* ── Dark Theme Overrides ── */
```

### 4.3 Why Comments (Not What Comments)

Comment the WHY, not the WHAT. The code shows what it does — comments explain decisions:
```tsx
// WCAG AA: muted text needs ≥4.5:1 contrast — use --tid-text-muted (tested) not --tid-text-secondary
className={styles.mutedLabel}

// Banner width is fixed at 380px to match browser extension drawer dimensions
width: var(--tid-size-banner);
```

### 4.4 Token Reference Comments

When a token value might be non-obvious, add a comment with the resolved value:
```css
.banner {
  width: var(--tid-size-banner); /* 380px — browser extension drawer width */
  border-radius: var(--tid-radius-sm) var(--tid-radius-sm) 0 0; /* 4px top corners only */
}
```

### 4.5 Prop Documentation

Every prop gets a JSDoc comment in the interface:
```tsx
export interface ToggleProps {
  /** Whether the toggle is in the ON position */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** Whether the toggle is locked (e.g., CT minor advertising ban) */
  locked?: boolean;
}
```

### 4.6 Constants Documentation

Every constant gets a JSDoc comment explaining its purpose:
```tsx
/** Duration of the age-gate cover fade-out CSS transition (ms) */
FADE_DURATION: 600,
```

### 4.7 Story Comments

Every story file gets a comment explaining what the story demonstrates:
```tsx
/**
 * EU consent screen — light theme, default state.
 * This is the primary Figma import target for the EU consent flow.
 */
export const Light: Story = { args: { theme: 'light' } };
```

---

## 5. Storybook Rules

### 5.1 Every Component Has Stories

No component ships without a `.stories.tsx` file. Period.

### 5.2 Screen Stories Cover All Variants

Every screen component has named story exports for every meaningful variant combination:
- Light + Dark theme (always)
- Jurisdiction variants (where applicable)
- State flag variants (GPC detected, DNT detected, toggles on/off, etc.)

Each named export = one potential Figma frame.

### 5.3 Foundation Stories Use Runtime Token Resolution

Colors, Typography, Spacing, and Shadows stories read actual computed values from `tokens.css`:
```tsx
const value = getComputedStyle(document.documentElement).getPropertyValue('--tid-brand');
```

Never duplicate hex values or pixel values in foundation story files.

### 5.4 React Import Rule

Every `.tsx` file that contains inline JSX and is loaded by Storybook MUST have:
```tsx
import React from 'react';
```
Args-only files (pure data, no JSX) are exempt.

---

## 6. Figma Plugin Rules

### 6.1 Plugin Stays in Sync

The Figma plugin is part of the build — it ships with every step:
- After ANY change to `tokens.css` → run `pnpm generate:tokens` → verify `figma-variables.json`
- After ANY new screen component → add to plugin's screen manifest
- After ANY new atom/molecule → update plugin's component map

### 6.2 Token Generation is Automated

`figma-variables.json` is auto-generated from `tokens.css` via the `generate-tokens.ts` script. Never edit `figma-variables.json` manually.

### 6.3 Plugin is Idempotent

Running the plugin's token sync or screen import twice must update, not duplicate. Use Variable names as unique keys.

---

## 7. Accessibility (WCAG 2.1 AA — Non-Negotiable)

### 7.1 Every Interactive Element

Every button, link, input, toggle, checkbox, and radio gets ALL of:
- `:focus-visible` ring (using `--tid-shadow-focus-brand`)
- `aria-label` or `aria-labelledby`
- Keyboard handler (`onKeyDown` for Enter/Space)
- Semantic HTML tag (`<button>`, `<a>`, `<input>`, not `<div onClick>`)

### 7.2 Screen-Level A11y

Every screen component gets:
- `role="dialog"` and `aria-modal="true"` (banner screens)
- `aria-label` with human-readable title from `SCREEN_TITLES`
- Focus trap within the dialog
- Return focus on dismiss

### 7.3 Color Contrast

- Body text on surfaces: 4.5:1 minimum
- Large text (≥18px or ≥14px bold): 3:1 minimum
- UI components and graphical objects: 3:1 minimum
- All muted/secondary text tokens are pre-validated for AA compliance

### 7.4 Testing

- Storybook addon-a11y: zero violations per component, every story
- axe-core in CI: automated regression testing
- Manual keyboard navigation: every flow must be completable without a mouse

---

## 8. Single Source of Truth — Enforcement

### 8.1 Never Duplicate Values

If a value exists in `tokens.css`, use the token. If a value exists in `src/constants/`, import it. If a string appears in a component, it must come from `src/constants/variants.ts` or screen-specific constants.

### 8.2 Token Cascade

```
tokens.css (CSS custom properties)
    ↓ consumed by
*.module.css (component styles via var(--tid-*))
    ↓ generates
figma-variables.json (Figma Variables manifest)
    ↓ synced to
Figma Variables (via plugin)
```

Breaking any link in this chain breaks the single source of truth. Every token change must flow through the entire pipeline.

### 8.3 Constants Cascade

```
src/constants/*.ts (TypeScript constants)
    ↓ imported by
src/components/**/*.tsx (React components)
    ↓ imported by
**/*.stories.tsx (Storybook stories)
    ↓ referenced by
stories/flows/*.mdx (Flow documentation)
```

### 8.4 Quick Smell Test

If you're about to type any of these, stop and find the canonical source:
- A hex color (`#0E6FFF`)
- A pixel value (`380px`)
- A screen name string (`'consent-t1'`)
- A jurisdiction name (`'EU'`)
- Legal text copy
- An ARIA label string
- A timing value (`600`)

---

## 9. Violation Scan (Run Before Every Push)

```bash
# Flag hardcoded strings in JSX (component files only, exclude stories)
grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ \
  | grep -v "node_modules" | grep -v ".stories."

# Flag hardcoded hex, px, or rem in CSS Modules (exclude token/font definitions)
grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ \
  | grep -v "tokens.css" | grep -v "fonts.css"

# Verify figma-variables.json is up to date
pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json

# Fix every violation found. Zero tolerance.
```

---

## 10. Git Discipline

- Commit after every completed step in PROMPT_PATH.md
- Commit message format: `feat: [step description]` or `fix: [what was fixed]`
- Push to `main` after every step: `git push origin main`
- Never commit generated files in `figma/export/` (git-ignored)
- Always commit `figma-variables.json` (it's the Figma plugin's data source)
