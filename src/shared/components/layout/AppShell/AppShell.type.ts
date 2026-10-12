import type { ReactNode } from 'react';

export interface AppShellProps {
  children: ReactNode;
  /** نمایش دکمه تاگل سایدبار در هدر (مخصوص موبایل یا حالت‌های ریسپانسیو) */
  showSidebarToggle?: boolean;
  /** کامپوننت سایدبار برای چیدمان عمودی زیر هدر */
  sidebar?: ReactNode;
  /** کلاس‌های سفارشی برای کانتینر اصلی */
  className?: string;
  /** اکشن خروج از حساب کاربری */
  onLogout?: () => void | Promise<void>;
  /** وضعیت لودینگ هنگام خروج */
  isLoggingOut?: boolean;
  /** تعداد پیام‌های خوانده‌نشده هدر */
  unreadMessagesCount?: number;
  /** تعداد اعلان‌های خوانده‌نشده هدر */
  unreadNotificationsCount?: number;
}
