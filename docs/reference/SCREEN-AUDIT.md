# TrustID Extension — Complete Screen & State Audit

> Generated 2026-03-12, updated 2026-03-12. Documents every screen, variation,
> and interactive state for standalone HTML file generation and Figma import.
>
> **Latest fix:** OTP digit inputs (6 per row) are now pre-rendered in all
> otp-entry and otp-error standalone files. Previously these were empty `<div>`s
> because `setupOtpRow()` in screen-wiring.js creates them dynamically at runtime.

---

## Screen Inventory: 35 Total

| # | Screen ID | File | Type | Category |
|---|-----------|------|------|----------|
| 1 | `CONSENT_EU` | consent-t1.html | Banner | Consent |
| 2 | `CONSENT_US` | consent-t2.html | Banner | Consent |
| 3 | `CONSENT_US_STD` | consent-t3.html | Banner | Consent |
| 4 | `EMAIL_CAPTURE` | email-capture.html | Banner | Auth |
| 5 | `OTP_ENTRY` | otp-entry.html | Banner | Auth |
| 6 | `OTP_ERROR` | otp-error.html | Banner | Auth |
| 7 | `EMAIL_CONFIRM` | email-confirm.html | Banner | Auth |
| 8 | `PASSKEY_VERIFY` | passkey-verify.html | Banner | Auth |
| 9 | `PASSKEY_SETUP` | passkey-setup.html | Banner | Auth |
| 10 | `SUCCESS` | success.html | Banner | Completion |
| 11 | `COOKIE_PREFS` | cookie-prefs.html | Banner | Preferences |
| 12 | `COOKIE_EMAIL` | cookie-email.html | Banner | Preferences |
| 13 | `DATA_SHARE` | data-share.html | Banner | Sharing |
| 14 | `CREDENTIAL_REQ` | credential-request.html | Banner | Sharing |
| 15 | `CREDENTIAL_WARN` | credential-warning.html | Banner | Sharing |
| 16 | `DOB_SHARE` | dob-share.html | Banner | Sharing |
| 17 | `DOB_ENTRY` | dob-entry.html | Banner | Age Gate |
| 18 | `VERIFY_NEEDED` | verify-needed.html | Banner | Age Gate |
| 19 | `ACCOUNT_SETUP` | account-setup.html | Banner | Account |
| 20 | `SHARING_SETTINGS` | sharing-settings.html | Banner | Management |
| 21 | `REVOKE_AGE` | revoke-age-warning.html | Banner | Management |
| 22 | `REVOKE_DOB` | revoke-dob-warning.html | Banner | Management |
| 23 | `REVOKE_EMAIL` | revoke-email-warning.html | Banner | Management |
| 24 | `DELETE_WARNING` | delete-warning.html | Banner | Management |
| 25 | `DSR_INTAKE` | dsr-intake.html | Banner | DSR |
| 26 | `DNS_CONFIRM` | dns-confirm.html | Banner | DSR |
| 27 | `ERROR_NETWORK` | error-network.html | Banner | Error |
| 28 | `SLC_VERIFY` | slc-verify.html | Banner | SLC |
| 29 | `SLC_KYC` | slc-kyc.html | Full Page | SLC |
| 30 | `TOAST_MANAGE` | toast-manage.html | Toast | Overlay |
| 31 | `TOAST_SAVED` | toast-saved.html | Toast | Overlay |
| 32 | `TOAST_WELCOME` | toast-welcome-back.html | Toast | Overlay |
| 33 | `LANDING` | landing.html | Full Page | Background |
| 34 | `AGE_GATE_COVER` | age-gate-cover.html | Full Page | Background |
| 35 | `SV_ADULT` | sv-adult.html | Full Page | Background |
| — | `QR_VERIFY` | qr-verify.html | Full Page | Overlay |

---

## Variant Axes (5)

| Axis | Values | Affects |
|------|--------|---------|
| **Theme** | `light` (default), `dark` | All screens — via `data-theme="dark"` on `<html>` |
| **Jurisdiction** | `eu`, `us` | consent-t1 (EU), consent-t2 (US strict), consent-t3 (US standard) |
| **Scenario Mode** | `first`, `firstVisit`, `returning`, `returningVerified` | Screen routing and text |
| **SLC Mode** | `off`, `noKyc`, `withKyc` | Whether SLC screens appear |
| **Honor Age Gate** | `on`, `off` | Whether DOB_ENTRY appears |

