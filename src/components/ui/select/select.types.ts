import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import type { Select as SelectPrimitive } from "@base-ui/react/select";
import type { VariantProps } from "class-variance-authority";
import type {
  selectItemVariants,
  selectPopupVariants,
  selectTriggerVariants,
} from "./select.variants";

export type SelectSize = "sm" | "default" | "lg";
export type SelectAlign = "start" | "center" | "end";
export type SelectSide = "top" | "bottom" | "left" | "right";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface SelectOptionGroup {
  readonly label: string;
  readonly options: readonly SelectOption[];
}

export type SelectOptions = readonly (SelectOption | SelectOptionGroup)[];

export interface SelectRootProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  size?: SelectSize;
}

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  VariantProps<typeof selectTriggerVariants> {
  hasError?: boolean;
  hideDefaultIndicator?: boolean;
}

export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

export type SelectIconProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>;

export type SelectGroupProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

export type SelectGroupLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.GroupLabel>;

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

export interface SelectContentProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Popup>,
  VariantProps<typeof selectPopupVariants> {
  side?: SelectSide;
  align?: SelectAlign;
  sideOffset?: number;
  alignOffset?: number;
  children?: ReactNode;
}

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item> &
  VariantProps<typeof selectItemVariants>;

export interface SimplifiedSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: SelectSize;
  className?: string;
  wrapperClassName?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: SelectOptions;
  iconStart?: ReactNode;
  side?: SelectSide;
  align?: SelectAlign;
  sideOffset?: number;
  alignOffset?: number;
  emptyText?: string;
  // قابلیت‌های جست‌وجو و اسکرول
  searchable?: boolean;
  searchPlaceholder?: string;
  searchDebounceMs?: number;
  maxPopupHeightClass?: string; // امکان اورراید کلاس مثل max-h-80 در صورت نیاز
  isLoading?: boolean;
  loadingText?: string;
}

export type SelectComponentType = ForwardRefExoticComponent<
  SimplifiedSelectProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Trigger>>
> & {
  Root: FC<SelectRootProps>;
  Trigger: ForwardRefExoticComponent<
    SelectTriggerProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Trigger>>
  >;
  Value: ForwardRefExoticComponent<
    SelectValueProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Value>>
  >;
  Icon: ForwardRefExoticComponent<
    SelectIconProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Icon>>
  >;
  Content: ForwardRefExoticComponent<
    SelectContentProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Popup>>
  >;
  Item: ForwardRefExoticComponent<
    SelectItemProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Item>>
  >;
  Group: ForwardRefExoticComponent<
    SelectGroupProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Group>>
  >;
  GroupLabel: ForwardRefExoticComponent<
    SelectGroupLabelProps & RefAttributes<ComponentRef<typeof SelectPrimitive.GroupLabel>>
  >;
  Separator: ForwardRefExoticComponent<
    SelectSeparatorProps & RefAttributes<ComponentRef<typeof SelectPrimitive.Separator>>
  >;
};
