import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center font-bold select-none transition-colors leading-none',
    'whitespace-nowrap font-sans',
  ],
  {
    variants: {
      variant: {
        // توکن‌های اصلی سیستم
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',

        // رنگ‌های وضعیتی Solid (از شیدهای ۶۰۰ تم شما با متن سفید)
        success: 'bg-success-600 text-white',
        warning: 'bg-warning-600 text-white',
        info: 'bg-info-600 text-white',

        // حالت‌های ملایم (Subtle / Soft) بر اساس متغیرهای تم شما (۵۰ پس‌زمینه، ۷۰۰ متن)
        'primary-subtle': 'bg-primary-50 text-primary-700',
        'secondary-subtle': 'bg-secondary-50 text-secondary-700',
        'success-subtle': 'bg-success-50 text-success-700',
        'warning-subtle': 'bg-warning-50 text-warning-700',
        'destructive-subtle': 'bg-destructive-50 text-destructive-700',
        'info-subtle': 'bg-info-50 text-info-700',

        // حالت حاشیه‌دار (Outline) متصل به متغیرهای تم
        outline: 'border border-border bg-background text-foreground',
      },
      size: {
        // اختصاصی بج
        dot: 'size-2 rounded-full p-0',
        counter: 'h-4 min-w-4 rounded-full px-1 text-[10px]',

        // مقیاس استاندارد ۵ تایی پروژه
        sm: 'h-5 rounded-md px-2 text-[11px]',
        default: 'h-6 rounded-md px-2.5 text-xs',
        lg: 'h-7 rounded-lg px-3 text-sm',
        xl: 'h-8 rounded-lg px-3.5 text-base',
        full: 'h-6 w-full rounded-md px-2.5 text-xs',
      },
      placement: {
        none: '',
        // موقعیت‌دهی RTL-first با استفاده از logical properties
        'top-start': 'absolute -top-1 start-0 -translate-x-1/2 rtl:translate-x-1/2 z-10',
        'top-end': 'absolute -top-1 end-0 translate-x-1/2 rtl:-translate-x-1/2 z-10',
        'bottom-start': 'absolute -bottom-1 start-0 -translate-x-1/2 rtl:translate-x-1/2 z-10',
        'bottom-end': 'absolute -bottom-1 end-0 translate-x-1/2 rtl:-translate-x-1/2 z-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      placement: 'none',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
