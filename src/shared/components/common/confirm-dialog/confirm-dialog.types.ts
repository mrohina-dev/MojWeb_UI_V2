import type * as React from 'react';
import type { DialogProps } from '@/shared/components/ui/dialog/dialog.types';

export type ConfirmVariant = 'destructive' | 'primary' | 'warning';

export interface ConfirmDialogProps extends Omit<DialogProps, 'footer' | 'children'> {
  /**
   * متن پیام یا محتوای توضیحی داخل دیالوگ
   */
  message?: React.ReactNode;

  /**
   * عنوان دکمه تایید (پیش‌فرض: "تایید")
   */
  confirmText?: string;

  /**
   * عنوان دکمه انصراف (پیش‌فرض: "انصراف")
   */
  cancelText?: string;

  /**
   * نوع عملیات برای تنظیم رنگ و استایل دکمه تایید
   * @default 'primary'
   */
  variant?: ConfirmVariant;

  /**
   * وضعیت لودینگ برای دکمه تایید (مثلاً هنگام ارسال درخواست به سرور)
   */
  isLoading?: boolean;

  /**
   * کال‌بک هنگام کلیک روی دکمه تایید
   */
  onConfirm: () => void | Promise<void>;

  /**
   * کال‌بک اختیاری هنگام لغو عملیات
   */
  onCancel?: () => void;

  /**
   * محتوای سفارشی به عنوان بدنه (در صورت نیاز به JSX فراتر از متن ساده)
   */
  children?: React.ReactNode;
}
