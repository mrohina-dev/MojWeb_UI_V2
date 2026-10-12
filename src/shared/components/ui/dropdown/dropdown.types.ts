import type { ReactNode } from "react";
import type { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type { ButtonProps } from "@/shared/components/ui/button";
import type { DropdownContentVariantsProps } from "./dropdown.variants";

export type DropdownAlign = "start" | "center" | "end";
export type DropdownSide = "top" | "bottom" | "left" | "right";
export type DropdownSize = NonNullable<DropdownContentVariantsProps["size"]>;

export interface DropdownRootProps extends PopoverPrimitive.Root.Props {
  children: ReactNode;
}

export interface DropdownTriggerProps extends Partial<Omit<ButtonProps, "children">> {
  children: ReactNode;
  asChild?: boolean;
}

export interface DropdownContentProps
  extends PopoverPrimitive.Popup.Props,
    DropdownContentVariantsProps {
  children: ReactNode;
  className?: string;
  align?: DropdownAlign;
  side?: DropdownSide;
  sideOffset?: number;
  alignOffset?: number;
}

export interface SimplifiedDropdownProps
  extends Omit<PopoverPrimitive.Root.Props, "children"> {
  trigger: ReactNode;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: DropdownSize;
  triggerClassName?: string;
  contentClassName?: string;
  align?: DropdownAlign;
  side?: DropdownSide;
  sideOffset?: number;
  disabled?: boolean;
  asChildTrigger?: boolean;
}
