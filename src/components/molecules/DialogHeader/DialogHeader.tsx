/**
 * DialogHeader — Molecule Component
 *
 * Standard header for all 27 banner screens. Displays the host site
 * logo image (e.g., StreamVault lockup) on the left and a close button
 * on the right. Optionally shows a BackArrow before the logo for
 * sub-screens that navigate back (OTP entry, cookie email, etc.).
 *
 * The logo defaults to the StreamVault brand lockup (the demo host site).
 * In dark mode, the logo is inverted to white via CSS filter.
 *
 * This is the SINGLE SOURCE OF TRUTH for header layout + close button
 * markup. Screen components should compose this molecule rather than
 * duplicating header/close button markup inline.
 *
 * Predecessor ref: .logo, .logo-left, .logo-img, .close-btn in components.css:335-408
 *
 * @see docs/PRD.md § 3.2 — DialogHeader specification
 * @see src/components/atoms/Icon/Icon.tsx — Icon atom (close button)
 * @see src/components/molecules/BackArrow/BackArrow.tsx — BackArrow molecule
 */
import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { BackArrow } from '../BackArrow/BackArrow';
import styles from './DialogHeader.module.css';

/* ── Props ── */

export interface DialogHeaderProps {
  /** Source path for the host site logo image */
  logoSrc?: string;
  /** Alt text for the host site logo (accessibility) */
  logoAlt?: string;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Whether to show the close button (default true) */
  showClose?: boolean;
  /** Whether to show a back arrow before the logo */
  showBackArrow?: boolean;
  /** Callback when back arrow is clicked */
  onBack?: () => void;
}

/* ── Default Values ──
   StreamVault is the fictional demo host site. Default logo path points
   to the provided brand lockup SVG in public/assets/. */
const DEFAULT_LOGO_SRC = '/assets/StreamVault-BrandLockup-Primary.svg';
const DEFAULT_LOGO_ALT = 'StreamVault';

/* ── Component ── */

export function DialogHeader({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = DEFAULT_LOGO_ALT,
  onClose,
  showClose = true,
  showBackArrow = false,
  onBack,
}: DialogHeaderProps) {
  return (
    <header className={styles.header}>
      {/* ── Logo Left Group ──
          Contains the optional BackArrow and the host site logo image.
          When showBackArrow is true, the BackArrow appears before the logo,
          matching the predecessor .logo-left layout for sub-screens. */}
      <div className={styles.logoLeft}>
        {showBackArrow && <BackArrow onClick={onBack} />}
        <img
          className={styles.logoImg}
          src={logoSrc}
          alt={logoAlt}
        />
      </div>

      {/* ── Close Button ──
          44px touch target with 16px icon. Negative right margin aligns
          the icon edge with content padding (predecessor pattern). */}
      {showClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </header>
  );
}

export default DialogHeader;
