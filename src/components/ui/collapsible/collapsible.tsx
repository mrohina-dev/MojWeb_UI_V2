import * as React from "react";
import { Collapsible as BaseUICollapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  collapsibleRootVariants,
  collapsibleTriggerVariants,
  collapsibleChevronVariants,
  collapsiblePanelVariants,
} from "./collapsible.variants";
import {
  CollapsibleContext,
  useCollapsibleContext,
} from "./collapsible-context";
import type {
  BaseCollapsibleProps,
  BaseCollapsibleTriggerProps,
  BaseCollapsibleContentProps,
  CollapsibleProps,
  CollapsibleContextValue,
} from "./collapsible.types";

/* =========================================================================
   Base / Compound Components
   ========================================================================= */

export const BaseCollapsible = React.forwardRef<HTMLDivElement, BaseCollapsibleProps>(
  (
    {
      size = "default",
      variant = "default",
      divided = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<CollapsibleContextValue>(
      () => ({
        size,
        variant,
        divided,
      }),
      [size, variant, divided]
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <BaseUICollapsible.Root
          ref={ref}
          className={cn(collapsibleRootVariants({ variant }), className)}
          {...props}
        >
          {children}
        </BaseUICollapsible.Root>
      </CollapsibleContext.Provider>
    );
  }
);
BaseCollapsible.displayName = "BaseCollapsible";

export const BaseCollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  BaseCollapsibleTriggerProps
>(({ showChevron = true, className, children, ...props }, ref) => {
  const { size, variant } = useCollapsibleContext();

  return (
    <BaseUICollapsible.Trigger
      ref={ref}
      className={cn(
        "group/trigger",
        collapsibleTriggerVariants({ size, variant }),
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
        {children}
      </span>
      {showChevron && (
        <ChevronDown className={cn(collapsibleChevronVariants({ size }))} />
      )}
    </BaseUICollapsible.Trigger>
  );
});
BaseCollapsibleTrigger.displayName = "BaseCollapsibleTrigger";

export const BaseCollapsibleContent = React.forwardRef<
  HTMLDivElement,
  BaseCollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { size, divided } = useCollapsibleContext();

  return (
    <BaseUICollapsible.Panel
      ref={ref}
      className={cn(collapsiblePanelVariants({ size, divided }), className)}
      {...props}
    >
      {children}
    </BaseUICollapsible.Panel>
  );
});
BaseCollapsibleContent.displayName = "BaseCollapsibleContent";

/* =========================================================================
   Shorthand Component (نسخه یکپارچه و آماده استفاده)
   ========================================================================= */

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      title,
      icon,
      showChevron = true,
      triggerProps,
      contentProps,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <BaseCollapsible ref={ref} {...props}>
        <BaseCollapsibleTrigger showChevron={showChevron} {...triggerProps}>
          {icon}
          <span>{title}</span>
        </BaseCollapsibleTrigger>
        <BaseCollapsibleContent {...contentProps}>
          {children}
        </BaseCollapsibleContent>
      </BaseCollapsible>
    );
  }
);
Collapsible.displayName = "Collapsible";
