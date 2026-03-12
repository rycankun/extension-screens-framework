/**
 * Button Stories — Atom Component
 *
 * Showcases all button variants (primary, secondary, ghost, danger),
 * sizes (sm, md, lg), and states (default, disabled, full width).
 * Each named export is a potential Figma frame import target.
 *
 * @see src/components/atoms/Button/Button.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/* ── Primary Variant ── */

/** Primary button — dark bg, light text. The main CTA pattern. */
export const Primary: Story = {
  args: { label: 'Continue', variant: 'primary', size: 'md' },
};

/** Primary button in small size */
export const PrimarySmall: Story = {
  args: { label: 'Save', variant: 'primary', size: 'sm' },
};

/** Primary button in large size (44px touch target) */
export const PrimaryLarge: Story = {
  args: { label: 'Accept All', variant: 'primary', size: 'lg' },
};

/** Primary button at full container width */
export const PrimaryFullWidth: Story = {
  args: { label: 'Continue', variant: 'primary', size: 'md', fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 340 /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
};

/** Primary button — disabled state */
export const PrimaryDisabled: Story = {
  args: { label: 'Continue', variant: 'primary', size: 'md', disabled: true },
};

/* ── Secondary Variant ── */

/** Secondary button — transparent bg, subtle border */
export const Secondary: Story = {
  args: { label: 'Manage Preferences', variant: 'secondary', size: 'md' },
};

/** Secondary button — disabled */
export const SecondaryDisabled: Story = {
  args: { label: 'Manage Preferences', variant: 'secondary', size: 'md', disabled: true },
};

/* ── Ghost Variant ── */

/** Ghost button — text-only, no bg or border */
export const Ghost: Story = {
  args: { label: 'Skip for now', variant: 'ghost', size: 'md' },
};

/* ── Danger Variant ── */

/** Danger button — red bg for destructive actions */
export const Danger: Story = {
  args: { label: 'Delete Account', variant: 'danger', size: 'md' },
};

/** Danger button — disabled */
export const DangerDisabled: Story = {
  args: { label: 'Delete Account', variant: 'danger', size: 'md', disabled: true },
};

/* ── All Variants Comparison ── */

/** Side-by-side comparison of all variants at md size */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tid-sp-4)' }}>
      <Button label="Primary Action" variant="primary" />
      <Button label="Secondary Action" variant="secondary" />
      <Button label="Ghost Action" variant="ghost" />
      <Button label="Danger Action" variant="danger" />
    </div>
  ),
};

/** All sizes comparison */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tid-sp-4)' }}>
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </div>
  ),
};
