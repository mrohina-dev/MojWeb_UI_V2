import { cva } from 'class-variance-authority';

export const headerVariants = cva(
  // اضافه کردن shadow-sm برای عمق
  // تغییر bg-background/80 به bg-background/90 یا 95 برای غلظت بیشتر لایه
  'sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b shadow-sm backdrop-blur-md transition-colors md:px-6',
  {
    variants: {
      variant: {
        // در حالت default: پس‌زمینه را کمی غلیظ‌تر کردیم (95) تا سایه بهتر دیده شود
        default: 'border-border/70 bg-background/95 text-foreground',
        
        // در حالت primary: سایه را کمی تیره‌تر کردیم تا در پس‌زمینه رنگی، عمق ایجاد کند
        primary: 'border-primary/20 bg-primary text-primary-foreground shadow-md shadow-primary/20',
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
