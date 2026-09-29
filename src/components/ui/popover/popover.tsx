import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { popoverContentVariants } from "./popover.variants";
import type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverProps,
  PopoverRenderFunction,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "./popover.types";

/* --- کامپوننت‌های ترکیبی اتمیک (Compound) --- */

export function PopoverRoot({ children, ...props }: PopoverRootProps) {
  return <BasePopover.Root {...props}>{children}</BasePopover.Root>;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BasePopover.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center outline-none cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </BasePopover.Trigger>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      children,
      size,
      sideOffset = 8,
      side = "bottom",
      align = "start",
      ...props
    },
    ref
  ) => {
    return (
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={sideOffset} side={side} align={align}>
          <BasePopover.Popup
            ref={ref}
            className={cn(popoverContentVariants({ size }), className)}
            {...props}
          >
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Title
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight text-foreground", className)}
      {...props}
    />
  )
);
PopoverTitle.displayName = "PopoverTitle";

export const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-1.5", className)}
      {...props}
    />
  )
);
PopoverDescription.displayName = "PopoverDescription";

export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Close
      ref={ref}
      className={cn(
        "absolute left-3 top-3 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none transition-colors cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
PopoverClose.displayName = "PopoverClose";

/* --- کامپوننت جامع Shorthand --- */

export function Popover({
  trigger,
  children,
  title,
  description,
  showClose = false,
  triggerClassName,
  contentClassName,
  size = "default",
  side = "bottom",
  align = "start",
  sideOffset = 8,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen,
  ...rootProps
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (nextOpen: boolean, eventDetails?: unknown) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (controlledOnOpenChange as any)?.(nextOpen, eventDetails);
  };

  const close = () => handleOpenChange(false);

  return (
    <PopoverRoot
      open={open}
      onOpenChange={handleOpenChange}
      defaultOpen={defaultOpen}
      {...rootProps}
    >
      <PopoverTrigger className={triggerClassName}>{trigger}</PopoverTrigger>
      <PopoverContent
        size={size}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {showClose && (
          <PopoverClose aria-label="بستن">
            <X className="size-4" />
          </PopoverClose>
        )}
        {title && <PopoverTitle>{title}</PopoverTitle>}
        {description && <PopoverDescription>{description}</PopoverDescription>}
        {typeof children === "function"
          ? (children as PopoverRenderFunction)({ close })
          : children}
      </PopoverContent>
    </PopoverRoot>
  );
}

Popover.Root = PopoverRoot;
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Title = PopoverTitle;
Popover.Description = PopoverDescription;
Popover.Close = PopoverClose;
