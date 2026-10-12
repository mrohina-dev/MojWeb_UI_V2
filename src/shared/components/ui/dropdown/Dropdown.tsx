import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/shared/lib/utils";
import Button from "@/shared/components/ui/button";
import { dropdownContentVariants } from "./dropdown.variants";
import type {
  DropdownRootProps,
  DropdownTriggerProps,
  DropdownContentProps,
  SimplifiedDropdownProps,
} from "./dropdown.types";

// ==========================================
// 1. کامپوننت‌های پایه (Primitives / Compound)
// ==========================================

export function DropdownRoot({ children, ...props }: DropdownRootProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, asChild = false, variant = "ghost", size = "default", ...props }, ref) => {
    if (asChild) {
      return (
        <PopoverPrimitive.Trigger render={children as React.ReactElement} ref={ref} />
      );
    }

    return (
      <PopoverPrimitive.Trigger
        render={
          <Button ref={ref} variant={variant} size={size} {...props}>
            {children}
          </Button>
        }
      />
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      children,
      className,
      size = "default",
      align = "start",
      side = "bottom",
      sideOffset = 6,
      alignOffset = 0,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(dropdownContentVariants({ size }), className)}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    );
  }
);
DropdownContent.displayName = "DropdownContent";

// ==========================================
// 2. کامپوننت آماده و سریع (Simplified / High-Level)
// ==========================================

export function Dropdown({
  trigger,
  children,
  variant = "secondary",
  size = "default",
  triggerClassName,
  contentClassName,
  align = "start",
  side = "bottom",
  sideOffset = 6,
  disabled,
  asChildTrigger = false,
  ...rootProps
}: SimplifiedDropdownProps) {
  return (
    <DropdownRoot {...rootProps}>
      <DropdownTrigger
        variant={variant}
        size={size}
        className={triggerClassName}
        disabled={disabled}
        asChild={asChildTrigger}
      >
        {trigger}
      </DropdownTrigger>
      <DropdownContent
        size={size}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {children}
      </DropdownContent>
    </DropdownRoot>
  );
}

// ضمیمه کردن بخش‌های Compound به خود کامپوننت Dropdown
Dropdown.Root = DropdownRoot;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
