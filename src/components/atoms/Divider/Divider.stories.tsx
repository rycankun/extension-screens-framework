/**
 * Divider Stories — Atom Component
 *
 * Showcases divider spacing variants and usage in content context.
 *
 * @see src/components/atoms/Divider/Divider.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    spacing: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

/** Default medium spacing (12px above/below) */
export const Default: Story = {
  args: {
    spacing: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
};

/** Small spacing (4px above/below) */
export const Small: Story = {
  args: {
    spacing: 'sm',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
};

/** Large spacing (16px above/below) */
export const Large: Story = {
  args: {
    spacing: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' /* decorator constraint, no matching token */ }}>
        <Story />
      </div>
    ),
  ],
};

/** Divider between content sections */
export const InContext: Story = {
  render: () => (
    <div
      style={{
        width: '340px' /* decorator constraint, no matching token */,
        fontFamily: 'var(--tid-ff-body)',
        fontSize: 'var(--tid-fs-body-sm)',
        color: 'var(--tid-text-body)',
        lineHeight: 'var(--tid-lh-snug)',
      }}
    >
      <p style={{ margin: 0 }}>Essential cookies are required for the website to function.</p>
      <Divider spacing="md" />
      <p style={{ margin: 0 }}>Analytics cookies help us understand how visitors interact.</p>
      <Divider spacing="md" />
      <p style={{ margin: 0 }}>Marketing cookies are used to deliver relevant advertisements.</p>
    </div>
  ),
};

/** All spacing variants */
export const AllSpacings: Story = {
  render: () => (
    <div
      style={{
        width: '340px' /* decorator constraint, no matching token */,
        fontFamily: 'var(--tid-ff-body)',
        fontSize: 'var(--tid-fs-body-sm)',
        color: 'var(--tid-text-secondary)',
      }}
    >
      <p style={{ margin: 0 }}>Small spacing (4px)</p>
      <Divider spacing="sm" />
      <p style={{ margin: 0 }}>Medium spacing (12px)</p>
      <Divider spacing="md" />
      <p style={{ margin: 0 }}>Large spacing (16px)</p>
      <Divider spacing="lg" />
      <p style={{ margin: 0 }}>End of examples</p>
    </div>
  ),
};
