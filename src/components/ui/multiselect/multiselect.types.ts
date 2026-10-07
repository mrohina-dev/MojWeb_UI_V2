import * as React from "react";
import type { ComponentSize, ComponentVariant } from "@/types/ui.types";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectOptionGroup {
  label: string;
  options: MultiSelectOption[];
}

export type MultiSelectOptions = (MultiSelectOption | MultiSelectOptionGroup)[];

/**
 * سایزهای مجاز برای MultiSelect (به استثنای full که با fullWidth هندل می‌شود)
 */
export type MultiSelectSize = Exclude<ComponentSize, "full">;

export interface SimplifiedMultiSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: MultiSelectSize;
  variant?: ComponentVariant;
  className?: string;
  wrapperClassName?: string;

  // Value control
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;

  // Options & Visuals
  options?: MultiSelectOptions;
  iconStart?: React.ReactNode;
  emptyText?: string;

  // Search feature
  searchable?: boolean;
  searchPlaceholder?: string;
  searchDebounceMs?: number;
  maxPopupHeightClass?: string;

  // Loading state
  isLoading?: boolean;
  loadingText?: string;

  // UX Behaviors
  closeOnSelect?: boolean;
  maxVisibleLabels?: number;
  showClearButton?: boolean;
}
