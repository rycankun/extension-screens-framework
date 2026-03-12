# PROMPT PATH — Step-by-Step Build Sequence

## How to Use This File

Each step below is a **complete, self-contained prompt** ready to copy-paste into Claude. No assembly required — the header, tasks, verification, and footer are all included.

Follow the steps in order. Do not skip ahead. Push after every completed step.

---

## Step 1 — Project Scaffolding

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 1: Project Scaffolding

Initialize the project with React 19 + TypeScript + Vite 6 + pnpm. Set up the directory structure defined in CLAUDE.md.

Tasks:
1. Initialize pnpm project with package.json (name: "trustid-extension-screens", private: true)
2. Install core dependencies:
   - react, react-dom (v19)
   - typescript
   - vite, @vitejs/plugin-react
   - Storybook 8 (@storybook/react-vite, @storybook/addon-essentials, @storybook/addon-a11y)
3. Create tsconfig.json with strict mode, path aliases (@/ → src/)
4. Create vite.config.ts with React plugin
5. Create .storybook/main.ts and .storybook/preview.ts (basic config, no stories yet)
6. Create the full directory structure from CLAUDE.md (empty directories with .gitkeep where needed)
7. Create placeholder src/index.ts
8. Add scripts to package.json: dev, build, storybook, test, generate:tokens
9. Set up ESLint, Prettier, Stylelint with basic configs
10. Create .gitignore (node_modules, dist, figma/export/, *.local)
11. Verify: pnpm install succeeds, pnpm storybook launches without errors

Every config file should have a header comment explaining its purpose.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: project scaffolding with React + TS + Vite + Storybook" && git push origin main
When complete, print: "✅ STEP 1 COMPLETE — Ready for Step 2."
```

---

## Step 2 — Design Token System

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 2: Design Token System

Create the token system that drives all visual styling. This is the SINGLE SOURCE OF TRUTH for every color, size, spacing, and typographic value in the project. Every value must match the predecessor project exactly (see docs/reference/ for original tokens.css).

REFERENCE: Read the original tokens.css values in docs/reference/ or the token tables in docs/PRD.md § 2. Adapt the namespace from bare names (--brand) to --tid-* prefix (--tid-brand), but keep every value identical.

Tasks:
1. src/tokens/tokens.css — Complete token file with ALL tokens from PRD § 2:
   - Text colors (light + dark)
   - Brand & status colors (light + dark)
   - Surface colors (light + dark)
   - Button & toggle colors (light + dark)
   - RGB channel tokens (for rgba patterns)
   - Typography (font sizes, families, weights, letter spacing, line heights)
   - Spacing scale (4px base unit)
   - Border radius
   - Sizing (icons, controls, containers, blobs)
   - Z-index scale
   - Box shadows (light + dark)
   - Transitions, easing, animation durations
   - Opacity scale
   - Backdrop blur scale
   - Gradient tokens (banner, overlay, thumbnails)
   - Dark theme overrides via [data-theme='dark'] selector
2. src/tokens/fonts.css — @font-face declarations for Inter and Work Sans (.woff2)
3. src/tokens/global.css — CSS reset + imports (fonts.css, tokens.css)
4. Verify: All token values match the predecessor project's tokens.css exactly (different names, same values)
5. Comment every section of tokens.css with what the tokens are for and how they map to UI

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: design token system with --tid-* namespace" && git push origin main
When complete, print: "✅ STEP 2 COMPLETE — Ready for Step 3."
```

---

## Step 3 — Token Generation Script + Figma Variables JSON

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 3: Token Generation Script

Create the automated pipeline that transforms tokens.css into figma-variables.json — the data source for the Figma plugin's token sync feature.

Tasks:
1. figma/scripts/generate-tokens.ts — Node script that:
   - Parses tokens.css using regex/CSS parser
   - Extracts :root (light) and [data-theme='dark'] (dark) token values
   - Groups tokens into Figma Variable Collections (Colors, Spacing, Typography, Radii, Sizing, Shadows)
   - Outputs src/tokens/figma-variables.json in the format the Figma Variables API expects
   - Collections with color tokens get Light/Dark modes
   - Non-color collections get a single mode
   - Each variable includes: name, collection, value(s), type (COLOR, FLOAT, STRING)
