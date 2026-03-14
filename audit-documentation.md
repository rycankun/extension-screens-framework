# Documentation & Prompts Audit -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Auditor**: Technical Writer Agent
**Scope**: Documentation quality + PROMPT_PATH agent assignments

---

# PART 1: Documentation Quality Audit

## 1. CLAUDE.md Findings

### Structure Map Accuracy
The documented project structure mostly matches what's on disk, with minor discrepancies:
- `.eslintrc.cjs` listed in CLAUDE.md but actual file is `eslint.config.js` (flat config format)
- `src/constants/` has additional files not in the tree: `auth.ts`, `consent.ts`, `cookies.ts`, `preferences.ts`

### Screen Inventory
- CLAUDE.md lists 35 screens total (27 banner + 3 toast + 5 overlay)
- `SvAdult` overlay is listed but has no corresponding `.gitkeep` or component
- 14 screens are implemented, 21 remain as `.gitkeep` stubs

### US Strict States Inconsistency
- CLAUDE.md Variant System section lists: CA, CO, CT, DE, GA, MD, MN, MT, NH, NJ, OR, TN, TX (13 states)
- CLAUDE.md Screen Inventory says: "CA, CO, CT, GA, MD, NH, OR, TN" (8 states)
- Need to verify which list matches `jurisdictions.ts`

### Tech Stack
All documented choices match implementation (React 19, Vite 6, CSS Modules, Storybook 8, pnpm).

## 2. DIRECTIVES.md Findings

**No contradictions found.** All rules are consistent and well-organized.

### 5 Undocumented Code Patterns
These patterns exist in the code but are not covered by DIRECTIVES.md:
1. SR-only (screen-reader only) CSS pattern -- no standard defined
2. Compound components (e.g., `SocialProof.Bold`) -- no convention specified
3. SVG inline attributes in Icon component -- no rule for SVG dimension handling
4. Transition shorthand format -- no standard for `var(--duration) var(--ease)` pattern
5. CSS fallback values via `var(--token, fallback)` -- no rule on when fallbacks are acceptable

## 3. docs/PRD.md Findings

### Missing Molecules
4 molecules exist in code but are not documented in PRD.md:
- `BackArrow`
- `ProgressDots`
- `StepIndicator`
- `SocialProof`

### Missing Screen Spec
`SvAdult` (adult-verified landing state) is listed in the screen inventory but has no specification in PRD.md.

### Underspecified Elements
ConsentUS state-specific legal notices (e.g., CT minor advertising ban) -- mentioned but not fully specified per state.

## 4. Storybook Docs Findings

### Introduction.mdx
- Generally accurate
- Missing `firstVisit` from scenario axis options (lists `first`, `returning`, `returningVerified` but not `firstVisit`)

### Flow MDX Files
- `stories/flows/` directory does not exist yet
- CLAUDE.md documents 6 flow MDX files that should be there (Overview, FirstTimeUser, ReturningUser, AgeVerification, ConsentManagement, CredentialSharing)
- This is expected -- flow docs are a later step in PROMPT_PATH

## 5. Code Comments Audit

**100% compliance across 14+ files sampled.** Every file has:
- JSDoc header block with description, hierarchy position, and key dependencies
- Section divider comments (`/* -- Section Name -- */`)
- JSDoc on every prop in interfaces
- "Why" comments for non-obvious decisions
- Token resolution comments in CSS (e.g., `/* 380px -- browser extension drawer width */`)

This is exceptional documentation quality.

---

# PART 2: PROMPT_PATH Agent Assignments

## Step-by-Step Agent Recommendations

| Step | Name | Primary Agent | Secondary Agent(s) | Rationale |
|------|------|--------------|--------------------|-----------|
| 1 | Project Scaffolding | **Frontend Developer** | DevOps Automator | React+Vite+TS+Storybook setup is core frontend work |
| 2 | Design Token System | **Frontend Developer** | UI Designer | CSS custom properties and token architecture |
| 3 | Token Generation Script | **Frontend Developer** | -- | Node script parsing CSS to JSON |
| 4 | Figma Plugin Scaffold | **Frontend Developer** | UI Designer | Figma Plugin API + React UI |
| 5 | Foundation Stories | **Frontend Developer** | UI Designer | Storybook stories for token visualization |
| 6 | Constants & Types | **Frontend Developer** | -- | TypeScript constants, enums, interfaces |
| 7 | Atom Components | **Frontend Developer** | Accessibility Auditor | Core UI primitives with a11y requirements |
| 8 | Molecule Components | **Frontend Developer** | Accessibility Auditor | Composed UI patterns |
| 9 | Organism Components | **Frontend Developer** | Accessibility Auditor | Shell containers (banner, toast, overlay) |
| 10 | Screen Components (Batch 1) | **Frontend Developer** | Accessibility Auditor | Consent + Authentication screens |
| 10.5 | Screen Components (Batch 2) | **Frontend Developer** | Accessibility Auditor | Preferences screens |
| 11 | Screen Components (Batch 3) | **Frontend Developer** | Accessibility Auditor | Credentials + Onboarding screens |
| 11.5 | Visual Fidelity Correction | **Frontend Developer** | UI Designer, Code Reviewer | Pixel-perfect matching to predecessor |
| 12 | Screen Components (Batch 4) | **Frontend Developer** | Accessibility Auditor | Status + Overlay + Toast screens |
| 13 | Figma Plugin Screen Import | **Frontend Developer** | UI Designer | Plugin integration for screen import |
| 14 | Figma Export Script | **Frontend Developer** | -- | React to static HTML generation |
| 15 | Storybook MDX Docs | **Frontend Developer** | Technical Writer | Introduction + screen category docs |
| 16 | Flow Documentation | **Technical Writer** | Frontend Developer | Mermaid.js flowcharts in MDX |
| 17 | Final Audit | **Code Reviewer** | Accessibility Auditor, UI Designer, Frontend Developer | Multi-agent audit pass |
| 18 | Polish & Ship | **Frontend Developer** | Code Reviewer | Final fixes and cleanup |

## Key Recommendations

1. **Frontend Developer is primary for 16/18 steps** -- this is fundamentally a React component library project
2. **Accessibility Auditor should co-review every component step** (7-12) -- WCAG AA is non-negotiable per DIRECTIVES
3. **UI Designer should co-review token and visual fidelity steps** -- design system consistency
4. **Technical Writer leads Step 16** -- flow documentation is primarily a writing task
5. **Code Reviewer leads Step 17** -- final audit is a review task by definition
6. **Step 17 should be a multi-agent audit** (exactly what was done in this current audit session)
