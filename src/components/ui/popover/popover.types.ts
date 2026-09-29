import * as React from "react";
import type { PopoverContentVariantProps } from "./popover.variants";
import { Popover as BasePopover } from "@base-ui/react";

export type PopoverRootProps = React.ComponentPropsWithoutRef<typeof BasePopover.Root>;
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof BasePopover.Popup> &
  PopoverContentVariantProps & {
    sideOffset?: number;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
  };

export type PopoverTitleProps = React.ComponentPropsWithoutRef<typeof BasePopover.Title>;
export type PopoverDescriptionProps = React.ComponentPropsWithoutRef<typeof BasePopover.Description>;
export type PopoverCloseProps = React.ComponentPropsWithoutRef<typeof BasePopover.Close>;

/* هلپرهایی که به صورت تابعی در اختیار مصرف‌کننده قرار می‌گیرد */
export type PopoverRenderHelpers = {
  close: () => void;
};

export type PopoverRenderFunction = (helpers: PopoverRenderHelpers) => React.ReactNode;

export type PopoverChildren = React.ReactNode | PopoverRenderFunction;

/* با Omit کردن children از PopoverRootProps تداخل با تایپ داخلی Base UI کاملاً حل می‌شود */
export type PopoverProps = Omit<PopoverRootProps, "children"> & {
  trigger: React.ReactNode;
  children: PopoverChildren;
  title?: React.ReactNode;
  description?: React.ReactNode;
  showClose?: boolean;
  size?: PopoverContentProps["size"];
  side?: PopoverContentProps["side"];
  align?: PopoverContentProps["align"];
  sideOffset?: number;
  triggerClassName?: string;
  contentClassName?: string;
};
