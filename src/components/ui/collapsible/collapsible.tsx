import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  collapsibleRootVariants,
  collapsibleTriggerVariants,
  collapsibleChevronVariants,
  collapsiblePanelVariants,
} from "./collapsible.variants";
import type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleContextValue,
} from "./collapsible.types";

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "Collapsible sub-components must be used within <Collapsible />"
    );
  }
  return context;
};

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      size = "default",
      variant = "default",
      className,
      children,
      divided,
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
        <BaseCollapsible.Root
          ref={ref}
          className={cn(collapsibleRootVariants({ variant }), className)}
          {...props}
        >
          {children}
        </BaseCollapsible.Root>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ showChevron = true, className, children, ...props }, ref) => {
  const { size, variant } = useCollapsibleContext();

  return (
    <BaseCollapsible.Trigger
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
    </BaseCollapsible.Trigger>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { size, divided } = useCollapsibleContext();

  return (
    <BaseCollapsible.Panel
      ref={ref}
      className={cn(collapsiblePanelVariants({ size, divided }), className)}
      {...props}
    >
      {children}
    </BaseCollapsible.Panel>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";
