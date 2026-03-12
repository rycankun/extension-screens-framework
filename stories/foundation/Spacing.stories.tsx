/**
 * Spacing Foundation Story — TrustID Extension Screen Library
 *
 * Visualizes the spacing token scale from tokens.css. Each spacing value
 * is rendered as a colored bar with its token name and resolved pixel
 * value. The 4px base unit scale covers every padding, margin, and gap
 * in the UI.
 *
 * Also includes border radius and sizing tokens for completeness.
 *
 * @see src/tokens/tokens.css § 4 (Spacing), § 5 (Radius), § 6 (Sizing)
 * @see DIRECTIVES.md § 5.3 for runtime resolution requirement
 */
import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Token Definitions ── */

interface TokenEntry {
  token: string;
  label: string;
}

const SPACING_TOKENS: TokenEntry[] = [
  { token: '--tid-sp-0', label: '0 — Zero' },
  { token: '--tid-sp-px', label: 'px — Hairline (1px)' },
  { token: '--tid-sp-1', label: '1 — 2px' },
  { token: '--tid-sp-2', label: '2 — 4px' },
  { token: '--tid-sp-3', label: '3 — 6px' },
  { token: '--tid-sp-4', label: '4 — 8px' },
  { token: '--tid-sp-5', label: '5 — 10px' },
  { token: '--tid-sp-6', label: '6 — 12px' },
  { token: '--tid-sp-7', label: '7 — 14px' },
  { token: '--tid-sp-8', label: '8 — 16px' },
  { token: '--tid-sp-9', label: '9 — 18px' },
  { token: '--tid-sp-10', label: '10 — 20px' },
  { token: '--tid-sp-11', label: '11 — 22px' },
  { token: '--tid-sp-12', label: '12 — 24px' },
  { token: '--tid-sp-13', label: '13 — 26px' },
  { token: '--tid-sp-14', label: '14 — 28px' },
  { token: '--tid-sp-16', label: '16 — 32px' },
  { token: '--tid-sp-18', label: '18 — 36px' },
  { token: '--tid-sp-20', label: '20 — 40px' },
  { token: '--tid-sp-22', label: '22 — 44px' },
  { token: '--tid-sp-24', label: '24 — 48px' },
];

const RADIUS_TOKENS: TokenEntry[] = [
  { token: '--tid-radius-xs', label: 'xs — Subtle rounding' },
  { token: '--tid-radius-sm', label: 'sm — Buttons, inputs, cards' },
  { token: '--tid-radius-md', label: 'md — Thumbnails, cards' },
  { token: '--tid-radius-lg', label: 'lg — Larger cards, modals' },
  { token: '--tid-radius-xl', label: 'xl — Toast containers' },
  { token: '--tid-radius-pill', label: 'pill — Pill shapes, badges' },
  { token: '--tid-radius-circle', label: 'circle — Avatars, knobs' },
];

const SIZING_TOKENS: TokenEntry[] = [
  { token: '--tid-size-icon-xs', label: 'Icon XS — Indicators' },
  { token: '--tid-size-icon', label: 'Icon — Standard' },
  { token: '--tid-size-icon-md', label: 'Icon MD — Medium' },
  { token: '--tid-size-icon-lg', label: 'Icon LG — Large' },
  { token: '--tid-size-icon-xl', label: 'Icon XL — State icons' },
  { token: '--tid-size-icon-2xl', label: 'Icon 2XL — Feature icons' },
  { token: '--tid-size-control', label: 'Control — Button height' },
  { token: '--tid-size-control-sm', label: 'Control SM — Compact button' },
  { token: '--tid-size-touch', label: 'Touch — WCAG min target' },
  { token: '--tid-size-banner', label: 'Banner — Extension width' },
];

/* ── Helpers ── */

function getTokenValue(token: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
}

function useTokenValue(token: string): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(getTokenValue(token));
  }, [token]);
  useEffect(() => {
    const observer = new MutationObserver(() => setValue(getTokenValue(token)));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [token]);
  return value;
}

/* ── Components ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </h2>
  );
}

/** Spacing bar — shows a colored bar at the token width plus label */
function SpacingRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-6)',
        marginBottom: 'var(--tid-sp-3)',
      }}
    >
      <div style={{ width: 180, flexShrink: 0 }}>
        <code
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          {token}
        </code>
      </div>
      <div
        style={{
          width: `var(${token})`,
          minWidth: 2,
          height: 24,
          backgroundColor: 'var(--tid-brand)',
          borderRadius: 'var(--tid-radius-xs)',
          opacity: 0.8,
          transition: 'width 0.2s ease',
        }}
        title={`${token}: ${value}`}
      />
      <span
        style={{
          fontFamily: 'var(--tid-ff-mono)',
          fontSize: 'var(--tid-fs-xs)',
          color: 'var(--tid-text-muted)',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** Border radius demo — shows a box with the given radius applied */
function RadiusRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-8)',
        marginBottom: 'var(--tid-sp-6)',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          backgroundColor: 'var(--tid-surface)',
          border: 'var(--tid-border-width-thick) solid var(--tid-brand)',
          borderRadius: `var(${token})`,
          flexShrink: 0,
        }}
        title={`${token}: ${value}`}
      />
      <div>
        <div
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-base)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
          }}
        >
          {label}
        </div>
        <code
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          {token}: {value}
        </code>
      </div>
    </div>
  );
}

/** Sizing demo — horizontal bar at the token dimension */
function SizingRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);
  /* Cap the visual bar width to prevent overflow on large values like banner (380px) */
  const numericValue = parseFloat(value) || 0;
  const barWidth = Math.min(numericValue, 400);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-6)',
        marginBottom: 'var(--tid-sp-3)',
      }}
    >
      <div style={{ width: 200, flexShrink: 0 }}>
        <code
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          {token}
        </code>
        <div
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          width: barWidth,
          minWidth: 2,
          height: 20,
          backgroundColor: 'var(--tid-success)',
          borderRadius: 'var(--tid-radius-xs)',
          opacity: 0.7,
        }}
        title={`${token}: ${value}`}
      />
      <span
        style={{
          fontFamily: 'var(--tid-ff-mono)',
          fontSize: 'var(--tid-fs-xs)',
          color: 'var(--tid-text-muted)',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Main Story ── */

function SpacingStory() {
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
        Spacing, Radius & Sizing Tokens
      </h1>
      <p
        style={{
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          margin: '0 0 var(--tid-sp-16) 0',
          lineHeight: 'var(--tid-lh-relaxed)',
        }}
      >
        Spacing scale (4px base unit), border radii, and fixed sizing tokens.
        All values resolved at runtime from CSS custom properties.
      </p>

      {/* Spacing Scale */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Spacing Scale</SectionHeading>
        {SPACING_TOKENS.map((entry) => (
          <SpacingRow key={entry.token} {...entry} />
        ))}
      </div>

      {/* Border Radius */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Border Radius</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--tid-sp-8)',
          }}
        >
          {RADIUS_TOKENS.map((entry) => (
            <RadiusRow key={entry.token} {...entry} />
          ))}
        </div>
      </div>

      {/* Sizing */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Sizing</SectionHeading>
        {SIZING_TOKENS.map((entry) => (
          <SizingRow key={entry.token} {...entry} />
        ))}
      </div>
    </div>
  );
}

/* ── Story Meta ── */

const meta: Meta = {
  title: 'Foundation/Spacing',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj;

/** Full spacing scale, border radius, and sizing token visualization */
export const AllSpacing: Story = {
  render: () => <SpacingStory />,
};
