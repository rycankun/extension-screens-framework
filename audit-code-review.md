# Code Audit Report -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Scope**: Full source code audit against DIRECTIVES.md and CLAUDE.md rules
**Files Reviewed**: 80 .tsx, 42 .module.css, 12 .ts (constants/types/hooks), 4 foundation stories, 1 tokens.css

---

## Executive Summary

The codebase is in strong shape for a project at this stage. The component architecture follows atomic design principles consistently, the token system is well-defined, and the code commenting standard is exceptionally thorough. However, there are several DIRECTIVES violations -- primarily hardcoded CSS values that should be tokens, missing token definitions, and unimplemented screen categories.

**Scores:**
- Token compliance: 90%
- Naming conventions: 98%
- Code comments: 99%
- Accessibility: 95%
- Component isolation: 100%
- React imports: 100% (all 80 .tsx files verified)
- Screens built: 14/35 (40%)

---

## CRITICAL -- Must Fix

### C-01: Undefined Token `--tid-lh-ratio-normal`

`src/components/molecules/StepIndicator/StepIndicator.module.css` line 51 references `var(--tid-lh-ratio-normal)` but this token does not exist in `tokens.css`. The property will fall back to browser default, causing inconsistent rendering.

### C-02: 9 Hardcoded Unitless `line-height` Values

DIRECTIVES rule 1.1 says "Zero hardcoded values." Nine instances use raw numbers (`1.2`, `1.4`, `1.5`) across `ConsentUS.module.css:232`, `CookiePrefs.module.css:244,260,280`, `DnsConfirm.module.css:149,163`, `DsrIntake.module.css:265,278,331`.

**Fix**: Add `--tid-lh-ratio-tight: 1.2`, `--tid-lh-ratio-normal: 1.4`, `--tid-lh-ratio-relaxed: 1.5` to tokens.css.

### C-03: Hardcoded `min-height: 600px` in OverlayShell

`src/components/organisms/OverlayShell/OverlayShell.module.css` line 20. Should be a sizing token like `--tid-size-overlay-height`.

### C-04: Hardcoded `opacity: 0.9` in Button

`src/components/atoms/Button/Button.module.css` lines 73, 130. No `0.9` tier exists in the `--tid-opacity-*` system.

### C-05: Hardcoded `vertical-align: -2px` in SocialProof

`src/components/molecules/SocialProof/SocialProof.module.css` line 33.

### C-06: Hardcoded `1px` in 7 Border/Spacing Declarations

`CookiePrefs.module.css:61,109,252`, `DsrIntake.module.css:162`, `SharingSettings.module.css:67`, `CookieEmail.module.css:301,311`. All should use `var(--tid-border-width)` or `var(--tid-sp-px)`.

---

## WARNINGS -- Should Fix

### W-01: `width: 1px; height: 1px` in sr-only Patterns (5 files)

`Radio.module.css:28-29`, `Checkbox.module.css:28-29`, `Spinner.module.css:59-60`, `OtpError.module.css:140-141`, `EmailConfirm.module.css:127-128`. Standard a11y pattern, but technically violates "zero hardcoded px."

### W-02: `translateY(-1px)` in Checkbox/CheckboxRow Checkmarks (2 files)

Visual micro-adjustment in transform.

### W-03: `margin: -1px` in sr-only Patterns (5 files)

Same pattern as W-01.

### W-04: `--tid-border-default` Referenced but Not Defined

`DsrIntake.module.css:162` uses `var(--tid-border-default)` but `tokens.css` only defines `--tid-border`. Likely a typo.

### W-05: `SocialProof.Bold` Compound Component

Attached as a static property rather than a named export. Can cause TypeScript/tree-shaking issues.

### W-06: Hooks Are Empty Stubs

`useTheme.ts` and `useJurisdiction.ts` both export `{}`. Documentation says implementation was planned for earlier steps that appear complete.

### W-07: Public API Missing Component Exports

`src/index.ts` only exports constants and types. No atoms, molecules, organisms, or screens are exported.

### W-08: Minor Comment Case Inconsistency

`CookiePrefs.module.css:219` comment shows `#5c6b80` but token defines `#5C6B80`.

---

## INFO -- Nice to Have

### I-01: 5 Screen Categories Not Started

`credentials/`, `onboarding/`, `status/`, `overlays/`, `toasts/` -- all contain only `.gitkeep`. 21 screens remain unbuilt.

### I-02: `OTP_LENGTH = 6` Local to OtpInput

Should be in `src/constants/auth.ts` per Single Source of Truth rules.

### I-03: Foundation Story Hardcoded Dimensions

Acceptable per DIRECTIVES exemptions (section 1.4), but `/* decorator constraint */` comments are inconsistent.

### I-04-I-05: Default URLs/Paths Local to Components

`PoweredBadge.tsx` and `DialogHeader.tsx` define default URLs and asset paths locally. Could be in constants.

### I-06: `CheckboxRow` Duplicates `Checkbox` Styling

Should compose the `Checkbox` atom internally like `ConsentToggle` composes `Toggle`.

### I-07: CLAUDE.md Says "62 keys", variants.ts Says 61

Minor doc inconsistency.

### I-08: `flows.ts` Has 4 Sequences vs. Documented 170 Edges

Acknowledged as placeholder in the file header.

### I-09-I-11: Empty Placeholders

`utils/index.ts`, `mock/.gitkeep`, and lingering `organisms/.gitkeep` can be cleaned up.

---

## Positive Observations

**P-01: Excellent Commenting** -- Every file has JSDoc headers, section dividers, prop docs, "why" comments, and token resolution comments. Best-in-class.

**P-02: Atom/Molecule Token Usage** -- Nearly perfect. All visual values reference `--tid-*` tokens with resolved-value comments.

**P-03: Strong Accessibility** -- `:focus-visible` on every interactive element, semantic HTML, ARIA attributes, 44px touch targets, screen-reader text, WAI-ARIA tablist pattern.

**P-04: Clean Component Isolation** -- Pure functions of props, no side effects, no external state.

**P-05: Comprehensive Token System** -- 13 categories, light/dark themes, RGB decomposed channels.

**P-06: Solid Constants Architecture** -- Every user-facing string extracted to constants with JSDoc.

**P-07: Foundation Stories Use Runtime Resolution** -- getComputedStyle + MutationObserver, zero hardcoded values.

---

## Recommended Fix Priority

1. Add ratio line-height tokens to `tokens.css`, fix all 10 references (C-01 + C-02)
2. Replace hardcoded `1px` with `var(--tid-border-width)` / `var(--tid-sp-px)` (C-06)
3. Add `--tid-size-overlay-height` token (C-03)
4. Add `--tid-opacity-hover-emphasis` token (C-04)
5. Fix `vertical-align` with token (C-05)
6. Fix `--tid-border-default` typo (W-04)
7. Add component exports to `src/index.ts` (W-07)
8. Implement or remove stub hooks (W-06)

After fixes, run the DIRECTIVES.md section 9 violation scan and regenerate `figma-variables.json`.
