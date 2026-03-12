/**
 * ConsentEU Stories — Screen Component
 *
 * All variant stories for the EU/GDPR consent screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/consent/ConsentEU.tsx for implementation
 * @see docs/PRD.md § 4.1 — ConsentEU specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentEU } from './ConsentEU';

const meta: Meta<typeof ConsentEU> = {
  title: 'Screens/Consent/EU',
  component: ConsentEU,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    gpcDetected: { control: 'boolean' },
    dntDetected: { control: 'boolean' },
    analyticsOn: { control: 'boolean' },
    marketingOn: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ConsentEU>;

/** EU consent — light theme, default state (all optional toggles OFF) */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** EU consent — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/** EU consent — GPC signal detected badge visible */
export const WithGPC: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
  },
};

/** EU consent — DNT signal detected badge visible */
export const WithDNT: Story = {
  args: {
    theme: 'light',
    dntDetected: true,
  },
};

/** EU consent — all optional toggles ON (analytics + marketing accepted) */
export const AllTogglesOn: Story = {
  args: {
    theme: 'light',
    analyticsOn: true,
    marketingOn: true,
  },
};

/** EU consent — all optional toggles OFF (default EU state) */
export const AllTogglesOff: Story = {
  args: {
    theme: 'light',
    analyticsOn: false,
    marketingOn: false,
  },
};
