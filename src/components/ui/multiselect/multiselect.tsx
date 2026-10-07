import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronDown, Loader2, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import Checkbox from "../checkbox/checkbox";
import {
  multiSelectItemVariants,
  multiSelectPopupVariants,
  multiSelectTriggerVariants,
} from "./multiselect.variants";
import type {
  MultiSelectOption,
  MultiSelectOptionGroup,
  MultiSelectOptions,
  MultiSelectSize,
  SimplifiedMultiSelectProps,
} from "./multiselect.types";

function isOptionGroup(
  item: MultiSelectOption | MultiSelectOptionGroup
): item is MultiSelectOptionGroup {
  return "options" in item && Array.isArray(item.options);
}

function filterOptions(options: MultiSelectOptions, query: string): MultiSelectOptions {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return options;

  const filtered: (MultiSelectOption | MultiSelectOptionGroup)[] = [];

  for (const item of options) {
    if (isOptionGroup(item)) {
      const matched = item.options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(cleanQuery) ||
          opt.value.toLowerCase().includes(cleanQuery)
      );

      if (matched.length > 0) {
        filtered.push({ ...item, options: matched });
      }
    } else {
      if (
        item.label.toLowerCase().includes(cleanQuery) ||
        item.value.toLowerCase().includes(cleanQuery)
      ) {
        filtered.push(item);
      }
    }
  }

  return filtered;
}

const EMPTY_OPTIONS: MultiSelectOptions = [];

function uniq(values: string[]): string[] {
  return Array.from(new Set(values));
}

function toggleValue(values: string[], v: string): string[] {
  if (values.includes(v)) return values.filter((x) => x !== v);
  return [...values, v];
}

interface MultiSelectItemRowInternalProps {
  value: string;
  label: string;
  disabled?: boolean;
  selected: boolean;
  onToggle: (value: string) => void;
  size: MultiSelectSize;
}

