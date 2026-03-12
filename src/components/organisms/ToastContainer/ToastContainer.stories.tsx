/**
 * ToastContainer Stories — Organism Component
 *
 * Showcases the 280px floating notification container with different
 * content configurations. Each story represents a toast layout.
 *
 * @see src/components/organisms/ToastContainer/ToastContainer.tsx for implementation
 * @see docs/PRD.md § 3.3 — ToastContainer specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer } from './ToastContainer';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';

const meta: Meta<typeof ToastContainer> = {
  title: 'Organisms/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    screenId: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ToastContainer>;

/** Default toast with welcome-style content */
export const Default: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.TOAST_WELCOME],
    screenId: SCREENS.TOAST_WELCOME,
    children: (
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          lineHeight: 'var(--tid-lh-body)',
        }}
      >
        Welcome back! Your preferences are active.
      </span>
    ),
  },
};

/** Toast with saved confirmation content */
export const Saved: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.TOAST_SAVED],
    screenId: SCREENS.TOAST_SAVED,
    children: (
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          lineHeight: 'var(--tid-lh-body)',
        }}
      >
        Preferences saved successfully.
      </span>
    ),
  },
};

/** Toast with icon and text layout */
export const WithIcon: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.TOAST_MANAGE],
    screenId: SCREENS.TOAST_MANAGE,
    children: (
      <>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.25a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-1.5 0V7.25ZM8 4.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
            fill="var(--tid-brand)"
          />
        </svg>
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-body)',
            lineHeight: 'var(--tid-lh-snug)',
          }}
        >
          Manage your privacy preferences
        </span>
      </>
    ),
  },
};