---

## Variant Text Keys (62 total)

All text keyed by `data-variant-key` attribute in HTML, populated from `variants.js`:

### Consent
| Key | Text |
|-----|------|
| `consentHeadline` | "This site uses cookies and similar technologies." |
| `consentTrustLine` | "Your preferences. Your control." |
| `consentAcceptBtn` | "Accept All" |
| `consentRejectBtn` | "Reject All" |
| `consentManageBtn` | "Manage Preferences" |
| `whyTrustId` | "Trust ID gives you one account to manage cookies, logins, and privacy across every partner site." |
| `usAcceptBtn` | "Accept & Continue" |
| `usStdAcceptBtn` | "Accept & Continue" |
| `usTrustLine` | "Your preferences. Your control." |

### Email & Auth
| Key | Text |
|-----|------|
| `emailHeadline` | "This site requires age verification." |
| `emailBody` | "Trust ID confirms your age instantly — this site never sees your ID or personal details." |
| `emailTrustLine` | "Verify once. Valid everywhere." |
| `emailSendBtn` | "Send Verification Code" |
| `emailReauthWarning` | "Without Trust ID, you may need to re-verify as often as every 60 minutes." |
| `otpHeadline` | "We've sent a verification code." |
| `otpAutoSubmit` | "Code verifies automatically" |

### Cookie Preferences
| Key | Text |
|-----|------|
| `cookieTrustLine` | "Your preferences. Your control." |
| `sharedDataTrustLine` | "Your data. Your decision." |
| `sharedDataHeadline` | "Your shared personal data." |
| `sharedDataDesc` | "Manage what you share with this site. Revoke access or set time limits." |
| `cookieSaveBtn` | "Save Preferences" |
| `cookieEmailHeadline` | "Save your preferences to your Trust ID account." |
| `cookieEmailBody` | "Your cookie preferences for this site are saved securely in your Trust ID wallet..." |
| `cookieEmailTrustLine` | "Set once. Yours forever." |
| `cookieEmailSendBtn` | "Send Verification Code" |

### Passkey
| Key | Text |
|-----|------|
| `passkeyHeadline` | "Skip the code next time." |
| `passkeyBody` | "Set up a passkey and your saved verification does the rest." |
| `passkeyDetail` | "A passkey lets you verify with your fingerprint, face, or screen lock..." |
| `passkeyBtn` | "Set Up Passkey" |
| `passkeyVerifyHeadline` | "Confirm with your device." |
| `passkeyVerifyBody` | "Use Face ID, fingerprint, or your device PIN." |

### Credentials & Sharing
| Key | Text |
|-----|------|
| `credReqHeadline` | "StreamVault is requesting your age verification." |
| `credReqBody` | "Only a yes/no confirmation is shared..." |
| `credReqBtn` | "Share Verification" |
| `verifyHeadline` | "Age verification is required to access this content." |
| `verifyBody` | "Trust ID only shares a yes/no confirmation..." |
| `verifyDetail` | "You'll need to complete a one-time age verification..." |
| `verifyBtn` | "Verify My Age" |
| `credWarnHeadline` | "Age verification is required to access this site." |
| `credWarnBody` | "Trust ID only shares a yes/no confirmation..." |
| `credWarnDetail` | "Without verifying, you won't be able to access age-restricted content..." |
| `credWarnBtn` | "Continue Verification" |
| `credWarnReauth` | "Without Trust ID, you may need to re-verify as often as every 60 minutes." |
| `dobShareHeadline` | "StreamVault needs to verify your age." |
| `dobShareBody` | "Trust ID will confirm you meet the age requirement..." |
| `dobSharePrivacy` | "Only a yes/no age confirmation is shared..." |
| `dobShareBtn` | "Confirm My Age" |
| `dataShareHeadline` | "StreamVault would like to create an account for you." |
| `dataShareBody` | "Trust ID can share your email to set up your StreamVault account instantly..." |
| `dataSharePrivacy` | "These details are stored in your Trust ID wallet..." |
| `dataShareBtn` | "Create My Account" |