2. Add "generate:tokens" script to package.json: "ts-node figma/scripts/generate-tokens.ts"
3. Run the script and verify figma-variables.json is complete and correct
4. Add thorough comments in the generation script explaining the parsing logic, collection grouping, and output format

Verify: figma-variables.json contains all tokens from tokens.css, correctly grouped into collections with light/dark modes.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: token generation script (tokens.css → figma-variables.json)" && git push origin main
When complete, print: "✅ STEP 3 COMPLETE — Ready for Step 4."
```

---

## Step 4 — Figma Plugin Scaffold + Token Sync

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 4: Figma Plugin Scaffold

Build the custom Figma plugin that syncs design tokens to Figma Variables. This is the bridge between code and design — it must work from day one.

Tasks:
1. figma/plugin/manifest.json — Figma plugin manifest (name: "TrustID Token Sync", api: "1.0.0", editorType: ["figma"])
2. figma/plugin/package.json — Plugin dependencies (React for UI, Vite for build)
3. figma/plugin/vite.config.ts — Build config for plugin (code.ts → code.js, ui.tsx → ui.html)
4. figma/plugin/tsconfig.json — TypeScript config with Figma Plugin API types
5. figma/plugin/src/code.ts — Main thread:
   - Read figma-variables.json (bundled at build time or passed from UI)
   - Create/update Figma Variable Collections for each token group
   - Handle Light/Dark modes for color collections
   - Idempotent: match by variable name, update if exists, create if new
   - Report sync results back to UI (created/updated/unchanged counts)
6. figma/plugin/src/ui.tsx — Plugin UI (React):
   - "Sync Tokens" button
   - Status display (last sync time, counts)
   - Token diff preview (show what will change)
   - File input for figma-variables.json (or auto-read from bundled data)
7. figma/plugin/src/shared/token-parser.ts — Parse figma-variables.json into Figma API calls
8. figma/plugin/src/shared/manifest.ts — Track sync state (last synced hash, timestamps)
9. Add "build:plugin" script to root package.json
10. Comment every function in the plugin with JSDoc explaining what it does and how it interfaces with the Figma API

Verify: Plugin builds successfully. When loaded in Figma (Plugins → Development → Import plugin from manifest), the UI renders and token sync creates Variables.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: Figma plugin scaffold with token sync" && git push origin main
When complete, print: "✅ STEP 4 COMPLETE — Ready for Step 5."
```

---

## Step 5 — Storybook Configuration + Foundation Stories

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 5: Storybook Configuration + Foundation Stories

Configure Storybook as the component catalog hub and create Foundation stories that visualize the token system.

Tasks:
1. .storybook/main.ts — Configure stories glob, addons (essentials, a11y), Vite builder, static dirs (public/)
2. .storybook/preview.ts — Import global.css, set up theme decorator (light/dark toggle via toolbar), configure a11y addon defaults
3. .storybook/manager.ts — Custom theme (TrustID branding in Storybook UI sidebar)
4. stories/overview/Introduction.mdx — Library overview, getting started guide, architecture explanation
5. stories/foundation/Colors.stories.tsx — Render all color tokens as swatches with:
   - Runtime token resolution via getComputedStyle (never hardcode hex values)
   - Light/dark mode comparison
   - Token name, resolved value, usage description
   - Organized by category (Text, Brand, Surface, Status)
6. stories/foundation/Typography.stories.tsx — Render all type tokens:
   - Font families (Inter, Work Sans)
   - Size scale with example text at each size
   - Weight variants (400, 500)
   - Letter spacing and line height examples
7. stories/foundation/Spacing.stories.tsx — Render spacing scale as visual blocks:
   - Each --tid-sp-* token as a colored box
   - Labels with token name and resolved value
