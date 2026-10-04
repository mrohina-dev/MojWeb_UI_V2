import * as React from 'react';
import { Dialog as BaseUIDialog } from '@base-ui/react/dialog';
import { Maximize2, Minimize2, X } from 'lucide-react';

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
      showMaximizeButton = false,
      isMaximized: controlledMaximized,
      defaultMaximized = false,
      onMaximizedChange,
      draggable = false,
      container,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLDivElement | null>(null);

    // ادغام ref بیرونی و داخلی
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const [uncontrolledMaximized, setUncontrolledMaximized] =
      React.useState(defaultMaximized);

    const isMax =
      controlledMaximized !== undefined
        ? controlledMaximized
        : uncontrolledMaximized;

    // متغیرهای نگهدارنده مختصات بدون نیاز به Re-render اضافه
    const [isDragging, setIsDragging] = React.useState(false);
    const offsetRef = React.useRef({ x: 0, y: 0 });
    const dragStartRef = React.useRef({ startX: 0, startY: 0, initOffsetX: 0, initOffsetY: 0 });
    const rafIdRef = React.useRef<number | null>(null);

    const updateTransform = (x: number, y: number) => {
      if (internalRef.current) {
        internalRef.current.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
      }
    };

    const toggleMaximize = () => {
      const nextState = !isMax;
      if (nextState) {
        // هنگام ماکسیمایز شدن موقعیت ریست شود
        offsetRef.current = { x: 0, y: 0 };
        if (internalRef.current) {
          internalRef.current.style.transform = '';
        }
      } else {
        // بازگشت از تمام صفحه به موقعیت قبلی
        if (offsetRef.current.x !== 0 || offsetRef.current.y !== 0) {
          updateTransform(offsetRef.current.x, offsetRef.current.y);
        }
      }
      if (controlledMaximized === undefined) {
        setUncontrolledMaximized(nextState);
      }
      onMaximizedChange?.(nextState);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggable || isMax || e.button !== 0) return;

      const target = e.target as HTMLElement;
      // نادیده گرفتن کلیک روی دکمه‌ها، ورودی‌ها و فرم‌ها
      if (
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-drag-ignore]')
      ) {
        return;
      }

      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);

      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        initOffsetX: offsetRef.current.x,
        initOffsetY: offsetRef.current.y,
      };
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      const nextX = dragStartRef.current.initOffsetX + dx;
      const nextY = dragStartRef.current.initOffsetY + dy;

      offsetRef.current = { x: nextX, y: nextY };

      // هماهنگی بدون لگ با نرخ فریم مانیتور
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        updateTransform(nextX, nextY);
      });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // نادیده گرفتن خطا
      }
    };

    return (
      <DialogPortal container={container}>
        <DialogBackdrop />
        <BaseUIDialog.Popup
          ref={setRefs}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={style}
          className={cn(
            dialogContentVariants({
              size: isMax ? undefined : size,
              isMaximized: isMax,
            }),
            draggable && !isMax && [
              'cursor-grab select-none',
              // در حین درگ، transition کامپوننت صفر می‌شود تا موس جلو نزند
              isDragging && 'transition-none! cursor-grabbing will-change-transform',
            ],
            className
          )}
          {...props}
        >
          {/* محتوا با cursor-default جدا می‌شود تا متن‌ها قابل انتخاب باشند */}
          <div className="cursor-default select-text">
            {children}
          </div>

          {/* دکمه‌های کنترل پنجره */}
          {(showCloseButton || showMaximizeButton) && (
            <div
              data-drag-ignore
              className="absolute left-4 top-4 z-10 flex items-center gap-1 cursor-default select-none"
            >
              {showMaximizeButton && (
                <button
                  type="button"
                  onClick={toggleMaximize}
                  aria-label={isMax ? 'کوچک‌نمایی' : 'بزرگ‌نمایی'}
                  title={isMax ? 'اندازه معمولی' : 'تمام‌صفحه'}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isMax ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </button>
              )}

              {showCloseButton && (
                <BaseUIDialog.Close
                  aria-label="بستن"
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" />
                </BaseUIDialog.Close>
              )}
            </div>
          )}
        </BaseUIDialog.Popup>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({
  className,
  ...props
}: DialogHeaderProps) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-right pe-16', className)}
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
  showMaximizeButton = false,
  isMaximized,
  defaultMaximized,
  onMaximizedChange,
  draggable = false,
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
        showMaximizeButton={showMaximizeButton}
        isMaximized={isMaximized}
        defaultMaximized={defaultMaximized}
        onMaximizedChange={onMaximizedChange}
        draggable={draggable}
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