const MultiSelectItemRow: React.FC<MultiSelectItemRowInternalProps> = ({
  value,
  label,
  disabled,
  selected,
  onToggle,
  size,
}) => {
  const checkboxSize = size === "xl" || size === "lg" ? "default" : "sm";

  return (
    <div
      role="option"
      aria-selected={selected}
      data-selected={selected ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      className={cn(
        multiSelectItemVariants({ size }),
        "flex items-center gap-2 w-full cursor-pointer select-none rounded-md transition-colors",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) onToggle(value);
      }}
    >
      <Checkbox
        checked={selected}
        disabled={disabled}
        size={checkboxSize}
        tabIndex={-1}
        className="pointer-events-none shrink-0"
      />
      <span className="truncate text-start flex-1">{label}</span>
    </div>
  );
};

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  SimplifiedMultiSelectProps
>(
  (
    {
      id,
      name,
      label,
      placeholder = "انتخاب کنید",
      helperText,
      error,
      disabled,
      required,
      fullWidth = true,
      size = "default",
      variant = "default",
      className,
      wrapperClassName,

      value,
      defaultValue,
      onValueChange,

      options = EMPTY_OPTIONS,
      iconStart,

      emptyText = "گزینه‌ای یافت نشد",

      searchable = false,
      searchPlaceholder = "جست‌وجو...",
      searchDebounceMs = 0,
      maxPopupHeightClass,

      isLoading,
      loadingText = "در حال بارگذاری...",

      closeOnSelect = false,
      maxVisibleLabels = 2,
      showClearButton = true,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const [isOpen, setIsOpen] = React.useState(false);

    const [rawQuery, setRawQuery] = React.useState("");
    const [debouncedQuery, setDebouncedQuery] = React.useState("");
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const isEffectivelyDisabled = Boolean(disabled || isLoading);
    const hasError = Boolean(error);

    const isControlled = value != null;
    const [uncontrolled, setUncontrolled] = React.useState<string[]>(
      uniq(defaultValue ?? [])
    );
    const selectedValues = uniq(isControlled ? value! : uncontrolled);

    const setSelectedValues = React.useCallback(
      (next: string[]) => {
        const cleaned = uniq(next);
        if (!isControlled) setUncontrolled(cleaned);
        onValueChange?.(cleaned);
      },
      [isControlled, onValueChange]
    );

    React.useEffect(() => {
      if (searchDebounceMs <= 0) return;
      const t = setTimeout(() => setDebouncedQuery(rawQuery), searchDebounceMs);
      return () => clearTimeout(t);
    }, [rawQuery, searchDebounceMs]);

    const effectiveQuery = searchDebounceMs > 0 ? debouncedQuery : rawQuery;

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !effectiveQuery.trim()) return options;
      return filterOptions(options, effectiveQuery);
    }, [options, searchable, effectiveQuery]);

    const labelMap = React.useMemo(() => {
      const map = new Map<string, string>();
      for (const item of options) {
        if (isOptionGroup(item)) {
          for (const sub of item.options) map.set(sub.value, sub.label);
        } else {
          map.set(item.value, item.label);
        }
      }
      return map;
    }, [options]);

    const selectedLabels = React.useMemo(() => {
      return selectedValues.map((v) => labelMap.get(v) ?? v);
    }, [selectedValues, labelMap]);

    const { visibleLabels, remainingCount } = React.useMemo(() => {
      if (selectedLabels.length === 0) {
        return { visibleLabels: [], remainingCount: 0 };
      }
      const visible = selectedLabels.slice(0, maxVisibleLabels);
      const remaining = selectedLabels.length - visible.length;
      return { visibleLabels: visible, remainingCount: remaining };
    }, [selectedLabels, maxVisibleLabels]);

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        setRawQuery("");
        if (searchDebounceMs > 0) setDebouncedQuery("");
      }
    };

    React.useEffect(() => {
      if (isOpen && searchable) {
        const t = setTimeout(() => searchInputRef.current?.focus(), 50);
        return () => clearTimeout(t);
      }
    }, [isOpen, searchable]);

    const internalFormSize =
      size === "xl" || size === "lg" ? "default" : size === "xs" ? "xs" : "sm";

    const onToggle = (v: string) => {
      const next = toggleValue(selectedValues, v);
      setSelectedValues(next);
      if (closeOnSelect) setIsOpen(false);
    };

    const onClear = () => {
      setSelectedValues([]);
    };

    const renderOptions = (opts: MultiSelectOptions) => {
      return opts.map((item, index) => {
        if (isOptionGroup(item)) {
          return (
            <div key={item.label || index} className="py-1">
              <div className="px-2.5 py-1 text-xs font-semibold text-muted-foreground select-none">
                {item.label}
              </div>
              {item.options.map((sub) => (
                <MultiSelectItemRow
                  key={sub.value}
                  value={sub.value}
                  label={sub.label}
                  disabled={sub.disabled}
                  selected={selectedValues.includes(sub.value)}
                  onToggle={onToggle}
                  size={size}
                />
              ))}
            </div>
          );
        }

        return (
          <MultiSelectItemRow
            key={item.value}
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            selected={selectedValues.includes(item.value)}
            onToggle={onToggle}
            size={size}
          />
        );
      });
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5 text-right",
          fullWidth ? "w-full" : "w-fit",
          wrapperClassName
        )}
      >
        {label && (
          <Label
            htmlFor={selectId}
            size={internalFormSize}
            disabled={disabled}
            hasError={hasError}
            required={required}
          >
            {label}
          </Label>
        )}

        <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
          {name ? (
            <input type="hidden" name={name} value={selectedValues.join(",")} />
          ) : null}

          <PopoverPrimitive.Trigger
            ref={ref}
            id={selectId}
            disabled={isEffectivelyDisabled}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={cn(
              multiSelectTriggerVariants({
                size,
                variant,
                hasError,
                fullWidth,
              }),
              className
            )}
          >
            <div className="flex items-center gap-1.5 truncate">
              {iconStart ? (
                <span className="size-4 shrink-0 text-muted-foreground flex items-center justify-center">
                  {iconStart}
                </span>
              ) : null}

              {selectedLabels.length === 0 ? (
                <span className="truncate text-start text-muted-foreground">
                  {placeholder}
                </span>
              ) : (
                <>
                  <span className="truncate text-start">
                    {visibleLabels.join("، ")}
                  </span>

                  {remainingCount > 0 && (
                    <span
                      dir="ltr"
                      className="inline-flex shrink-0 items-center justify-center rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      +{remainingCount}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {showClearButton && selectedValues.length > 0 && !isEffectivelyDisabled ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  shape="circle"
                  iconOnly
                  stopPropagation
                  onClick={onClear}
                  aria-label="پاک کردن انتخاب‌ها"
                  className="size-5 text-muted-foreground hover:text-foreground hover:bg-muted/80 p-0"
                >
                  <X className="size-3" />
                </Button>
              ) : null}

              {isLoading ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
              ) : (
                <span className="text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180 shrink-0">
                  <ChevronDown className="size-4" />
                </span>
              )}
            </div>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Positioner
              side="bottom"
              sideOffset={4}
              className="z-50 select-none outline-none"
            >
              <PopoverPrimitive.Popup
                className={cn(multiSelectPopupVariants({ size }), maxPopupHeightClass)}
              >
                {searchable ? (
                  <div className="p-1.5 border-b border-border/80 sticky top-0 bg-popover z-10">
                    <Input
                      ref={searchInputRef}
                      value={rawQuery}
                      onChange={(e) => setRawQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      size={internalFormSize}
                      iconStart={<Search className="size-3.5" />}
                      className="bg-muted/30 focus-visible:bg-background"
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : null}

                <div className="p-1 overflow-y-auto flex-1">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground select-none">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span>{loadingText}</span>
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="py-4 px-2 text-center text-xs text-muted-foreground select-none">
                      {emptyText}
                    </div>
                  ) : (
                    renderOptions(filteredOptions)
                  )}
                </div>
              </PopoverPrimitive.Popup>
            </PopoverPrimitive.Positioner>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {hasError ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive animate-in fade-in-50"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
