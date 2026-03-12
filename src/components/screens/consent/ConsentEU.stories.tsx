/**
 * ConsentEU Stories — Screen Component
 *
 * All variant stories for the EU/GDPR consent screen.
 * Each named export = one Figma frame import target.
 *
 * Stories cover: light/dark themes and GPC signal detection.
 * No toggle stories — EU consent uses text blocks + buttons, not toggles.
 * DNT removed — DNT has no legal force under GDPR so no indicator is shown.
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
  },
};
export default meta;

type Story = StoryObj<typeof ConsentEU>;

/** EU consent — light theme, default state (no GPC detected) */
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

/** EU consent — GPC signal detected, shows GPC indicator panel */
export const WithGPC: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
  },
};

/** EU consent — dark theme with GPC signal detected */
export const DarkWithGPC: Story = {
  args: {
    theme: 'dark',
    gpcDetected: true,
  },
};
