import { forwardRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeToggleProps } from './ThemeToggle.type';

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className = '', ...props }, ref) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring p-0.5 ${className}`}
        {...props}
      >
        {isDark ? (
          <Moon className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <Sun className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
