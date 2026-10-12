import type { InputHTMLAttributes } from "react";

export type CaptchaOrientation = "horizontal" | "vertical";

export interface CaptchaInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "default" | "lg";
  wrapperClassName?: string;
  /** جهت چیدمان: افقی (کنار هم) یا عمودی (تصویر و دکمه در بالا، اینپوت در زیر) */
  orientation?: CaptchaOrientation;
  onRefresh?: () => void;
}
