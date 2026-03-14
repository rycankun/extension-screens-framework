/**
 * OtpInput — Molecule Component
 *
 * Six single-digit input fields for OTP (one-time password) entry.
 * Supports auto-advance on digit entry, backward navigation on
 * backspace, and paste distribution across all fields.
 *
 * @see docs/PRD.md § 3.2 — OtpInput specification
 * @see docs/PRD.md § 4.2 — OTP Entry screen layout
 */
import React, { useRef, useCallback } from 'react';
import { OTP_LENGTH } from '../../../constants/auth';
import styles from './OtpInput.module.css';

/* ── Props ── */

export interface OtpInputProps {
  /** Current OTP value as a string (up to 6 characters) */
  value: string;
  /** Callback when OTP value changes */
  onChange: (value: string) => void;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
}

/* ── Component ── */

export function OtpInput({
  value,
  onChange,
  error = false,
  disabled = false,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /** Set ref for each input cell */
  const setRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    [],
  );

  /** Handle single digit entry with auto-advance */
  const handleInput = (index: number, inputValue: string) => {
    /* Accept only digits */
    const digit = inputValue.replace(/\D/g, '').slice(-1);
    if (!digit) return;

    const chars = value.split('');
    chars[index] = digit;
    const newValue = chars.join('').slice(0, OTP_LENGTH);
    onChange(newValue);

    /* Auto-advance to next field */
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /** Handle backspace navigation */
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const chars = value.split('');
      if (chars[index]) {
        /* Clear current cell */
        chars[index] = '';
        onChange(chars.join(''));
      } else if (index > 0) {
        /* Move focus to previous cell and clear it */
        chars[index - 1] = '';
        onChange(chars.join(''));
        inputRefs.current[index - 1]?.focus();
      }
      e.preventDefault();
    }
  };

  /** Handle paste: distribute digits across cells */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted) {
      onChange(pasted);
      /* Focus the cell after the last pasted digit */
      const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div
      className={styles.container}
      role="group"
      aria-label="Verification code"
    >
      {Array.from({ length: OTP_LENGTH }, (_, i) => (
        <input
          key={i}
          ref={setRef(i)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          className={`${styles.cell} ${error ? styles.error : ''}`}
          value={value[i] || ''}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}

export default OtpInput;
