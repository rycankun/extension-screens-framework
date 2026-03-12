/**
 * ConsentUSStd Stories — Screen Component
 *
 * All variant stories for the US standard-state simplified consent screen.
 * Each named export = one Figma frame import target.
 *
 * Structure: text blocks + buttons + privacy links (no toggles).
 * Matches predecessor consent-t3.html layout.
 *
 * @see src/components/screens/consent/ConsentUSStd.tsx for implementation
 * @see docs/PRD.md § 4.1 — ConsentUSStd specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentUSStd } from './ConsentUSStd';

const meta: Meta<typeof ConsentUSStd> = {
  title: 'Screens/Consent/USStandard',
  component: ConsentUSStd,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    gpcDetected: { control: 'boolean' },
    dntDetected: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ConsentUSStd>;

/** US standard consent — light theme, default state */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** US standard consent — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/** US standard consent — light theme with GPC signal detected */
export const WithGPC: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
  },
};

/** US standard consent — light theme with DNT signal detected */
export const WithDNT: Story = {
  args: {
    theme: 'light',
    dntDetected: true,
  },
};

/** US standard consent — light theme with both GPC and DNT signals */
export const WithGPCAndDNT: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
    dntDetected: true,
  },
};
