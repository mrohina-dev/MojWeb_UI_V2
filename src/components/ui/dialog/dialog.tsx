import * as React from 'react';
import { Dialog as BaseUIDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import type {
  BaseDialogProps,
  DialogBackdropProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.types';
import {
  dialogBackdropVariants,
  dialogContentVariants,
} from './dialog.variants';

/* -------------------------------------------------------------------------- */
/*                                Base Dialog API                             */
/* -------------------------------------------------------------------------- */

export const BaseDialog = ({ ...props }: BaseDialogProps) => (
  <BaseUIDialog.Root {...props} />
);
BaseDialog.displayName = 'BaseDialog';

export const DialogTrigger = ({ ...props }: DialogTriggerProps) => (
  <BaseUIDialog.Trigger {...props} />
);
DialogTrigger.displayName = 'DialogTrigger';

export const DialogPortal = ({ ...props }: DialogPortalProps) => (
  <BaseUIDialog.Portal {...props} />
);
DialogPortal.displayName = 'DialogPortal';

export const DialogClose = ({ ...props }: DialogCloseProps) => (
  <BaseUIDialog.Close {...props} />
);
DialogClose.displayName = 'DialogClose';

export const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  DialogBackdropProps
>(({ className, ...props }, ref) => (
  <BaseUIDialog.Backdrop
    ref={ref}
    className={cn(dialogBackdropVariants(), className)}
    {...props}
  />
));
DialogBackdrop.displayName = 'DialogBackdrop';

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      showCloseButton = true,
      container,
      ...props
    },
    ref
  ) => (
    <DialogPortal container={container}>
      <DialogBackdrop />
      <BaseUIDialog.Popup
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <BaseUIDialog.Close
            aria-label="بستن"
            className="absolute left-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </BaseUIDialog.Close>
        )}
      </BaseUIDialog.Popup>
    </DialogPortal>
  )
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({
  className,
  ...props
}: DialogHeaderProps) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-right', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = ({
  className,
  ...props
}: DialogFooterProps) => (
  <div
    className={cn(
      'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <BaseUIDialog.Title
    ref={ref}
    className={cn(
      'text-lg font-bold leading-none tracking-tight text-foreground',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <BaseUIDialog.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

/* -------------------------------------------------------------------------- */
/*                               High-Level Dialog                            */
/* -------------------------------------------------------------------------- */

export const Dialog = ({
  trigger,
  title,
  description,
  footer,
  children,
  size = 'default',
  showCloseButton = true,
  contentClassName,
  ...dialogProps
}: DialogProps) => {
  return (
    <BaseDialog {...dialogProps}>
      {trigger && (
        <DialogTrigger render={trigger as React.ReactElement} />
      )}
      <DialogContent
        size={size}
        showCloseButton={showCloseButton}
        className={contentClassName}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children && <div className="py-2">{children}</div>}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </BaseDialog>
  );
};
Dialog.displayName = 'Dialog';
