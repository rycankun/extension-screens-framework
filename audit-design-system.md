# Design System Audit -- TrustID Extension Screen Library

**Date**: 2026-03-14
**Auditor**: UI Designer Agent
**Scope**: Token completeness, usage consistency, design language adherence, component visual patterns, foundation stories, missing elements

---

## Executive Summary

The design system is well-structured with comprehensive token coverage and strong adherence to the documented design language. The token file (`tokens.css`) covers all categories specified in the CLAUDE.md documentation with both light and dark theme overrides. However, the audit uncovered **4 critical issues** (undefined token references that will break at runtime), **8 moderate issues** (hardcoded values violating the zero-hardcoded-values directive), and **6 minor inconsistencies** across the component CSS modules. Additionally, 20 of 35 documented screens have not yet been implemented.

---

## 1. Token Completeness Report

### 1.1 Color Tokens -- PASS

All color tokens documented in CLAUDE.md are present in `tokens.css` with matching hex values for both light and dark themes. Every documented primary, status, text, and surface color token exists and matches its specified value exactly.

### 1.2 Dark Theme Overrides -- PASS (with one gap)

All documented dark hex values match implementation. **One gap**: `--tid-success-tint` (defined in `:root` as `rgba(56, 200, 120, 0.12)`) has **no dark theme override**. Used by DnsConfirm and DsrIntake screens.

### 1.3 Spacing Scale -- PASS

21 values from `--tid-sp-0` (0px) through `--tid-sp-24` (48px), consistently following the 4px base unit system.

### 1.4 Typography Tokens -- PASS

Complete: 3 font families, 2 weights (400, 500 -- no 600/700 defined, correct per brand), 16-step font size scale, 4 letter-spacing tiers, 10 line-height values.

### 1.5 Shadow Tokens -- PASS

17 total: 10 elevation, 5 focus rings, 2 inset. All have dark theme overrides.

### 1.6 Frosted Glass Tokens -- PASS

Complete: 5 blur tiers, saturation, surface-rgb, and 3 opacity levels.

---

## 2. Critical Issues -- Undefined Token References

### CRIT-01: `--tid-lh-ratio-normal` (undefined)
- **File**: `src/components/molecules/StepIndicator/StepIndicator.module.css:51`
- **Impact**: StepIndicator label falls back to browser default line-height. The intended value `1.4` is a unitless ratio, unlike all other `--tid-lh-*` tokens (which use px).

### CRIT-02: `--tid-border-default` (undefined)
- **File**: `src/components/screens/preferences/DsrIntake.module.css:162, 205`
- **Impact**: Radio label cards and controls have no visible border. Should be `--tid-border` or `--tid-border-input`.

### CRIT-03: `--tid-radius-full` (undefined)
- **File**: `src/components/screens/preferences/DsrIntake.module.css:204, 228`
- **Impact**: Radio controls do not render as circles. Should be `--tid-radius-circle` (defined as `50%`).

### CRIT-04: `--tid-tab-line-height` (undefined, has fallback)
- **File**: `src/components/screens/preferences/CookiePrefs.module.css:82`
- **Impact**: Low severity due to `36px` CSS fallback, but the fallback itself is a hardcoded value violating directives.

---

## 3. Moderate Issues -- Hardcoded Values

DIRECTIVES.md section 1.1: "Zero hardcoded values."

**MOD-01**: `min-height: 600px` in OverlayShell.module.css:20 -- needs a sizing token.

**MOD-02**: `1px` border-width in CookiePrefs.module.css (2 instances), SharingSettings.module.css (1), DsrIntake.module.css (1), CookieEmail.module.css (1) -- should use `var(--tid-border-width)`.

**MOD-03**: `padding: 1px` in CookiePrefs.module.css:252 -- should use `var(--tid-sp-px)`.

**MOD-07**: `margin-top: 1px` in CookieEmail.module.css:311 -- should use `var(--tid-sp-px)`.

