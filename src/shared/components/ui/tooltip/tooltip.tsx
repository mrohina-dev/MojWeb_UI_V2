import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';

import { cn } from '@/shared/lib/utils';

import type { SimpleTooltipProps, TooltipContentProps } from './tooltip.types';
import { tooltipVariants } from './tooltip.variants';

export const TooltipProvider = (
  props: React.ComponentPropsWithoutRef<typeof BaseTooltip.Provider>
) => <BaseTooltip.Provider {...props} />;
TooltipProvider.displayName = 'TooltipProvider';

export const Tooltip = (
  props: React.ComponentPropsWithoutRef<typeof BaseTooltip.Root>
) => <BaseTooltip.Root {...props} />;
Tooltip.displayName = 'Tooltip';

export const TooltipTrigger = (
  props: React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>
) => <BaseTooltip.Trigger {...props} />;
TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipPortal = (
  props: React.ComponentPropsWithoutRef<typeof BaseTooltip.Portal>
) => <BaseTooltip.Portal {...props} />;
TooltipPortal.displayName = 'TooltipPortal';

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(
  (
    {
      className,
      variant,
      size,
      side = 'bottom',
      sideOffset = 6,
      align = 'center',
      alignOffset = 0,
      showArrow = false,
      container,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <BaseTooltip.Portal container={container}>
        <BaseTooltip.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className="z-100"
        >
          <BaseTooltip.Popup
            ref={ref}
            className={cn(tooltipVariants({ variant, size }), className)}
            {...props}
          >
            {children}
            {showArrow && (
              <BaseTooltip.Arrow
                data-part="arrow"
                className="transition-colors"
              />
            )}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

/**
 * کامپوننت میانبر برای استفاده سریع در سراسر سامانه
 */
export const SimpleTooltip = ({
  content,
  children,
  side = 'bottom',
  sideOffset = 6,
  align = 'center',
  alignOffset = 0,
  delay = 200,
  disabled = false,
  open,
  defaultOpen,
  onOpenChange,
  variant = 'default',
  size = 'default',
  showArrow = false,
  container,
  className,
}: SimpleTooltipProps) => {
  // اگر محتوا خالی باشد یا کامپوننت غیرفعال باشد، فقط المنت فرزند را برمی‌گرداند
  if (!content || disabled) {
    return children;
  }

  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <BaseTooltip.Trigger render={children} />
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          variant={variant}
          size={size}
          showArrow={showArrow}
          container={container}
          className={className}
        >
          {content}
        </TooltipContent>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};

export default SimpleTooltip;
