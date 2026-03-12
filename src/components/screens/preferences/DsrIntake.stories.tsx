/**
 * DsrIntake Stories — Screen Component
 *
 * All variant stories for the data subject request form screen.
 * Covers EU, CA, and Generic US jurisdictions with radio selections,
 * email input, and disabled/enabled submit button states.
 * Each named export = one Figma frame import target.
 *
 * @see src/components/screens/preferences/DsrIntake.tsx for implementation
 * @see docs/PRD.md § 4.3 — DsrIntake specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DsrIntake } from './DsrIntake';

const meta: Meta<typeof DsrIntake> = {
  title: 'Screens/Preferences/DsrIntake',
  component: DsrIntake,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    jurisdiction: { control: 'select', options: ['eu', 'ca', 'generic'] },
    selectedRequest: {
      control: 'select',
      options: ['', 'access', 'delete', 'correct', 'portability', 'optout'],
    },
    email: { control: 'text' },
    onClose: { action: 'onClose' },
    onBack: { action: 'onBack' },
    onSubmit: { action: 'onSubmit' },
  },
};
export default meta;

type Story = StoryObj<typeof DsrIntake>;

/** Generic US — light theme, empty state (submit disabled) */
export const GenericLight: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'generic',
  },
};

/** Generic US — dark theme */
export const GenericDark: Story = {
  args: {
    theme: 'dark',
    jurisdiction: 'generic',
  },
};

/** EU/GDPR variant — shows "Object to Processing" instead of "Opt-Out of Sale / Sharing" */
export const EuLight: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'eu',
  },
};

/** EU/GDPR variant — dark theme */
export const EuDark: Story = {
  args: {
    theme: 'dark',
    jurisdiction: 'eu',
  },
};

/** California CCPA/CPRA variant */
export const CaLight: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'ca',
  },
};

/** Delete request pre-selected with email filled (submit enabled) */
export const DeleteSelected: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'generic',
    selectedRequest: 'delete',
    email: 'user@example.com',
  },
};

/** Access request pre-selected with email filled (submit enabled) */
export const AccessSelected: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'generic',
    selectedRequest: 'access',
    email: 'user@example.com',
  },
};

/** EU with Object to Processing selected and email filled */
export const EuObjectSelected: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'eu',
    selectedRequest: 'optout',
    email: 'user@example.com',
  },
};
