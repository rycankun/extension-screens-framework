# Architecture Audit Report -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Auditor**: Software Architect
**Scope**: Module structure, constants, type system, composition, hooks, Figma plugin, dependency graph

**Overall Grade: B+** — Sound architecture, incomplete execution.

---

## P0 — Must Fix Before Building More Screens (3)

### ARCH-01: Inline SVG icons copy-pasted across screens
ShieldIcon, BadgeCheckIcon, and other inline SVGs are duplicated in ConsentEU.tsx and ConsentUS.tsx instead of living in the Icon atom's icon registry. Violates SSOT.

**Fix**: Add these icons to the Icon component's SVG map and reference by name.

### ARCH-02: No component barrel exports
`src/index.ts` only exports constants and types. None of the 40 built components (atoms, molecules, organisms, screens) are exported. The library is not consumable.

**Fix**: Add component re-exports to `src/index.ts`.

### ARCH-03: Theme wrapper duplicated in every screen
Every screen manually wraps in `<div data-theme={theme}>` because `useTheme` is a stub. This should be handled by BannerShell/OverlayShell.

**Fix**: Move the `data-theme` wrapper into BannerShell and OverlayShell, accept `theme` as a prop on the shells.

---

## Key Passes

- **Dependency graph is clean** — no backward imports across tiers (screens→organisms→molecules→atoms, never backwards)
- **Zero `any` types anywhere** in the codebase
- **SSOT for text strings genuinely enforced** — every label comes from constants
- **`screens.ts` covers all 35 screens** with compile-time complete SCREEN_TITLES
- **Figma plugin token sync is production-quality** and idempotent
- **`useFocusTrap` properly implemented** and integrated into both shell organisms

---

## Key Failures

### ARCH-04: flows.ts is a placeholder
Has 4 sequences (14 screen refs) vs documented 170 edges. Acknowledged in file header but significantly incomplete.

### ARCH-05: variants.ts has 61 keys vs documented 62
CLAUDE.md says 62 variant copy keys but only 61 exist. Minor doc inconsistency.

### ARCH-06: useTheme and useJurisdiction are empty stubs
Both hooks export empty objects `{}`. Either implement or remove.

### ARCH-07: SCREEN_REGISTRY in Figma plugin hardcodes data
The plugin's `manifest.ts` duplicates screen metadata that exists in `src/constants/screens.ts`. SSOT violation — the plugin should import from the canonical source.

### ARCH-08: types/screens.ts imports from constants/
Reverse dependency direction — types should be imported BY constants, not import FROM them.

---

## Scalability Assessment

With 21 screens still to build, the current patterns scale well:
- Atomic design hierarchy is consistent
- CSS Module co-location works
- Constants architecture handles new screens cleanly
- The only risk is the inline SVG icon duplication (ARCH-01) — fix before adding more screens

---

## Recommendations

1. Fix ARCH-01 (inline icons) before building credential/status/overlay screens
2. Fix ARCH-03 (theme wrapper) to reduce boilerplate in every new screen
3. Add component exports (ARCH-02) — critical for library consumers
4. Fix types/screens.ts reverse dependency (ARCH-08)
5. Implement or remove stub hooks (ARCH-06)