8. stories/foundation/Shadows.stories.tsx — Render shadow tokens on cards:
   - Each shadow token applied to a card
   - Light/dark mode comparison

All foundation stories must resolve values at runtime — ZERO hardcoded values.

Verify: pnpm storybook launches, all 4 foundation stories render correctly in both light and dark mode, a11y addon shows no violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: Storybook config + foundation token stories" && git push origin main
When complete, print: "✅ STEP 5 COMPLETE — Ready for Step 6."
```

---

## Step 6 — Atom Components

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 6: Atom Components

Build the base UI primitives. These are the building blocks for all screens. Every atom must match the predecessor project's visual output exactly.

REFERENCE: Read the component styles in docs/reference/ (original components.css) to match dimensions, colors, and interactions pixel-for-pixel. Read docs/PRD.md § 3.1 for prop interfaces.

Tasks:
1. src/components/atoms/Button/ — Button.tsx + Button.module.css + Button.stories.tsx
   - Variants: primary, secondary, ghost, danger
   - Sizes: sm, md, lg
   - States: default, hover, active, disabled, focus-visible
   - Full width option
2. src/components/atoms/Input/ — Input.tsx + Input.module.css + Input.stories.tsx
   - Types: text, email, password, number
   - States: default, focus, error, disabled
   - Placeholder support
3. src/components/atoms/Toggle/ — Toggle.tsx + Toggle.module.css + Toggle.stories.tsx
   - States: on, off, locked, disabled
   - Sizes: sm, md
   - Animated knob slide (CSS only, static for Figma)
4. src/components/atoms/Badge/ — Badge.tsx + Badge.module.css + Badge.stories.tsx
   - Variants: success, warning, error, info, neutral
5. src/components/atoms/Icon/ — Icon.tsx + Icon.module.css + Icon.stories.tsx
   - SVG wrapper with size and color props
   - Common icons: close, check, warning, info, fingerprint, shield, lock, email, chevron
6. src/components/atoms/Checkbox/ — Checkbox.tsx + Checkbox.module.css + Checkbox.stories.tsx
7. src/components/atoms/Radio/ — Radio.tsx + Radio.module.css + Radio.stories.tsx
8. src/components/atoms/Link/ — Link.tsx + Link.module.css + Link.stories.tsx
9. src/components/atoms/Spinner/ — Spinner.tsx + Spinner.module.css + Spinner.stories.tsx
10. src/components/atoms/Divider/ — Divider.tsx + Divider.module.css + Divider.stories.tsx

Every component: typed props, JSDoc comments, a11y attributes, focus-visible, Storybook stories with all variants.

Verify: All atoms render in Storybook, all variants visible, a11y addon shows zero violations, visual output matches predecessor.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: atom components (Button, Input, Toggle, Badge, Icon, etc.)" && git push origin main
When complete, print: "✅ STEP 6 COMPLETE — Ready for Step 7."
```

---

## Step 7 — Molecule Components

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 7: Molecule Components

Build composed patterns from atoms. These are the reusable building blocks for screens.

REFERENCE: Read docs/PRD.md § 3.2 for composition and prop interfaces. Match predecessor project visuals exactly.

Tasks:
1. src/components/molecules/FormGroup/ — Label + Input + Error message
2. src/components/molecules/DialogHeader/ — Logo (TrustID) + Title text + Close button (Icon atom)
3. src/components/molecules/ConsentToggle/ — Toggle + Label + Sublabel + Info icon
4. src/components/molecules/ToggleRow/ — Toggle + Label + Sublabel (simplified)
5. src/components/molecules/OtpInput/ — 6 × single-digit Inputs with auto-advance logic
6. src/components/molecules/TabBar/ — Tab buttons with active indicator (Cookies / Shared Data)
7. src/components/molecules/LegalNotice/ — Icon + legal text block (jurisdiction-specific)
8. src/components/molecules/PoweredBadge/ — TrustID icon + "Powered by TrustID" text
9. src/components/molecules/ProgressDots/ — Step indicator dots

