/**
 * Public API — TrustID Extension Screen Library
 *
 * Barrel export for all public components, constants, types, hooks, and utilities.
 * Consumers import from this entry point: import { ConsentEU } from 'trustid-extension-screens'
 *
 * @see vite.config.ts where this is configured as the library entry point
 */

/* ── Constants ── */
export * from './constants';

/* ── Types ── */
export * from './types';

/* ── Hooks ── */
export { useFocusTrap } from './hooks/useFocusTrap';
export { useTheme } from './hooks/useTheme';
export { useJurisdiction } from './hooks/useJurisdiction';

/* ── Atoms ── */
export { Button } from './components/atoms/Button/Button';
export { Input } from './components/atoms/Input/Input';
export { Toggle } from './components/atoms/Toggle/Toggle';
export { Checkbox } from './components/atoms/Checkbox/Checkbox';
export { Radio } from './components/atoms/Radio/Radio';
export { Badge } from './components/atoms/Badge/Badge';
export { Icon } from './components/atoms/Icon/Icon';
export { Link } from './components/atoms/Link/Link';
export { Spinner } from './components/atoms/Spinner/Spinner';
export { Divider } from './components/atoms/Divider/Divider';

/* ── Molecules ── */
export { DialogHeader } from './components/molecules/DialogHeader/DialogHeader';
export { FormGroup } from './components/molecules/FormGroup/FormGroup';
export { ConsentToggle } from './components/molecules/ConsentToggle/ConsentToggle';
export { ToggleRow } from './components/molecules/ToggleRow/ToggleRow';
export { OtpInput } from './components/molecules/OtpInput/OtpInput';
export { BackArrow } from './components/molecules/BackArrow/BackArrow';
export { PoweredBadge } from './components/molecules/PoweredBadge/PoweredBadge';
export { SocialProof } from './components/molecules/SocialProof/SocialProof';
export { LegalNotice } from './components/molecules/LegalNotice/LegalNotice';
export { TabBar } from './components/molecules/TabBar/TabBar';
export { StepIndicator } from './components/molecules/StepIndicator/StepIndicator';
export { ProgressDots } from './components/molecules/ProgressDots/ProgressDots';
export { CheckboxRow } from './components/molecules/CheckboxRow/CheckboxRow';

/* ── Organisms ── */
export { BannerShell } from './components/organisms/BannerShell/BannerShell';
export { OverlayShell } from './components/organisms/OverlayShell/OverlayShell';
export { ToastContainer } from './components/organisms/ToastContainer/ToastContainer';

/* ── Screens: Consent ── */
export { ConsentEU } from './components/screens/consent/ConsentEU';
export { ConsentUS } from './components/screens/consent/ConsentUS';
export { ConsentUSStd } from './components/screens/consent/ConsentUSStd';

/* ── Screens: Authentication ── */
export { EmailCapture } from './components/screens/authentication/EmailCapture';
export { OtpEntry } from './components/screens/authentication/OtpEntry';
export { OtpError } from './components/screens/authentication/OtpError';
export { EmailConfirm } from './components/screens/authentication/EmailConfirm';
export { PasskeySetup } from './components/screens/authentication/PasskeySetup';
export { PasskeyVerify } from './components/screens/authentication/PasskeyVerify';

/* ── Screens: Preferences ── */
export { CookiePrefs } from './components/screens/preferences/CookiePrefs';
export { CookieEmail } from './components/screens/preferences/CookieEmail';
export { DnsConfirm } from './components/screens/preferences/DnsConfirm';
export { SharingSettings } from './components/screens/preferences/SharingSettings';
export { DsrIntake } from './components/screens/preferences/DsrIntake';
