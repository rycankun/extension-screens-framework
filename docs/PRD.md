# PRD — TrustID Extension Screen Library

## 1. Product Overview

### 1.1 What

A React component library that renders every screen in the TrustID browser extension. The library is optimized for Figma import — every component produces a clean, self-contained frame backed by a tokenized design system that syncs directly to Figma Variables via a custom plugin.

### 1.2 Why

The predecessor project (`rycankun/extension-screens`) is a working vanilla JS demo with 35+ screens, but:
- Screens have tangled state dependencies — importing one screen into Figma pulls in unwanted state from others
- Variant generation is script-based (string manipulation of raw HTML) — fragile and hard to maintain
- No component isolation — everything shares global CSS classes and DOM state
- No Storybook — developers can't browse individual screens without running the full demo

This rebuild solves these problems by making **Figma import the primary design constraint** from day one.

### 1.3 For Whom

| Audience | How They Use It |
|----------|----------------|
| **Designers** | Import screens into Figma as organized frames. Token system creates Figma Variables for consistent design. Browse screens in Storybook. |
| **Developers** | Reference Storybook stories and flow documentation for implementation specs. Component API is the contract. |
| **Product** | Review all screen variants across themes and jurisdictions in Storybook. Flow docs show complete user journeys. |

### 1.4 Visual Fidelity Rule

**The refactored screens must be pixel-perfect matches to the current implementation.** The predecessor project's HTML templates (`docs/reference/`) and the running demo at `localhost:8765` are the visual source of truth. Every component's rendered output must match the original:
- Same dimensions, spacing, padding, margins
- Same colors, fonts, weights, sizes
- Same border radii, shadows, line heights
- Same icon sizes and positions
- Same toggle/checkbox/input styling
- Same text content and layout flow

When in doubt, run both the old demo and the new Storybook side by side and compare pixel-for-pixel. Differences are bugs.

---

## 2. Token System

### 2.1 Token Architecture

All visual values are defined as CSS custom properties in `src/tokens/tokens.css` with the `--tid-*` namespace. A build script generates `src/tokens/figma-variables.json` from this file, which the Figma plugin consumes to create Figma Variables.

```
tokens.css (source of truth)
    ↓ generate-tokens.ts
figma-variables.json (Figma plugin data)
    ↓ Figma plugin sync
Figma Variables (in Figma file)
```

### 2.2 Token Categories

#### Colors — Text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--tid-ink` | `#0B1620` | `#E2E8F0` | Primary headings |
| `--tid-text-body` | `#374151` | `#B8C0CC` | Body text |
| `--tid-text-secondary` | `#6B7280` | `#8892A0` | Subtle text, icons |
| `--tid-text-muted` | `#697080` | `#828D9C` | WCAG AA muted (≥4.5:1) |
| `--tid-text-tertiary` | `#6B7280` | `#8892A0` | Alternative muted |
| `--tid-text-micro` | `#5C6B80` | `#8A95A3` | Tiny labels |
| `--tid-text-disabled` | `#B0B7C3` | `#3D4550` | Disabled elements |
| `--tid-text-footer` | `#6E7880` | `#7A8490` | Footer text |
| `--tid-text-nav` | `#1A1A2E` | `#E2E8F0` | Navigation text |

#### Colors — Brand & Status

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--tid-brand` | `#0E6FFF` | `#5BA3FF` | Primary accent, CTAs |
| `--tid-brand-dark` | `#0B5CD6` | `#4A94F5` | Hover state |
| `--tid-brand-dark-hover` | `#0950B8` | `#3D86E8` | Active state |
| `--tid-icon-on-color` | `#F5F0EB` | `#F5F0EB` | Icons on brand color |
| `--tid-success` | `#00C897` | `#00D6A0` | Success states |
| `--tid-success-light` | `#33D4AB` | `#40E0B8` | Light success |
| `--tid-success-verified` | `#00B085` | `#00C090` | Verified badge |
| `--tid-error` | `#FF4D4D` | `#FF7A7A` | Error states |
| `--tid-warning` | `#F59E0B` | `#FBBF24` | Warning states |

#### Colors — Surfaces

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--tid-page-bg` | `#F5F7FA` | `#0C0E14` | Page background |
| `--tid-surface` | `#FFFFFF` | `#181B24` | Cards, dialogs |
| `--tid-surface-raised` | `#F3F4F6` | `#22262F` | Hover/active backgrounds |
| `--tid-surface-subtle` | `#F8F9FB` | `#1C1F28` | Minimal contrast |
| `--tid-surface-site` | `#F5F6F8` | `#10121A` | Site chrome background |

