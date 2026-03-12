/**
 * CheckboxRow Stories — Molecule Component
 *
 * Showcases the branded checkbox + label molecule.
 *
 * @see src/components/molecules/CheckboxRow/CheckboxRow.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxRow } from './CheckboxRow';

const meta: Meta<typeof CheckboxRow> = {
  title: 'Molecules/CheckboxRow',
  component: CheckboxRow,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof CheckboxRow>;

/** Checked state — share email with site */
export const Checked: Story = {
  args: {
    id: 'email-share',
    label: 'Share my email with this site and create an account',
    checked: true,
    onChange: () => {},
    ariaLabel: 'Share my email and create an account on this site',
  },
};

/** Unchecked state */
export const Unchecked: Story = {
  args: {
    id: 'email-share-off',
    label: 'Share my email with this site and create an account',
    checked: false,
    onChange: () => {},
  },
};
