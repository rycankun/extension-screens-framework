/**
 * OverlayShell Stories — Organism Component
 *
 * Showcases the full-viewport overlay shell with dark gradient
 * backdrop and centered content card. Each story demonstrates a
 * different overlay content configuration.
 *
 * @see src/components/organisms/OverlayShell/OverlayShell.tsx for implementation
 * @see docs/PRD.md § 3.3 — OverlayShell specification
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OverlayShell } from './OverlayShell';
import { SCREENS, SCREEN_TITLES } from '../../../constants/screens';

const meta: Meta<typeof OverlayShell> = {
  title: 'Organisms/OverlayShell',
  component: OverlayShell,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    screenId: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof OverlayShell>;

/** Default overlay with age gate content */
export const Default: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.AGE_GATE_COVER],
    screenId: SCREENS.AGE_GATE_COVER,
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--tid-sp-6)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--tid-ff-heading)',
            fontSize: 'var(--tid-fs-3xl)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
            margin: 'var(--tid-sp-0)',
            letterSpacing: 'var(--tid-ls-tight)',
          }}
        >
          Age Verification Required
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
          You must verify your age to access this content.
        </p>
      </div>
    ),
  },
};

/** QR verification overlay */
export const QrVerify: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.QR_VERIFY],
    screenId: SCREENS.QR_VERIFY,
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--tid-sp-8)',
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
          Scan QR Code
        </h2>
        {/* QR code placeholder */}
        <div
          style={{
            width: 'var(--tid-size-qr-code)',
            height: 'var(--tid-size-qr-code)',
            backgroundColor: 'var(--tid-surface-raised)',
            borderRadius: 'var(--tid-radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          QR Code
        </div>
        <p
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-body)',
            color: 'var(--tid-text-secondary)',
            margin: 'var(--tid-sp-0)',
            lineHeight: 'var(--tid-lh-relaxed)',
          }}
        >
          Scan with your mobile device to verify your identity.
        </p>
      </div>
    ),
  },
};

/** Minimal content overlay */
export const Minimal: Story = {
  args: {
    ariaLabel: SCREEN_TITLES[SCREENS.SLC_KYC],
    screenId: SCREENS.SLC_KYC,
    children: (
      <p
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          margin: 'var(--tid-sp-0)',
          lineHeight: 'var(--tid-lh-body)',
          padding: 'var(--tid-sp-8)',
        }}
      >
        Overlay content slot
      </p>
    ),
  },
};
