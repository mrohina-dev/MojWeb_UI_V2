import * as React from "react";
import type { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
// TODO add from global type
export type ComponentSize = "xs" | "sm" | "default" | "lg";

export type CollapsibleVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "ghost";

export interface CollapsibleProps
  extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root> {
  size?: ComponentSize;
  variant?: CollapsibleVariant;
    /**
   * نمایش خط جداکننده مدرن بین عنوان و محتوا
   * @default false
   */
  divided?: boolean;
}

export interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> {
  /**
   * نمایش یا عدم نمایش آیکون پیش‌فرض وضعیت (Chevron)
   * @default true
   */
  showChevron?: boolean;
}

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof BaseCollapsible.Panel
>;
export interface CollapsibleContextValue {
  size: ComponentSize;
  variant: CollapsibleVariant;
  divided?: boolean;
}
