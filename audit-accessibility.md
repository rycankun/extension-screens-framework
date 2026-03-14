# Accessibility Audit Report -- TrustID Extension Screen Library

## Summary

**Total Issues Found**: 23
- **Critical**: 7 -- Blocks access entirely for some users
- **Serious**: 8 -- Major barriers requiring workarounds
- **Moderate**: 6 -- Causes difficulty but has workarounds
- **Minor**: 2 -- Annoyances that reduce usability

**WCAG Conformance**: DOES NOT CONFORM (7 critical failures)

---

## CRITICAL ISSUES (7)

### C1: No Focus Trap on Dialog Containers (BannerShell, OverlayShell)

**WCAG 2.4.3 Focus Order (Level A)** | **Critical**

Keyboard and screen reader users can Tab out of the dialog into the page behind it. Both `BannerShell` and `OverlayShell` declare `role="dialog"` and `aria-modal="true"`, but there is zero focus trapping logic anywhere in the codebase -- no `useFocusTrap` hook, no `focus-trap-react` dependency, no manual keydown listener.

- **Files**: `src/components/organisms/BannerShell/BannerShell.tsx`, `src/components/organisms/OverlayShell/OverlayShell.tsx`
- **Fix**: Install `focus-trap-react` or create a `useFocusTrap` hook. On mount, focus the first focusable element; on unmount, return focus to the trigger.

---

### C2: FormGroup Label Not Associated with Input Element

**WCAG 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)** | **Critical**

FormGroup generates an `id` via `useId()` and sets `<label htmlFor={id}>`, but the Input atom's `InputProps` interface has no `id` prop. The `<input>` element never receives an `id`, so `htmlFor` points to nothing. Screen readers will not announce the label when the input is focused, and click-to-focus on the label is broken.

- **Files**: `src/components/molecules/FormGroup/FormGroup.tsx` (line 55), `src/components/atoms/Input/Input.tsx` (lines 16-35)
- **Fix**: Add `id?: string` to `InputProps`, render `id={id}` on `<input>`, pass `id={id}` from FormGroup.

---

### C3: Anchor Elements Used as Buttons Without href

**WCAG 4.1.2 Name, Role, Value (Level A)** | **Critical**

Three passkey fallback elements use `<a role="button" tabIndex={0}>` without `href`. Screen readers announce "link" but the elements trigger callbacks. DIRECTIVES.md Section 7.1 explicitly prohibits non-semantic interactive elements.

- **Files**: `src/components/screens/authentication/EmailCapture.tsx` line 162, `src/components/screens/authentication/OtpEntry.tsx` line 195, `src/components/screens/preferences/CookieEmail.tsx` line 207
- **Fix**: Replace each with `<button type="button">` and apply link-like CSS styling.

---

### C4: OtpInput Cells Missing :focus-visible Style

**WCAG 2.4.7 Focus Visible (Level AA)** | **Critical**

OtpInput cells set `outline: none` (line 34) and provide only `.cell:focus` styling, with no `.cell:focus-visible` rule. This is the only interactive component in the library missing a `:focus-visible` rule.

- **File**: `src/components/molecules/OtpInput/OtpInput.module.css` lines 34, 42-45
- **Fix**: Add `.cell:focus-visible { outline: var(--tid-outline-width) solid var(--tid-border-focus); outline-offset: var(--tid-outline-offset); }`

---

### C5: CookiePrefs Tab Bar Missing Keyboard Navigation

**WCAG 2.1.1 Keyboard (Level A)** | **Critical**

CookiePrefs implements its own inline tab bar instead of using the TabBar molecule. The inline version lacks: (1) `tabIndex` management (active=0, inactive=-1), (2) ArrowLeft/ArrowRight keyboard handler, (3) `aria-controls` linking tabs to panels, (4) `id` attributes on tab panels.

- **File**: `src/components/screens/preferences/CookiePrefs.tsx` lines 200-221
- **Fix**: Add all four missing pieces, or refactor to use the existing TabBar molecule which implements them correctly.

---

### C6: Button Disabled State Uses pointer-events:none

**WCAG 4.1.2 Name, Role, Value (Level A)** | **Critical**

`pointer-events: none` on `.button:disabled` suppresses AT interaction. The HTML `disabled` attribute already prevents activation -- the double suppression hides disabled buttons from discovery.

- **File**: `src/components/atoms/Button/Button.module.css` lines 140-144
- **Fix**: Remove `pointer-events: none`.

---

### C7: Toggle Locked State Conflicts Between aria-disabled and HTML disabled

**WCAG 4.1.2 Name, Role, Value (Level A)** | **Critical**

When `locked=true, disabled=false`, the Toggle renders `aria-disabled="true"` but does not set the HTML `disabled` attribute. The button is focusable and tabbable, yet announced as disabled. The click/key handlers do correctly prevent state changes, but the focus behavior may confuse users.

- **File**: `src/components/atoms/Toggle/Toggle.tsx` lines 46, 76-89
- **Fix**: Set `tabIndex={-1}` on locked toggles, or document the intentional discoverability behavior.

---

## SERIOUS ISSUES (8)

