import type { VariantProps } from 'class-variance-authority';
import type { headerVariants } from './Header.variants';

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  className?: string;
  /**
   * نمایش دکمه باز و بسته کردن سایدبار در هدر
   * @default false
   */
  showSidebarToggle?: boolean;
  /** تعداد اعلان‌های نخوانده */
  unreadNotificationsCount?: number;
  /** تعداد پیام‌های نخوانده */
  unreadMessagesCount?: number;
  /** رویداد کلیک روی دکمه سایدبار (اختیاری؛ عملکرد پیش‌فرض از Context سایدبار استفاده می‌کند) */
  onSidebarToggle?: () => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onLogout?: () => void;
}
