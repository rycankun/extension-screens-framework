# TrustID Extension Screen Library — Project Context

## Owner

Ryan Beck (ryan.beck87@gmail.com)

## Repository

- **GitHub**: https://github.com/rycankun/extension-screens-framework
- **Branch strategy**: `main` is the primary branch. Push after every completed step.
- **Rule**: `git push origin main` after each step in the prompt path is completed.

## Required Reading (Every Step)

Before starting ANY build step, read and reference these files:

1. **`CLAUDE.md`** — This file. Project context, stack, structure, single source of truth rules.
2. **`DIRECTIVES.md`** — Hard rules for CSS, naming, a11y, Figma compatibility. Never violate these.
3. **`docs/PRD.md`** — Screen specs, component definitions, token catalog, variant system, flow definitions, Figma plugin requirements.

## What Is This

The **TrustID Extension Screen Library** is a React component library that renders every screen in the TrustID browser extension — consent prompts, identity verification flows, cookie management, credential sharing, and data subject requests.

**The primary design constraint is Figma import.** Every component is built so that it can be imported as a clean, self-contained Figma frame via html2figma or the project's custom Figma plugin. This means:

- Components are isolated — no external state dependencies, no side effects
- CSS uses design tokens that map 1:1 to Figma Variables
- Each Storybook story = one Figma frame
- The Figma plugin syncs tokens and screens automatically

**This is NOT a website or a production app.** It is a design system + component library + Figma integration pipeline for the TrustID extension UI.

## Visual Fidelity Rule — Pixel-Perfect Match

The refactored screens must be **pixel-perfect matches to the current implementation** in the predecessor project (`rycankun/extension-screens`). The old demo's rendered output is the visual source of truth:

- Same dimensions, spacing, padding, margins
- Same colors, fonts, weights, sizes
- Same border radii, shadows, line heights
- Same icon sizes and positions
- Same toggle/checkbox/input styling
- Same text content and layout flow

When in doubt, run both the old demo and the new Storybook side by side and compare. Differences are bugs. Reference files in `docs/reference/` contain the original screen specs.

## Developer-Friendly Codebase

This project must be easy to navigate and understand for any developer on day one. Comments are a required deliverable, not an afterthought:

- **Every file** gets a header comment block (what it is, where it fits, key dependencies)
- **Every prop** gets a JSDoc comment in its TypeScript interface
- **Every constant** gets a JSDoc comment explaining its purpose
- **Every non-obvious decision** gets a "why" comment
- **Every section** in longer files gets a divider comment (`/* ── Section Name ── */`)
- **Token references** get resolved-value comments when the value isn't obvious

## Related Organizations

- **Tracer Labs** — Parent company, creator of TrustID technologies
- **TrustID** — Identity verification product by Tracer Labs (brand guide provides color palette)
- **DCID DAO Foundation** — Foundation entity governing the DCID consent standard
- **StreamVault** — Fictional demo website used as the host site context for extension screens

## Logo (NEVER Generate — Use Provided Asset Only)

- **TrustID Business logo**: Blue shield icon + "TrustID" wordmark
- **StreamVault logo**: Purple gradient text lockup
- **SLC Digital logo**: Green badge icon
- **Logo files**: `public/assets/` — provided by brand team, never recreated or modified
- **HARD RULE**: Never generate, recreate, approximate, or substitute any logo. Always use the exact provided SVG files. If a logo file is missing, flag it — don't improvise.

---

## Single Source of Truth — Architecture Principle

Every piece of data in this project must have exactly ONE canonical source. All consumers import from that source — never duplicate, never hardcode.

