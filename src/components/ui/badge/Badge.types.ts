import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from './Badge.variants';

export interface BadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  /** مقدار عددی اختیاری برای استفاده به عنوان شمارنده */
  count?: number;
  /** حداکثر رقم قابل نمایش قبل از + (پیش‌فرض ۹۹) */
  maxCount?: number;
  /** آیا عدد صفر رندر شود؟ (پیش‌فرض false) */
  showZero?: boolean;
}
