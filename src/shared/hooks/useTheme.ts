import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'ui-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. ابتدا Storage را بررسی کن
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // 2. در غیر این صورت تنظیمات سیستم‌عامل را چک کن
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. پیش‌فرض
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
