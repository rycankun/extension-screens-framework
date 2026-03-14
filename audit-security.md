# Security Audit Report -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Auditor**: Security Engineer (automated review)
**Scope**: Full codebase at `/Users/ryanbeck/Documents/claude/extension-screens-framework`
**Project type**: React component library (Storybook + Figma plugin). Not a production web application.

---

## Executive Summary

The TrustID Extension Screen Library has a **clean security posture** appropriate for its role as a non-production design system / component library. No critical or high-severity vulnerabilities were identified. The codebase shows evidence of intentional security hygiene (proper `rel` attributes on external links, TypeScript strict mode, no dynamic code execution, no hardcoded secrets). A small number of low-severity and informational findings are documented below.

**Overall risk rating: LOW**

---

## Findings Summary

| ID | Severity | Category | Finding |
|----|----------|----------|---------|
| SEC-01 | Low | Figma Plugin | `postMessage` uses wildcard origin (`'*'`) |
| SEC-02 | Low | Git Config | `.gitignore` missing `.env` pattern |
| SEC-03 | Info | Build Config | Source maps enabled in tsconfig.json |
| SEC-04 | Info | Dependencies | `cross-spawn` at 7.0.6 (patched) -- verify intentional |
| SEC-05 | Info | ESLint | No `react/no-danger` rule configured |
| SEC-06 | Info | Figma Plugin | Manifest injected via `__TOKEN_MANIFEST__` -- build-time trust |
| SEC-07 | Info | Token Script | File paths are hardcoded relative -- no user-controlled path input |

---

## Detailed Findings

### SEC-01: Figma Plugin postMessage uses wildcard origin [Low]

**File**: `figma/plugin/src/ui.tsx:213`

The plugin UI sends messages to the parent frame using `'*'` as the target origin. In the Figma plugin sandbox, this is the standard and expected pattern because Figma plugin iframes cannot know the parent origin in advance. The Figma Plugin API handles message routing and isolation.

**Risk**: Minimal in practice. Messages contain only fixed string types (`'sync-tokens'`, `'check-status'`, `'close'`). The main thread (`code.ts:70-84`) uses a typed `switch` that only handles these three types; unrecognized types are silently dropped.

**Recommendation**: No immediate action required. This is Figma's documented pattern.

---

### SEC-02: .gitignore missing .env pattern [Low]

**File**: `.gitignore`

The `.gitignore` file does not include `.env`, `.env.local`, or similar patterns. No `.env` files currently exist and no code references `process.env`, but this is a preventive gap.

**Recommendation**: Add `.env` patterns to `.gitignore`.

---

### SEC-03: Source maps enabled in tsconfig.json [Informational]

Standard for a dev-only component library. No risk for current scope.

---

### SEC-04: cross-spawn at version 7.0.6 [Informational]

The known ReDoS vulnerability (CVE-2024-21538) affected versions prior to 7.0.5. Version 7.0.6 is **patched and safe**. No action needed.

---

### SEC-05: ESLint does not enforce react/no-danger rule [Informational]

A full codebase search confirmed **zero instances** of `dangerouslySetInnerHTML`, `innerHTML`, `eval()`, `new Function()`, or `document.write()`. Adding the ESLint rule locks in the current clean state.

---

### SEC-06: Token manifest injected at build time [Informational]

The manifest is generated from a local CSS file, injected at build time (not fetched remotely), and parsed with `JSON.parse()` (safe against code injection). No risk.

---

### SEC-07: Token generation script uses hardcoded file paths [Informational]

No user input, no command-line arguments, no dynamic path construction. No path traversal or injection risk.

---

## Areas Audited -- No Issues Found

- **XSS Vectors**: Zero instances of dangerous patterns
- **External Link Security**: Correct `rel="noopener noreferrer"` on all external links
- **Hardcoded Secrets/Credentials**: None found
- **Supply Chain**: No lifecycle scripts that download/execute remote code
- **Build Configuration**: TypeScript `strict: true`, Vite library mode with externalized React
- **Storybook Configuration**: Standard config, no exposed internal paths
- **Figma Plugin Message Security**: Typed switch with unknown messages silently dropped

---

## Recommendations

**Should Do** (low effort, good hygiene):
1. Add `.env` patterns to `.gitignore` (SEC-02)
2. Enable `react/no-danger` ESLint rule (SEC-05)

**Overall**: The project is in good shape from a security standpoint.
