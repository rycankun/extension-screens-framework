# DevOps & Build Audit Report -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Auditor**: DevOps Automator
**Scope**: Build system, tooling, CI/CD configuration

---

## Executive Summary

32 issues across 4 severity levels. The build tooling is functional but has configuration conflicts, missing lint coverage, and no CI/CD pipeline.

---

## CRITICAL (3)

### DEV-01: tsconfig.json has conflicting noEmit + declaration
`noEmit: true` and `declaration: true` are set simultaneously — declarations are silently never generated. Fix: remove `declaration: true` (Vite handles builds) or split into separate tsconfigs for type-checking vs build.

### DEV-02: No CI/CD pipeline
No `.github/` directory exists. No automated linting, testing, or build verification on push/PR.

### DEV-03: figma/plugin/dist/ not in .gitignore
Root `dist/` in .gitignore does not match nested `figma/plugin/dist/`. Built plugin artifacts may be accidentally committed.

---

## HIGH (7)

### DEV-04: eslint-plugin-react imported but was not registered
The `reactPlugin` was imported but not added to the plugins map (fixed in security audit commit).

### DEV-05: No eslint-plugin-react-hooks
Missing `exhaustive-deps` and `rules-of-hooks` enforcement.

### DEV-06: No eslint-plugin-jsx-a11y
DIRECTIVES.md mandates WCAG 2.1 AA as "Non-Negotiable" but no lint-time a11y enforcement exists.

### DEV-07: Stylelint has no token enforcement rule
No custom rule to enforce "all values from --tid-* tokens" per DIRECTIVES.md § 1.1.

### DEV-08: Zero test files
Vitest is fully configured but no test files exist anywhere in the project.

### DEV-09: No pnpm-workspace.yaml
The Figma plugin is a separate install with duplicated dependencies instead of a proper workspace member.

### DEV-10: Lint/format scripts only cover src/
`stories/` and `.storybook/` directories are not covered by lint commands.

---

## MEDIUM (12)

- Missing `resolveJsonModule` in tsconfig (needed for figma-variables.json imports)
- No `.prettierignore` file
- No test setup file for Vitest
- Plugin `build.mjs` crashes with unhelpful error when prerequisite files are missing
- Missing `peerDependencies` declaration for React in package.json (library should declare peers)
- Storybook `main.ts` viteFinal is a no-op
- No pre-commit hooks (husky/lint-staged) to enforce quality gates
- No type declaration file generation for library consumers

---

## LOW (10)

- Hardcoded hex in Storybook preview decorator background
- No coverage thresholds configured in vitest.config.ts
- Missing `eslint-config-prettier` to prevent ESLint/Prettier conflicts
- No `.nvmrc` or `engines` field for Node version pinning
- Storybook manager.ts has unused imports

---

## Recommendations (Priority Order)

1. Fix tsconfig.json conflict (DEV-01)
2. Add `figma/plugin/dist/` to .gitignore (DEV-03)
3. Install `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y` (DEV-05, DEV-06)
4. Add basic CI workflow with lint + type-check + build (DEV-02)
5. Create at least smoke tests for atoms and organisms (DEV-08)