Each: .tsx + .module.css + .stories.tsx, typed props, JSDoc, a11y, Storybook stories.

Verify: All molecules render in Storybook, compositions use atom components (not raw HTML), a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: molecule components (FormGroup, DialogHeader, ConsentToggle, etc.)" && git push origin main
When complete, print: "✅ STEP 7 COMPLETE — Ready for Step 8."
```

---

## Step 8 — Organism Components

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 8: Organism Components

Build the shell containers that wrap screen content. These define the banner, toast, and overlay layout structures.

REFERENCE: Read docs/PRD.md § 3.3. Match the predecessor project's BannerShell dimensions (380px width, 4px top radius, gradient background, frost content layer) exactly.

Tasks:
1. src/components/organisms/BannerShell/ — 380px wide extension banner:
   - Gradient background layer (static for Figma — no animation)
   - Frosted content area (solid surface for Figma — no backdrop-filter)
   - Content slot (children prop)
   - Close button in top-right
   - role="dialog" aria-modal="true"
2. src/components/organisms/ToastContainer/ — Small floating notification:
   - Content slot
   - Auto-positioned (bottom-left for Figma static)
3. src/components/organisms/OverlayShell/ — Full-viewport overlay:
   - Gradient background (static)
   - Centered content card with frost layer (solid for Figma)
   - Content slot

Each: .tsx + .module.css + .stories.tsx, typed props, JSDoc, a11y.

NOTE ON FIGMA COMPATIBILITY: BannerShell has animated gradient blobs and frosted glass in the live demo. For Figma export, render a STATIC version — solid gradient background, solid surface content area. The visual effect must be close but Figma-compatible.

Verify: Organisms render in Storybook, dimensions match predecessor exactly, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: organism components (BannerShell, ToastContainer, OverlayShell)" && git push origin main
When complete, print: "✅ STEP 8 COMPLETE — Ready for Step 9."
```

---

## Step 9 — Screen Components: Consent

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 9: Consent Screen Components

Build the three consent screens. These are the most complex screens with jurisdiction-specific legal text, multiple toggles, and variant states.

REFERENCE: Read docs/PRD.md § 4.1. Match predecessor visuals pixel-for-pixel using docs/reference/SCREEN-AUDIT.md for interactive states and variant text.

Tasks:
1. src/components/screens/consent/ConsentEU.tsx + .module.css + .stories.tsx
   - Wraps in BannerShell
   - DialogHeader with TrustID logo + "Cookie Consent" title
   - Headline + body text from variants.ts
   - 3 ConsentToggle rows: Essential (locked ON), Analytics, Marketing
   - LegalNotice with EU GDPR text from jurisdictions.ts
   - GPC detected badge (conditional via prop)
   - DNT detected notice (conditional via prop)
   - Accept All + Reject buttons
   - Stories: Light, Dark, WithGPC, WithDNT, AllTogglesOn, AllTogglesOff

2. src/components/screens/consent/ConsentUS.tsx + .module.css + .stories.tsx
   - Same structure, opt-out model (toggles default ON)
   - State-specific legal text
   - CT minor advertising ban variant (locked toggles)
   - Stories: Light, Dark, WithGPC, CtMinorBan

3. src/components/screens/consent/ConsentUSStd.tsx + .module.css + .stories.tsx
   - Simplified version, fewer toggles
   - Stories: Light, Dark

Update Figma plugin manifest with 3 new screens.

