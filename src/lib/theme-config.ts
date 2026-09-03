export interface AccessibilitySettings {
  highContrast: boolean;
  dyslexiaFont: boolean;
  fontSizeScale: 'sm' | 'md' | 'lg' | 'xl';
  reduceMotion: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  dyslexiaFont: false,
  fontSizeScale: 'md',
  reduceMotion: false,
  colorBlindMode: 'none',
};

const ACCESSIBILITY_STORAGE_KEY = 'veda_accessibility_prefs';

export function getStoredAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === 'undefined') return DEFAULT_ACCESSIBILITY_SETTINGS;
  try {
    const raw = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    return raw ? { ...DEFAULT_ACCESSIBILITY_SETTINGS, ...JSON.parse(raw) } : DEFAULT_ACCESSIBILITY_SETTINGS;
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
    applyAccessibilityToDOM(settings);
  } catch (e) {
    console.error('Failed to save accessibility settings', e);
  }
}

export function applyAccessibilityToDOM(settings: AccessibilitySettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (settings.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  if (settings.dyslexiaFont) {
    root.classList.add('font-dyslexic');
  } else {
    root.classList.remove('font-dyslexic');
  }

  if (settings.reduceMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }
}
