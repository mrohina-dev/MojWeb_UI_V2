import { type ToasterProps as SonnerToasterProps } from "sonner";

export interface ToasterProps extends SonnerToasterProps {
  /**
   * نمایش نوار پیشرفت زمان‌سنج برای اعلان‌ها
   * @default true
   */
  showProgress?: boolean;
}