#### Colors — Buttons & Toggles

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--tid-btn-primary-bg` | `#0B1620` | `#E2E8F0` | Primary button background |
| `--tid-btn-primary-text` | `#F5F7FA` | `#0C0E14` | Primary button text |
| `--tid-toggle-off` | `#D1D5DB` | `#3A3F4B` | Toggle OFF track |

#### Typography — Font Sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--tid-fs-4xs` | `7px` | Smallest text |
| `--tid-fs-3xs` | `8px` | Sub-tiny |
| `--tid-fs-2xs` | `9px` | Tiny badges, code |
| `--tid-fs-xs` | `10px` | Footer, badges, progress |
| `--tid-fs-sm` | `11px` | Micro text, controls |
| `--tid-fs-body-sm` | `12px` | Sublabels, edit links |
| `--tid-fs-body` | `13px` | Subtext, summaries |
| `--tid-fs-base` | `14px` | Body text, labels, buttons |
| `--tid-fs-input` | `15px` | Input fields |
| `--tid-fs-nav` | `17px` | Nav logos |
| `--tid-fs-lg` | `20px` | Section headings |
| `--tid-fs-xl` | `22px` | Banner headings, OTP digits |
| `--tid-fs-2xl` | `28px` | Large display |
| `--tid-fs-3xl` | `32px` | Hero titles |
| `--tid-fs-4xl` | `40px` | StreamVault hero |
| `--tid-fs-display` | `72px` | Ranking numbers |

#### Typography — Font Families & Weights

| Token | Value |
|-------|-------|
| `--tid-ff-body` | `'Inter', sans-serif` |
| `--tid-ff-heading` | `'Work Sans', sans-serif` |
| `--tid-ff-mono` | `'SF Mono', 'Fira Code', 'Consolas', monospace` |
| `--tid-fw-regular` | `400` |
| `--tid-fw-medium` | `500` |

Max weight: 500 (Medium) per brand rules.

#### Typography — Letter Spacing & Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--tid-ls-tight` | `-0.3px` | Headings, logos |
| `--tid-ls-normal` | `-0.1px` | Body text |
| `--tid-ls-wide` | `0.2px` | Buttons, labels |
| `--tid-ls-caps` | `0.04em` | Uppercase badges |
| `--tid-lh-tight` | `13px` | Compact text |
| `--tid-lh-compact` | `14px` | Buttons |
| `--tid-lh-snug` | `15px` | Labels |
| `--tid-lh-normal` | `16px` | Standard |
| `--tid-lh-body` | `17px` | Body text |
| `--tid-lh-relaxed` | `18px` | Readable body |
| `--tid-lh-loose` | `20px` | Spaced text |
| `--tid-lh-heading` | `26px` | Headings |
| `--tid-lh-display` | `28px` | Display text |

#### Spacing Scale (4px base unit)

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `--tid-sp-1` | `2px` | `--tid-sp-12` | `24px` |
| `--tid-sp-2` | `4px` | `--tid-sp-13` | `26px` |
| `--tid-sp-3` | `6px` | `--tid-sp-14` | `28px` |
| `--tid-sp-4` | `8px` | `--tid-sp-16` | `32px` |
| `--tid-sp-5` | `10px` | `--tid-sp-18` | `36px` |
| `--tid-sp-6` | `12px` | `--tid-sp-20` | `40px` |
| `--tid-sp-7` | `14px` | `--tid-sp-22` | `44px` |
| `--tid-sp-8` | `16px` | `--tid-sp-24` | `48px` |
| `--tid-sp-9` | `18px` | | |
| `--tid-sp-10` | `20px` | | |
| `--tid-sp-11` | `22px` | | |

#### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--tid-radius-sm` | `0.25rem` (4px) | Buttons, inputs, cards |
| `--tid-radius-md` | `6px` | Thumbnails |
| `--tid-radius-lg` | `8px` | Larger cards, modals |
| `--tid-radius-pill` | `9999px` | Pills, toggle tracks |
| `--tid-radius-circle` | `50%` | Avatars, icon circles |

#### Sizing

