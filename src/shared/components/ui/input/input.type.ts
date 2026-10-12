import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "./input.variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * برچسب ورودی در فرم‌ها
   */
  label?: string;
  /**
   * متن راهنما در زیر فیلد
   */
  helperText?: string;
  /**
   * متن خطای اعتبارسنجی
   */
  error?: string;
  /**
   * نمایش آیکون در سمت راست فیلد (در حالت RTL)
   */
  iconStart?: React.ReactNode;
  /**
   * نمایش آیکون یا دکمه تعاملی در سمت چپ فیلد (مانند دکمه پاک کردن یا چشم رمز)
   */
  iconEnd?: React.ReactNode;
  /**
   * حذف Wrapper، Label و پیام‌های زیرین برای سلول‌های جدول و فیلترها
   */
  plain?: boolean;
  /**
   * استایل شبیه اکسل برای ویرایش مستقیم درون سلول‌های جدول
   */
  isTableInline?: boolean;
  /**
   * کلاس سفارشی برای Wrapper بیرونی
   */
  wrapperClassName?: string;
}
