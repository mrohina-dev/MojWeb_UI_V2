import { cva } from 'class-variance-authority';

export const pageContainerVariants = cva(
  'mx-auto w-full px-4 py-6 transition-all sm:px-6 lg:px-8',
  {
    variants: {
      maxWidth: {
        default: 'max-w-7xl',
        full: 'max-w-full',
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
      },
    },
    defaultVariants: {
      maxWidth: 'default',
    },
  }
);

export const pageContentVariants = cva('w-full transition-all', {
  variants: {
    variant: {
      /** دقیقا مطابق با الگوی اصلی: بوردر سبک border-border/60، بک‌گراند کارت و سایه نرم */
      card: 'rounded-xl border border-border/60 bg-card p-6 text-card-foreground shadow-xs',
      /** کارت با بک‌گراند ملایم‌تر برای صفحات تنظیمات و فرم‌ها */
      cardMuted: 'rounded-xl border border-border/50 bg-muted/30 p-6 text-foreground shadow-xs',
      /** کارت کاملا تخت بدون سایه */
      cardFlat: 'rounded-xl border border-border bg-card p-6 text-card-foreground shadow-none',
      /** حالت آزاد و بدون کادر برای چینش‌های چند کارته و گرید */
      plain: 'space-y-6',
    },
  },
  defaultVariants: {
    variant: 'card',
  },
});