| Data Type | Canonical Source | Consumers |
|-----------|-----------------|-----------|
| Visual tokens (colors, spacing, type, shadows, radii, borders, z-index) | `src/tokens/tokens.css` | All `.module.css` files via `var(--tid-*)` |
| Font declarations | `src/tokens/fonts.css` | `global.css` imports only |
| Figma token manifest | `src/tokens/figma-variables.json` | Figma plugin (auto-generated from `tokens.css`) |
| Screen enum & metadata | `src/constants/screens.ts` | Stories, screen components, plugin, flow docs |
| Jurisdiction configs & legal text | `src/constants/jurisdictions.ts` | Screen components, stories |
| Variant copy text (62 keys) | `src/constants/variants.ts` | Screen components |
| Flow transitions (170 edges) | `src/constants/flows.ts` | Storybook MDX flow docs |
| Timing constants | `src/constants/timing.ts` | Components (CSS transition references only) |
| ARIA screen titles | `src/constants/screens.ts` (SCREEN_TITLES) | Screen components, Storybook |
| Mock/seed data | `src/mock/` | Stories and tests |

**Enforcement rules:**

1. **Stories and tests MUST import shared constants** — never hardcode screen names, jurisdictions, timing values, or variant text inline.
2. **Foundation stories (Colors, Spacing, Typography) use runtime token resolution** — read actual computed values from `tokens.css` via `getComputedStyle(document.documentElement).getPropertyValue(name)`. Never duplicate hex values or pixel values in story files.
3. **No hardcoded hex colors, font families, or pixel spacing in story files.** Use `var(--tid-*)` token references for any inline styles in story decorators.
4. **Every `.tsx` file that contains JSX and is loaded by Storybook MUST have `import React from 'react'`** at the top. Args-only files are exempt.
5. **When a new constant category is needed**, create it in `src/constants/` and export from `src/constants/index.ts` before using it anywhere.
6. **If you find yourself typing the same value in two files, stop.** Extract it to the canonical source first, then import.
7. **Figma plugin manifest must stay in sync.** After adding any new token to `tokens.css` or any new screen component, run the token generation script and verify `figma-variables.json` is up to date.

---

## Tech Stack (Locked)

| Layer | Choice | Why |
|-------|--------|-----|
| UI Framework | **React 19 + TypeScript** | Component isolation, Storybook first-class, props = Figma variants |
| Build | **Vite 6** | Fast, proven, same tool family as predecessor project |
| Styling | **CSS Modules + Design Tokens** | Scoped styles, no runtime CSS-in-JS, tokens resolve for Figma |
| Token System | **CSS Custom Properties in `tokens.css`** | Single source of truth for all visual values |
| Token Namespace | **`--tid-*`** | TrustID-specific, prevents collisions |
| Figma Token Manifest | **`figma-variables.json`** (auto-generated) | Parsed by Figma plugin to create Variables |
| Component Catalog | **Storybook 8** | Each story = one Figma frame, a11y addon, flow docs |
| A11y Testing | **Storybook addon-a11y (axe-core)** | Automated WCAG 2.1 AA per component |
| Figma Plugin | **Figma Plugin API + React UI** | Token sync + screen import, built alongside library |
| Flow Documentation | **Mermaid.js in Storybook MDX** | Lives with code, renders in Storybook |
| Linting | **ESLint + Prettier + Stylelint** | Token enforcement via Stylelint custom rules |
| Testing | **Vitest + React Testing Library** | Unit + component tests |
| Package Manager | **pnpm** | Fast, disk-efficient |

---

## Project Structure

