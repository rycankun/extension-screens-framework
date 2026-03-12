/**
 * BannerShell Stories — Organism Component
 *
 * Showcases the 380px extension drawer shell with gradient background,
 * decorative blobs, and solid content surface. Each story demonstrates
 * a different content configuration inside the banner.
 *
 * @see src/components/organisms/BannerShell/BannerShell.tsx for implementation
 * @see docs/PRD.md § 3.3 — BannerShell specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BannerShell } from './BannerShell';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';

const meta: Meta<typeof BannerShell> = {
  title: 'Organisms/BannerShell',
  component: BannerShell,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    screenId: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof BannerShell>;

/** Default banner with placeholder content */
export const Default: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.CONSENT_EU],
    screenId: SCREENS.CONSENT_EU,
    children: (
      <div
        style={{
          padding: 'var(--tid-sp-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--tid-sp-4)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--tid-ff-heading)',
            fontSize: 'var(--tid-fs-xl)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
            margin: 'var(--tid-sp-0)',
            letterSpacing: 'var(--tid-ls-tight)',
          }}
        >
          Banner Title
        </h2>
        <p
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-base)',
            color: 'var(--tid-text-body)',
            margin: 'var(--tid-sp-0)',
            lineHeight: 'var(--tid-lh-body)',
          }}
        >
          This is a placeholder content area inside the BannerShell organism.
          Screen components will render their full UI here.
        </p>
      </div>
    ),
  },
};

/** Empty banner showing the shell structure */
export const Empty: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.SUCCESS],
    screenId: SCREENS.SUCCESS,
    children: (
      <div
        style={{
          padding: 'var(--tid-sp-12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--tid-text-secondary)',
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-body-sm)',
        }}
      >
        Empty content slot
      </div>
    ),
  },
};

/** Banner with tall content to show scrolling behavior */
export const TallContent: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.COOKIE_PREFS],
    screenId: SCREENS.COOKIE_PREFS,
    children: (
      <div
        style={{
          padding: 'var(--tid-sp-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--tid-sp-4)',
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: 'var(--tid-sp-4)',
              backgroundColor: 'var(--tid-surface-raised)',
              borderRadius: 'var(--tid-radius-sm)',
              fontFamily: 'var(--tid-ff-body)',
              fontSize: 'var(--tid-fs-body-sm)',
              color: 'var(--tid-text-body)',
            }}
          >
            Content row {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};
