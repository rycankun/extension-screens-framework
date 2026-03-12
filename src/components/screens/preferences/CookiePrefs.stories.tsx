/**
 * CookiePrefs Stories — Screen Component
 *
 * All variant stories for the cookie preferences screen.
 * Covers both Cookies and Shared Data tabs with toggle states.
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
    marketingOn: { control: 'boolean' },
    emailShared: { control: 'boolean' },
    dobShared: { control: 'boolean' },
    ageShared: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CookiePrefs>;

/** Cookies tab — light theme, all optional toggles OFF */
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

/** All cookie toggles ON (analytics + marketing accepted) */
export const AllTogglesOn: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    analyticsOn: true,
    marketingOn: true,
  },
};

/** All cookie toggles OFF (default state) */
export const AllTogglesOff: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    analyticsOn: false,
    marketingOn: false,
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

/** Cookies tab — no Shared Data tab available */
export const CookiesOnly: Story = {
  args: {
    theme: 'light',
    activeTab: 'cookies',
    showSharedData: false,
  },
};
