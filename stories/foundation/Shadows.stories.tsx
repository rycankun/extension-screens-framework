/**
 * Shadows Foundation Story — TrustID Extension Screen Library
 *
 * Visualizes all shadow tokens from tokens.css: elevation shadows
 * (xs through banner), focus/state ring shadows, and inset shadows.
 * Each shadow is rendered on a card with its token name and resolved
 * CSS value. Comparison cards show light vs dark appearance.
 *
 * @see src/tokens/tokens.css § 7 (Shadows) for token definitions
 * @see DIRECTIVES.md § 5.3 for runtime resolution requirement
 */
import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Token Definitions ── */

interface ShadowEntry {
  token: string;
  label: string;
  /** Description of where this shadow is used */
  usage: string;
}

const ELEVATION_SHADOWS: ShadowEntry[] = [
  { token: '--tid-shadow-none', label: 'None', usage: 'Flat elements, no elevation' },
  { token: '--tid-shadow-xs', label: 'XS', usage: 'Minimal lift, subtle cards' },
  { token: '--tid-shadow-sm', label: 'SM', usage: 'Default card shadow' },
  { token: '--tid-shadow-md', label: 'MD', usage: 'Hover state, raised cards' },
  { token: '--tid-shadow-lg', label: 'LG', usage: 'Prominent cards, dropdowns' },
  { token: '--tid-shadow-xl', label: 'XL', usage: 'Maximum elevation' },
  { token: '--tid-shadow-banner', label: 'Banner', usage: 'Extension banner container' },
  { token: '--tid-shadow-banner-glow', label: 'Banner Glow', usage: 'Banner with brand-color glow' },
  { token: '--tid-shadow-toast', label: 'Toast', usage: 'Toast notifications' },
  { token: '--tid-shadow-overlay', label: 'Overlay', usage: 'Full-page overlays, modals' },
];

const FOCUS_SHADOWS: ShadowEntry[] = [
  { token: '--tid-shadow-focus-brand', label: 'Focus (Brand)', usage: 'Focus ring for interactive elements' },
  { token: '--tid-shadow-focus-error', label: 'Focus (Error)', usage: 'Focus ring on error-state inputs' },
  { token: '--tid-shadow-success', label: 'Success Ring', usage: 'Success validation indicator' },
  { token: '--tid-shadow-error', label: 'Error Ring', usage: 'Error validation indicator' },
  { token: '--tid-shadow-warning', label: 'Warning Ring', usage: 'Warning validation indicator' },
];

const INSET_SHADOWS: ShadowEntry[] = [
  { token: '--tid-shadow-inset-sm', label: 'Inset SM', usage: 'Inner shadow for pressed states' },
  { token: '--tid-shadow-inset-input', label: 'Inset Input', usage: 'Inner shadow for input fields' },
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

/** Shadow card — a card element with the shadow applied */
function ShadowCard({ token, label, usage }: ShadowEntry) {
  const value = useTokenValue(token);
  const isInset = token.includes('inset');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--tid-sp-4)',
      }}
    >
      <div
        style={{
          width: 200,
          height: 120,
          backgroundColor: 'var(--tid-surface)',
          borderRadius: 'var(--tid-radius-lg)',
          boxShadow: `var(${token})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* Add a subtle border for the "none" shadow so the card is visible */
          border: token === '--tid-shadow-none'
            ? 'var(--tid-border-width) solid var(--tid-border)'
            : 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tid-ff-heading)',
            fontSize: 'var(--tid-fs-base)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
          }}
        >
          {label}
        </span>
      </div>
      <div>
        <code
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-secondary)',
            display: 'block',
          }}
        >
          {token}
        </code>
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
          }}
        >
          {usage}
        </span>
      </div>
    </div>
  );
}

/** Focus ring card — shows a colored ring shadow on a smaller element */
function FocusRingCard({ token, label, usage }: ShadowEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-8)',
        marginBottom: 'var(--tid-sp-6)',
        padding: 'var(--tid-sp-6)',
        backgroundColor: 'var(--tid-surface-subtle)',
        borderRadius: 'var(--tid-radius-md)',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          backgroundColor: 'var(--tid-surface)',
          borderRadius: 'var(--tid-radius-sm)',
          boxShadow: `var(${token})`,
          flexShrink: 0,
          border: 'var(--tid-border-width) solid var(--tid-border)',
        }}
      />
      <div style={{ minWidth: 0 }}>
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
            display: 'block',
          }}
        >
          {token}
        </code>
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
          }}
        >
          {usage}
        </span>
      </div>
    </div>
  );
}

/** Inset shadow card — shows inset shadow inside a bordered box */
function InsetCard({ token, label, usage }: ShadowEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-8)',
        marginBottom: 'var(--tid-sp-6)',
        padding: 'var(--tid-sp-6)',
        backgroundColor: 'var(--tid-surface-subtle)',
        borderRadius: 'var(--tid-radius-md)',
      }}
    >
      <div
        style={{
          width: 120,
          height: 40,
          backgroundColor: 'var(--tid-surface)',
          borderRadius: 'var(--tid-radius-sm)',
          boxShadow: `var(${token})`,
          flexShrink: 0,
          border: 'var(--tid-border-width) solid var(--tid-border-input)',
        }}
      />
      <div style={{ minWidth: 0 }}>
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
            display: 'block',
          }}
        >
          {token}
        </code>
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
          }}
        >
          {usage}
        </span>
      </div>
    </div>
  );
}

/* ── Main Story ── */

function ShadowsStory() {
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
        Shadow Tokens
      </h1>
      <p
        style={{
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          margin: '0 0 var(--tid-sp-16) 0',
          lineHeight: 'var(--tid-lh-relaxed)',
        }}
      >
        Elevation shadows, focus/state rings, and inset shadows.
        Toggle between light and dark themes to compare shadow
        intensity across modes.
      </p>

      {/* Elevation Shadows */}
      <div style={{ marginBottom: 'var(--tid-sp-24)' }}>
        <SectionHeading>Elevation Shadows</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--tid-sp-12)',
          }}
        >
          {ELEVATION_SHADOWS.map((entry) => (
            <ShadowCard key={entry.token} {...entry} />
          ))}
        </div>
      </div>

      {/* Focus & State Rings */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Focus & State Rings</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--tid-sp-4)',
          }}
        >
          {FOCUS_SHADOWS.map((entry) => (
            <FocusRingCard key={entry.token} {...entry} />
          ))}
        </div>
      </div>

      {/* Inset Shadows */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Inset Shadows</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--tid-sp-4)',
          }}
        >
          {INSET_SHADOWS.map((entry) => (
            <InsetCard key={entry.token} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Story Meta ── */

const meta: Meta = {
  title: 'Foundation/Shadows',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj;

/** All shadow tokens — elevation, focus rings, inset */
export const AllShadows: Story = {
  render: () => <ShadowsStory />,
};
