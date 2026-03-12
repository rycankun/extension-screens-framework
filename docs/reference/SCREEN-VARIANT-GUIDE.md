# Trust ID Extension — Screen Variant Guide

> **Purpose:** Definitive reference for recreating every visual variant of every screen.
> Read this before generating standalone HTML for Figma import.

---

## Table of Contents

1. [Control Axes](#1-control-axes)
2. [Global Transformations](#2-global-transformations)
3. [Screen Inventory](#3-screen-inventory)
4. [Screen-by-Screen Variant Specs](#4-screen-by-screen-variant-specs)
5. [Routing & First-Screen Matrix](#5-routing--first-screen-matrix)
6. [CSS Token Reference](#6-css-token-reference)

---

## 1. Control Axes

Five independent axes produce the full variant matrix:

| Axis | Values | Controls |
|---|---|---|
| **Scenario** | `first`, `firstVisit`, `returning`, `returningVerified` | Which screens appear, state flags |
| **Jurisdiction** | `eu`, `us` (+ optional US state code) | Consent screen, legal text, toggles |
| **Honor Age Gate** | `true`, `false` | DOB entry/share screens vs email flow |
| **SLC Mode** | `off`, `noKyc`, `withKyc` | OTP vs eSIM verification path |
| **Theme** | `light`, `dark` | `data-theme` on `<html>`, CSS tokens swap |

### Scenario Modes — State Flags

| Flag | first | firstVisit | returning | returningVerified |
|---|---|---|---|---|
| `otpCompleted` | false | true | true | true |
| `passkeyCreated` | false | true | true | true |
| `accountShared` | false | false | true | true |
| `consentGiven` | false | false | true | true |
| `loggedIn` | false | false | true | true |
| `ageCredentialShared` | false | false | false | true |
| `dobVerified` | false | false | false | true |
| `dataShareTabUnlocked` | false | false | true | true |
| `slcKycCompleted` | false | true | true | true |

### Jurisdiction → Consent Screen Mapping

| Jurisdiction | State Code | Consent Screen |
|---|---|---|
| `eu` | — | `consent-t1` (CONSENT_EU) |
| `us` | CA, CO, CT, GA, MD, NH, OR, TN | `consent-t2` (CONSENT_US — strict) |
| `us` | all other states / no state | `consent-t3` (CONSENT_US_STD — standard) |

### Strict US States

CA, CO, CT, GA, MD, NH, OR, TN (+ UT when UCPA strict mode enabled).

---

## 2. Global Transformations

These apply to ALL banner screens when rendered:

### 2.1 SVG Badge-Check Symbol

Every screen using `<use href="#badge-check"/>` needs this SVG symbol defined:

```html
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="badge-check" viewBox="0 0 14 14" fill="none">
    <path d="M7 0.5L8.09 2.35L10.18 2.09L10.44 4.18L12.29 5.27L11.35 7L12.29 8.73L10.44 9.82L10.18 11.91L8.09 11.65L7 13.5L5.91 11.65L3.82 11.91L3.56 9.82L1.71 8.73L2.65 7L1.71 5.27L3.56 4.18L3.82 2.09L5.91 2.35L7 0.5Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.9" stroke-linejoin="round"/>
    <path d="M5 7L6.5 8.5L9.5 5.5"
      stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
</svg>
```

**CRITICAL:** viewBox is `0 0 14 14`, NOT `0 0 24 24`. This is a star-badge shape, not a circle-checkmark.

### 2.2 StreamVault Logo Inlining

The `<img class="logo-img" src="StreamVault-BrandLockup-Primary.svg">` in templates gets REPLACED with the actual inline SVG at runtime. This is essential for dark mode — the `currentColor` CSS property on `.logo-text` paths allows theme-aware text coloring.

**Transform:** Replace every `<img class="logo-img" src="...StreamVault-BrandLockup-Primary...">` with the parsed SVG content from that file, adding class `logo-svg-inline` and removing `xmlns`.

### 2.3 Variant Text Application

All elements with `data-variant-key="keyName"` get their `textContent` replaced with the value from the COPY_TEXT map. Applied AFTER HTML load, BEFORE display.

### 2.4 Asset Path Rewriting

Templates reference assets relative to `figma-import/`. When standalone files are in `figma-screens/`, paths need `../` prefix:

- `src="StreamVault..."` → `src="../StreamVault..."`
- `src="TrustID..."` → `src="../TrustID..."`
- `src="thumbs/..."` → `src="../thumbs/..."`
- `src="TrustIDBusiness..."` → `src="../TrustIDBusiness..."`

### 2.5 Banner Shell Structure

Every banner screen renders inside this structure:

```html
<div class="banner-container">
  <div class="banner" role="dialog" aria-modal="true" aria-label="Trust ID">
    <div class="banner-bg"><div class="banner-blob3"></div></div>
    <div class="banner-content frost-light">
      <div class="screen">
        [EXTRACTED SCREEN CONTENT]
      </div>
      <div class="footer">...</div>
    </div>
  </div>
</div>
```

**IMPORTANT:** The extracted content between `<!-- BEGIN/END SCREEN CONTENT -->` markers already includes the closing `</div>` for `.screen` AND the `<div class="footer">`. Do NOT add a second wrapper.

---

## 3. Screen Inventory

### Banner Screens (29)

| Screen ID | Template File | Category |
|---|---|---|
| `consent-t1` | consent-t1.html | Consent — EU/GDPR |
| `consent-t2` | consent-t2.html | Consent — US Strict |
| `consent-t3` | consent-t3.html | Consent — US Standard |
| `cookie-prefs` | cookie-prefs.html | Cookie Preferences |
| `cookie-email` | cookie-email.html | Cookie Email Capture |
| `dns-confirm` | dns-confirm.html | Do Not Sell Confirm |
| `dob-entry` | dob-entry.html | DOB Entry (Honor Age Gate) |
| `dob-share` | dob-share.html | DOB Share Confirmation |
| `email-capture` | email-capture.html | Email Capture |
| `otp-entry` | otp-entry.html | OTP Code Entry |
| `otp-error` | otp-error.html | OTP Error (max attempts) |
| `passkey-verify` | passkey-verify.html | Passkey Verification |
| `email-confirm` | email-confirm.html | Email Confirmation |
| `success` | success.html | Success Screen |
| `passkey-setup` | passkey-setup.html | Passkey Setup |
| `data-share` | data-share.html | Data Sharing Request |
| `account-setup` | account-setup.html | Account Setup |
| `delete-warning` | delete-warning.html | Account Deletion Warning |
| `revoke-dob-warning` | revoke-dob-warning.html | Revoke DOB Sharing |
| `revoke-age-warning` | revoke-age-warning.html | Revoke Age Sharing |
| `revoke-email-warning` | revoke-email-warning.html | Revoke Email Sharing |
| `verify-needed` | verify-needed.html | Verification Needed |
| `credential-request` | credential-request.html | Credential Share Request |
| `credential-warning` | credential-warning.html | Credential Expiry Warning |
| `sharing-settings` | sharing-settings.html | Sharing Settings |
| `dsr-intake` | dsr-intake.html | Data Subject Request |
| `error-network` | error-network.html | Network Error |
| `slc-verify` | slc-verify.html | SLC eSIM Verification |

### Toast Screens (3)

| Screen ID | Template File |
|---|---|
| `toast-manage` | toast-manage.html |
| `toast-saved` | toast-saved.html |
| `toast-welcome` | toast-welcome-back.html |

### Background Screens (5)

| Screen ID | Template File |
|---|---|
| `landing` | landing.html |
| `sv-adult` | sv-adult.html |
| `age-gate-cover` | age-gate-cover.html |
| `qr-verify` | qr-verify.html |
| `slc-kyc` | slc-kyc.html |

---

## 4. Screen-by-Screen Variant Specs

### 4.1 Consent EU — `consent-t1.html`

**Variant Keys:**
- `consentHeadline` → "This site uses cookies and similar technologies."
- `consentTrustLine` → "Your preferences. Your control."
- `consentAcceptBtn` → "Accept All"
- `consentRejectBtn` → "Reject All"
- `consentManageBtn` → "Manage Preferences"

**Conditional Elements:**
- `.gpc-indicator` — HIDDEN by default. Shown when GPC signal detected.
- `[data-why-trustid]` — Not present in this template (only shows for first-time via whyTrustId block if it existed).
- `.consent-receipt` — HIDDEN by default. Populated AFTER consent action with timestamp, method, and banner version.
- `.universal-optout-disclosure` — Always visible (EU honors GPC per CCPA).

**Note:** Template has `&amp;` in headline source HTML but variant text replaces it with "and".

**Static Variants to Generate:**

| File | Theme | Special State |
|---|---|---|
| `consent-eu--light` | light | Default |
| `consent-eu--dark` | dark | Default |
| `consent-eu--gpc-light` | light | GPC indicator visible |
| `consent-eu--gpc-dark` | dark | GPC indicator visible |

---

### 4.2 Consent US Strict — `consent-t2.html`

**Differences from EU:**
- Uses `usAcceptBtn` key → "Accept & Continue" (not "Accept All")
- Uses `usRejectBtn` key → "Reject All"
- Has a `Data Controller` notice injected by JS: "Data Controller: StreamVault Inc · Processor: Trust ID Ltd."
- Has DNT indicator (`.dnt-indicator`) — HIDDEN by default, shown when DNT detected
- Has GPC indicator
- Different body text: opt-out focused, mentions "sold or shared with partners"
- No Terms link (only Privacy Policy + Cookie Policy)
- Button labeled "Manage Privacy" instead of "Manage Preferences"
- Has `Do Not Sell or Share` link visible for CA; `Do Not Sell` for other strict states
- Has `Sensitive Personal Information` link
- Consent receipt includes jurisdiction + state code

**Variant Keys:**
- `usConsentHeadline` (NOT consentHeadline) — separate key
- `usTrustLine`
- `usAcceptBtn` → "Accept & Continue"
- `usRejectBtn` → "Reject All"

**Jurisdiction-Specific Text (set by JS per state):**
- CA: "Do Not Sell or Share My Personal Information" link
- CT: Minor ad/sale ban notice for under-18
- MD: Sensitive data sale prohibition notice
- TN: 60-minute age recheck notice
- GA: NIST IAL2 biometric requirement notice

**Static Variants to Generate:**

| File | Theme | State |
|---|---|---|
| `consent-us-strict--light` | light | Default (CA) |
| `consent-us-strict--dark` | dark | Default (CA) |
| `consent-us-strict--gpc-light` | light | GPC visible |
| `consent-us-strict--gpc-dark` | dark | GPC visible |
| `consent-us-strict--dnt-light` | light | DNT visible |
| `consent-us-strict--dnt-dark` | dark | DNT visible |

---

### 4.3 Consent US Standard — `consent-t3.html`

**Differences from US Strict:**
- Simplified text — no state-specific notices
- Still has DNS link and Sensitive PI link (static, not state-conditional)
- Uses `usStdAcceptBtn` key → "Accept & Continue"

**Conditional Elements:**
- `.gpc-indicator` — HIDDEN by default. Shown when GPC signal detected.
- `.dnt-indicator` — HIDDEN by default. Shown when DNT signal detected.

**Static Variants to Generate:**

| File | Theme | Special State |
|---|---|---|
| `consent-us-std--light` | light | Default |
| `consent-us-std--dark` | dark | Default |
| `consent-us-std--gpc-light` | light | GPC visible |
| `consent-us-std--gpc-dark` | dark | GPC visible |
| `consent-us-std--dnt-light` | light | DNT visible |
| `consent-us-std--dnt-dark` | dark | DNT visible |

---

### 4.4 Cookie Preferences — `cookie-prefs.html`

**This is the most complex screen.** It has TWO tabs and multiple toggle states.

#### Tab: Cookies (default)

- `#tabCookies` has class `active`, `aria-selected="true"`
- `#tabShared` has class `hidden` (single-tab mode, or visible in multi-tab)
- `#cookiePane` is visible
- `#sharedPane` has class `hidden`
- Trust line shows `cookieTrustLine` → "Your preferences. Your control."

**Cookie Toggles:**
- Essential cookies: always ON, disabled (can't turn off)
- Performance and analytics cookies: toggle (default OFF)
- Personalization cookies: toggle (default OFF)
- Advertising cookies: toggle (default OFF)

**Tab visibility:**
- `dataShareTabUnlocked === false` → single-tab (Shared tab hidden, `.pane-tabs.single-tab`)
- `dataShareTabUnlocked === true` → two tabs visible (remove `.single-tab`)

#### Tab: Shared Data

- `#tabShared` has class `active`, `aria-selected="true"`
- `#tabCookies` loses `active`
- `#sharedPane` visible, `#cookiePane` hidden
- Trust line shows `sharedDataTrustLine` → "Your data. Your decision."
- `#sharedDataIntro` block visible (headline + description)

**Shared Data Toggles:**
- Age verification sharing (toggle)
- Email address sharing (toggle)
- Date of birth sharing (toggle)

**Each toggle has:**
- Sublabel text: ON → "Shared with StreamVault for [purpose]." / OFF → "Not shared with this site."
- Expiry text: "Sharing until MM/DD/YYYY" or "Not shared"
- Edit pencil button (visible when ON)

**Expiry Editor:**
- Hidden by default
- When expanded: shows `.expiry-editor.active` with date range picker
- Contains "Edit sharing dates" UI

**Jurisdiction Effects on Cookie Prefs:**
- EU/GDPR: Shows individual `.cookie-details` per cookie category; hides Privacy Choices / Right to Know rows
- US: Hides individual cookie details; shows `#privacyChoicesRow` and `#rightToKnowRow` links
- CT (under-18): Locks Advertising + Personalization toggles to OFF, adds `.toggle-locked` class

**Static Variants to Generate:**

| File | Theme | Tab | Toggles | Special |
|---|---|---|---|---|
| `cookie-prefs-cookies-tab-eu--off-light` | light | Cookies | All OFF | EU: cookie-details visible, US rows hidden |
| `cookie-prefs-cookies-tab-eu--off-dark` | dark | Cookies | All OFF | EU: cookie-details visible, US rows hidden |
| `cookie-prefs-cookies-tab-eu--on-light` | light | Cookies | All ON | EU: cookie-details visible, US rows hidden |
| `cookie-prefs-cookies-tab-eu--on-dark` | dark | Cookies | All ON | EU: cookie-details visible, US rows hidden |
| `cookie-prefs-cookies-tab-us--off-light` | light | Cookies | All OFF | US: cookie-details hidden, Privacy Choices + Right to Know visible |
| `cookie-prefs-cookies-tab-us--off-dark` | dark | Cookies | All OFF | US: cookie-details hidden, Privacy Choices + Right to Know visible |
| `cookie-prefs-cookies-tab-us--on-light` | light | Cookies | All ON | US: cookie-details hidden, Privacy Choices + Right to Know visible |
| `cookie-prefs-cookies-tab-us--on-dark` | dark | Cookies | All ON | US: cookie-details hidden, Privacy Choices + Right to Know visible |
| `cookie-prefs-cookies-tab-ct-minor--light` | light | Cookies | Ad+Personalization locked | CT under-18: toggle-locked + disabled + "Locked (CT under-18 ban)" label |
| `cookie-prefs-cookies-tab-ct-minor--dark` | dark | Cookies | Ad+Personalization locked | CT under-18: toggle-locked + disabled + "Locked (CT under-18 ban)" label |
| `cookie-prefs-shared-tab--off-light` | light | Shared | All OFF | — |
| `cookie-prefs-shared-tab--off-dark` | dark | Shared | All OFF | — |
| `cookie-prefs-shared-tab--on-light` | light | Shared | All ON + dates | — |
| `cookie-prefs-shared-tab--on-dark` | dark | Shared | All ON + dates | — |
| `cookie-prefs-edit-dates--light` | light | Shared | Age ON + editor open | — |
| `cookie-prefs-edit-dates--dark` | dark | Shared | Age ON + editor open | — |

---

### 4.5 Email Capture — `email-capture.html`

**Variant Keys:**
- `emailHeadline` → "This site requires age verification."
- `emailBody` → "Trust ID confirms your age instantly..."
- `emailTrustLine` → "Verify once. Valid everywhere."
- `emailSendBtn` → "Send Verification Code"
- `emailReauthWarning` → "Without Trust ID, you may need to re-verify..."

**OTP Method Variant:**
- `email` (default): Input is `type="email"`, placeholder "Your email address"
- `emailPhone`: Input becomes `type="text"`, placeholder "Email or phone number", trust signal text changes to "We'll send a verification code to confirm your identity."

**Conditional Elements:**
- `.reauth-warning` — visible in certain flows (credential warning → email capture path)

**Static Variants to Generate:**

| File | Theme | OTP Method |
|---|---|---|
| `email-capture--light` | light | email |
| `email-capture--dark` | dark | email |
| `email-capture--phone-light` | light | emailPhone |
| `email-capture--phone-dark` | dark | emailPhone |

---

### 4.6 Cookie Email — `cookie-email.html`

**Variant Keys:**
- `cookieEmailHeadline` → "Save your preferences to your Trust ID account."
- `cookieEmailBody` → "Your cookie preferences for this site are saved securely..."
- `cookieEmailTrustLine` → "Set once. Yours forever."
- `cookieEmailSendBtn` → "Send Verification Code"

**OTP Method Variant:** Same as email-capture (email vs emailPhone input toggle).

**Static Variants:** light/dark × email/phone = 4 files.

---

### 4.7 OTP Entry — `otp-entry.html`

**Variant Keys:**
- `otpHeadline` → "We've sent a verification code."
- `otpAutoSubmit` → "Code verifies automatically"

**Visual Details:**
- 6 individual OTP digit input fields
- Resend countdown timer (30s) — JS-managed, shows "Resend in Xs" → "Resend code"
- Auto-focus first empty input on display
- Back arrow button in header (returns to previous email screen)

**Static Variants:** light/dark = 2 files.

---

### 4.8 OTP Error — `otp-error.html`

Shown after MAX_OTP_ATTEMPTS (3) failed attempts. Static screen with retry option.

**Static Variants:** light/dark = 2 files.

---

### 4.9 DOB Entry — `dob-entry.html`

Shown when `honorAgeGate === true` AND `!dobVerified`.

Three date input fields: MM / DD / YYYY. Submit button verifies age.

**Static Variants:** light/dark = 2 files.

---

### 4.10 DOB Share — `dob-share.html`

**Variant Keys:**
- `dobShareHeadline` → "StreamVault needs to verify your age."
- `dobShareBody` → "Trust ID will confirm you meet the age requirement..."
- `dobSharePrivacy` → "Only a yes/no age confirmation is shared..."
- `dobShareBtn` → "Confirm My Age"

**Static Variants:** light/dark = 2 files.

---

### 4.11 Passkey Setup — `passkey-setup.html`

**Variant Keys:**
- `passkeyHeadline` → "Skip the code next time."
- `passkeyBody` → "Set up a passkey and your saved verification does the rest."
- `passkeyDetail` → "A passkey lets you verify with your fingerprint..."
- `passkeyBtn` → "Set Up Passkey"

**Conditional:** "Already have a passkey?" link visibility depends on flow state.

**Static Variants:** light/dark = 2 files.

---

### 4.12 Passkey Verify — `passkey-verify.html`

**Variant Keys:**
- `passkeyVerifyHeadline` → "Confirm with your device."
- `passkeyVerifyBody` → "Use Face ID, fingerprint, or your device PIN."

**Static Variants:** light/dark = 2 files.

---

### 4.13 Email Confirm — `email-confirm.html`

Confirmation screen after email/OTP is verified. Shows the verified email address.

**Static Variants:** light/dark = 2 files.

---

### 4.14 Success — `success.html`

Animated success circle with checkmark + countdown progress ring. Auto-advances after 1500ms.

**Visual Elements:**
- `.success-circle-wrap` with SVG progress ring
- `.success-visible` class added via JS for fade-in animation
- Title and subtitle text set dynamically per context

**Static Variants:** light/dark = 2 files.

---

### 4.15 Data Share — `data-share.html`

**Variant Keys:**
- `dataShareHeadline` → "StreamVault would like to create an account for you."
- `dataShareBody` → "Trust ID can share your email to set up your StreamVault account..."
- `dataSharePrivacy` → "These details are stored in your Trust ID wallet..."
- `dataShareBtn` → "Create My Account"

**Contains:**
- Credential cards with inline editors (email, name)
- Share date range pickers
- Email share consent checkbox (checked by default)

**Static Variants:** light/dark = 2 files.

---

### 4.16 Account Setup — `account-setup.html`

**Variant Keys:**
- `accountHeadline` → "Complete your Trust ID profile."
- `accountBody` → "Your email has been verified..."
- `accountPrivacy` → "Your name and email will be stored securely..."
- `accountBtn` → "Create My Account"

**Static Variants:** light/dark = 2 files.

---

### 4.17 Credential Request — `credential-request.html`

**Variant Keys:**
- `credReqHeadline` → "StreamVault is requesting your age verification."
- `credReqBody` → "Only a yes/no confirmation is shared..."
- `credReqBtn` → "Share Verification"

Shown for `returningVerified` scenario when revisiting site.

**Static Variants:** light/dark = 2 files.

---

### 4.18 Credential Warning — `credential-warning.html`

**Variant Keys:**
- `credWarnHeadline` → "Age verification is required to access this site."
- `credWarnBody` → "Trust ID only shares a yes/no confirmation..."
- `credWarnDetail` → "Without verifying, you won't be able to access..."
- `credWarnBtn` → "Continue Verification"
- `credWarnReauth` → "Without Trust ID, you may need to re-verify..."

**Static Variants:** light/dark = 2 files.

---

### 4.19 Verify Needed — `verify-needed.html`

**Variant Keys:**
- `verifyHeadline` → "Age verification is required to access this content."
- `verifyBody` → "Trust ID only shares a yes/no confirmation..."
- `verifyDetail` → "You'll need to complete a one-time age verification..."
- `verifyBtn` → "Verify My Age"

**Static Variants:** light/dark = 2 files.

---

### 4.20 DNS Confirm — `dns-confirm.html`

Confirmation after user opts out of data sale. Static confirmation text.

**Static Variants:** light/dark = 2 files.

---

### 4.21 Delete Warning — `delete-warning.html`

Account deletion confirmation with "Delete My Account" + "Cancel" buttons.

**Static Variants:** light/dark = 2 files.

---

### 4.22 Revoke Warnings — `revoke-{dob,age,email}-warning.html`

Three separate screens shown when user turns OFF a shared data toggle. Each warns about consequences of revoking that specific data type.

**Static Variants:** light/dark × 3 screens = 6 files.

---

### 4.23 Sharing Settings — `sharing-settings.html`

Overview of what data is shared with the site. No variant keys — static content.

**Static Variants:** light/dark = 2 files.

---

### 4.24 DSR Intake — `dsr-intake.html`

Data Subject Request form. Jurisdiction-adaptive via `adaptDsrCopy()` in screen-wiring.js (3 branches):

- **EU (GDPR)**: Headline "Exercise Your Data Rights", body refs GDPR, 30-day response (Art. 12(3)), "Object to Processing" radio
- **CA (CCPA/CPRA)**: Headline "Exercise Your Privacy Rights", body refs CCPA, 45-day response (§1798.130), "Do Not Sell or Share" radio
- **Generic US**: Headline "Exercise Your Privacy Rights", body refs "applicable law", 45-day response, "Opt-Out of Sale / Sharing" radio

**JS modifies:** `#dsrHeadline`, `#dsrBody`, `#dsrResponseTime`, `#dsrTypeOptout` radio title+desc.

**Static Variants:**

| File | Theme | Jurisdiction |
|---|---|---|
| `dsr-intake--eu-light` | light | EU/GDPR |
| `dsr-intake--eu-dark` | dark | EU/GDPR |
| `dsr-intake--ca-light` | light | California (CCPA/CPRA) |
| `dsr-intake--ca-dark` | dark | California (CCPA/CPRA) |
| `dsr-intake--us-light` | light | Generic US |
| `dsr-intake--us-dark` | dark | Generic US |

---

### 4.25 Error Network — `error-network.html`

Network error screen with "Try Again" button. Static content.

**Static Variants:** light/dark = 2 files.

---

### 4.26 SLC Verify — `slc-verify.html`

SLC Digital eSIM-based verification screen. Only shown when `slcMode !== 'off'`.

**Static Variants:** light/dark = 2 files.

---

### 4.27 Toast Screens

**toast-manage:** "Your preferences, always within reach." — floating tooltip near the Trust ID icon.

**toast-saved:** "Preferences saved." — confirmation after saving cookie prefs.

**toast-welcome:** "Welcome back" — greeting for returning users.

**Static Variants:** light/dark × 3 = 6 files.

---

### 4.28 Background Screens

**age-gate-cover:** Full-page overlay blocking content. Has three `data-state` variants:
- `DEFAULT` — "Are you 18 or older?" modal
- `VERIFIED` — Brief "Verified" confirmation state
- `FAILED` — Age verification failed message

**qr-verify:** Full-window QR code verification overlay.

**slc-kyc:** Full-window SLC KYC identity verification overlay.

**Static Variants:** light/dark × 3 screens = 6 files.
For age-gate-cover, also generate per `data-state`: DEFAULT/VERIFIED/FAILED × light/dark = 6 files.

---

## 5. Routing & First-Screen Matrix

### What Screen Shows First?

| Scenario | Jurisdiction | honorAgeGate | First Screen |
|---|---|---|---|
| `first` | `eu` | `false` | CONSENT_EU |
| `first` | `us` (strict) | `false` | CONSENT_US |
| `first` | `us` (standard) | `false` | CONSENT_US_STD |
| `first` | any | `true` | DOB_ENTRY (age gate shows first) |
| `firstVisit` | `eu` | `false` | CONSENT_EU |
| `firstVisit` | `us` (strict) | `false` | CONSENT_US |
| `firstVisit` | `us` (standard) | `false` | CONSENT_US_STD |
| `firstVisit` | any | `true` | DOB_SHARE |
| `returning` | any | any | No banner (floating icon only) |
| `returningVerified` | any | any | No banner (floating icon only) |

### What Happens When Floating Icon is Clicked? (`getStartScreen()`)

| Condition | Screen Shown |
|---|---|
| `honorAgeGate && !dobVerified` | DOB_ENTRY or DOB_SHARE |
| `ageGateActive && !ageCredentialShared` | EMAIL_CAPTURE or credential screen |
| `consentMethod === 'close'` (EU only) | Re-show consent (GDPR requires explicit) |
| Consent expired (>395 days) | Re-show consent |
| Default | COOKIE_PREFS |

### Consent Accept → Next Screen

| Jurisdiction | SLC Mode | honorAgeGate | Next After Consent |
|---|---|---|---|
| any | `off` | `false` | EMAIL_CAPTURE |
| any | `noKyc` | `false` | SLC_VERIFY |
| any | `withKyc` | `false` | SLC_VERIFY |
| any | any | `true` | Age gate cover → DOB_SHARE or EMAIL_CAPTURE |

### Auth Flow Completion → Next Screen

| State | Next Screen |
|---|---|
| `!accountShared && !ageGateActive` | DATA_SHARE |
| `ageGateActive && !ageCredentialShared` | CREDENTIAL_REQ or CREDENTIAL_WARN |
| Default | dismissBanner() → floating icon |

---

## 6. CSS Token Reference

### Theme Tokens (Critical for Light/Dark)

Standalone files must set `data-theme="light"` or `data-theme="dark"` on `<html>`.

**Background:** Use `var(--page-bg)` — resolves to `#f5f7fa` (light) or `#0b1620` (dark).

### Required CSS Files (in order)

```html
<link rel="stylesheet" href="../css/fonts.css" />
<link rel="stylesheet" href="../css/tokens.css" />
<link rel="stylesheet" href="../css/components.css" />
<link rel="stylesheet" href="../css/screens.css" />
```

Background screens also need: `../css/site-chrome.css`

---

## Complete Variant Count Summary

| Screen | Variants | Files |
|---|---|---|
| consent-eu | default + GPC × theme | 4 |
| consent-us-strict | default + GPC + DNT × theme | 6 |
| consent-us-std | default + GPC + DNT × theme | 6 |
| cookie-prefs cookies EU | off/on × theme | 4 |
| cookie-prefs cookies US | off/on × theme | 4 |
| cookie-prefs cookies CT minor | theme | 2 |
| cookie-prefs (shared tab) | off/on × theme | 4 |
| cookie-prefs (edit dates) | theme | 2 |
| email-capture | email/phone × theme | 4 |
| cookie-email | email/phone × theme | 4 |
| otp-entry | theme | 2 |
| otp-error | theme | 2 |
| dob-entry | theme | 2 |
| dob-share | theme | 2 |
| passkey-setup | theme | 2 |
| passkey-verify | theme | 2 |
| email-confirm | theme | 2 |
| success | theme | 2 |
| data-share | theme | 2 |
| account-setup | theme | 2 |
| credential-request | theme | 2 |
| credential-warning | theme | 2 |
| verify-needed | theme | 2 |
| dns-confirm | theme | 2 |
| delete-warning | theme | 2 |
| revoke-dob | theme | 2 |
| revoke-age | theme | 2 |
| revoke-email | theme | 2 |
| sharing-settings | theme | 2 |
| dsr-intake | eu/ca/us × theme | 6 |
| error-network | theme | 2 |
| slc-verify | theme | 2 |
| toast-manage | theme | 2 |
| toast-saved | theme | 2 |
| toast-welcome | theme | 2 |
| age-gate-cover | state × theme | 6 |
| qr-verify | theme | 2 |
| slc-kyc | theme | 2 |
| **TOTAL** | | **104** |

---

## Appendix: Variant Key → Text Map (Complete)

```
consentHeadline        → "This site uses cookies and similar technologies."
consentTrustLine       → "Your preferences. Your control."
consentAcceptBtn       → "Accept All"
consentRejectBtn       → "Reject All"
consentManageBtn       → "Manage Preferences"
whyTrustId             → "Trust ID gives you one account to manage cookies, logins, and privacy across every partner site."
usAcceptBtn            → "Accept & Continue"
usStdAcceptBtn         → "Accept & Continue"
usTrustLine            → "Your preferences. Your control."
emailHeadline          → "This site requires age verification."
emailBody              → "Trust ID confirms your age instantly — this site never sees your ID or personal details."
emailTrustLine         → "Verify once. Valid everywhere."
emailSendBtn           → "Send Verification Code"
emailReauthWarning     → "Without Trust ID, you may need to re-verify as often as every 60 minutes."
otpHeadline            → "We've sent a verification code."
otpAutoSubmit          → "Code verifies automatically"
cookieTrustLine        → "Your preferences. Your control."
sharedDataTrustLine    → "Your data. Your decision."
sharedDataHeadline     → "Your shared personal data."
sharedDataDesc         → " Manage what you share with this site. Revoke access or set time limits."
cookieSaveBtn          → "Save Preferences"
cookieEmailHeadline    → "Save your preferences to your Trust ID account."
cookieEmailBody        → "Your cookie preferences for this site are saved securely in your Trust ID wallet — set them once and they're stored for good."
cookieEmailTrustLine   → "Set once. Yours forever."
cookieEmailSendBtn     → "Send Verification Code"
passkeyHeadline        → "Skip the code next time."
passkeyBody            → "Set up a passkey and your saved verification does the rest."
passkeyDetail          → "A passkey lets you verify with your fingerprint, face, or screen lock — no codes or passwords needed. It's stored securely on your device and never shared with sites."
passkeyBtn             → "Set Up Passkey"
passkeyVerifyHeadline  → "Confirm with your device."
passkeyVerifyBody      → "Use Face ID, fingerprint, or your device PIN."
credReqHeadline        → "StreamVault is requesting your age verification."
credReqBody            → "Only a yes/no confirmation is shared — your ID, date of birth, and personal details are never sent to this site."
credReqBtn             → "Share Verification"
verifyHeadline         → "Age verification is required to access this content."
verifyBody             → "Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site."
verifyDetail           → "You'll need to complete a one-time age verification. Once verified, your verification is stored securely in your Trust ID wallet and can be shared instantly with any site that requests it."
verifyBtn              → "Verify My Age"
credWarnHeadline       → "Age verification is required to access this site."
credWarnBody           → "Trust ID only shares a yes/no confirmation — your personal information, ID, and date of birth stay private and are never sent to this site."
credWarnDetail         → "Without verifying, you won't be able to access age-restricted content on this site. You can resume verification anytime via the Trust ID icon."
credWarnBtn            → "Continue Verification"
credWarnReauth         → "Without Trust ID, you may need to re-verify as often as every 60 minutes."
dobShareHeadline       → "StreamVault needs to verify your age."
dobShareBody           → "Trust ID will confirm you meet the age requirement for this content — without sharing your exact date of birth."
dobSharePrivacy        → "Only a yes/no age confirmation is shared with this site — your exact date of birth is never sent."
dobShareBtn            → "Confirm My Age"
dataShareHeadline      → "StreamVault would like to create an account for you."
dataShareBody          → "Trust ID can share your email to set up your StreamVault account instantly — no new passwords or sign-up forms."
dataSharePrivacy       → "These details are stored in your Trust ID wallet and shared only with your permission."
dataShareBtn           → "Create My Account"
accountHeadline        → "Complete your Trust ID profile."
accountBody            → "Your email has been verified. Add your name to finish setting up your account with StreamVault."
accountPrivacy         → "Your name and email will be stored securely in your Trust ID wallet and shared with sites only with your permission."
accountBtn             → "Create My Account"
```

### Shared Data Toggle Sublabels

```
email.on  → "Shared with StreamVault for account access."
email.off → "Your email is not shared with this site."
dob.on    → "Shared with StreamVault for age verification."
dob.off   → "Your date of birth is not shared with this site."
age.on    → "Shared with StreamVault for age verification."
age.off   → "Not shared with this site."
```
