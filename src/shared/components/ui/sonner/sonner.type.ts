import { type ToasterProps as SonnerToasterProps } from "sonner";
import type { ToastVariantProps } from "./sonner.variants";

export interface ToasterProps extends SonnerToasterProps {
  /**
   * نمایش نوار پیشرفت زمان‌سنج برای اعلان‌ها
   * @default true
   */
  showProgress?: boolean;

  /**
   * اندازه و ابعاد عرض کارت Toast
   * @default "auto" (فیت اندازه کانتنت با min/max ایمن)
   */
  size?: ToastVariantProps["size"];
}
