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
    ctMinorBan: { control: 'boolean' },
    analyticsOn: { control: 'boolean' },
    marketingOn: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ConsentUS>;

/** US strict consent — light theme, default state (all toggles ON, opt-out model) */
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

/** US strict consent — GPC signal detected badge visible */
export const WithGPC: Story = {
  args: {
    theme: 'light',
    gpcDetected: true,
  },
};

/** US strict consent — CT minor advertising ban (marketing locked OFF) */
export const CtMinorBan: Story = {
  args: {
    theme: 'light',
    ctMinorBan: true,
  },
};
