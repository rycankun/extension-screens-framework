/**
 * Typography Foundation Story — TrustID Extension Screen Library
 *
 * Visualizes all typography tokens from tokens.css: font families,
 * font sizes (16-step scale), font weights, letter spacing, and
 * line heights. All values are resolved at runtime via getComputedStyle.
 *
 * @see src/tokens/tokens.css § 3 (Typography) for token definitions
 * @see DIRECTIVES.md § 5.3 for runtime resolution requirement
 */
import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Token Definitions ── */

interface TokenEntry {
  token: string;
  label: string;
  /** Optional sample text override */
  sample?: string;
}

/* ── Font Families ── */

const FONT_FAMILIES: TokenEntry[] = [
  { token: '--tid-ff-body', label: 'Body (Inter)', sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--tid-ff-heading', label: 'Heading (Work Sans)', sample: 'TrustID Extension Screen Library' },
  { token: '--tid-ff-mono', label: 'Monospace', sample: 'var(--tid-brand): #0E6FFF' },
];

/* ── Font Sizes (16-step scale) ── */

const FONT_SIZES: TokenEntry[] = [
  { token: '--tid-fs-4xs', label: '4xs — Smallest' },
  { token: '--tid-fs-3xs', label: '3xs — Sub-tiny' },
  { token: '--tid-fs-2xs', label: '2xs — Tiny badges' },
  { token: '--tid-fs-xs', label: 'xs — Footer, badges' },
  { token: '--tid-fs-sm', label: 'sm — Micro text' },
  { token: '--tid-fs-body-sm', label: 'body-sm — Sublabels' },
  { token: '--tid-fs-body', label: 'body — Descriptions' },
  { token: '--tid-fs-base', label: 'base — Default (14px)' },
  { token: '--tid-fs-input', label: 'input — Input fields' },
  { token: '--tid-fs-nav', label: 'nav — Navigation' },
  { token: '--tid-fs-lg', label: 'lg — Section headings' },
  { token: '--tid-fs-xl', label: 'xl — Banner headings' },
  { token: '--tid-fs-2xl', label: '2xl — Large display' },
  { token: '--tid-fs-3xl', label: '3xl — Hero titles' },
  { token: '--tid-fs-4xl', label: '4xl — StreamVault hero' },
  { token: '--tid-fs-display', label: 'display — Rankings' },
];

/* ── Font Weights ── */

const FONT_WEIGHTS: TokenEntry[] = [
  { token: '--tid-fw-regular', label: 'Regular (400)', sample: 'This text uses regular weight — the default for body copy.' },
  { token: '--tid-fw-medium', label: 'Medium (500)', sample: 'This text uses medium weight — the maximum per brand rules.' },
];

/* ── Letter Spacing ── */

const LETTER_SPACINGS: TokenEntry[] = [
  { token: '--tid-ls-tight', label: 'Tight — Headings, logos' },
  { token: '--tid-ls-normal', label: 'Normal — Body text' },
  { token: '--tid-ls-wide', label: 'Wide — Buttons, labels' },
  { token: '--tid-ls-caps', label: 'Caps — Uppercase badges' },
];

/* ── Line Heights ── */

const LINE_HEIGHTS: TokenEntry[] = [
  { token: '--tid-lh-tight', label: 'Tight — Single-line compact' },
  { token: '--tid-lh-compact', label: 'Compact — Buttons' },
  { token: '--tid-lh-snug', label: 'Snug — Toggle labels' },
  { token: '--tid-lh-normal', label: 'Normal — Standard' },
  { token: '--tid-lh-body', label: 'Body — Paragraphs' },
  { token: '--tid-lh-relaxed', label: 'Relaxed — Legal text' },
  { token: '--tid-lh-loose', label: 'Loose — Input fields' },
  { token: '--tid-lh-heading', label: 'Heading — Section headings' },
  { token: '--tid-lh-display', label: 'Display — Banner headings' },
];

/* ── Helpers ── */

function getTokenValue(token: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
}

/** Hook that resolves a token value and re-resolves on theme change */
function useTokenValue(token: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(getTokenValue(token));
  }, [token]);

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

  return value;
}

/* ── Section Components ── */

/** Section heading with divider */
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

/** Font family showcase row */
function FontFamilyRow({ token, label, sample }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        marginBottom: 'var(--tid-sp-12)',
        padding: 'var(--tid-sp-8)',
        backgroundColor: 'var(--tid-surface)',
        borderRadius: 'var(--tid-radius-md)',
        border: 'var(--tid-border-width) solid var(--tid-border)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--tid-sp-4)' }}>
        <span
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-base)',
            fontWeight: 'var(--tid-fw-medium)',
            color: 'var(--tid-ink)',
          }}
        >
          {label}
        </span>
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
      <p
        style={{
          fontFamily: `var(${token})`,
          fontSize: 'var(--tid-fs-lg)',
          color: 'var(--tid-text-body)',
          margin: 0,
          lineHeight: 'var(--tid-lh-heading)',
        }}
      >
        {sample}
      </p>
    </div>
  );
}

