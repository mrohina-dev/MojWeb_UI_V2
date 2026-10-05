import * as React from 'react';
import type { Menu as BaseMenu } from '@base-ui/react';
import type { DropdownMenuContentVariantProps } from './dropdown-menu.variants';

export type ComponentSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';

export type DropdownMenuVariant = NonNullable<DropdownMenuContentVariantProps['variant']>;

export type DropdownMenuRootProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Root>;

export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>,
    DropdownMenuContentVariantProps {
  sideOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Item> {
  inset?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>;

/* --- تایپ‌های تصحیح‌شده ساب‌منو (Submenu) --- */
export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuRoot>;

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger> {
  inset?: boolean;
}

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>,
    DropdownMenuContentVariantProps {
  sideOffset?: number;
  alignOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export interface DropdownMenuItemConfig {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  children?: DropdownMenuItemConfig[];
}

export interface DropdownMenuGroupConfig {
  label?: string;
  items: DropdownMenuItemConfig[];
}

export interface DropdownMenuProps extends DropdownMenuRootProps {
  trigger: React.ReactNode;
  items?: (DropdownMenuItemConfig | DropdownMenuGroupConfig)[];
  children?: React.ReactNode;
  size?: ComponentSize;
  variant?: DropdownMenuVariant;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  triggerClassName?: string;
  contentClassName?: string;
}
