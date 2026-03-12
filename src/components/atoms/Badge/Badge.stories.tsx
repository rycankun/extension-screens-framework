/**
 * Badge Stories — Atom Component
 *
 * Showcases all badge variants (success, warning, error, info, neutral)
 * and sizes (sm, md). Each named export is a potential Figma frame.
 *
 * @see src/components/atoms/Badge/Badge.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

/** Success badge — verified, confirmed, active states */
export const Success: Story = {
  args: { label: 'Verified', variant: 'success' },
};

/** Warning badge — expiring, attention needed */
export const Warning: Story = {
  args: { label: 'Expiring', variant: 'warning' },
};

/** Error badge — expired, failed, revoked */
export const Error: Story = {
  args: { label: 'Expired', variant: 'error' },
};

/** Info badge — informational status */
export const Info: Story = {
  args: { label: 'New', variant: 'info' },
};

/** Neutral badge — generic label */
export const Neutral: Story = {
  args: { label: 'Optional', variant: 'neutral' },
};

/** Small badge size */
export const SmallSuccess: Story = {
  args: { label: 'Active', variant: 'success', size: 'sm' },
};

/** All variants at md size */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--tid-sp-4)', flexWrap: 'wrap' }}>
      <Badge label="Verified" variant="success" />
      <Badge label="Expiring" variant="warning" />
      <Badge label="Expired" variant="error" />
      <Badge label="New" variant="info" />
      <Badge label="Optional" variant="neutral" />
    </div>
  ),
};
