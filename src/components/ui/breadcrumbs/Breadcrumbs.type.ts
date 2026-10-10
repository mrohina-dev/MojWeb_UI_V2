import type * as React from 'react';
import type { ComponentSize } from '@/types/ui.types';
import type {
  BreadcrumbsLinkVariantsProps,
  BreadcrumbsSeparatorVariantsProps,
} from './Breadcrumbs.variants';

/**
 * تفکیک سایزهای مجاز برای Breadcrumb از تایپ جنرال پروژه
 * سایزهای نامعقول مثل 'xs' و 'full' فیلتر می‌شوند.
 */
export type BreadcrumbSize = Extract<ComponentSize, 'sm' | 'default' | 'lg' | 'xl'>;

export type BreadcrumbLinkVariant = NonNullable<BreadcrumbsLinkVariantsProps['variant']>;
export type BreadcrumbSeparatorVariant = NonNullable<BreadcrumbsSeparatorVariantsProps['variant']>;

export interface BreadcrumbItem {
  /** برچسب متنی یا نود قابل رندر */
  label: React.ReactNode;
  /** آدرس مسیر در صورت لینک بودن */
  href?: string;
  /** آیا آیتم صفحه فعلی است؟ (به صورت پیش‌فرض آیتم آخر true است) */
  current?: boolean;
  /** آیکون اختیاری پیش از متن */
  icon?: React.ReactNode;
  /** کلاس‌های سفارشی برای آیتم خاص */
  className?: string;
}

export interface BreadcrumbsProps
  extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'children'> {
  /** داده‌های ساخت‌یافته مسیرها */
  items?: BreadcrumbItem[];
  /** آیکون جداکننده (پیش‌فرض: ChevronLeft اشاره به چپ برای جریان RTL) */
  separator?: React.ReactNode;
  /** اندازه کلی کامپوننت */
  size?: BreadcrumbSize;
  /** تم رنگی لینک‌ها */
  variant?: BreadcrumbLinkVariant;
  /** تم رنگی آیکون جداکننده (پیش‌فرض: default / خنثی) */
  separatorVariant?: BreadcrumbSeparatorVariant;
  /** تعداد آیتم‌های اولیه قبل از اعمال فشرده‌سازی (...) */
  maxItemsBeforeCollapse?: number;
  /** برچسب یا آیکون دلخواه برای بخش فشرده‌شده */
  collapseLabel?: React.ReactNode;
  /** محتوای دلخواه ReactNode در صورت عدم ارسال items */
  children?: React.ReactNode;
}
