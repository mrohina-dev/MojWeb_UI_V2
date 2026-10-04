import * as React from 'react';
import { Dialog as BaseUIDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import type {
  BaseSheetProps,
  SheetBackdropProps,
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
} from './sheet.types';
import {
  sheetBackdropVariants,
  sheetCloseButtonVariants,
  sheetContentVariants,
  sheetDescriptionVariants,
  sheetHeaderVariants,
  sheetTitleVariants,
} from './sheet.variants';

/* -------------------------------------------------------------------------- */
/*                                Base Sheet API                              */
/* -------------------------------------------------------------------------- */

export const BaseSheet = ({ ...props }: BaseSheetProps) => (
  <BaseUIDialog.Root {...props} />
);
BaseSheet.displayName = 'BaseSheet';

export const SheetTrigger = ({ ...props }: SheetTriggerProps) => (
  <BaseUIDialog.Trigger {...props} />
);
SheetTrigger.displayName = 'SheetTrigger';

export const SheetPortal = ({ ...props }: SheetPortalProps) => (
  <BaseUIDialog.Portal {...props} />
);
SheetPortal.displayName = 'SheetPortal';

export const SheetClose = ({ ...props }: SheetCloseProps) => (
  <BaseUIDialog.Close {...props} />
);
SheetClose.displayName = 'SheetClose';

export const SheetBackdrop = React.forwardRef<
  HTMLDivElement,
  SheetBackdropProps
>(({ className, ...props }, ref) => (
  <BaseUIDialog.Backdrop
    ref={ref}
    className={cn(sheetBackdropVariants(), className)}
    {...props}
  />
));
SheetBackdrop.displayName = 'SheetBackdrop';

export const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(
  (
    {
      className,
      children,
      side = 'right',
      size = 'default',
      variant = 'default',
      showCloseButton = true,
      container,
      ...props
    },
    ref
  ) => {
    return (
      <SheetPortal container={container}>
        <SheetBackdrop />
        <BaseUIDialog.Popup
          ref={ref}
          className={cn(sheetContentVariants({ side, size, variant }), className)}
          {...props}
        >
          {showCloseButton && (
            <div className="absolute top-4 left-4 z-10 flex items-center">
              <BaseUIDialog.Close
                aria-label="بستن"
                className={sheetCloseButtonVariants({ variant })}
              >
                <X className="size-4" />
              </BaseUIDialog.Close>
            </div>
          )}

          <div className="flex h-full w-full flex-col overflow-y-auto">
            {children}
          </div>
        </BaseUIDialog.Popup>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({
  className,
  variant = 'default',
  ...props
}: SheetHeaderProps) => (
  <div
    className={cn(sheetHeaderVariants({ variant }), className)}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = ({
  className,
  ...props
}: SheetFooterProps) => (
  <div
    className={cn(
      'mt-auto flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  SheetTitleProps
>(({ className, variant = 'default', ...props }, ref) => (
  <BaseUIDialog.Title
    ref={ref}
    className={cn(sheetTitleVariants({ variant }), className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(({ className, variant = 'default', ...props }, ref) => (
  <BaseUIDialog.Description
    ref={ref}
    className={cn(sheetDescriptionVariants({ variant }), className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

/* -------------------------------------------------------------------------- */
/*                               High-Level Sheet                             */
/* -------------------------------------------------------------------------- */

export const Sheet = ({
  trigger,
  side = 'right',
  size = 'default',
  variant = 'default',
  title,
  description,
  footer,
  children,
  showCloseButton = true,
  contentClassName,
  ...sheetProps
}: SheetProps) => {
  return (
    <BaseSheet {...sheetProps}>
      {trigger && (
        <SheetTrigger render={trigger as React.ReactElement} />
      )}
      <SheetContent
        side={side}
        size={size}
        variant={variant}
        showCloseButton={showCloseButton}
        className={contentClassName}
      >
        {(title || description) && (
          <SheetHeader variant={variant}>
            {title && <SheetTitle variant={variant}>{title}</SheetTitle>}
            {description && (
              <SheetDescription variant={variant}>
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        <div className="flex-1 overflow-y-auto py-2">{children}</div>

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </BaseSheet>
  );
};
Sheet.displayName = 'Sheet';
