import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { pageContainerVariants, pageContentVariants } from './PageContainer.variants';
import type { pageTitleVariants } from '@/components/ui/title/title.variants';
import type {
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbLinkVariant,
  BreadcrumbSeparatorVariant,
} from '@/components/ui/breadcrumbs/Breadcrumbs.type';

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  /** عنوان اصلی صفحه */
  title?: string;
  /** توضیحات زیر عنوان */
  description?: React.ReactNode;
  /** دکمه‌ها و المان‌های عملیاتی در سمت مقابل عنوان */
  actions?: React.ReactNode;
  /** مسیر ناوبری به صورت نود آزاد (اگر breadcrumbsItems ارسال شود، نادیده گرفته می‌شود) */
  breadcrumbs?: React.ReactNode;
  /** داده‌های ساخت‌یافته مسیر ناوبری (داده‌محور، رندر خودکار با Breadcrumbs) */
  breadcrumbsItems?: BreadcrumbItem[];
  /** اندازه Breadcrumbs */
  breadcrumbsSize?: BreadcrumbSize;
  /** تم رنگی لینک‌های Breadcrumbs */
  breadcrumbsVariant?: BreadcrumbLinkVariant;
  /** تم رنگی جداکننده Breadcrumbs */
  breadcrumbsSeparatorVariant?: BreadcrumbSeparatorVariant;
  /** آستانه فشرده‌سازی مسیرهای طولانی در Breadcrumbs */
  breadcrumbsMaxItemsBeforeCollapse?: number;
  /** اسلات اختیاری در سربرگ */
  headerSlot?: React.ReactNode;
  /** قالب و ظاهر کانتینر محتوا */
  contentVariant?: VariantProps<typeof pageContentVariants>['variant'];
  /** کلاس‌های سفارشی برای بخش محتوا (main) */
  contentClassName?: string;
  /** اندازه فونت عنوان (مشتق شده از PageTitle) */
  titleSize?: VariantProps<typeof pageTitleVariants>['size'];
  /** استایل و رنگ عنوان (مشتق شده از PageTitle) */
  titleVariant?: VariantProps<typeof pageTitleVariants>['variant'];
}
