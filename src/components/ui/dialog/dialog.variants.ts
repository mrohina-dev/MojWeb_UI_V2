import { cva } from 'class-variance-authority';

export const dialogBackdropVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs',
    'transition-all duration-200',
    'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
  ].join(' ')
);

export const dialogContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full max-h-[calc(100vh-2rem)] overflow-y-auto',
    'rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl',
    'transition-all duration-200 ease-out',
    'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
    'focus-visible:outline-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);
