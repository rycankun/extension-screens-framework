/**
 * DsrIntake Stories — Screen Component
 *
 * All variant stories for the data subject request form screen.
 * Covers EU, CA, and Generic US jurisdictions with radio selections.
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
  },
};
export default meta;

type Story = StoryObj<typeof DsrIntake>;

/** Generic US — light theme */
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

/** EU/GDPR variant — shows "Object to Processing" */
export const EuLight: Story = {
  args: {
    theme: 'light',
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

/** Delete request pre-selected */
export const DeleteSelected: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'generic',
    selectedRequest: 'delete',
  },
};

/** Access request pre-selected */
export const AccessSelected: Story = {
  args: {
    theme: 'light',
    jurisdiction: 'generic',
    selectedRequest: 'access',
  },
};