Verify: All 3 consent screens render, all story variants visible, text matches predecessor exactly, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: consent screen components (EU, US-Strict, US-Standard)" && git push origin main
When complete, print: "✅ STEP 9 COMPLETE — Ready for Step 10."
```

---

## Step 10 — Screen Components: Authentication

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 10: Authentication Screen Components

Build the 6 authentication screens. Match predecessor visuals exactly.

REFERENCE: docs/PRD.md § 4.2, docs/reference/SCREEN-AUDIT.md

Tasks:
1. src/components/screens/authentication/EmailCapture.tsx — Email entry + Continue + Skip
2. src/components/screens/authentication/OtpEntry.tsx — 6-digit OtpInput + Verify + Resend (with countdown display)
3. src/components/screens/authentication/OtpError.tsx — Error state + Try Again + Resend
4. src/components/screens/authentication/EmailConfirm.tsx — Success icon + Continue
5. src/components/screens/authentication/PasskeySetup.tsx — Fingerprint icon + Set Up + Skip
6. src/components/screens/authentication/PasskeyVerify.tsx — Fingerprint icon + Verify + Use Password

Each: BannerShell wrapper, light/dark stories, typed props, JSDoc, a11y.
Update Figma plugin manifest with 6 new screens.

Verify: All 6 screens render, match predecessor, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: authentication screen components" && git push origin main
When complete, print: "✅ STEP 10 COMPLETE — Ready for Step 11."
```

---

## Step 11 — Screen Components: Preferences

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 11: Preference Screen Components

Build the 5 preference screens. CookiePrefs is the most complex with its 2-tab interface.

REFERENCE: docs/PRD.md § 4.3, docs/reference/SCREEN-AUDIT.md

Tasks:
1. src/components/screens/preferences/CookiePrefs.tsx — 2-tab (Cookies + Shared Data):
   - TabBar molecule switching between tabs
   - Cookies tab: Essential (locked), Analytics, Marketing toggles
   - Shared Data tab: Email, DOB, Age toggles with on/off sublabel copy from SHARED_COPY constant
   - Save button
   - Stories: CookiesTabLight, CookiesTabDark, SharedDataTabLight, SharedDataTabDark, AllTogglesOn, AllTogglesOff, EUVariant, USVariant, CtMinorVariant
2. src/components/screens/preferences/CookieEmail.tsx — Email for saving preferences
3. src/components/screens/preferences/DnsConfirm.tsx — Do Not Sell confirmation
4. src/components/screens/preferences/SharingSettings.tsx — Credential sharing toggles with dates
5. src/components/screens/preferences/DsrIntake.tsx — Data subject request with jurisdiction-adaptive copy (EU/CA/Generic US)

Each: BannerShell, light/dark, typed props, JSDoc, a11y.
Update Figma plugin manifest.

Verify: All 5 screens render, CookiePrefs tabs switch correctly in Storybook, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: preference screen components" && git push origin main
When complete, print: "✅ STEP 11 COMPLETE — Ready for Step 12."
```

---

## Step 12 — Screen Components: Credentials

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 12: Credential Screen Components

Build the 5 credential screens.

REFERENCE: docs/PRD.md § 4.4, docs/reference/SCREEN-AUDIT.md

Tasks:
1. src/components/screens/credentials/DobEntry.tsx — Month/Day/Year inputs + Verify button
2. src/components/screens/credentials/DobShare.tsx — Credential card showing DOB + Share/Don't Share buttons
3. src/components/screens/credentials/DataShare.tsx — Data category toggles + Share/Skip buttons
4. src/components/screens/credentials/CredentialRequest.tsx — Site name requesting credential + Allow/Deny buttons
5. src/components/screens/credentials/CredentialWarning.tsx — Expiry warning + Renew/Dismiss buttons

Each: BannerShell wrapper, light/dark stories, typed props, JSDoc, a11y.
Update Figma plugin manifest with 5 new screens.

Verify: All 5 screens render, match predecessor visuals exactly, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: credential screen components" && git push origin main
When complete, print: "✅ STEP 12 COMPLETE — Ready for Step 13."
```

---

## Step 13 — Screen Components: Onboarding + Status

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 13: Onboarding + Status Screen Components

Build the 2 onboarding screens and 6 status screens.

REFERENCE: docs/PRD.md § 4.5 and § 4.6, docs/reference/SCREEN-AUDIT.md

