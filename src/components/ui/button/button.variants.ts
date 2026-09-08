import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary-500 active:bg-primary-700',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-600 active:bg-destructive-700',
        success:
          'bg-success-600 text-white shadow-sm hover:bg-success-700 active:bg-success-700',
        warning:
          'bg-warning-500 text-foreground shadow-sm hover:bg-warning-600 active:bg-warning-700',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-200 active:bg-secondary-200',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:bg-muted',
        link:
          'text-primary underline-offset-4 hover:underline active:opacity-80 p-0 h-auto',
      },
      outline: {
        true: 'bg-transparent border shadow-none',
        false: '',
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
    // اینجا ترکیب variant رنگی با outline را مشخص می‌کنیم:
    compoundVariants: [
      {
        variant: 'primary',
        outline: true,
        class:
          'border-primary text-primary hover:bg-primary/10 active:bg-primary/20',
      },
      {
        variant: 'destructive',
        outline: true,
        class:
          'border-destructive text-destructive hover:bg-destructive/10 active:bg-destructive/20',
      },
      {
        variant: 'success',
        outline: true,
        class:
          'border-success-600 text-success-600 hover:bg-success-50 active:bg-success-100',
      },
      {
        variant: 'warning',
        outline: true,
        class:
          'border-warning-500 text-warning-600 hover:bg-warning-50 active:bg-warning-100',
      },
      {
        variant: 'secondary',
        outline: true,
        class:
          'border-border text-secondary-foreground hover:bg-accent hover:text-accent-foreground active:bg-muted',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      outline: false,
      size: 'default',
      fullWidth: false,
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
