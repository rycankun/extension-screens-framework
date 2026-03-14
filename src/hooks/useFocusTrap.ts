/**
 * useFocusTrap — Focus Management Hook
 *
 * Traps keyboard focus within a container element (WCAG 2.4.3 Focus Order).
 * Used by BannerShell and OverlayShell to prevent Tab from escaping
 * dialog containers. On mount, focuses the first focusable element.
 *
 * This is a lightweight alternative to focus-trap-react, keeping the
 * dependency count low for a component library.
 *
 * @see DIRECTIVES.md § 7.2 — Screen-level a11y requirements
 */
import { useEffect, useRef } from 'react';

/** Selector for all focusable elements within a container */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(', ');

/**
 * Traps focus within the referenced container element.
 *
 * @param active - Whether the trap is active (default: true)
 * @returns A ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  active = true,
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    /* Focus the first focusable element on mount */
    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    /* Trap Tab/Shift+Tab within the container */
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !container) return;

      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        /* Shift+Tab on first element → wrap to last */
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        /* Tab on last element → wrap to first */
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  return containerRef;
}