Tasks:
1. src/components/screens/onboarding/AccountSetup.tsx — Get Started headline + body + CTA button
2. src/components/screens/onboarding/VerifyNeeded.tsx — Warning icon + Verify Now + Later
3. src/components/screens/status/Success.tsx — Static checkmark icon (no animation for Figma) + "All Set" headline + subtext
4. src/components/screens/status/ErrorNetwork.tsx — Error icon + Retry + Dismiss
5. src/components/screens/status/DeleteWarning.tsx — Danger icon + warning text + Delete (danger variant) + Cancel
6. src/components/screens/status/RevokeAge.tsx — Warning icon + consequence text + Revoke (danger) + Cancel
7. src/components/screens/status/RevokeDob.tsx — Same structure as RevokeAge, DOB-specific copy from variants.ts
8. src/components/screens/status/RevokeEmail.tsx — Same structure, email-specific copy from variants.ts

Each: BannerShell wrapper, light/dark stories, typed props, JSDoc, a11y.
Update Figma plugin manifest with 8 new screens.

Verify: All 8 screens render, match predecessor visuals, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: onboarding + status screen components" && git push origin main
When complete, print: "✅ STEP 13 COMPLETE — Ready for Step 14."
```

---

## Step 14 — Screen Components: Overlays + Toasts

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 14: Overlay + Toast Screen Components

Build the 4 overlay screens and 3 toast screens. These complete the full screen inventory.

REFERENCE: docs/PRD.md § 4.7 and § 4.8, docs/reference/SCREEN-AUDIT.md

Tasks:
1. src/components/screens/overlays/AgeGateCover.tsx — OverlayShell + age restriction warning + Verify Age button
   - States via prop: DEFAULT (blocking), VERIFIED (static success state), FAILED (error message)
   - Stories: DefaultLight, DefaultDark, VerifiedLight, FailedLight
2. src/components/screens/overlays/QrVerify.tsx — OverlayShell + QR code placeholder + scan instructions
3. src/components/screens/overlays/SlcKyc.tsx — OverlayShell + SLC Digital branding + KYC verification steps
4. src/components/screens/overlays/SlcVerify.tsx — BannerShell (this is a banner, not an overlay) + SLC icon + eSIM verification + Verify button
5. src/components/screens/toasts/ToastWelcome.tsx — ToastContainer + TrustID icon + "Welcome back" text + dismiss
6. src/components/screens/toasts/ToastSaved.tsx — ToastContainer + checkmark + "Preferences saved" text
7. src/components/screens/toasts/ToastManage.tsx — Floating TrustID icon + hover tooltip "Manage Preferences"

Each: light/dark stories, typed props, JSDoc, a11y.
Update Figma plugin manifest with all 7 final screens. The complete screen library is now 35 screens.

Verify: All 7 screens render, overlays use OverlayShell (except SlcVerify which uses BannerShell), toasts use ToastContainer, a11y zero violations.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: overlay + toast screen components" && git push origin main
When complete, print: "✅ STEP 14 COMPLETE — Ready for Step 15."
```

---

## Step 15 — Figma Plugin: Screen Import

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 15: Figma Plugin Screen Import

Extend the Figma plugin to import rendered screen variants as organized Figma frames. This completes the code-to-Figma pipeline.

Tasks:
1. figma/scripts/generate-screens.ts — Script that:
   - Imports each screen component from src/components/screens/
   - Renders each variant to static HTML via renderToStaticMarkup
   - Inlines all CSS (resolves --tid-* tokens to concrete pixel/hex values)
   - Outputs standalone HTML files to figma/export/
   - Naming convention: {ComponentName}--{theme}[--{variant}].html
   - Generates a screen-manifest.json listing all exported files with metadata (category, theme, variant)

2. figma/plugin/src/shared/screen-renderer.ts — Plugin code to:
   - Read screen-manifest.json
   - Import HTML content into Figma as organized frames
   - Create Figma pages per category (Consent, Auth, Preferences, Credentials, Onboarding, Status, Overlays, Toasts)
   - Name each frame: "{ComponentName} / {theme} / {variant}"

