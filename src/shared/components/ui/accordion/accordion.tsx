import * as React from "react";
import { Accordion as BaseUIAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  accordionRootVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionChevronVariants,
  accordionPanelVariants,
  accordionInsetBoxVariants,
} from "./accordion.variants";
import {
  AccordionContext,
  useAccordionContext,
} from "./accordion-context";
import type {
  BaseAccordionProps,
  BaseAccordionItemProps,
  BaseAccordionTriggerProps,
  BaseAccordionContentProps,
  AccordionProps,
  AccordionContextValue,
} from "./accordion.types";

/* =========================================================================
   Base / Compound Components
   ========================================================================= */

export const BaseAccordion = React.forwardRef<HTMLDivElement, BaseAccordionProps>(
  (
    {
      size = "default",
      variant = "default",
      divided = false,
      inset = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<AccordionContextValue>(
      () => ({
        size,
        variant,
        divided,
        inset,
      }),
      [size, variant, divided, inset]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <BaseUIAccordion.Root
          ref={ref}
          className={cn(accordionRootVariants(), className)}
          {...props}
        >
          {children}
        </BaseUIAccordion.Root>
      </AccordionContext.Provider>
    );
  }
);
BaseAccordion.displayName = "BaseAccordion";

export const BaseAccordionItem = React.forwardRef<
  HTMLDivElement,
  BaseAccordionItemProps
>(({ className, children, ...props }, ref) => {
  const { variant } = useAccordionContext();

  return (
    <BaseUIAccordion.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </BaseUIAccordion.Item>
  );
});
BaseAccordionItem.displayName = "BaseAccordionItem";

export const BaseAccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  BaseAccordionTriggerProps
>(({ showChevron = true, className, children, ...props }, ref) => {
  const { size, variant } = useAccordionContext();

  return (
    <BaseUIAccordion.Header className="m-0 flex p-0">
      <BaseUIAccordion.Trigger
        ref={ref}
        className={cn(
          "group/trigger",
          accordionTriggerVariants({ size, variant }),
          className
        )}
        {...props}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          {children}
        </span>
        {showChevron && (
          <ChevronDown className={cn(accordionChevronVariants({ size }))} />
        )}
      </BaseUIAccordion.Trigger>
    </BaseUIAccordion.Header>
  );
});
BaseAccordionTrigger.displayName = "BaseAccordionTrigger";

export const BaseAccordionContent = React.forwardRef<
  HTMLDivElement,
  BaseAccordionContentProps
>(({ inset: itemInset, className, children, ...props }, ref) => {
  const { size, divided, inset: contextInset } = useAccordionContext();
  const isInset = itemInset ?? contextInset ?? false;

  return (
    <BaseUIAccordion.Panel
      ref={ref}
      className={cn(
        accordionPanelVariants({ size, divided: isInset ? false : divided, inset: isInset }),
        className
      )}
      {...props}
    >
      {isInset ? (
        <div className={cn(accordionInsetBoxVariants({ size }))}>
          {children}
        </div>
      ) : (
        children
      )}
    </BaseUIAccordion.Panel>
  );
});
BaseAccordionContent.displayName = "BaseAccordionContent";

/* =========================================================================
   Shorthand Component (نسخه آماده و سریع با آرایه items)
   ========================================================================= */

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, ...props }, ref) => {
    return (
      <BaseAccordion ref={ref} {...props}>
        {items.map((item) => (
          <BaseAccordionItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <BaseAccordionTrigger showChevron={item.showChevron ?? true}>
              {item.icon}
              <span>{item.title}</span>
            </BaseAccordionTrigger>
            <BaseAccordionContent inset={item.inset}>
              {item.content}
            </BaseAccordionContent>
          </BaseAccordionItem>
        ))}
      </BaseAccordion>
    );
  }
);
Accordion.displayName = "Accordion";
