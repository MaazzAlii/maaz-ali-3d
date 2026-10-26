import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // 1st: explicit user preference stored in localStorage (key: "theme")
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;

      // 2nd: prefers-color-scheme media query
      if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      }
    } catch {
      // fallback
    }
    // 3rd: default
    return 'dark';
  });

  const applyTheme = useCallback((targetTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', targetTheme);
    if (targetTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', targetTheme);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen to system preference changes if user hasn't explicitly set one
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const hasStored = localStorage.getItem('theme');
      if (!hasStored) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggle = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { 
    theme, 
    setTheme, 
    toggle, 
    toggleTheme: toggle 
  };
}