```
extension-screens-framework/
├── .storybook/
│   ├── main.ts                    # Storybook config (React + Vite)
│   ├── preview.ts                 # Global decorators, theme provider
│   └── manager.ts                 # Storybook UI customization
├── src/
│   ├── tokens/
│   │   ├── tokens.css             # Design tokens (--tid-* namespace, SINGLE SOURCE OF TRUTH)
│   │   ├── fonts.css              # @font-face (Inter, Work Sans)
│   │   ├── global.css             # Reset + token imports
│   │   └── figma-variables.json   # Auto-generated from tokens.css for Figma plugin
│   ├── components/
│   │   ├── atoms/                 # Button, Input, Toggle, Badge, Icon, Checkbox, Radio, Link, Spinner
│   │   │   └── [Component]/
│   │   │       ├── Component.tsx
│   │   │       ├── Component.module.css
│   │   │       └── Component.stories.tsx
│   │   ├── molecules/             # FormGroup, DialogHeader, ConsentToggle, ToggleRow, OtpInput
│   │   ├── organisms/             # BannerShell, ToastContainer, OverlayShell
│   │   └── screens/               # THE FIGMA IMPORT TARGETS
│   │       ├── consent/           # ConsentEU, ConsentUS, ConsentUSStd
│   │       ├── authentication/    # EmailCapture, OtpEntry, OtpError, EmailConfirm, PasskeySetup, PasskeyVerify
│   │       ├── preferences/       # CookiePrefs, CookieEmail, DnsConfirm, SharingSettings
│   │       ├── credentials/       # CredentialRequest, CredentialWarning, DataShare, DobShare, DobEntry
│   │       ├── onboarding/        # AccountSetup, VerifyNeeded
│   │       ├── status/            # Success, ErrorNetwork, DeleteWarning, RevokeAge, RevokeDob, RevokeEmail
│   │       ├── overlays/          # AgeGateCover, QrVerify, SlcKyc, SlcVerify
│   │       └── toasts/            # ToastWelcome, ToastSaved, ToastManage
│   ├── constants/
│   │   ├── screens.ts             # Screen enum, metadata, ARIA titles, categories
│   │   ├── jurisdictions.ts       # Jurisdiction configs, legal text, state lists
│   │   ├── variants.ts            # 62 copy text variant keys
│   │   ├── flows.ts               # Flow transition graph (170 edges)
│   │   ├── timing.ts              # Animation/delay timing constants
│   │   └── index.ts               # Barrel export
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useJurisdiction.ts
│   ├── types/
│   │   ├── screens.ts
│   │   ├── tokens.ts
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── mock/                      # Mock data for stories
│   └── index.ts                   # Public API exports
├── stories/
│   ├── foundation/                # Token visualization
│   │   ├── Colors.stories.tsx
│   │   ├── Typography.stories.tsx
│   │   ├── Spacing.stories.tsx
│   │   └── Shadows.stories.tsx
│   ├── flows/                     # Flow documentation (Mermaid MDX)
│   │   ├── Overview.mdx
│   │   ├── FirstTimeUser.mdx
│   │   ├── ReturningUser.mdx
│   │   ├── AgeVerification.mdx
│   │   ├── ConsentManagement.mdx
│   │   └── CredentialSharing.mdx
│   └── overview/
│       └── Introduction.mdx
├── figma/
│   ├── plugin/                    # Custom Figma plugin
│   │   ├── src/
│   │   │   ├── code.ts            # Main thread (Variables, nodes)
│   │   │   ├── ui.tsx             # Plugin UI (React iframe)
│   │   │   └── shared/
│   │   │       ├── token-parser.ts
│   │   │       ├── screen-renderer.ts
│   │   │       └── manifest.ts
│   │   ├── manifest.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── export/                    # Generated standalone HTML (git-ignored)
│   └── scripts/
│       ├── generate-screens.ts    # React → static HTML
│       └── generate-tokens.ts     # tokens.css → figma-variables.json
├── docs/
│   ├── PRD.md                     # Product requirements document
│   ├── PROMPT_PATH.md             # Step-by-step build sequence
│   └── reference/                 # Old project docs
│       ├── SCREEN-AUDIT.md
│       ├── SCREEN-VARIANT-GUIDE.md
│       ├── constants-reference.js
│       └── variants-reference.js
├── public/
│   ├── assets/                    # SVG brand logos
│   └── fonts/                     # .woff2 font files (Inter, Work Sans)
├── CLAUDE.md                      # ← YOU ARE HERE
├── DIRECTIVES.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── .stylelintrc.json
└── vitest.config.ts
```

---

## Screen Inventory (35 screens)

### Banner/Prompt Screens (27)

