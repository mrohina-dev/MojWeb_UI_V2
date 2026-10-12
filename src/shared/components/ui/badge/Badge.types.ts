import * as React from 'react';
import type { BadgeVariantProps } from './Badge.variants';

export type ComponentSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';

export type BadgeSize = ComponentSize | 'dot' | 'counter';

export type BadgeVariant = NonNullable<BadgeVariantProps['variant']>;

export type BadgePlacement = NonNullable<BadgeVariantProps['placement']>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Omit<BadgeVariantProps, 'size'> {
  /**
   * محتوای سفارشی برچسب
   */
  children?: React.ReactNode;
  /**
   * عدد شمارنده؛ اگر پاس داده شود کامپوننت رفتار شمارنده خواهد داشت
   */
  count?: number;
  /**
   * حداکثر عدد قابل نمایش قبل از درج +
   * @default 99
   */
  maxCount?: number;
  /**
   * نمایش یا عدم نمایش در صورت صفر بودن شمارنده
   * @default false
   */
  showZero?: boolean;
  /**
   * نمایش به صورت نقطه بدون متن
   * @default false
   */
  dot?: boolean;
  /**
   * سایز بج (شامل مقیاس استاندارد پروژه به علاوه dot و counter)
   */
  size?: BadgeSize;
}