| Token | Value | Usage |
|-------|-------|-------|
| `--tid-size-icon` | `16px` | Standard icon |
| `--tid-size-icon-md` | `20px` | Medium icon (logo height) |
| `--tid-size-icon-lg` | `24px` | Large icon |
| `--tid-size-control` | `40px` | Button height |
| `--tid-size-touch` | `44px` | Touch target minimum |
| `--tid-size-banner` | `380px` | Banner width |
| `--tid-size-drawer` | `360px` | Controls drawer width |
| `--tid-size-qr-code` | `180px` | QR code size |

#### Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `--tid-z-base` | `0` | Default |
| `--tid-z-content` | `1` | Content layer |
| `--tid-z-raised` | `2` | Elevated elements |
| `--tid-z-sticky` | `10` | Sticky headers |
| `--tid-z-nav` | `50` | Navigation |
| `--tid-z-label` | `100` | Labels |
| `--tid-z-icon` | `150` | Icons |
| `--tid-z-panel` | `200` | Side panels |
| `--tid-z-overlay` | `300` | Overlays, modals |

#### Shadows

See `tokens.css` for the full shadow token catalog. Key shadows:

| Token | Usage |
|-------|-------|
| `--tid-shadow-xs` | Subtle elevation |
| `--tid-shadow-sm` | Card elevation |
| `--tid-shadow-md` | Modal elevation |
| `--tid-shadow-banner` | Banner container |
| `--tid-shadow-banner-glow` | Banner with brand glow |
| `--tid-shadow-focus-brand` | Focus ring |
| `--tid-shadow-success` | Success state glow |
| `--tid-shadow-error` | Error state glow |

---

## 3. Component Definitions

### 3.1 Atoms

