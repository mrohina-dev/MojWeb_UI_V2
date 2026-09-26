import type { VariantProps } from "class-variance-authority";
import type { headerVariants } from "./Header.variants";

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  className?: string;
  /** تعداد اعلان‌های نخوانده */
  unreadNotificationsCount?: number;
  /** تعداد پیام‌های نخوانده */
  unreadMessagesCount?: number;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onLogout?: () => void;
}
