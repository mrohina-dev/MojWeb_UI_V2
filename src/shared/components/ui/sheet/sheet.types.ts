import * as React from 'react';
import type { Dialog as BaseUIDialog } from '@base-ui/react/dialog';
import type { VariantProps } from 'class-variance-authority';
import type {
  sheetContentVariants,
  sheetDescriptionVariants,
  sheetHeaderVariants,
  sheetTitleVariants,
} from './sheet.variants';

export type SheetSide = 'right' | 'left' | 'top' | 'bottom';
export type SheetSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';
export type SheetVariant = 'default' | 'primary';

export type BaseSheetProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Root>;
export type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Trigger>;
export type SheetPortalProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Portal>;
export type SheetCloseProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Close>;
export type SheetBackdropProps = React.ComponentPropsWithoutRef<typeof BaseUIDialog.Backdrop>;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIDialog.Popup>,
    VariantProps<typeof sheetContentVariants> {
  showCloseButton?: boolean;
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
}

export interface SheetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetHeaderVariants> {}

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

export interface SheetTitleProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIDialog.Title>,
    VariantProps<typeof sheetTitleVariants> {}

export interface SheetDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof BaseUIDialog.Description>,
    VariantProps<typeof sheetDescriptionVariants> {}

export interface SheetProps extends BaseSheetProps {
  trigger?: React.ReactNode;
  side?: SheetSide;
  size?: SheetSize;
  variant?: SheetVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  contentClassName?: string;
}
