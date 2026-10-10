import { cva } from 'class-variance-authority';

export const pageCardVariants = cva(
  'w-full transition-all duration-200 text-card-foreground',
  {
    variants: {
      /**
       * سبک بصری کارت کاملاً منطبق بر متغیرهای OKLCH در Tailwind v4
       */
      variant: {
        // کارت استاندارد داشبورد (سفید/روشن با بوردر نرم و سایه خفیف)
        default: 'border border-border/60 bg-card shadow-xs',
        // کارت پس‌زمینه مات/خاکستری (مناسب فرم‌ها یا محتوای فرعی)
        mute: 'border border-border/50 bg-muted/40 shadow-none',
        // کارت دارای تینت پالت ثانویه
        secondary: 'border border-secondary-200/50 bg-secondary-50/50 dark:border-secondary-900/50 dark:bg-secondary-950/30 shadow-none',
        // کارت تخت با بوردر مشخص (بدون سایه)
        outline: 'border border-border bg-card shadow-none',
        // کارت شفاف بدون کادر و بک‌گراند
        ghost: 'border-transparent bg-transparent shadow-none',
        // بدون استایل سازمانی (برای چیدمان‌های کاملاً کاستوم)
        plain: 'shadow-none',
      },

      /**
       * فاصله‌گذاری داخلی (Padding)
       */
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },

      /**
       * میزان گردی گوشه‌ها مطابق توکن‌های radius تعریف شده در تم
       */
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-md',
        default: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-3xl',
      },

      /**
       * آیا کارت قابلیت هاور/تعاملی دارد یا خیر
       */
      interactive: {
        true: 'hover:shadow-md hover:border-border transition-shadow cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      rounded: 'default',
      interactive: false,
    },
  }
);
