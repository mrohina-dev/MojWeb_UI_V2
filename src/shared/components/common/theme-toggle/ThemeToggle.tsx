import { forwardRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/shared/hooks/useTheme';
import type { ThemeToggleProps } from './ThemeToggle.type';
import Button from '@/shared/components/ui/button';

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className = '', ...props }, ref) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
      <Button
        ref={ref}
        iconOnly
        onClick={toggleTheme}
        variant='ghost'
        aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
        className={`text-muted-foreground hover:text-foreground ${className}`}
        {...props}
      >
        {isDark ? (
          <Moon className="transition-transform duration-200" />
        ) : (
          <Sun className="transition-transform duration-200" />
        )}
      </Button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
