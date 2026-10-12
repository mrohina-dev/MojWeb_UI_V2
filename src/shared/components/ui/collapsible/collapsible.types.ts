import * as React from "react";
import type { Collapsible as BaseUICollapsible } from "@base-ui/react/collapsible";

// TODO: add from global type
export type ComponentSize = "xs" | "sm" | "default" | "lg";

export type CollapsibleVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "ghost";

export interface BaseCollapsibleProps
  extends React.ComponentPropsWithoutRef<typeof BaseUICollapsible.Root> {
  size?: ComponentSize;
  variant?: CollapsibleVariant;
  /**
   * نمایش خط جداکننده مدرن بین عنوان و محتوا
   * @default false
   */
  divided?: boolean;
}

export interface BaseCollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseUICollapsible.Trigger> {
  /**
   * نمایش یا عدم نمایش آیکون پیش‌فرض وضعیت (Chevron)
   * @default true
   */
  showChevron?: boolean;
}

export type BaseCollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof BaseUICollapsible.Panel
>;

export interface CollapsibleContextValue {
  size: ComponentSize;
  variant: CollapsibleVariant;
  divided?: boolean;
}

/**
 * تایپ‌های مربوط به نسخه آماده و شورت‌هند Collapsible
 */
export interface CollapsibleProps extends Omit<BaseCollapsibleProps, "title"> {
  /**
   * عنوان یا المانی که داخل Trigger قرار می‌گیرد
   */
  title: React.ReactNode;
  /**
   * آیکون یا نشان اختیاری در کنار عنوان
   */
  icon?: React.ReactNode;
  /**
   * نمایش یا عدم نمایش آیکون Chevron در دکمه بازکننده
   * @default true
   */
  showChevron?: boolean;
  /**
   * پراپ‌های سفارشی تریگر
   */
  triggerProps?: Omit<BaseCollapsibleTriggerProps, "children">;
  /**
   * پراپ‌های سفارشی پنل محتوا
   */
  contentProps?: Omit<BaseCollapsibleContentProps, "children">;
}
