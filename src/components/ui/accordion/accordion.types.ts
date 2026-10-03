import * as React from "react";
import type { Accordion as BaseUIAccordion } from "@base-ui/react/accordion";

// TODO: add from global type
export type ComponentSize = "xs" | "sm" | "default" | "lg";

export type AccordionVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "ghost";

export interface AccordionContextValue {
  size: ComponentSize;
  variant: AccordionVariant;
  divided?: boolean;
  inset?: boolean;
}

export interface BaseAccordionProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIAccordion.Root> {
  size?: ComponentSize;
  variant?: AccordionVariant;
  /**
   * نمایش خط جداکننده بین دکمه عنوان و محتوا
   * @default false
   */
  divided?: boolean;
  /**
   * نمایش محتوا در حالت فرورفته (Sunken/Inset Container)
   * @default false
   */
  inset?: boolean;
}

export type BaseAccordionItemProps = React.ComponentPropsWithoutRef<
  typeof BaseUIAccordion.Item
>;

export interface BaseAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIAccordion.Trigger> {
  /**
   * نمایش یا عدم نمایش آیکون پیش‌فرض وضعیت (Chevron)
   * @default true
   */
  showChevron?: boolean;
}

export interface BaseAccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIAccordion.Panel> {
  /**
   * امکان فعال/غیرفعال‌سازی حالت فرورفتگی اختصاصی برای این پنل
   */
  inset?: boolean;
}

/**
 * ساختار هر آیتم در نسخه آماده و خلاصه (Shorthand)
 */
export interface AccordionItemData {
  /**
   * شناسه منحصربه‌فرد آیتم آکاردئون
   */
  value: string;
  /**
   * عنوان یا المان نمایشی تیتر
   */
  title: React.ReactNode;
  /**
   * آیکون یا نشان اختیاری در کنار عنوان
   */
  icon?: React.ReactNode;
  /**
   * محتوای داخل پنل آکاردئون
   */
  content: React.ReactNode;
  /**
   * غیرفعال‌سازی این آیتم خاص
   */
  disabled?: boolean;
  /**
   * نمایش آیکون چورون اختصاصی برای این آیتم
   * @default true
   */
  showChevron?: boolean;
  /**
   * حالت فرورفتگی اختصاصی برای این آیتم
   */
  inset?: boolean;
}

/**
 * تایپ‌های مربوط به کامپوننت شورت‌هند Accordion
 */
export interface AccordionProps extends BaseAccordionProps {
  /**
   * لیست آیتم‌های آکاردئون برای رندر خودکار
   */
  items: AccordionItemData[];
}
