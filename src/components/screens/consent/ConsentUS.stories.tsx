/**
 * ConsentUS Stories — Screen Component
 *
 * All variant stories for the US strict-state consent screen.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/consent/ConsentUS.tsx for implementation
 * @see docs/PRD.md § 4.1 — ConsentUS specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConsentUS } from './ConsentUS';

const meta: Meta<typeof ConsentUS> = {
  title: 'Screens/Consent/US',
  component: ConsentUS,
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

type Story = StoryObj<typeof ConsentUS>;

/** US strict consent — light theme, default state */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};

/** US strict consent — dark theme */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/** US strict consent — GPC signal detected (shield icon + detail text) */
export const WithGPC: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
  },
};

/** US strict consent — DNT signal detected (circle-slash icon + text) */
export const WithDNT: Story = {
  args: {
    theme: 'light',
    dntDetected: true,
  },
};

/** US strict consent — both GPC and DNT signals detected */
export const WithGPCAndDNT: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
    dntDetected: true,
  },
};
