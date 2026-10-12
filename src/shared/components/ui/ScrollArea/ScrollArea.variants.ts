import { cva } from 'class-variance-authority';

export const scrollAreaVariants = cva(
  ['custom-scrollbar relative block w-full transition-colors'],
  {
    variants: {
      orientation: {
        vertical: 'overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]',
        horizontal: 'overflow-x-auto overflow-y-hidden',
        both: 'overflow-x-auto overflow-y-auto',
      },

      /**
       * سایزها بر اساس rem برای ریسپانسیو بهتر
       */
      size: {
        sm: '[--sb-size:0.25rem] [scrollbar-width:thin]',
        default: '[--sb-size:0.390rem] [scrollbar-width:thin]',
        lg: '[--sb-size:0.625rem] [scrollbar-width:auto]',
        xl: '[--sb-size:0.875rem] [scrollbar-width:auto]',
        full: 'w-full h-full [--sb-size:0.375rem] [scrollbar-width:thin]',
      },

      /**
       * استفاده از color-mix برای ایجاد افکت محو (Faded)
       * ترکیب رنگ اصلی با transparent 50% باعث نرم‌تر شدن رنگ می‌شود
       */
      variant: {
        default: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-border),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-border),transparent_20%)]',
        ],
        primary: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-primary),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-primary),transparent_20%)]',
        ],
        secondary: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-secondary-600),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-secondary-600),transparent_20%)]',
        ],
        destructive: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-destructive),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-destructive),transparent_10%)]',
        ],
        success: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-success-500),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-success-500),transparent_20%)]',
        ],
        warning: [
          '[--sb-thumb:color-mix(in_oklch,var(--color-warning-500),transparent_50%)]',
          '[--sb-thumb-hover:color-mix(in_oklch,var(--color-warning-500),transparent_20%)]',
        ],
      },

      hoverOnly: {
        true: [
          '[--sb-thumb:transparent]',
          'hover:[--sb-thumb:color-mix(in_oklch,var(--color-border),transparent_20%)]',
        ],
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      size: 'default',
      variant: 'default',
      hoverOnly: false,
    },
  }
);
