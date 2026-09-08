import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary-500 active:bg-primary-700',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-600 active:bg-destructive-700',
        success:
          'bg-success-600 text-white shadow-sm hover:bg-success-700 active:bg-success-700',
        warning:
          'bg-warning-500 text-foreground shadow-sm hover:bg-warning-600 active:bg-warning-700',
        outline:
          'border border-input shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-200 active:bg-secondary-200',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:bg-muted',
        link:
          'text-primary underline-offset-4 hover:underline active:opacity-80 p-0 h-auto',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-6 text-base',
        icon: 'size-9 rounded-full p-2',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
