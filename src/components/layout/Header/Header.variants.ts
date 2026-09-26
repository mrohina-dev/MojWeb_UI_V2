import { cva } from 'class-variance-authority';

export const headerVariants = cva(
  'sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md transition-colors md:px-6',
  {
    variants: {
      variant: {
        // حالت مینیمال: کاملاً منطبق بر پس‌زمینه و حاشیه کلی سامانه
        default: 'border-border/70 bg-background/80 text-foreground',
        // حالت Primary: از توکن اصلی primary و primary-foreground استفاده می‌کند
        primary: 'border-primary/20 bg-primary text-primary-foreground shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const headerTitleVariants = cva(
  'text-base font-bold tracking-tight select-none transition-colors',
  {
    variants: {
      variant: {
        // در حالت default: رنگ سرمه‌ای بانکی در لایت، و آبی روشن در دارک (خودکار با توکن primary)
        default: 'text-primary',
        // در حالت primary: ارث‌بری طبیعی از رنگ نوشته هدر (primary-foreground)
        primary: 'text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const headerActionButtonVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      primary: 'text-current/80 hover:bg-current/15 hover:text-current',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const headerLogoutButtonVariants = cva('transition-colors', {
  variants: {
    variant: {
      default:
        'text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/30',
      primary:
        'text-current/80 hover:bg-destructive hover:text-destructive-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const headerDividerVariants = cva('mx-1 h-5 w-px transition-colors', {
  variants: {
    variant: {
      default: 'bg-border',
      primary: 'bg-current/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
