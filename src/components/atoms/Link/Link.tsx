/**
 * Link — Atom Component
 *
 * Semantic `<a>` element styled with brand colors. Supports external
 * links (opens in new tab with security attributes) and an optional
 * external indicator icon.
 *
 * @see docs/PRD.md § 3.1 — Link specification
 * @see docs/reference/ — Predecessor link styles
 */
import React from 'react';
import styles from './Link.module.css';

/* ── Props ── */

export interface LinkProps {
  /** Link destination URL */
  href: string;
  /** Link text content */
  children: React.ReactNode;
  /** Whether the link opens in a new tab (adds rel="noopener noreferrer") */
  external?: boolean;
  /** Click handler for analytics or internal navigation */
  onClick?: () => void;
  /** Optional CSS class for custom styling */
  className?: string;
  /** Accessible label override (defaults to children text) */
  ariaLabel?: string;
  /** Visual size variant */
  size?: 'sm' | 'md';
}

/* ── Component ── */

export function Link({
  href,
  children,
  external = false,
  onClick,
  className,
  ariaLabel,
  size = 'sm',
}: LinkProps) {
  return (
    <a
      href={href}
      className={`${styles.link} ${styles[size]} ${className || ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
      {external && (
        <svg
          className={styles.externalIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </a>
  );
}

export default Link;
