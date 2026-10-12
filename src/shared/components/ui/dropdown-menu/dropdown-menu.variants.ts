import { cva, type VariantProps } from 'class-variance-authority';

export const dropdownMenuContentVariants = cva(
  [
    'z-50 min-w-36 select-none overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-md outline-none',
    'text-right font-sans',
    'transition-all duration-150 ease-out',
    'data-open:opacity-100 data-open:scale-100',
    'data-closed:opacity-0 data-closed:scale-95',
  ],
  {
    variants: {
      size: {
        sm: 'p-1 text-xs w-44',
        default: 'p-1.5 text-sm w-56',
        lg: 'p-2 text-sm w-64',
        xl: 'p-2.5 text-base w-72',
        full: 'p-2 text-sm w-full',
      },
      variant: {
        default: 'border border-primary-200',
        primary: 'border border-primary',
        secondary: 'border border-secondary',
        destructive: 'border border-destructive',
        success: 'border border-success-600',
        warning: 'border border-warning-500',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export const dropdownMenuItemVariants = cva(
  [
    'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-colors',
    'text-foreground hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  {
    variants: {
      destructive: {
        true: 'text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive',
      },
      inset: {
        true: 'pe-8',
      },
    },
    defaultVariants: {
      destructive: false,
      inset: false,
    },
  }
);

export type DropdownMenuContentVariantProps = VariantProps<typeof dropdownMenuContentVariants>;
export type DropdownMenuItemVariantProps = VariantProps<typeof dropdownMenuItemVariants>;
