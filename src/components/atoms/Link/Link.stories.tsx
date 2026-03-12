/**
 * Link Stories — Atom Component
 *
 * Showcases link variants (internal, external), sizes, and states.
 *
 * @see src/components/atoms/Link/Link.tsx for implementation
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {
    external: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

/** Default internal link — brand-blue, underline on hover */
export const Default: Story = {
  args: {
    href: '#',
    children: 'Skip for now',
  },
};

/** Medium size link */
export const Medium: Story = {
  args: {
    href: '#',
    children: 'Manage preferences',
    size: 'md',
  },
};

/** External link — opens in new tab with indicator icon */
export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'Privacy Policy',
    external: true,
  },
};

/** External link in medium size */
export const ExternalMedium: Story = {
  args: {
    href: 'https://example.com',
    children: 'Terms of Service',
    external: true,
    size: 'md',
  },
};

/** Link used inline within body text */
export const InlineContext: Story = {
  render: () => (
    <p
      style={{
        fontFamily: 'var(--tid-ff-body)',
        fontSize: 'var(--tid-fs-body-sm)',
        color: 'var(--tid-text-body)',
        lineHeight: 'var(--tid-lh-snug)',
        margin: 0,
      }}
    >
      By continuing, you agree to the{' '}
      <Link href="#">Terms of Service</Link> and{' '}
      <Link href="#" external>
        Privacy Policy
      </Link>
      .
    </p>
  ),
};