| Screen | Component | Category | Description |
|--------|-----------|----------|-------------|
| `consent-t1` | ConsentEU | consent | EU/GDPR opt-in consent with toggles |
| `consent-t2` | ConsentUS | consent | US strict states (CA, CO, CT, GA, MD, NH, OR, TN) opt-out |
| `consent-t3` | ConsentUSStd | consent | US standard states (~43) simplified opt-out |
| `dob-entry` | DobEntry | credentials | Birthday input for age verification |
| `dob-share` | DobShare | credentials | Share DOB from TrustID wallet |
| `email-capture` | EmailCapture | authentication | Email entry form |
| `otp-entry` | OtpEntry | authentication | 6-digit verification code input |
| `otp-error` | OtpError | authentication | Invalid OTP error message |
| `email-confirm` | EmailConfirm | authentication | Email verification confirmation |
| `passkey-setup` | PasskeySetup | authentication | Biometric passkey creation |
| `passkey-verify` | PasskeyVerify | authentication | Passkey authentication prompt |
| `cookie-prefs` | CookiePrefs | preferences | Cookie management (2-tab: Cookies + Shared Data) |
| `cookie-email` | CookieEmail | preferences | Email for cookie preference save |
| `dns-confirm` | DnsConfirm | preferences | Do Not Sell confirmation |
| `sharing-settings` | SharingSettings | preferences | Control credential sharing toggles |
| `data-share` | DataShare | credentials | Voluntary data sharing consent |
| `credential-request` | CredentialRequest | credentials | Request to share credentials with site |
| `credential-warning` | CredentialWarning | credentials | Credential expiry warning |
| `account-setup` | AccountSetup | onboarding | TrustID account creation |
| `verify-needed` | VerifyNeeded | onboarding | Prompt to verify account |
| `success` | Success | status | Animated success confirmation |
| `error-network` | ErrorNetwork | status | Network error with retry |
| `delete-warning` | DeleteWarning | status | Account deletion warning |
| `revoke-dob-warning` | RevokeDob | status | Revoke DOB sharing warning |
| `revoke-age-warning` | RevokeAge | status | Revoke age sharing warning |
| `revoke-email-warning` | RevokeEmail | status | Revoke email sharing warning |
| `dsr-intake` | DsrIntake | preferences | Data subject request form |

### Toast Overlays (3)

| Screen | Component | Description |
|--------|-----------|-------------|
| `toast-welcome` | ToastWelcome | Welcome back notification |
| `toast-saved` | ToastSaved | Preferences saved confirmation |
| `toast-manage` | ToastManage | Floating preferences icon/tooltip |

### Full-Page Overlays (5)

| Screen | Component | Description |
|--------|-----------|-------------|
| `age-gate-cover` | AgeGateCover | Full-page age restriction overlay |
| `qr-verify` | QrVerify | QR code verification overlay |
| `slc-kyc` | SlcKyc | SLC Digital KYC verification overlay |
| `slc-verify` | SlcVerify | SLC eSIM verification prompt |
| `sv-adult` | SvAdult | Adult-verified landing state (nav credential link) |

---

## Variant System (5 Axes)

| Axis | Values | What It Controls |
|------|--------|-----------------|
| **Theme** | `light`, `dark` | CSS token overrides via `data-theme` attribute |
| **Jurisdiction** | `eu`, `us-strict`, `us-standard` | Which consent screen, legal text, toggle defaults |
| **Scenario** | `first`, `firstVisit`, `returning`, `returningVerified` | Which screens appear, state flags |
| **Honor Age Gate** | `true`, `false` | DOB entry/share screens vs direct email flow |
| **SLC Mode** | `off`, `noKyc`, `withKyc` | OTP vs eSIM verification path |

**US Strict States**: CA, CO, CT, DE, GA, MD, MN, MT, NH, NJ, OR, TN, TX
**US Standard States**: All other ~37 states

Each screen component accepts variant axes as props. Each Storybook story combination = one Figma frame.

---

## Design Language

