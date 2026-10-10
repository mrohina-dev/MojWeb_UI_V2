import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { pageHeaderVariants } from './PageHeader.variants';
import type { AppModuleKey } from '@/constants/navigation.constants';

export type PageHeaderSize = NonNullable<VariantProps<typeof pageHeaderVariants>['size']>;
export type PageHeaderVariant = NonNullable<VariantProps<typeof pageHeaderVariants>['variant']>;

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof pageHeaderVariants> {
  /** عنوان اختصاصی صفحه؛ در صورت عدم ارسال از سیستم ناوبری خوانده می‌شود */
  title?: string;
  /** توضیحات یا زیرعنوان */
  description?: React.ReactNode;
  /** المان سفارشی در کنار عنوان (مانند Badge یا آیکون) */
  titleSlot?: React.ReactNode;
  /** محتوای انتهای هدر (دکمه‌های عملیاتی، فیلترها و ...) */
  extra?: React.ReactNode;
  /** کلید ماژول جاری برای خواندن خودکار عنوان از روت */
  moduleKey?: AppModuleKey;
}

export interface PageHeaderContextType {
  extra: React.ReactNode;
  setExtra: (node: React.ReactNode) => void;
  customTitle?: string;
  setCustomTitle: (title: string | undefined) => void;
}