3. figma/plugin/src/ui.tsx — Add "Import Screens" tab to the plugin UI:
   - Category checkboxes (select which screen groups to import)
   - Theme filter (Light only, Dark only, Both)
   - Import button with progress indicator
   - Results display (imported/skipped/failed counts)

4. Add "generate:screens" script to root package.json
5. Comment all new files thoroughly

Verify: Run pnpm generate:screens → figma/export/ populated with all variant HTML files. Plugin can import frames into Figma organized by category. Frame names are consistent and descriptive.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: Figma plugin screen import + generation script" && git push origin main
When complete, print: "✅ STEP 15 COMPLETE — Ready for Step 16."
```

---

## Step 16 — Flow Documentation

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 16: Flow Documentation

Create Mermaid flowchart documentation for all major user flows. These render in Storybook as reference for developers and product.

REFERENCE: docs/PRD.md § 6 for flow definitions, src/constants/flows.ts for the 170 edge transition graph, docs/reference/SCREEN-VARIANT-GUIDE.md for the first-screen routing matrix.

Tasks:
1. stories/flows/Overview.mdx — Summary of all flows with:
   - Table listing each flow, its starting conditions, and screen count
   - Links to individual flow docs
   - Variant system explanation (5 axes and how they affect flows)

2. stories/flows/FirstTimeUser.mdx — First-time user flow:
   - Mermaid flowchart showing EU and US paths
   - Screen sequence with component links
   - Variant conditions per jurisdiction

3. stories/flows/ReturningUser.mdx — Returning user flows:
   - No-credential path (floating icon → CookiePrefs)
   - Verified-credential path (ToastWelcome → ToastManage)
   - Mermaid diagrams for both

4. stories/flows/AgeVerification.mdx — Age gate flow:
   - AgeGateCover → DobEntry → verification → consent
   - DobShare path for returning users
   - Mermaid diagram showing decision points

5. stories/flows/ConsentManagement.mdx — Consent and preferences:
   - Consent screen → CookiePrefs → SharingSettings → DsrIntake
   - Jurisdiction-specific routing
   - Mermaid diagram

6. stories/flows/CredentialSharing.mdx — Credential flows:
   - CredentialRequest → Warning → DataShare
   - Mermaid diagram showing credential lifecycle

Each MDX file includes: Mermaid flowchart, screen sequence list with story links, variant conditions, developer notes.

Verify: All flow docs render in Storybook sidebar under "Flows" category, Mermaid diagrams display correctly, screen links work.

Violation scan (run before every push):
- grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — flag any hardcoded strings in JSX (false positives OK, but every real string must come from constants)
- grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — flag any hardcoded hex, px, or rem in CSS Modules
- Verify figma-variables.json is up to date with tokens.css (run: pnpm generate:tokens && git diff --exit-code src/tokens/figma-variables.json)
- Verify all new files have header comment blocks (file purpose, hierarchy position, key dependencies)
- Fix every violation found. Zero tolerance.

Push: git add -A && git commit -m "feat: flow documentation (Mermaid MDX)" && git push origin main
When complete, print: "✅ STEP 16 COMPLETE — Ready for Step 17."
```

---

## Step 17 — Final Audit

