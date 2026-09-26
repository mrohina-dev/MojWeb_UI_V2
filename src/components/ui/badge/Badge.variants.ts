import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center font-bold select-none transition-colors',
  {
    variants: {
      variant: {
        // رنگ‌های اصلی تم بر اساس توکن‌های تعریف‌شده
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',

        // رنگ‌های وضعیتی سازمانی (موجود در تم سیستم)
        success: 'bg-success-600 text-white',
        warning: 'bg-warning-600 text-white',
        info: 'bg-info-600 text-white',

        // حالت‌های ملایم‌تر (Subtle/Soft) بسیار کاربردی برای جداول
        'success-subtle': 'bg-success-50 text-success-700',
        'warning-subtle': 'bg-warning-50 text-warning-700',
        'destructive-subtle': 'bg-destructive-50 text-destructive-700',
        'info-subtle': 'bg-info-50 text-info-700',

        // بدون پس‌زمینه با حاشیه
        outline: 'border border-border bg-background text-foreground',
      },
      size: {
        // سایز استاندارد برای برچسب‌ها و چیپ‌های متنی
        default: 'h-6 rounded-md px-2.5 text-xs',
        // سایز فشرده
        sm: 'h-5 rounded-md px-2 text-[11px]',
        // سایز شمارنده دایره‌ای/کپسولی برای آیکون‌ها و تب‌ها
        counter: 'h-4 min-w-4 rounded-full px-1 text-[10px] leading-none',
      },
      placement: {
        none: '',
        'top-left': 'absolute -top-1 left-1',
        'top-right': 'absolute -top-1 right-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      placement: 'none',
    },
  }
);
