import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

export type CheckboxSize = "xs" | "sm" | "default" | "lg";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "size"> {
  /**
   * متن یا المان لیبل کنار چک‌باکس
   */
  label?: React.ReactNode;

  /**
   * متن توضیحات کمکی زیر لیبل (مناسب فرم‌ها)
   */
  description?: React.ReactNode;

  /**
   * اندازه چک‌باکس
   */
  size?: CheckboxSize;

  /**
   * وضعیت خطا در ولیدیشن فرم
   */
  hasError?: boolean;

  /**
   * استایل خطی/تخت اکسلی برای استفاده درون سلول جدول
   */
  isTableInline?: boolean;

  /**
   * جلوگیری از انتشار کلیک به کامپوننت‌های والد (مثلاً جلوگیری از کلیک سطر جدول)
   */
  stopPropagation?: boolean;

  /**
   * کلاس اضافی برای المان نشانگر (تیک/منفی)
   */
  indicatorClassName?: string;

  /**
   * کلاس اضافی برای کانتینر لیبل و توضیحات
   */
  labelWrapperClassName?: string;

  /**
   * کلاس اضافی برای خود تگ لیبل
   */
  labelClassName?: string;

  /**
   * کلاس اضافی برای متن توضیحات
   */
  descriptionClassName?: string;
}