| ID | Issue | WCAG | Location |
|---|---|---|---|
| S1 | `outline:none` on base styles of Button, Input, Toggle, OtpInput without `:focus:not(:focus-visible)` fallback | 2.4.7 | 4 atom/molecule CSS files |
| S2 | BackArrow `:focus-visible` missing `box-shadow: var(--tid-shadow-focus-brand)` (every other element has it) | 2.4.7 | `BackArrow.module.css` line 45 |
| S3 | LegalNotice passes `ariaLabel=""` to Icon, causing it to render `role="img"` + `aria-label=""` instead of decorative | 4.1.2 | `LegalNotice.tsx` line 34 |
| S4 | Close button markup duplicated across 6+ screen files instead of using DialogHeader molecule | 2.4.7 | OtpEntry, OtpError, EmailConfirm, CookieEmail, DnsConfirm, DsrIntake |
| S5 | ConsentUS privacy choice links use muted color that may reduce focus ring visibility | 2.4.7 | `ConsentUS.module.css` lines 239-247 |
| S6 | ToastContainer may not announce content if conditionally mounted (live region must pre-exist in DOM) | 4.1.3 | `ToastContainer.tsx` |
| S7 | Hardcoded `line-height: 1.2` in 4 CSS rules (violates token directive and WCAG 1.4.12 text spacing) | 1.4.12 | `CookiePrefs.module.css` lines 244/260/280, `ConsentUS.module.css` line 232 |
| S8 | Input uses both `.input:focus` and `.input:focus-visible` with `outline:none` base, creating specificity race | 2.4.7 | `Input.module.css` lines 35/51/75 |

---

## MODERATE ISSUES (6)

| ID | Issue | WCAG | Location |
|---|---|---|---|
| M1 | No `<h2>` headings in screen content -- all headlines use `<span>` (only DnsConfirm has `<h2>`) | 2.4.6 | All screen components |
| M2 | Spinner does not respect `prefers-reduced-motion` | 2.3.3 (AAA, best practice) | `Spinner.module.css` |
| M3 | ConsentToggle/ToggleRow label text not clickable to activate toggle | 1.3.1 | `ConsentToggle.tsx`, `ToggleRow.tsx` |
| M4 | Badge text contrast fails for small text: success ~2.8:1, warning ~2.1:1, error ~3.4:1, info ~3.8:1 | 1.4.3 | `Badge.module.css` lines 39-70 |
| M5 | DsrIntake hardcodes "as required by law." inline instead of from constants | SSoT | `DsrIntake.tsx` line 223 |
| M6 | Icon component fragile with empty string `ariaLabel` (demonstrated by S3) | 4.1.2 | `Icon.tsx` lines 195-196 |

---

## TOKEN CONTRAST AUDIT

### Light Theme -- Key Failures

| Token | Hex | vs #FFFFFF | Ratio | Result |
|---|---|---|---|---|
| `--tid-brand` | #0E6FFF | #FFFFFF | 3.9:1 | **FAIL** (used on trust lines at 14px/500) |
| `--tid-text-footer` | #6E7880 | #FFFFFF | 4.5:1 | BORDERLINE |
| `--tid-success` | #00C897 | #FFFFFF | 2.9:1 | **FAIL** (Badge text) |
| `--tid-error` | #FF4D4D | #FFFFFF | 3.6:1 | **FAIL** (Badge text) |
| `--tid-warning` | #F59E0B | #FFFFFF | 2.1:1 | **FAIL** (Badge text) |

### Dark Theme -- Key Failures

| Token | Hex | vs #181B24 | Ratio | Result |
|---|---|---|---|---|
| `--tid-text-secondary` | #8892A0 | #181B24 | 4.2:1 | **FAIL** (widely used) |
| `--tid-text-muted` | #828D9C | #181B24 | 3.8:1 | **FAIL** (comment says "WCAG AA" but only validated for light theme) |
| `--tid-text-footer` | #7A8490 | #181B24 | 3.4:1 | **FAIL** |

---

## WHAT IS WORKING WELL

1. Consistent `--tid-shadow-focus-brand` + `outline` two-layer focus indicator on most elements
2. Semantic HTML throughout all atoms -- no `<div onClick>` patterns
3. Correct `role="dialog"`, `aria-modal="true"`, `aria-label` on organisms
4. Centralized `SCREEN_TITLES` constant used by every screen
5. Input error pattern with `aria-invalid`, `aria-describedby`, `role="alert"`
6. TabBar molecule correctly implements full WAI-ARIA tablist pattern
7. Toggle keyboard handlers with `e.preventDefault()` for Space
8. Consistent 44px touch targets via `--tid-size-touch`
9. Decorative SVG icons consistently use `aria-hidden="true"`
10. DsrIntake form uses `<fieldset>` + `<legend>` correctly

---

## REMEDIATION PRIORITY

### Immediate (before release)
C1 focus trap, C2 FormGroup/Input id, C3 anchor-as-button, C4 OtpInput focus-visible, C5 CookiePrefs tabs, C6 pointer-events:none, C7 locked toggle state

### Short-term (next sprint)
S1-S8, dark theme contrast tokens, `--tid-brand` text contrast token

### Ongoing
M1-M6

---

## NEXT STEPS

1. Install `focus-trap-react` for BannerShell and OverlayShell (highest impact single fix)
2. Create `@testing-library/react` + `jest-axe` test suite
3. Add `eslint-plugin-jsx-a11y` to ESLint config
4. Fix dark theme contrast tokens in `tokens.css`
5. Consolidate close button pattern into DialogHeader variant
6. Re-audit after fixes with VoiceOver and NVDA screen reader testing
