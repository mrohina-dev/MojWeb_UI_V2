import type * as React from 'react';
import type { PageHeaderProps, PageHeaderSize, PageHeaderVariant } from './pageHeader';
import type { PageCardProps } from './pageCard';

export type PageContainerSize = PageHeaderSize;
export type PageContainerVariant = PageHeaderVariant;

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * مقیاس اندازه کلی (به‌طور خودکار بین هدر و کارت هماهنگ می‌شود)
   * @default 'default'
   */
  size?: PageContainerSize;

  /**
   * سبک بصری مشترک هدر و کارت
   * @default 'default'
   */
  variant?: PageContainerVariant;

  /**
   * وضعیت خط حاشیه (در هدر خط زیرین و در کارت کادر پیرامونی)
   */
  bordered?: boolean;

  /**
   * عنوان اختصاصی صفحه
   */
  title?: string;

  /**
   * توضیحات یا زیرعنوان صفحه
   */
  description?: React.ReactNode;

  /**
   * المان کنار عنوان (مانند Badge یا Status)
   */
  titleSlot?: React.ReactNode;

  /**
   * المان‌های اکشن هدر (دکمه‌ها و ابزارها)
   */
  extra?: React.ReactNode;

  /**
   * کلید ماژول ناوبری برای خواندن خودکار عنوان
   */
  moduleKey?: PageHeaderProps['moduleKey'];

  /**
   * ارسال مستقیم یک کامپوننت سفارشی برای هدر (یا false برای حذف کامل هدر)
   */
  header?: React.ReactNode | false;

  /**
   * تنظیمات اختصاصی هدر در صورت نیاز به اورراید مقادیر سراسری
   */
  headerProps?: Partial<PageHeaderProps>;

  /**
   * آیا محتوا داخل کارت (PageCard) قرار گیرد؟
   * @default true
   */
  withCard?: boolean;

  /**
   * آیا هدر داخل بدنه کارت قرار گیرد یا بالای آن رندر شود؟
   * @default false
   */
  headerInsideCard?: boolean;

  /**
   * تنظیمات اختصاصی کارت در صورت نیاز به اورراید مقادیر سراسری
   */
  cardProps?: Partial<PageCardProps>;

  /**
   * محتوای اصلی بدنه صفحه
   */
  children?: React.ReactNode;
}