/** Font size scale row */
function FontSizeRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--tid-sp-8)',
        paddingBottom: 'var(--tid-sp-4)',
        marginBottom: 'var(--tid-sp-4)',
        borderBottom: 'var(--tid-border-width) solid var(--tid-border-light)',
      }}
    >
      <div style={{ width: 200, flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'var(--tid-ff-mono)',
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
          }}
        >
          {token}
        </div>
        <div
          style={{
            fontFamily: 'var(--tid-ff-body)',
            fontSize: 'var(--tid-fs-xs)',
            color: 'var(--tid-text-muted)',
          }}
        >
          {value}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: `var(${token})`,
          fontWeight: 'var(--tid-fw-regular)',
          color: 'var(--tid-ink)',
          lineHeight: 1.3,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Weight showcase row */
function WeightRow({ token, label, sample }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div style={{ marginBottom: 'var(--tid-sp-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--tid-sp-4)', alignItems: 'baseline', marginBottom: 'var(--tid-sp-2)' }}>
        <span style={{ fontFamily: 'var(--tid-ff-body)', fontSize: 'var(--tid-fs-base)', fontWeight: 'var(--tid-fw-medium)', color: 'var(--tid-ink)' }}>
          {label}
        </span>
        <code style={{ fontFamily: 'var(--tid-ff-mono)', fontSize: 'var(--tid-fs-xs)', color: 'var(--tid-text-secondary)' }}>
          {token}: {value}
        </code>
      </div>
      <p
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          fontWeight: `var(${token})`,
          color: 'var(--tid-text-body)',
          margin: 0,
          lineHeight: 'var(--tid-lh-relaxed)',
        }}
      >
        {sample}
      </p>
    </div>
  );
}

/** Letter spacing showcase row */
function LetterSpacingRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-8)',
        marginBottom: 'var(--tid-sp-4)',
        paddingBottom: 'var(--tid-sp-4)',
        borderBottom: 'var(--tid-border-width) solid var(--tid-border-light)',
      }}
    >
      <div style={{ width: 180, flexShrink: 0 }}>
        <code style={{ fontFamily: 'var(--tid-ff-mono)', fontSize: 'var(--tid-fs-body-sm)', color: 'var(--tid-text-secondary)' }}>
          {token}
        </code>
        <div style={{ fontFamily: 'var(--tid-ff-mono)', fontSize: 'var(--tid-fs-xs)', color: 'var(--tid-text-muted)' }}>
          {value}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          letterSpacing: `var(${token})`,
          color: 'var(--tid-ink)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Line height showcase row */
function LineHeightRow({ token, label }: TokenEntry) {
  const value = useTokenValue(token);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tid-sp-8)',
        marginBottom: 'var(--tid-sp-4)',
        paddingBottom: 'var(--tid-sp-4)',
        borderBottom: 'var(--tid-border-width) solid var(--tid-border-light)',
      }}
    >
      <div style={{ width: 180, flexShrink: 0 }}>
        <code style={{ fontFamily: 'var(--tid-ff-mono)', fontSize: 'var(--tid-fs-body-sm)', color: 'var(--tid-text-secondary)' }}>
          {token}
        </code>
        <div style={{ fontFamily: 'var(--tid-ff-mono)', fontSize: 'var(--tid-fs-xs)', color: 'var(--tid-text-muted)' }}>
          {value}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--tid-ff-body)',
          fontSize: 'var(--tid-fs-base)',
          lineHeight: `var(${token})`,
          color: 'var(--tid-ink)',
          backgroundColor: 'var(--tid-surface-subtle)',
          padding: '0 var(--tid-sp-4)',
          borderRadius: 'var(--tid-radius-xs)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Main Story Component ── */

function TypographyStory() {
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
        Typography Tokens
      </h1>
      <p
        style={{
          fontSize: 'var(--tid-fs-base)',
          color: 'var(--tid-text-body)',
          margin: '0 0 var(--tid-sp-16) 0',
          lineHeight: 'var(--tid-lh-relaxed)',
        }}
      >
        Font families, sizes, weights, letter spacing, and line heights.
        All values resolved at runtime from CSS custom properties.
      </p>

      {/* Font Families */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Font Families</SectionHeading>
        {FONT_FAMILIES.map((entry) => (
          <FontFamilyRow key={entry.token} {...entry} />
        ))}
      </div>

      {/* Font Sizes */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Font Size Scale</SectionHeading>
        {FONT_SIZES.map((entry) => (
          <FontSizeRow key={entry.token} {...entry} />
        ))}
      </div>

      {/* Font Weights */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Font Weights</SectionHeading>
        <p
          style={{
            fontSize: 'var(--tid-fs-body-sm)',
            color: 'var(--tid-text-secondary)',
            margin: '0 0 var(--tid-sp-8) 0',
            lineHeight: 'var(--tid-lh-relaxed)',
          }}
        >
          Maximum weight is 500 (Medium) per TrustID brand rules.
        </p>
        {FONT_WEIGHTS.map((entry) => (
          <WeightRow key={entry.token} {...entry} />
        ))}
      </div>

      {/* Letter Spacing */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Letter Spacing</SectionHeading>
        {LETTER_SPACINGS.map((entry) => (
          <LetterSpacingRow key={entry.token} {...entry} />
        ))}
      </div>

      {/* Line Heights */}
      <div style={{ marginBottom: 'var(--tid-sp-16)' }}>
        <SectionHeading>Line Heights</SectionHeading>
        {LINE_HEIGHTS.map((entry) => (
          <LineHeightRow key={entry.token} {...entry} />
        ))}
      </div>
    </div>
  );
}

/* ── Story Meta ── */

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj;

/** Full typography system — families, sizes, weights, spacing, line heights */
export const AllTypography: Story = {
  render: () => <TypographyStory />,
};