| Component | Props | Description |
|-----------|-------|-------------|
| **Button** | `label`, `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg), `disabled`, `fullWidth`, `onClick` | Standard action button. Primary = dark bg, light text. |
| **Input** | `value`, `placeholder`, `type` (text/email/password/number), `error`, `disabled`, `onChange` | Text input field with label slot |
| **Toggle** | `checked`, `onChange`, `ariaLabel`, `locked`, `size` (sm/md) | ON/OFF switch with track + knob |
| **Badge** | `label`, `variant` (success/warning/error/info/neutral), `size` (sm/md) | Status badge/pill |
| **Icon** | `name`, `size` (xs/sm/md/lg/xl), `color`, `ariaLabel` | SVG icon wrapper |
| **Checkbox** | `checked`, `onChange`, `label`, `disabled` | Checkbox with label |
| **Radio** | `checked`, `onChange`, `label`, `name`, `value`, `disabled` | Radio button with label |
| **Link** | `href`, `children`, `external`, `onClick` | Text link with optional external indicator |
| **Spinner** | `size` (sm/md/lg), `ariaLabel` | Loading spinner |
| **Divider** | `spacing` (sm/md/lg) | Horizontal rule |

### 3.2 Molecules

| Component | Composed Of | Description |
|-----------|-------------|-------------|
| **FormGroup** | Label + Input + Error message | Input with label and validation |
| **DialogHeader** | Logo + Title + Close button | Standard banner header |
| **ConsentToggle** | Toggle + Label + Sublabel + Info icon | Cookie/data consent toggle row |
| **ToggleRow** | Toggle + Label + Sublabel | Simplified toggle with description |
| **OtpInput** | 6 × Input (single digit) | 6-digit OTP entry with auto-advance |
| **TabBar** | Tab buttons + active indicator | Cookie prefs tab switcher (Cookies / Shared Data) |
| **LegalNotice** | Icon + Text block | Jurisdiction-specific legal text |
| **PoweredBadge** | TrustID icon + "Powered by TrustID" | Attribution badge |
| **ProgressDots** | Dot indicators | Step progress indicator |

### 3.3 Organisms

| Component | Composed Of | Description |
|-----------|-------------|-------------|
| **BannerShell** | Banner container + gradient background + frost layer + content slot | 380px wide extension drawer with gradient bg and frosted glass content layer |
| **ToastContainer** | Floating container + content slot | Small notification overlay |
| **OverlayShell** | Full-page overlay + gradient background + frost layer + content slot | Full-viewport overlay with frosted glass content layer (age gate, QR verify) |

---

## 4. Screen Specifications

### 4.1 Consent Screens

#### ConsentEU (`consent-t1`)
- **Purpose**: EU/GDPR opt-in consent — user must actively accept
- **Layout**: DialogHeader → headline → body text → ConsentToggle rows (Essential, Analytics, Marketing) → legal notice → Accept/Reject buttons
- **Variants**: theme (light/dark), gpcDetected (shows GPC badge), dntDetected (shows DNT notice)
- **Key rule**: Essential toggle locked ON (cannot be toggled off)
- **Legal text**: From `jurisdictions.ts` — EU GDPR-specific
- **Pixel reference**: `docs/reference/` → old project `consent-t1.html`

#### ConsentUS (`consent-t2`)
- **Purpose**: US strict-state opt-out consent (CA, CO, CT, GA, MD, NH, OR, TN)
- **Layout**: Same as ConsentEU but opt-out model — toggles default ON, user can turn off
- **Variants**: theme, gpcDetected, dntDetected, state code (CT has special minor advertising ban)
- **CT special case**: Under-18 advertising toggle locked to OFF with explanatory notice
- **Legal text**: State-specific from `jurisdictions.ts`

#### ConsentUSStd (`consent-t3`)
- **Purpose**: US standard-state simplified opt-out (~37 states)
- **Layout**: Simplified version — fewer toggles, shorter legal text
- **Variants**: theme

### 4.2 Authentication Screens

#### EmailCapture (`email-capture`)
- **Purpose**: Email entry to begin verification
- **Layout**: DialogHeader → headline → email Input → Continue button → Skip link

#### OtpEntry (`otp-entry`)
- **Purpose**: 6-digit verification code input
- **Layout**: DialogHeader → headline → subtext (email shown) → OtpInput (6 digits) → Verify button → Resend link (with countdown)

#### OtpError (`otp-error`)
- **Purpose**: Invalid OTP error state
- **Layout**: DialogHeader → error icon → error headline → error body → Try Again button → Resend link

#### EmailConfirm (`email-confirm`)
- **Purpose**: Email successfully verified
- **Layout**: DialogHeader → success icon → "Email Verified" headline → body → Continue button

#### PasskeySetup (`passkey-setup`)
- **Purpose**: Create biometric passkey
- **Layout**: DialogHeader → fingerprint icon → headline → body text explaining passkeys → Set Up button → Skip link

#### PasskeyVerify (`passkey-verify`)
- **Purpose**: Authenticate with existing passkey
- **Layout**: DialogHeader → fingerprint icon → headline → Verify button → Use Password link

### 4.3 Preference Screens

#### CookiePrefs (`cookie-prefs`)
- **Purpose**: Granular cookie and data sharing management
- **Layout**: DialogHeader → TabBar (Cookies / Shared Data) → toggle rows per tab → Save button
- **Cookies tab**: Essential (locked ON), Analytics, Marketing toggles
- **Shared Data tab**: Email, DOB, Age toggles with sublabels (on/off text from `SHARED_COPY`)
- **Variants**: theme, jurisdiction, toggles on/off state, active tab

#### CookieEmail (`cookie-email`)
- **Purpose**: Enter email to save cookie preferences
- **Layout**: DialogHeader → headline → email Input → Save button

#### DnsConfirm (`dns-confirm`)
- **Purpose**: Do Not Sell opt-out confirmation
- **Layout**: DialogHeader → headline → confirmation text → Confirm button → Cancel link

#### SharingSettings (`sharing-settings`)
- **Purpose**: Manage what credentials are shared with the current site
- **Layout**: DialogHeader → headline → ToggleRow per credential type → date/expiry info → Save button

#### DsrIntake (`dsr-intake`)
- **Purpose**: Data subject request form (GDPR Art. 15-22 / CCPA)
- **Layout**: DialogHeader → headline → request type radio buttons (Access / Delete) → body text → Submit button
- **Variants**: jurisdiction (different legal text for EU vs CA vs generic US)

### 4.4 Credential Screens

#### DobEntry (`dob-entry`)
- **Purpose**: Enter date of birth for age verification
- **Layout**: DialogHeader → headline → month/day/year inputs → Verify button

#### DobShare (`dob-share`)
- **Purpose**: Share DOB from TrustID wallet (returning user)
- **Layout**: DialogHeader → headline → credential card (DOB value) → Share button → Don't Share link

#### DataShare (`data-share`)
- **Purpose**: Voluntary data sharing consent
- **Layout**: DialogHeader → headline → data categories with toggles → Share button → Skip link

#### CredentialRequest (`credential-request`)
- **Purpose**: Site requests access to a credential
- **Layout**: DialogHeader → site name + icon → "is requesting" text → credential type → Allow/Deny buttons

#### CredentialWarning (`credential-warning`)
- **Purpose**: Credential is expiring or needs renewal
- **Layout**: DialogHeader → warning icon → headline → expiry info → Renew button → Dismiss link

### 4.5 Onboarding Screens

#### AccountSetup (`account-setup`)
- **Purpose**: Create TrustID account
- **Layout**: DialogHeader → headline → body text → Get Started button

#### VerifyNeeded (`verify-needed`)
- **Purpose**: Prompt to verify account before sharing credentials
- **Layout**: DialogHeader → warning icon → headline → body → Verify Now button → Later link

### 4.6 Status Screens

#### Success (`success`)
- **Purpose**: Animated success confirmation (static checkmark for Figma)
- **Layout**: DialogHeader → large checkmark icon → "All Set" headline → subtext → auto-dismiss (static in Figma)

#### ErrorNetwork (`error-network`)
- **Purpose**: Network error with retry option
- **Layout**: DialogHeader → error icon → headline → body → Retry button → Dismiss link

#### DeleteWarning (`delete-warning`)
- **Purpose**: Account deletion warning
- **Layout**: DialogHeader → danger icon → headline → warning text → Delete button (danger) → Cancel link

#### RevokeDob / RevokeAge / RevokeEmail (`revoke-*-warning`)
- **Purpose**: Confirm revocation of shared credential
- **Layout**: DialogHeader → warning icon → headline → consequence text → Revoke button (danger) → Cancel link
- **3 variants**: DOB, Age, Email — each with specific copy from `variants.ts`

### 4.7 Overlay Screens

#### AgeGateCover (`age-gate-cover`)
- **Purpose**: Full-page age restriction overlay blocking site access
- **Layout**: Full viewport → gradient background → centered card → warning icon → headline → body → Verify Age button
- **States**: DEFAULT (blocking), VERIFIED (fading out), FAILED (error message)

#### QrVerify (`qr-verify`)
- **Purpose**: QR code verification overlay
- **Layout**: Full viewport → gradient background → centered card → QR code → scanning animation (static for Figma) → instructions

#### SlcKyc (`slc-kyc`)
- **Purpose**: SLC Digital KYC verification
- **Layout**: Full viewport → SLC Digital branding → verification steps → progress

#### SlcVerify (`slc-verify`)
- **Purpose**: SLC eSIM verification prompt (banner screen, not overlay)
- **Layout**: DialogHeader → SLC icon → headline → body → Verify button

### 4.8 Toast Screens

#### ToastWelcome (`toast-welcome`)
- **Purpose**: Welcome back notification for returning users
- **Layout**: Small container → TrustID icon → "Welcome back" text → dismiss button

#### ToastSaved (`toast-saved`)
- **Purpose**: Preferences saved confirmation
- **Layout**: Small container → checkmark icon → "Preferences saved" text → auto-dismiss

#### ToastManage (`toast-manage`)
- **Purpose**: Persistent floating preferences icon/tooltip
- **Layout**: Small circular icon → hover tooltip → "Manage Preferences" text

---

## 5. Variant System

### 5.1 Five Independent Axes

| Axis | Values | Controls |
|------|--------|----------|
| **Theme** | `light`, `dark` | CSS token overrides via `data-theme` attribute on root |
| **Jurisdiction** | `eu`, `us-strict`, `us-standard` | Which consent screen, legal text, toggle defaults |
| **Scenario** | `first`, `firstVisit`, `returning`, `returningVerified` | Which screens appear in flows |
| **Honor Age Gate** | `true`, `false` | Whether DOB screens appear |
| **SLC Mode** | `off`, `noKyc`, `withKyc` | OTP vs eSIM verification |

### 5.2 First-Screen Routing Matrix

| Jurisdiction | Age Gate | First Screen |
|-------------|----------|--------------|
| EU | OFF | ConsentEU |
| US Strict | OFF | ConsentUS |
| US Standard | OFF | ConsentUSStd |
| Any | ON | DobEntry (first-time) or DobShare (returning) |
| Any | Returning verified | No banner (ToastManage only) |

### 5.3 Variant Text Keys (62 total)

All screen text that changes across variants is stored in `src/constants/variants.ts` with a `data-variant-key` system. Screen components read from this map, never hardcode text.

See `docs/reference/SCREEN-VARIANT-GUIDE.md` for the complete key list.

### 5.4 Shared Data Copy

Toggle sublabels for the Shared Data tab change based on on/off state:

| Field | ON Copy | OFF Copy |
|-------|---------|----------|
| Email | "Shared with StreamVault for account access." | "Your email is not shared with this site." |
| DOB | "Shared with StreamVault for age verification." | "Your date of birth is not shared with this site." |
| Age | "Shared with StreamVault for age verification." | "Not shared with this site." |

Stored in `SHARED_COPY` constant.

---

## 6. Flow Definitions

### 6.1 First-Time User (EU)

```
ConsentEU → EmailCapture → OtpEntry → PasskeySetup → CookiePrefs → Success
```

### 6.2 First-Time User (US Strict)

```
ConsentUS → EmailCapture → OtpEntry → PasskeySetup → CookiePrefs → Success
```

### 6.3 First Visit (Existing TrustID User)

```
ConsentEU/US → CredentialRequest → CookiePrefs → Success
```

### 6.4 Returning User (No Credential)

```
[No banner — ToastManage floating icon] → (click) → CookiePrefs
```

### 6.5 Returning User (Verified)

```
[No banner — ToastWelcome] → (auto-dismiss) → ToastManage
```

### 6.6 Age Gate Flow

```
AgeGateCover → DobEntry → (verify) → ConsentEU/US → [continue normal flow]
```

### 6.7 SLC Mode Flow

```
ConsentEU/US → SlcVerify → [SlcKyc if withKyc] → PasskeySetup → CookiePrefs → Success
```

Complete flow graph with all 170 edges is in `src/constants/flows.ts` and documented in `stories/flows/` MDX files.

---

## 7. Figma Plugin Requirements

### 7.1 Token Sync

**Input**: `src/tokens/figma-variables.json` (auto-generated from `tokens.css`)

**Output**: Figma Variable Collections:

| Collection | Variables | Modes |
|-----------|-----------|-------|
| Colors / Text | `--tid-ink`, `--tid-text-body`, etc. | Light, Dark |
| Colors / Brand | `--tid-brand`, `--tid-success`, etc. | Light, Dark |
| Colors / Surface | `--tid-surface`, `--tid-page-bg`, etc. | Light, Dark |
| Spacing | `--tid-sp-1` through `--tid-sp-24` | Single |
| Typography / Sizes | `--tid-fs-*` | Single |
| Typography / Families | `--tid-ff-*` | Single |
| Border Radius | `--tid-radius-*` | Single |
| Sizing | `--tid-size-*` | Single |
| Shadows | `--tid-shadow-*` | Light, Dark |

### 7.2 Screen Import

**Input**: React screen components rendered to static HTML via `renderToStaticMarkup`

**Output**: Figma frames organized by category:

```
Figma File
├── Tokens (reference frames)
├── Atoms (component variants)
├── Consent
│   ├── ConsentEU--light
│   ├── ConsentEU--dark
│   ├── ConsentEU--light--gpc
│   ├── ConsentUS--light
│   └── ...
├── Authentication
│   ├── EmailCapture--light
│   └── ...
├── Preferences
├── Credentials
├── Onboarding
├── Status
├── Overlays
└── Toasts
```

### 7.3 Sync Rules

- Token sync is idempotent — same name = update, not duplicate
- Screen import uses consistent naming: `{ComponentName}--{theme}[--{variant}]`
- Plugin reads a manifest file to know what's changed since last sync
- Manifest is committed to git alongside the plugin code

---

## 8. Timing Constants

All timing values used by components (CSS transitions only — no JS timers in Figma exports):

| Constant | Value | Usage |
|----------|-------|-------|
| `FADE_DURATION` | 600ms | Age gate fade-out |
| `FOCUS_RESTORE_DELAY` | 250ms | Focus restore after overlay close |
| `ICON_APPEAR_DELAY` | 400ms | Floating icon after banner dismiss |
| `SUCCESS_DISPLAY_MS` | 1500ms | Success screen auto-dismiss |
| `CREDENTIAL_SHARE_DELAY` | 800ms | Delay after credential share |
| `DOB_VERIFIED_DELAY` | 800ms | Delay after DOB verification |
| `OTP_RESEND_SECONDS` | 30s | OTP resend countdown |
| `AUTO_FOCUS_DELAY` | 120ms | Auto-focus after screen transition |

These are defined in `src/constants/timing.ts` and referenced in CSS Modules as `var(--tid-duration-*)` where applicable.