### Account
| Key | Text |
|-----|------|
| `accountHeadline` | "Complete your Trust ID profile." |
| `accountBody` | "Your email has been verified. Add your name..." |
| `accountPrivacy` | "Your name and email will be stored securely in your Trust ID wallet..." |
| `accountBtn` | "Create My Account" |

---

## Interactive States (screen-by-screen)

### consent-t1 (EU)
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | Standard consent banner |
| **GPC Detected** | `state.gpcDetected = true` | Shows `.gpc-indicator` badge with shield icon |
| **First-Time Explainer** | `state.currentMode === 'first'` | Shows `[data-why-trustid]` block |
| **Consent Receipt** | After accept/reject/save | Shows `#consentReceipt` with timestamp |
| **EU Fine Print** | EU jurisdiction | Shows Data Controller identity (GDPR Art. 13) + consent withdrawal notice |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### consent-t2 (US Strict States)
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | US + strict state | Standard US consent (all links visible) |
| **GPC + DNT** | Signal detected | Shows `.gpc-indicator` and/or `.dnt-indicator` badges |
| **CA** | `stateCode === 'CA'` | DNS "or Share", financial incentive visible, sensitive PI visible, targeted-ad hidden + authorized agent notice |
| **CO** | `stateCode === 'CO'` | Targeted-ad + sensitive PI visible, financial incentive hidden |
| **OR** | `stateCode === 'OR'` | Targeted-ad visible, sensitive PI + financial incentive hidden |
| **CT** | `stateCode === 'CT'` | Sensitive PI visible, targeted-ad + financial incentive hidden + CTDPA minor ban notice |
| **NH** | `stateCode === 'NH'` | Sensitive PI visible, targeted-ad + financial incentive hidden + profiling opt-out link |
| **MD** | `stateCode === 'MD'` | Sensitive PI hidden (ban replaces it), targeted-ad + financial incentive hidden + MODPA ban notice |
| **TN** | `stateCode === 'TN'` | DNS hidden, RTK hidden, all optional rows hidden + age retention notice + retention policy link |
| **GA** | `stateCode === 'GA'` | DNS hidden, RTK hidden, all optional rows hidden + NIST IAL2 biometric + parental consent notices |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### consent-t3 (US Standard States)
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | US + standard state | Simplified US consent |
| **GPC Detected** | `state.gpcDetected = true` | Shows `.gpc-indicator` badge |
| **DNT Detected** | `state.dntDetected = true` | Shows `.dnt-indicator` badge |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### cookie-prefs
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Cookies Tab (all off)** | Default | Only Cookies tab, all optional toggles OFF |
| **Cookies Tab (all on)** | Accept All | All optional toggles ON |
| **Shared Data Tab** | `dataShareTabUnlocked = true` | Two-tab layout, Shared Data tab visible |
| **Toggle Just Enabled** | Any toggle ON | Inline "Category enabled" confirmation |
| **Date Editor Expanded** | Click edit on shared data item | Inline date picker (start/end) |
| **Consent Receipt** | After save | Shows receipt with timestamp |
| **Withdraw Consent** | EU jurisdiction | Shows "Withdraw All Consent" button |
| **NH Profiling Opt-out** | `currentStateCode === 'NH'` | Shows profiling opt-out row |
| **CT Minor Ad Ban** | CT + minor | Advertising/Personalization locked OFF with "Locked (CT under-18 ban)" labels |
| **US Privacy Rows** | US opt-out state | Shows "Your Privacy Choices" + "Request My Data" links |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### data-share
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | First display | Email credential card + date range |
| **Email Edit Expanded** | Click edit on email | Inline email input + Save/Cancel |
| **Date Edit Expanded** | Click edit on date | Inline date picker |
| **CT Sensitive Data** | `currentStateCode === 'CT'` | Sensitive opt-in: geolocation, health, biometric |
| **GA Sensitive Data** | `currentStateCode === 'GA'` | Sensitive opt-in: NIST IAL2 biometric, parental consent |
| **MD Sensitive Data** | `currentStateCode === 'MD'` | Sensitive opt-in: biometric, geo, health; sale prohibited |
| **NJ Sensitive Data** | `currentStateCode === 'NJ'` | Sensitive opt-in: financial info, geolocation (1,750 ft) |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### dob-share
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | First display | DOB credential card + date range |
| **Date Edit Expanded** | Click edit on date | Inline date picker |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### credential-request
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | First display | Age credential card + date range |
| **Date Edit Expanded** | Click edit on date | Inline date picker |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### otp-error
> Note: 6 `<input class="otp-input">` elements are injected by the generator
> (JS normally creates them at runtime via `setupOtpRow()`).

| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Wrong Code (2 left)** | 1 failed attempt | "That code didn't match — 2 attempts left" |
| **Wrong Code (1 left)** | 2 failed attempts | "That code didn't match — 1 attempt left" |
| **Code Expired** | Code timeout | "This code has expired — request a new one" |
| **Max Attempts** | 3 failed attempts | "Too many attempts — please request a new code" |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### email-capture
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | Email input field |
| **Phone Mode** | `state.otpMethod === 'emailPhone'` | Input placeholder: "Email or phone number" |
| **TN Retention Notice** | `stateCode === 'TN'` | Shows TN HB 1181 retention disclosure |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### cookie-email
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | Email input + cookie opt-in messaging |
| **Phone Mode** | `state.otpMethod === 'emailPhone'` | Input placeholder: "Email or phone number" |
| **TN Retention Notice** | `stateCode === 'TN'` | Shows TN HB 1181 retention disclosure |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### error-network
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default (Server Unreachable)** | Network error | Error icon + "Unable to reach our servers" |
| **Offline** | `navigator.onLine === false` | Shows "You appear to be offline" indicator with wifi-off icon |
| **Connection Restored** | `online` event fires | Heading: "Connection restored", body: "Retrying now..." |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### dob-entry
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | Empty DOB input |
| **Validation Error** | Invalid DOB | Red error message below input |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### landing
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | StreamVault landing with Trust ID button |
| **Logged In** | `state.loggedIn = true` | Trust ID button hidden, nav icons + user avatar visible |

### age-gate-cover
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **DEFAULT** | `data-state="DEFAULT"` | Shield icon + "Age Verification Required" + spinner |
| **VERIFIED** | `data-state="VERIFIED"` | Green checkmark + "You're verified!" |
| **FAILED** | `data-state="FAILED"` | Red X + "Access Denied" |

### slc-verify
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Waiting** | Default | Spinner + "Waiting for device approval..." |
| **Loading** | Approve clicked | Button text "Verifying" + disabled + slc-loading class |
| **Error** | Timeout | Error icon + "Device didn't respond" |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### slc-kyc
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | SLC + KYC mode | Full-page KYC verification |
| **Overlay Visible** | `.slc-kyc-overlay.visible` | KYC overlay panel shown |

### dsr-intake
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default (Generic US)** | Default | "Exercise Your Privacy Rights", 45-day response, "Opt-Out of Sale / Sharing" |
| **EU/GDPR** | EU jurisdiction | "Exercise Your Data Rights", "Submit a request under GDPR", 30-day response, "Object to Processing" |
| **CA/CCPA** | `stateCode === 'CA'` | "Submit a verifiable consumer request under CCPA/CPRA", "Do Not Sell or Share" |
| **Delete** | `value="delete"` checked | Delete radio selected |
| **Correct** | `value="correct"` checked | Correct radio selected |
| **Portability** | `value="portability"` checked | Portability radio selected |
| **Opt-out** | `value="optout"` checked | Opt-out radio selected |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### otp-entry
> Note: 6 `<input class="otp-input">` elements are injected by the generator
> (JS normally creates them at runtime via `setupOtpRow()`).

| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | 6-digit OTP input row (pre-rendered) |
| **TN Retention Notice** | `stateCode === 'TN'` | Shows TN HB 1181 retention disclosure |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

### verify-needed
| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | Page load | Age verification required prompt |
| **TN Retention Notice** | `stateCode === 'TN'` | Shows TN HB 1181 retention disclosure |
| **Dark Theme** | `data-theme="dark"` | All colors invert |

---

## Complete Standalone File List

