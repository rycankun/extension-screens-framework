/**
 * Spinner Stories — Atom Component
 *
 * Showcases spinner sizes and usage contexts.
 *
 * @see src/components/atoms/Spinner/Spinner.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

/** Default medium spinner (24px) */
export const Default: Story = {
  args: {
    size: 'md',
    ariaLabel: 'Loading',
  },
};

/** Small spinner (16px) — inline with text */
export const Small: Story = {
  args: {
    size: 'sm',
    ariaLabel: 'Loading',
  },
};

/** Large spinner (32px) — prominent loading state */
export const Large: Story = {
  args: {
    size: 'lg',
    ariaLabel: 'Loading',
  },
};

/** All sizes side by side */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tid-sp-8)' }}>
      <Spinner size="sm" ariaLabel="Small spinner" />
      <Spinner size="md" ariaLabel="Medium spinner" />
      <Spinner size="lg" ariaLabel="Large spinner" />
    </div>
  ),
};

/** Spinner with contextual label */
export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-4)',
      }}
    >
      <Spinner size="sm" ariaLabel="Verifying" />
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-body-sm)',
          color: 'var(--tid-text-secondary)',
        }}
      >
        Verifying your identity…
      </span>
    </div>
  ),
};
