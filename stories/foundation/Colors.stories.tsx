/**
 * Colors Foundation Story — TrustID Extension Screen Library
 *
 * Visualizes all color tokens from tokens.css as swatches grouped by
 * category: Text, Brand & Status, Surfaces, Buttons & Toggles, Borders.
 * All values are resolved at runtime via getComputedStyle — ZERO hardcoded
 * hex values in this file.
 *
 * Switch between light and dark themes using the toolbar toggle to see
 * how every color adapts across modes.
 *
 * @see src/tokens/tokens.css § 1 (Colors) for token definitions
 * @see DIRECTIVES.md § 5.3 for runtime resolution requirement
 */
import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Token Definitions ──
   Each group defines the tokens to display. Labels describe usage;
   actual hex values are resolved at runtime from the DOM. */

interface TokenEntry {
  /** CSS custom property name (e.g., '--tid-brand') */
  token: string;
  /** Human-readable label */
  label: string;
}

interface TokenGroup {
  /** Category heading */
  title: string;
  /** Tokens in this category */
  tokens: TokenEntry[];
}

const COLOR_GROUPS: TokenGroup[] = [
  {
    title: 'Text Colors',
    tokens: [
      { token: '--tid-ink', label: 'Ink (Primary)' },
      { token: '--tid-text-body', label: 'Body' },
      { token: '--tid-text-secondary', label: 'Secondary' },
      { token: '--tid-text-muted', label: 'Muted (WCAG AA)' },
      { token: '--tid-text-tertiary', label: 'Tertiary' },
      { token: '--tid-text-micro', label: 'Micro' },
      { token: '--tid-text-disabled', label: 'Disabled' },
      { token: '--tid-text-footer', label: 'Footer' },
      { token: '--tid-text-nav', label: 'Navigation' },
    ],
  },
  {
    title: 'Brand & Status',
    tokens: [
      { token: '--tid-brand', label: 'Brand (Primary)' },
      { token: '--tid-brand-dark', label: 'Brand Dark (Hover)' },
      { token: '--tid-brand-dark-hover', label: 'Brand Dark Hover (Active)' },
      { token: '--tid-icon-on-color', label: 'Icon on Color' },
      { token: '--tid-success', label: 'Success' },
      { token: '--tid-success-light', label: 'Success Light' },
      { token: '--tid-success-verified', label: 'Success Verified' },
      { token: '--tid-error', label: 'Error' },
      { token: '--tid-error-light', label: 'Error Light' },
      { token: '--tid-warning', label: 'Warning' },
      { token: '--tid-warning-light', label: 'Warning Light' },
      { token: '--tid-info', label: 'Info' },
    ],
  },
  {
    title: 'Surfaces',
    tokens: [
      { token: '--tid-page-bg', label: 'Page Background' },
      { token: '--tid-surface', label: 'Surface (Cards)' },
      { token: '--tid-surface-raised', label: 'Surface Raised' },
      { token: '--tid-surface-subtle', label: 'Surface Subtle' },
      { token: '--tid-surface-site', label: 'Surface Site' },
    ],
  },
  {
    title: 'Buttons & Toggles',
    tokens: [
      { token: '--tid-btn-primary-bg', label: 'Primary Button BG' },
      { token: '--tid-btn-primary-text', label: 'Primary Button Text' },
      { token: '--tid-btn-secondary-bg', label: 'Secondary Button BG' },
      { token: '--tid-btn-secondary-text', label: 'Secondary Button Text' },
      { token: '--tid-btn-danger-bg', label: 'Danger Button BG' },
      { token: '--tid-btn-danger-text', label: 'Danger Button Text' },
      { token: '--tid-toggle-off', label: 'Toggle Off Track' },
      { token: '--tid-toggle-knob', label: 'Toggle Knob' },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { token: '--tid-border', label: 'Default Border' },
      { token: '--tid-border-light', label: 'Light Border' },
      { token: '--tid-border-input', label: 'Input Border' },
      { token: '--tid-border-input-hover', label: 'Input Hover' },
      { token: '--tid-border-focus', label: 'Focus Border' },
      { token: '--tid-border-error', label: 'Error Border' },
      { token: '--tid-border-success', label: 'Success Border' },
    ],
  },
];

/* ── Helpers ── */

/** Read a CSS custom property value from the document root at runtime */
function getTokenValue(token: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
}

/* ── Components ── */

/** Single color swatch with token name and resolved hex value */
function ColorSwatch({ token, label }: TokenEntry) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(getTokenValue(token));
  }, [token]);

  /* Re-resolve when theme changes (MutationObserver on data-theme) */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setValue(getTokenValue(token));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, [token]);

  const isTransparent = value === 'transparent' || value === '';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tid-sp-6)' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--tid-radius-md)',
          backgroundColor: isTransparent ? undefined : `var(${token})`,
          border: `var(--tid-border-width) solid var(--tid-border)`,
          flexShrink: 0,
          /* Checkerboard pattern for transparent swatches */
          ...(isTransparent
            ? {
                backgroundImage:
                  'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                backgroundSize: '12px 12px',
                backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
              }
            : {}),
        }}
        title={`${token}: ${value}`}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-base)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
            lineHeight: 'var(--tid-lh-normal)',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
            lineHeight: 'var(--tid-lh-snug)',
          }}
        >
          {token}
        </div>
        <div
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
            lineHeight: 'var(--tid-lh-tight)',
          }}
        >
          {value || '(empty)'}
        </div>
      </div>
    </div>
  );
}

/** A group of color swatches under a category heading */
function ColorGroup({ title, tokens }: TokenGroup) {
  return (
    <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
      <h2
        style={{
          fontFamily: 'var(--tid-ff-heading)',
          fontSize: 'var(--tid-fs-lg)',
          fontWeight: 'var(--tid-fw-medium)',
          color: 'var(--tid-ink)',
          margin: '0 0 var(--tid-sp-8) 0',
          paddingBottom: 'var(--tid-sp-4)',
          borderBottom: 'var(--tid-border-width) solid var(--tid-border)',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--tid-sp-8)',
        }}
      >
        {tokens.map((entry) => (
          <ColorSwatch key={entry.token} {...entry} />
        ))}
      </div>
    </div>
  );
}

/** Full color palette visualization */
function ColorsStory() {
  return (
    <div
      style={{
        fontFamily: 'var(--tid-ff-body)',
        maxWidth: 960,
        padding: 'var(--tid-sp-12)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--tid-ff-heading)',
          fontSize: 'var(--tid-fs-2xl)',
          fontWeight: 'var(--tid-fw-medium)',
          color: 'var(--tid-ink)',
          margin: '0 0 var(--tid-sp-4) 0',
        }}
      >
        Color Tokens
      </h1>
      <p
        style={{
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          margin: '0 0 var(--tid-sp-16) 0',
          lineHeight: 'var(--tid-lh-relaxed)',
        }}
      >
        All color tokens from <code>tokens.css</code>. Values shown are resolved
        at runtime from CSS custom properties. Use the theme toggle in the
        toolbar to compare light and dark mode.
      </p>
      {COLOR_GROUPS.map((group) => (
        <ColorGroup key={group.title} {...group} />
      ))}
    </div>
  );
}

/* ── Story Meta ── */

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj;

/** All color tokens displayed as swatches, grouped by category */
export const AllColors: Story = {
  render: () => <ColorsStory />,
};