### Banner Screens — Light Theme (27)
1. `email-capture.html`
2. `otp-entry.html`
3. `otp-error.html`
4. `email-confirm.html`
5. `passkey-verify.html`
6. `passkey-setup.html`
7. `success.html`
8. `consent-t1.html` (EU)
9. `consent-t2.html` (US Strict)
10. `consent-t3.html` (US Standard)
11. `cookie-prefs.html`
12. `cookie-email.html`
13. `data-share.html`
14. `credential-request.html`
15. `credential-warning.html`
16. `dob-share.html`
17. `dob-entry.html`
18. `verify-needed.html`
19. `account-setup.html`
20. `sharing-settings.html`
21. `revoke-age-warning.html`
22. `revoke-dob-warning.html`
23. `revoke-email-warning.html`
24. `delete-warning.html`
25. `dsr-intake.html`
26. `dns-confirm.html`
27. `error-network.html`

### Banner Screens — Dark Theme (27)
28-54. Same screens with `data-theme="dark"` on `<html>`

### SLC & Overlay Screens (4 + dark variants)
55. `slc-verify.html`
56. `slc-verify--dark.html`
57. `slc-kyc.html`
58. `slc-kyc--dark.html`

### Toast Overlays (3 + dark variants)
59. `toast-manage.html`
60. `toast-manage--dark.html`
61. `toast-saved.html`
62. `toast-saved--dark.html`
63. `toast-welcome-back.html`
64. `toast-welcome-back--dark.html`

### Background/Full-Page Screens (5)
65. `landing.html`
66. `sv-adult.html`
67. `age-gate-cover.html` (DEFAULT state)
68. `age-gate-cover--verified.html`
69. `age-gate-cover--failed.html`
70. `qr-verify.html`

### Interactive State Variants (54)

**Consent T1 (EU):**
71. `consent-t1--gpc.html` — GPC indicator visible
72. `consent-t1--first-time.html` — "Why Trust ID?" explainer visible
73. `consent-t1--receipt.html` — Consent receipt visible
74. `consent-t1--eu-fine-print.html` — GDPR Data Controller + consent withdrawal notice

**Consent T2 (US Strict — per-state link visibility + notices):**
75. `consent-t2--gpc-dnt.html` — GPC + DNT indicators
76. `consent-t2--ca-notices.html` — CA: DNS "or Share", financial incentive, sensitive PI + authorized agent
77. `consent-t2--co-notices.html` — CO: targeted-ad + sensitive PI visible, financial incentive hidden
78. `consent-t2--or-notices.html` — OR: targeted-ad visible, sensitive PI + financial incentive hidden
79. `consent-t2--ct-notices.html` — CT: sensitive PI visible, targeted-ad hidden + CTDPA minor ban notice
80. `consent-t2--nh-notices.html` — NH: sensitive PI visible, profiling opt-out link + targeted-ad hidden
81. `consent-t2--md-notices.html` — MD: sensitive PI hidden (ban replaces), targeted-ad hidden + MODPA ban
82. `consent-t2--tn-notices.html` — TN: DNS + RTK hidden, all optional rows hidden + age retention + policy link
83. `consent-t2--ga-notices.html` — GA: DNS + RTK hidden, all optional rows hidden + NIST IAL2 + parental consent

**Consent T3 (US Standard):**
84. `consent-t3--gpc-dnt.html` — GPC + DNT indicators

**Cookie Prefs:**
85. `cookie-prefs--all-on.html` — All cookie toggles ON
86. `cookie-prefs--shared-tab.html` — Shared Data tab visible with data
87. `cookie-prefs--shared-tab-date-edit.html` — Date editor expanded
88. `cookie-prefs--toggle-confirm.html` — Toggle just enabled, inline confirmation
89. `cookie-prefs--consent-receipt.html` — Consent receipt populated
90. `cookie-prefs--withdraw.html` — Withdraw All Consent button visible (EU)
91. `cookie-prefs--nh-profiling.html` — NH profiling opt-out row
92. `cookie-prefs--ct-minor-locked.html` — CT under-18 Advertising/Personalization locked
93. `cookie-prefs--us-privacy-rows.html` — US Privacy Choices + Request My Data + cookie details hidden

**Data Share:**
94. `data-share--email-edit.html` — Email credential editor expanded
95. `data-share--date-edit.html` — Date range editor expanded
96. `data-share--ct-sensitive.html` — CT sensitive data opt-in (geolocation, health, biometric)
97. `data-share--ga-sensitive.html` — GA sensitive data opt-in (NIST IAL2 biometric)
98. `data-share--md-sensitive.html` — MD sensitive data opt-in (biometric, geo, health; sale prohibited)
99. `data-share--nj-sensitive.html` — NJ sensitive data opt-in (financial info, geo 1,750 ft)

