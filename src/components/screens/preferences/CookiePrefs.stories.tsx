/**
 * CookiePrefs Stories — Screen Component
 *
 * All variant stories for the cookie preferences screen.
 * Covers both Cookies and Shared Data tabs with toggle states,
 * NH profiling opt-out, Withdraw All Consent, and fine-print variants.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/preferences/CookiePrefs.tsx for implementation
 * @see docs/PRD.md § 4.3 — CookiePrefs specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CookiePrefs } from './CookiePrefs';

const meta: Meta<typeof CookiePrefs> = {
  title: 'Screens/Preferences/CookiePrefs',
  component: CookiePrefs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    activeTab: { control: 'select', options: ['cookies', 'sharedData'] },
    showSharedData: { control: 'boolean' },
    analyticsOn: { control: 'boolean' },
    personalizationOn: { control: 'boolean' },
    marketingOn: { control: 'boolean' },
    showNhProfiling: { control: 'boolean' },
    nhProfilingOn: { control: 'boolean' },
    emailShared: { control: 'boolean' },
    dobShared: { control: 'boolean' },
    ageShared: { control: 'boolean' },
    showWithdrawConsent: { control: 'boolean' },
    showPrivacyChoices: { control: 'boolean' },
    showRightToKnow: { control: 'boolean' },
    showConsentReceipt: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CookiePrefs>;

/* ── Cookies Tab Variants ── */

/** Cookies tab — light theme, all optional toggles OFF (default state) */
export const CookiesTabLight: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
  },
};

/** Cookies tab — dark theme */
export const CookiesTabDark: Story = {
  args: {
    theme: 'dark',
    activeTab: 'cookies',
  },
};

/** All cookie toggles ON (analytics + personalization + advertising accepted) */
export const AllTogglesOn: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    analyticsOn: true,
    personalizationOn: true,
    marketingOn: true,
  },
};

/** All cookie toggles OFF (default state) */
export const AllTogglesOff: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    analyticsOn: false,
    personalizationOn: false,
    marketingOn: false,
  },
};

/** Cookies tab — no Shared Data tab available (pre-verification) */
export const CookiesOnly: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    showSharedData: false,
  },
};

/* ── NH Profiling Variant ── */

/** Cookies tab with NH SB 255 profiling opt-out row visible */
export const WithNhProfiling: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    showNhProfiling: true,
    nhProfilingOn: false,
  },
};

/** NH profiling opt-out — dark theme */
export const WithNhProfilingDark: Story = {
  args: {
    theme: 'dark',
    activeTab: 'cookies',
    showNhProfiling: true,
    nhProfilingOn: false,
  },
};

/* ── Withdraw Consent Variant ── */

/** Cookies tab with Withdraw All Consent button visible (re-entry state) */
export const WithWithdrawConsent: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    showWithdrawConsent: true,
  },
};

/** Withdraw consent — dark theme */
export const WithWithdrawConsentDark: Story = {
  args: {
    theme: 'dark',
    activeTab: 'cookies',
    showWithdrawConsent: true,
  },
};

/* ── Fine Print Variants ── */

/** Cookies tab with all fine-print links visible (T2 state + consent given) */
export const WithAllFinePrint: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    showPrivacyChoices: true,
    showRightToKnow: true,
    showConsentReceipt: true,
  },
};

/* ── Shared Data Tab Variants ── */

/** Shared Data tab — light theme, all sharing OFF */
export const SharedDataTabLight: Story = {
  args: {
    theme: 'light',
    activeTab: 'sharedData',
  },
};

/** Shared Data tab — dark theme */
export const SharedDataTabDark: Story = {
  args: {
    theme: 'dark',
    activeTab: 'sharedData',
  },
};

/** Shared Data tab — all data shared */
export const AllDataShared: Story = {
  args: {
    theme: 'light',
    activeTab: 'sharedData',
    emailShared: true,
    dobShared: true,
    ageShared: true,
  },
};

/* ── Combined Variants ── */

/** Full re-entry state: all toggles on, withdraw visible, all fine print */
export const FullReEntry: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    analyticsOn: true,
    personalizationOn: true,
    marketingOn: true,
    showWithdrawConsent: true,
    showPrivacyChoices: true,
    showRightToKnow: true,
    showConsentReceipt: true,
  },
};