```
Read CLAUDE.md, DIRECTIVES.md, and docs/PRD.md before doing any work. Apply all rules from these files throughout this step.

THE END GOAL: Every screen, component, and token in this project will be imported into Figma as a shared component library with a fully integrated token system. Build every piece of code with this in mind — isolated components, tokenized CSS, clean Figma-compatible output. The custom Figma plugin syncs tokens and screens automatically. If something won't import cleanly into Figma, fix it before moving on.

Key reminders:
- PIXEL-PERFECT: The refactored screens must match the current implementation exactly. Use docs/reference/ as the visual source of truth. Same dimensions, colors, fonts, spacing, shadows — no deviations.
- All CSS values from tokens.css (zero hardcoded values — includes border widths, outline widths, outline offsets)
- Stories/tests import shared constants from src/constants/ (zero hardcoded screen names, jurisdictions, or labels)
- Every .tsx file with inline JSX loaded by Storybook must import React (args-only files are exempt)
- Decorator/render constraint pixel values get a comment: /* decorator constraint, no matching token */
- Foundation token stories (Colors, Spacing, Typography) are exempt from constraint comments
- ACCESSIBILITY IS NON-NEGOTIABLE: every interactive element gets :focus-visible, aria-* attributes, keyboard handlers, and semantic HTML from line one
- SINGLE SOURCE OF TRUTH: every value has ONE canonical source — tokens.css for visuals, src/constants/ for data, figma-variables.json for Figma plugin
- FIGMA PLUGIN SYNC: after adding/changing any token or screen, update the Figma plugin manifest and run token sync. The plugin is not an afterthought — it ships with every step.
- FIGMA IMPORT CLEAN: every screen component must render as a clean, self-contained frame suitable for html2figma import. No state dependencies, no animation side effects, no external data fetching.
- DEV-FRIENDLY CODE: Comment every file with a header block (what it is, where it fits). Comment the WHY, not the WHAT. Add section dividers in longer files. Document every prop with JSDoc. This codebase must be easy for any developer to navigate and understand on day one.

---

Step 17: Final Audit

Comprehensive audit of the entire project before declaring it complete.

Tasks:
1. VISUAL AUDIT: Compare every screen in Storybook to the predecessor demo side by side. Document any pixel differences and fix them. Zero deviations allowed.

2. TOKEN AUDIT: Run pnpm generate:tokens and verify figma-variables.json has every token from tokens.css. No missing tokens, no orphaned tokens. Cross-check token count.

3. A11Y AUDIT: Run Storybook addon-a11y on EVERY story across all categories. Zero violations. Check:
   - Every interactive element has :focus-visible
   - Every button/link has aria-label or visible text
   - Every dialog has role="dialog" and aria-modal
   - Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)

4. VIOLATION SCAN (full project):
   - grep -rn --include="*.tsx" --include="*.ts" ">[^<{]*[A-Za-z]{2,}" src/components/ | grep -v "node_modules" | grep -v ".stories." — zero hardcoded strings
   - grep -rn --include="*.module.css" -E "#[0-9a-fA-F]{3,8}|: [0-9]+px|: [0-9]+rem" src/ | grep -v "tokens.css" | grep -v "fonts.css" — zero hardcoded values
   - Fix every violation found.

5. FIGMA PLUGIN TEST: Load plugin in Figma, run full workflow:
   - Sync Tokens → verify all Figma Variables created with correct Light/Dark modes
   - Import Screens → verify all 35 screens imported, organized by category
   - Frame names match component names
   - Figma Variables map to correct token values

6. COMMENT AUDIT: Verify every .tsx, .ts, and .module.css file has:
   - File header comment block (what, where, dependencies)
   - Every prop has JSDoc
   - Section dividers in files > 50 lines
   - Why-comments on non-obvious decisions

7. STORYBOOK NAVIGATION: Verify:
   - Sidebar organization: Foundation → Atoms → Molecules → Organisms → Screens → Flows → Overview
   - All stories load without errors
   - Light/dark theme toggle works globally
   - Introduction.mdx renders correctly

8. BUILD TEST: pnpm build succeeds with zero warnings. pnpm generate:tokens succeeds. pnpm generate:screens succeeds. pnpm build:plugin succeeds.

9. SCREEN COUNT VERIFICATION: Confirm all 35 screens are present:
   - 3 consent + 6 auth + 5 preferences + 5 credentials + 2 onboarding + 6 status + 4 overlays + 3 toasts + 1 DSR = 35

Fix every issue found. Then:

Push: git add -A && git commit -m "feat: final audit — all checks pass" && git push origin main
When complete, print: "✅ PROJECT COMPLETE — TrustID Extension Screen Library ready for Figma import."
```
