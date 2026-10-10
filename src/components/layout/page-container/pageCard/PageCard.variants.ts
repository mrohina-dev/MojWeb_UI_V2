import { cva } from 'class-variance-authority';

export const pageCardVariants = cva(
  'w-full transition-all duration-200 text-card-foreground',
  {
    variants: {
      /** مقیاس کلی کارت (اندازه پیش‌فرض پدینگ و انحنا) */
      size: {
        sm: 'p-4 rounded-lg',
        default: 'p-6 rounded-xl',
        lg: 'p-8 rounded-2xl',
        xl: 'p-10 rounded-3xl',
      },

      /** سبک و تم بصری منطبق با PageHeader */
      variant: {
        default: 'bg-card text-card-foreground shadow-xs',
        muted: 'bg-muted/40 text-foreground shadow-none',
        secondary: 'bg-secondary/15 text-secondary-foreground shadow-none',
        primary: 'bg-primary/5 text-primary shadow-none',
        destructive: 'bg-destructive/5 text-destructive border-destructive/20 shadow-none',
        ghost: 'bg-transparent shadow-none',
      },

      /** خط حاشیه دور کارت مستقل از پس‌زمینه */
      bordered: {
        true: 'border border-border/60',
        false: 'border-0',
      },

      /** امکان اورراید کردن پدینگ به صورت مستقل */
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },

      /** امکان اورراید کردن انحنا به صورت مستقل */
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-md',
        default: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-3xl',
      },

      /** قابلیت حالت تعاملی و هاور */
      interactive: {
        true: 'hover:shadow-md hover:border-border transition-shadow cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      bordered: true,
      interactive: false,
    },
  }
);