**MOD-08**: `border-radius: 50%` in DnsConfirm.module.css:114 -- should use `var(--tid-radius-circle)`.

**MOD-09**: 9 instances of hardcoded unitless line-height values (`1.2`, `1.4`, `1.5`) across ConsentUS, CookiePrefs, DsrIntake, and DnsConfirm. Need ratio-based tokens in tokens.css.

**MOD-10**: 5 component files use hardcoded `width: 1px; height: 1px` in sr-only patterns while 3 other files correctly use `var(--tid-sp-px)`.

---

## 4. Design Language Violations

**DL-01**: `!important` in SharingSettings.module.css:111-112 on `.revokeBtn`. Creates CSS specificity fragility.

**DL-02**: BackArrow.module.css `:focus-visible` is missing `box-shadow: var(--tid-shadow-focus-brand)`. Every other interactive component uses both shadow + outline.

**DL-03**: Toggle ON state uses `--tid-success` (green) but CLAUDE.md says "ON uses --tid-brand." Likely a docs inaccuracy -- verify against predecessor.

**DL-04**: OverlayShell is missing frosted glass (`backdrop-filter`). CLAUDE.md says it's critical for both BannerShell and OverlayShell, and DIRECTIVES.md section 1.5 confirms html2figma supports it.

---

## 5. Token Usage Consistency Issues

**CON-01**: GPC indicator styling differs across consent screens. ConsentUSStd uses `--tid-success-rgb` (green), `--tid-radius-sm` (4px), no border. ConsentEU and ConsentUS use `--tid-brand-rgb` (blue), `--tid-radius-md` (6px), with border.

**CON-02**: DNT indicator uses `rgba(--tid-ink-rgb, 0.04)` in ConsentUS but `rgba(--tid-brand-rgb, 0.06)` in ConsentUSStd.

**CON-03**: Trust signal icon color: EmailCapture uses `--tid-text-micro` while CookieEmail and DsrIntake use `--tid-brand`.

**CON-04**: Trust signal text color: EmailCapture uses `--tid-text-micro` while CookieEmail and DsrIntake use `--tid-text-muted`.

**CON-05**: SR-only pattern has two implementations (tokenized vs hardcoded) -- see MOD-10.

---

## 6. Foundation Stories -- PASS

All four stories exist (Colors, Typography, Spacing, Shadows). All use `getComputedStyle` runtime resolution with `MutationObserver` for theme changes. No hardcoded values. Minor gap: Typography story is missing `--tid-lh-reading` from its line-heights list.

---

## 7. Missing Elements

### 20 of 35 screens not implemented:
- **Credentials**: CredentialRequest, CredentialWarning, DataShare, DobShare, DobEntry (0/5)
- **Onboarding**: AccountSetup, VerifyNeeded (0/2)
- **Status**: Success, ErrorNetwork, DeleteWarning, RevokeAge, RevokeDob, RevokeEmail (0/6)
- **Overlays**: AgeGateCover, QrVerify, SlcKyc, SlcVerify, SvAdult (0/5)
- **Toasts**: ToastWelcome, ToastSaved, ToastManage (0/3)

### 5 undefined tokens referenced in code:
`--tid-lh-ratio-normal`, `--tid-border-default`, `--tid-radius-full`, `--tid-tab-line-height`, `--tid-lh-ratio-relaxed`

### 1 missing dark theme override:
`--tid-success-tint`

---

## 8. Positive Findings

1. All 400+ tokens use the `--tid-*` namespace consistently.
2. No font-weight 600 or 700 anywhere -- brand maximum of 500 is respected.
3. Banner width (380px), border radius (4px top / 0 bottom), touch targets (44px), icon sizing (16px) all correct.
4. BannerShell frosted glass correctly implemented.
5. All four button variants use correct dedicated tokens.
6. Form inputs share consistent 40px height, 4px radius, matching border tokens.
7. Both Inter and Work Sans loaded at weights 400 and 500 via @font-face.