- **Mode**: Light mode primary, dark mode via `data-theme="dark"`
- **Background**: Off White (`#F5F7FA`) primary, White (`#FFFFFF`) for cards/surfaces
- **Text**: Midnight Navy (`#0B1620`) for headings, Iron (`#374151`) for body
- **Accent**: Trust ID Blue (`#0E6FFF`) for CTAs, links, interactive elements
- **Banner width**: 380px fixed
- **Cards**: Subtle borders with gentle box-shadows, small rounded corners
- **Frosted glass is a critical design element** — the `backdrop-filter: blur()` frost layer over the gradient background is present in both Storybook preview AND Figma exports. Use `background: rgba(var(--tid-surface-rgb), 0.4)` with `backdrop-filter: blur(var(--tid-blur-xl))` on the BannerShell content layer. Three frost tiers are available: `.frost-light` (0.4 opacity), `.frost-medium` (0.58), `.frost-heavy` (0.75).
- **Overall feel**: Clean, professional, trustworthy, precise

## Color Palette (from TrustID Brand Guide)

### Primary Colors

| Name | Token | Light Hex | Dark Hex | Usage |
|------|-------|-----------|----------|-------|
| Trust ID Blue | `--tid-brand` | `#0E6FFF` | `#5BA3FF` | Primary accent, CTAs, links, focus rings |
| Trust ID Blue Dark | `--tid-brand-dark` | `#0B5CD6` | `#4A94F5` | Hover states |
| Midnight Navy | `--tid-ink` | `#0B1620` | `#E2E8F0` | Primary headings, button bg |
| Off White | `--tid-page-bg` | `#F5F7FA` | `#0C0E14` | Page background |

### Status Colors

| Name | Token | Light Hex | Dark Hex | Usage |
|------|-------|-----------|----------|-------|
| Signal Green | `--tid-success` | `#00C897` | `#00D6A0` | Success states |
| Alert Red | `--tid-error` | `#FF4D4D` | `#FF7A7A` | Error states |
| Warning Amber | `--tid-warning` | `#F59E0B` | `#FBBF24` | Warning states |

### Text Colors

| Name | Token | Light Hex | Dark Hex | Usage |
|------|-------|-----------|----------|-------|
| Primary | `--tid-ink` | `#0B1620` | `#E2E8F0` | Headings |
| Body | `--tid-text-body` | `#374151` | `#B8C0CC` | Body text |
| Secondary | `--tid-text-secondary` | `#6B7280` | `#8892A0` | Subtle text |
| Muted | `--tid-text-muted` | `#697080` | `#828D9C` | WCAG AA compliant muted |
| Disabled | `--tid-text-disabled` | `#B0B7C3` | `#3D4550` | Disabled elements |

### Surface Colors

| Name | Token | Light Hex | Dark Hex | Usage |
|------|-------|-----------|----------|-------|
| Surface | `--tid-surface` | `#FFFFFF` | `#181B24` | Cards, elevated elements |
| Raised | `--tid-surface-raised` | `#F3F4F6` | `#22262F` | Hover states, backgrounds |
| Subtle | `--tid-surface-subtle` | `#F8F9FB` | `#1C1F28` | Minimal contrast areas |

## Fonts

| Usage | Font | Token | Weight |
|-------|------|-------|--------|
| Body text, labels, inputs | Inter | `--tid-ff-body` | 400 (Regular), 500 (Medium) |
| Headings, logos, display | Work Sans | `--tid-ff-heading` | 400 (Regular), 500 (Medium) |
| Code, debug | SF Mono / Fira Code | `--tid-ff-mono` | 400 |

**Max font weight**: 500 (Medium) per brand rules. Never use Bold (700) or Semibold (600).

Both Inter and Work Sans are Google Fonts — compatible with Figma's font library.

---

## Figma Plugin — First-Class Deliverable

The custom Figma plugin is built alongside the component library, not as an afterthought. It ships with every step.

### What It Does

| Capability | Description |
|------------|-------------|
| **Token Sync** | Reads `figma-variables.json` → creates/updates Figma Variable collections (Colors, Spacing, Typography, Shadows, Radii, Sizing) with Light/Dark modes |
| **Screen Import** | Renders React screen components to static HTML → imports as organized Figma frames |
| **Component Mapping** | Maps React props to Figma component properties for variant switching |
| **Idempotent** | Running twice updates existing Variables/frames — never duplicates |

