import { cva } from 'class-variance-authority';

export const pageHeaderVariants = cva(
  'flex flex-col gap-4 transition-colors sm:flex-row sm:items-center sm:justify-between',
  {
    variants: {
      size: {
        sm: 'mb-4 gap-3 sm:gap-4',
        default: 'mb-6 gap-4 sm:gap-6',
        lg: 'mb-8 gap-5 sm:gap-8',
      },
      variant: {
        default: '',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        destructive: 'text-destructive',
        gradient: '',
      },
      bordered: {
        true: 'border-b border-border/60 pb-4 sm:pb-5',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      bordered: false,
    },
  }
);
