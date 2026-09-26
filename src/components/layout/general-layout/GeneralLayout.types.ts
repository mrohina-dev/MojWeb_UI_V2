import type { ReactNode } from 'react';

export interface GeneralLayoutProps {
   /** محتوای دلخواه؛ در صورت خالی بودن از روت‌های فرزند React Router (Outlet) استفاده می‌شود */
  children?: ReactNode;
  /** کلاس اختیاری برای wrapper کل صفحه */
  className?: string;
}
