import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogClose } from '@/shared/components/ui/dialog';
import type { ConfirmDialogProps, ConfirmVariant } from './confirm-dialog.types';
import type { ButtonProps } from '@/shared/components/ui/button/button.type';

const variantToButtonVariant: Record<ConfirmVariant, ButtonProps['variant']> = {
  destructive: 'destructive',
  primary: 'primary',
  warning: 'secondary',
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'آیا از انجام این عملیات اطمینان دارید؟',
  description,
  message,
  confirmText = 'تایید',
  cancelText = 'انصراف',
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  onConfirm,
  onCancel,
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      // Base UI انتظار event/details به عنوان آرگومان دوم را دارد
      (onOpenChange as (open: boolean, event?: unknown) => void)(false);
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  const confirmButtonVariant = variantToButtonVariant[variant];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size={size}
      title={title}
      description={description}
      footer={
        <>
          <DialogClose
            render={
              <Button
                variant="secondary"
                outline
                disabled={isLoading}
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
            }
          />
          <Button
            variant={confirmButtonVariant}
            loading={isLoading}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
      {...props}
    >
      {message && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
      )}
      {children}
    </Dialog>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';
export default ConfirmDialog;
