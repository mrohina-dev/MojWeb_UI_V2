import * as React from "react";
import type { ButtonVariantProps } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  /** نمایش انیمیشن لودینگ و غیرفعال شدن دکمه */
  loading?: boolean;
  /** آیکون سمت راست در حالت RTL (سمت شروع) */
  iconStart?: React.ReactNode;
  /** آیکون سمت چپ در حالت RTL (سمت پایان) */
  iconEnd?: React.ReactNode;
  /** جلوگیری از انتشار رویداد کلیک به کامپوننت والد (بسیار کاربردی برای اکشن‌های سطر جدول) */
  stopPropagation?: boolean;
}
