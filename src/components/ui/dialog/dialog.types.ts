import * as React from 'react';
import type { Dialog as BaseUIDialog } from '@base-ui/react/dialog';
import type { VariantProps } from 'class-variance-authority';
import type { dialogContentVariants } from './dialog.variants';

// تایپ‌های کامپوننت‌های زیربنایی (Base)
export type BaseDialogProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Root>;
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Trigger>;
export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Portal>;
export type DialogBackdropProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Backdrop>;
export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Title>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Description>;
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Close>;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIDialog.Popup>,
    VariantProps<typeof dialogContentVariants> {
  /**
   * آیا دکمه ضربدر بستن نمایش داده شود؟
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * کانتینر پورتال سفارشی
   */
  container?: HTMLElement | React.RefObject<HTMLElement | null> | null;
}

// تایپ کامپوننت اصلی و سطح بالا (Dialog)
export interface DialogProps extends BaseDialogProps {
  /**
   * المنتی که با کلیک روی آن دیالوگ باز می‌شود (اختیاری)
   */
  trigger?: React.ReactNode;
  /**
   * عنوان دیالوگ
   */
  title?: React.ReactNode;
  /**
   * توضیحات دیالوگ
   */
  description?: React.ReactNode;
  /**
   * بخش دکمه‌ها یا محتوای فوتر
   */
  footer?: React.ReactNode;
  /**
   * محتوای اصلی داخل دیالوگ
   */
  children?: React.ReactNode;
  /**
   * سایز دیالوگ
   * @default 'default'
   */
  size?: VariantProps<typeof dialogContentVariants>['size'];
  /**
   * آیا دکمه ضربدر بستن نمایش داده شود؟
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * کلاس سفارشی برای بدنه دیالوگ
   */
  contentClassName?: string;
}