### When to Update

- After **every** change to `tokens.css` → run `generate-tokens.ts` → verify `figma-variables.json` → sync plugin
- After **every** new screen component → add to plugin's screen manifest → import into Figma
- After **every** new atom/molecule → update plugin's component map

### Plugin Architecture

- **Main thread** (`code.ts`): Figma API access — create Variables, create/update frames, read file state
- **UI thread** (`ui.tsx`): React iframe — token diff preview, import controls, sync status
- **Communication**: `postMessage` between iframe and Figma sandbox
- **Build**: Vite with esbuild for plugin code

---

## Storybook as the Hub

Storybook is the primary interface for browsing, testing, and exporting screens.

| Story Category | Purpose | Figma Import? |
|---------------|---------|---------------|
| **Foundation** | Visualize tokens (colors, type, spacing, shadows) | Yes — token reference frames |
| **Atoms** | Individual UI primitives with all states | Yes — component variants |
| **Molecules** | Composed UI patterns | Yes — component variants |
| **Organisms** | Shell containers (banner, toast, overlay) | Supporting structure |
| **Screens** | Full screen compositions with variant controls | **PRIMARY IMPORT TARGETS** |
| **Flows** | Mermaid MDX docs with flowcharts + screen sequences | Reference only |

### Screen Story Pattern

```tsx
// ConsentEU.stories.tsx
export default {
  title: 'Screens/Consent/EU',
  component: ConsentEU,
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    gpcDetected: { control: 'boolean' },
    dntDetected: { control: 'boolean' },
  },
};

export const Light = { args: { theme: 'light' } };
export const Dark = { args: { theme: 'dark' } };
export const WithGPC = { args: { theme: 'light', gpcDetected: true } };
```

Each named export = one Figma frame when imported.

---

## Key Dimensions

| Element | Value | Token |
|---------|-------|-------|
| Banner width | 380px | `--tid-size-banner` |
| Banner border-radius | 4px top, 0 bottom | `--tid-radius-sm` |
| Content padding | 16px 24px 8px | `--tid-sp-8` / `--tid-sp-12` / `--tid-sp-4` |
| Touch target minimum | 44px | `--tid-size-touch` |
| Icon standard | 16px | `--tid-size-icon` |
| Control height | 40px | `--tid-size-control` |

---

## Accessibility (WCAG 2.1 AA — Non-Negotiable)

- Every interactive element: `:focus-visible` ring, `aria-*` attributes, keyboard handler
- Semantic HTML from line one (no `<div>` buttons, no `<span>` links)
- Color contrast: 4.5:1 minimum for text, 3:1 for large text and UI components
- Screen reader: ARIA labels, role attributes, live regions for dynamic content
- Storybook addon-a11y: zero violations per component

---

## Browser Support (for Storybook / Figma export preview)

- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- Figma plugin: Figma desktop app (latest)

---

## Active Work

- [ ] Project scaffolding (Vite + React + TS + pnpm + Storybook)
- [ ] Design token system (tokens.css with `--tid-*` namespace)
- [ ] Token generation script (tokens.css → figma-variables.json)
- [ ] Figma plugin scaffold + token sync
- [ ] Foundation stories (Colors, Typography, Spacing, Shadows)
- [ ] Atom components (Button, Input, Toggle, Badge, Icon, etc.)
- [ ] Molecule components (FormGroup, DialogHeader, etc.)
- [ ] Organism components (BannerShell, ToastContainer, OverlayShell)
- [ ] Screen components (all 35 screens across 7 categories)
- [ ] Figma plugin screen import
- [ ] Flow documentation (Mermaid MDX)
- [ ] Figma export script (standalone HTML generation)
- [ ] Visual fidelity correction (Step 11.5 — match predecessor 1:1)
- [ ] Legal compliance audit (Step 11.5F — per-jurisdiction element verification)
- [ ] Final audit (a11y, tokens, Figma sync)
