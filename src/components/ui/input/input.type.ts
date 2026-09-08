import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "./input.variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * برچسب ورودی
   */
  label?: string;
  /**
   * متن راهنما در زیر فیلد
   */
  helperText?: string;
  /**
   * متن خطا (مثلاً از react-hook-form و zod)
   */
  error?: string;
  /**
   * نمایش آیکون یا المنت در سمت راست فیلد (در حالت RTL)
   */
  iconStart?: React.ReactNode;
  /**
   * نمایش آیکون یا المنت در سمت چپ فیلد (مانند دکمه پسورد در RTL)
   */
  iconEnd?: React.ReactNode;
  /**
   * کلاس اضافی برای (Wrapper)
   */
  wrapperClassName?: string;
}
