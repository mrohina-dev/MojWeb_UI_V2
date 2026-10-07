import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { pageHeaderVariants } from './PageHeader.variants';
import type { AppModuleKey } from '@/constants/navigation.constants';

export type PageHeaderVariantsProps = VariantProps<typeof pageHeaderVariants>;

export type PageHeaderSize = NonNullable<PageHeaderVariantsProps['size']>;
export type PageHeaderVariant = NonNullable<PageHeaderVariantsProps['variant']>;

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    PageHeaderVariantsProps {
  /** عنوان اختصاصی صفحه؛ در صورت عدم ارسال از ناوبری ماژول استخراج می‌شود */
  title?: string;
  /** توضیحات یا زیرعنوان */
  description?: React.ReactNode;
  /** المان سفارشی کنار عنوان (مانند Badge، وضعیت یا Tooltip) */
  titleSlot?: React.ReactNode;
  /** محتوای انتهای هدر (دکمه‌های عملیاتی، فیلترها، تقویم و ...) */
  extra?: React.ReactNode;
  /** کلید ماژول جاری برای خواندن خودکار عنوان از سیستم ناوبری */
  moduleKey?: AppModuleKey;
}

export interface PageHeaderContextType {
  extra: React.ReactNode;
  setExtra: (node: React.ReactNode) => void;
  customTitle?: string;
  setCustomTitle: (title: string | undefined) => void;
}
