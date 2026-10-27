import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

// Global single source of truth across all components
let currentTheme: Theme = (() => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
  } catch {
    // fallback
  }
  return 'dark';
})();

const listeners = new Set<(theme: Theme) => void>();

function applyThemeToDOM(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // ignore
  }
}

// Initial sync on module load
if (typeof document !== 'undefined') {
  applyThemeToDOM(currentTheme);
}

function broadcastTheme(newTheme: Theme) {
  currentTheme = newTheme;
  applyThemeToDOM(newTheme);
  listeners.forEach(fn => fn(newTheme));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  useEffect(() => {
    // Subscribe to global theme changes across components
    const handler = (newTheme: Theme) => {
      setThemeState(newTheme);
    };
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  // Listen to system preference changes if user hasn't explicitly set one
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const hasStored = localStorage.getItem('theme');
      if (!hasStored) {
        broadcastTheme(e.matches ? 'dark' : 'light');
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    broadcastTheme(newTheme);
  };

  const toggle = () => {
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    broadcastTheme(nextTheme);
  };

  return { 
    theme, 
    setTheme, 
    toggle, 
    toggleTheme: toggle 
  };
}