**Other Editors:**
100. `dob-share--date-edit.html` — Date editor expanded
101. `credential-request--date-edit.html` — Date editor expanded

**DOB Entry:**
102. `dob-entry--error.html` — Validation error shown

**Email Capture / Cookie Email:**
103. `email-capture--phone-mode.html` — Email/phone input mode
104. `cookie-email--phone-mode.html` — Email/phone input mode

**TN Retention Repeat Notices:**
105. `cookie-email--tn-retention.html` — TN HB 1181 retention disclosure
106. `email-capture--tn-retention.html` — TN HB 1181 retention disclosure
107. `otp-entry--tn-retention.html` — TN HB 1181 retention disclosure
108. `verify-needed--tn-retention.html` — TN HB 1181 retention disclosure

**Error Network:**
109. `error-network--offline.html` — Offline indicator visible
110. `error-network--restored.html` — "Connection restored" + "Retrying now..."

**OTP Error:**
111. `otp-error--2-attempts.html` — Wrong code, 2 attempts remaining
112. `otp-error--1-attempt.html` — Wrong code, 1 attempt remaining
113. `otp-error--expired.html` — Code expired
114. `otp-error--max-attempts.html` — Too many attempts (locked out)

**SLC:**
115. `slc-verify--error.html` — Device error state
116. `slc-verify--loading.html` — Approve button loading ("Verifying")
117. `slc-kyc--overlay.html` — KYC overlay visible

**DSR Intake:**
118. `dsr-intake--eu.html` — EU/GDPR text (30-day, "Object to Processing")
119. `dsr-intake--ca.html` — CA/CCPA text ("Do Not Sell or Share")
120. `dsr-intake--delete.html` — Delete radio selected
121. `dsr-intake--correct.html` — Correct radio selected
122. `dsr-intake--portability.html` — Portability radio selected
123. `dsr-intake--optout.html` — Opt-out radio selected

**Landing:**
124. `landing--logged-in.html` — Logged-in nav state (avatar, icons)

**Total: 128 standalone HTML files**

---

## CSS Architecture (for standalone rendering)

Entry point: `base.css` imports all partials:
```
base.css
├── css/fonts.css        — @font-face (Inter, Work Sans)
├── css/tokens.css       — Custom properties (light + dark)
├── css/components.css   — UI components
├── css/screens.css      — Screen layouts
├── css/site-chrome.css  — StreamVault landing
├── css/controls.css     — Demo controls (not needed for standalone)
└── css/a11y.css         — Accessibility
```

### Key Dimensions
- Banner width: `380px` (--size-banner)
- Banner border-radius: `4px` top, `0` bottom
- Content padding: `16px 24px 8px`
- Font: Inter (body), Work Sans (headings)
- Max weight: 500 (Medium)

### Theme Switching
Dark theme: add `data-theme="dark"` to `<html>` element.
Site background theme: add `data-bg="light"` for light StreamVault site.

---

## State Flags Reference

| Flag | Type | Default (first) | Effect |
|------|------|-----------------|--------|
| `otpCompleted` | bool | false | Skip email/OTP screens |
| `passkeyCreated` | bool | false | Skip passkey setup |
| `accountShared` | bool | false | Skip data share |
| `consentGiven` | bool | false | Skip consent screens |
| `loggedIn` | bool | false | Nav shows avatar vs sign-in |
| `ageCredentialShared` | bool | false | Skip age verification |
| `dobVerified` | bool | false | Skip DOB entry |
| `dataShareTabUnlocked` | bool | false | Shared Data tab visible |
| `gpcDetected` | bool | false | GPC indicator visible |
| `dntDetected` | bool | false | DNT indicator visible |

---

## Shared Data Toggle Copy

| Field | ON Text | OFF Text |
|-------|---------|----------|
| Email | "Shared with StreamVault for account access." | "Your email is not shared with this site." |
| DOB | "Shared with StreamVault for age verification." | "Your date of birth is not shared with this site." |
| Age | "Shared with StreamVault for age verification." | "Not shared with this site." |
