/**
 * FormGroup — Molecule Component
 *
 * Composes a label, Input atom, and conditional error message into
 * a single form field unit. Used by email capture, DOB entry, cookie
 * email, and other screens that collect user input.
 *
 * @see docs/PRD.md § 3.2 — FormGroup specification
 * @see src/components/atoms/Input/Input.tsx — Input atom dependency
 */
import React, { useId } from 'react';
import { Input } from '../../atoms/Input/Input';
import styles from './FormGroup.module.css';

/* ── Props ── */

export interface FormGroupProps {
  /** Label text displayed above the input */
  label: string;
  /** Input value (controlled) */
  value?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** HTML input type */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Error message — shows below input when present */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Callback when input value changes */
  onChange?: (value: string) => void;
  /** HTML name attribute for form integration */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
}

/* ── Component ── */

export function FormGroup({
  label,
  value,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  onChange,
  name,
  required = false,
}: FormGroupProps) {
  const id = useId();

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        type={type}
        error={error}
        disabled={disabled}
        onChange={onChange}
        name={name}
        required={required}
        ariaLabel={label}
      />
    </div>
  );
}

export default FormGroup;
