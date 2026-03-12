/**
 * Icon Stories — Atom Component
 *
 * Showcases all available icons at different sizes. The gallery view
 * displays every icon at sm size for quick reference.
 *
 * @see src/components/atoms/Icon/Icon.tsx for implementation and icon list
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';

const ALL_ICONS: IconName[] = [
  'close', 'check', 'warning', 'info', 'fingerprint',
  'shield', 'lock', 'email', 'chevronRight', 'chevronDown',
  'external', 'eye', 'eyeOff',
];

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: ALL_ICONS,
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

/** Default icon — shield at sm size */
export const Default: Story = {
  args: { name: 'shield', size: 'sm', ariaLabel: 'Shield icon' },
};

/** Close icon */
export const Close: Story = {
  args: { name: 'close', size: 'sm', ariaLabel: 'Close' },
};

/** Check icon — used in success states */
export const Check: Story = {
  args: { name: 'check', size: 'md', ariaLabel: 'Checkmark' },
};

/** All sizes comparison */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tid-sp-8)' }}>
      <Icon name="shield" size="xs" ariaLabel="Extra small" />
      <Icon name="shield" size="sm" ariaLabel="Small" />
      <Icon name="shield" size="md" ariaLabel="Medium" />
      <Icon name="shield" size="lg" ariaLabel="Large" />
      <Icon name="shield" size="xl" ariaLabel="Extra large" />
    </div>
  ),
};

/** Full icon gallery — every icon at sm size */
export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 'var(--tid-sp-8)',
      }}
    >
      {ALL_ICONS.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--tid-sp-2)',
            padding: 'var(--tid-sp-6)',
            borderRadius: 'var(--tid-radius-md)',
            backgroundColor: 'var(--tid-surface)',
            border: 'var(--tid-border-width) solid var(--tid-border-light)',
          }}
        >
          <Icon name={name} size="md" ariaLabel={name} />
          <span
            style={{
              fontFamily: 'var(--tid-ff-mono)',
              fontSize: 'var(--tid-fs-2xs)',
              color: 'var(--tid-text-secondary)',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Icon with custom brand color */
export const BrandColor: Story = {
  args: {
    name: 'shield',
    size: 'lg',
    color: 'var(--tid-brand)',
    ariaLabel: 'Brand colored shield',
  },
};
