import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp, Loader2, Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Label } from "../label";
import { Input } from "../input";
import {
    selectItemVariants,
    selectPopupVariants,
    selectTriggerVariants,
} from "./select.variants";
import type {
    SelectContentProps,
    SelectGroupLabelProps,
    SelectGroupProps,
    SelectIconProps,
    SelectItemProps,
    SelectOption,
    SelectOptionGroup,
    SelectOptions,
    SelectRootProps,
    SelectSeparatorProps,
    SelectSize,
    SelectTriggerProps,
    SelectValueProps,
    SimplifiedSelectProps,
} from "./select.types";

const SelectSizeContext = React.createContext<SelectSize>("default");
const useSelectSize = () => React.useContext(SelectSizeContext);

function isSelectOptionGroup(
    item: SelectOption | SelectOptionGroup
): item is SelectOptionGroup {
    return "options" in item && Array.isArray(item.options);
}

// فیلتر کردن گزینه‌ها بر اساس عبارت جست‌وجو
function filterOptions(options: SelectOptions, query: string): SelectOptions {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return options;

    const filtered: (SelectOption | SelectOptionGroup)[] = [];

    for (const item of options) {
        if (isSelectOptionGroup(item)) {
            const matchedSubOptions = item.options.filter(
                (opt) =>
                    opt.label.toLowerCase().includes(cleanQuery) ||
                    opt.value.toLowerCase().includes(cleanQuery)
            );

            if (matchedSubOptions.length > 0) {
                filtered.push({
                    ...item,
                    options: matchedSubOptions,
                });
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

const EMPTY_OPTIONS: SelectOptions = [];

// ---------------- Compound Components ----------------

export const SelectRoot: React.FC<SelectRootProps> = ({
    children,
    size = "default",
    ...props
}) => {
    return (
        <SelectSizeContext.Provider value={size}>
            <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
        </SelectSizeContext.Provider>
    );
};
SelectRoot.displayName = "SelectRoot";

export const SelectTrigger = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
>(
    (
        {
            className,
            size,
            hasError,
            fullWidth,
            children,
            hideDefaultIndicator = false,
            ...props
        },
        ref
    ) => {
        const inheritedSize = useSelectSize();
        const effectiveSize = size ?? inheritedSize;

        return (
            <SelectPrimitive.Trigger
                ref={ref}
                className={cn(
                    selectTriggerVariants({
                        size: effectiveSize,
                        hasError,
                        fullWidth,
                    }),
                    className
                )}
                {...props}
            >
                {children}
                {!hideDefaultIndicator && (
                    <SelectPrimitive.Icon className="text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180 shrink-0">
                        <ChevronDown className="size-4" />
                    </SelectPrimitive.Icon>
                )}
            </SelectPrimitive.Trigger>
        );
    }
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Value>,
    SelectValueProps
>(({ className, ...props }, ref) => {
    return (
        <SelectPrimitive.Value
            ref={ref}
            className={cn("truncate text-start", className)}
            {...props}
        />
    );
});
SelectValue.displayName = "SelectValue";

export const SelectIcon = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Icon>,
    SelectIconProps
>(({ className, ...props }, ref) => {
    return (
        <SelectPrimitive.Icon
            ref={ref}
            className={cn("text-muted-foreground shrink-0", className)}
            {...props}
        />
    );
});
SelectIcon.displayName = "SelectIcon";

export const SelectGroup = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Group>,
    SelectGroupProps
>(({ className, ...props }, ref) => {
    return (
        <SelectPrimitive.Group
            ref={ref}
            className={cn("py-1", className)}
            {...props}
        />
    );
});
SelectGroup.displayName = "SelectGroup";

export const SelectGroupLabel = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.GroupLabel>,
    SelectGroupLabelProps
>(({ className, ...props }, ref) => {
    return (
        <SelectPrimitive.GroupLabel
            ref={ref}
            className={cn(
                "px-2.5 py-1 text-xs font-semibold text-muted-foreground select-none",
                className
            )}
            {...props}
        />
    );
});
SelectGroupLabel.displayName = "SelectGroupLabel";

export const SelectSeparator = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Separator>,
    SelectSeparatorProps
>(({ className, ...props }, ref) => {
    return (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    );
});
SelectSeparator.displayName = "SelectSeparator";

export const SelectContent = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Popup>,
    SelectContentProps
>(
    (
        {
            className,
            children,
            size,
            side = "bottom",
            align = "start",
            sideOffset = 4,
            alignOffset = 0,
            ...props
        },
        ref
    ) => {
        const inheritedSize = useSelectSize();
        const effectiveSize = size ?? inheritedSize;

        return (
            <SelectPrimitive.Portal>
                <SelectPrimitive.Positioner
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    alignItemWithTrigger={false}
                    className="z-50 select-none outline-none"
                >
                    <SelectPrimitive.ScrollUpArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
                        <ChevronUp className="size-4" />
                    </SelectPrimitive.ScrollUpArrow>

                    <SelectPrimitive.Popup
                        ref={ref}
                        className={cn(selectPopupVariants({ size: effectiveSize }), className)}
                        {...props}
                    >
                        {children}
                    </SelectPrimitive.Popup>

                    <SelectPrimitive.ScrollDownArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
                        <ChevronDown className="size-4" />
                    </SelectPrimitive.ScrollDownArrow>
                </SelectPrimitive.Positioner>
            </SelectPrimitive.Portal>
        );
    }
);
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    SelectItemProps
>(({ className, children, size, ...props }, ref) => {
    const inheritedSize = useSelectSize();
    const effectiveSize = size ?? inheritedSize;

    return (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(selectItemVariants({ size: effectiveSize }), className)}
            {...props}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className="ms-2">
                <Check className="size-4 text-primary" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
});
SelectItem.displayName = "SelectItem";

// ---------------- Shorthand Helper ----------------

const renderOptions = (options: SelectOptions) => {
    return options.map((item, index) => {
        if (isSelectOptionGroup(item)) {
            return (
                <SelectGroup key={item.label || index}>
                    <SelectGroupLabel>{item.label}</SelectGroupLabel>
                    {item.options.map((subItem) => (
                        <SelectItem
                            key={subItem.value}
                            value={subItem.value}
                            disabled={subItem.disabled}
                        >
                            {subItem.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            );
        }

        return (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                {item.label}
            </SelectItem>
        );
    });
};

export const Select = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    SimplifiedSelectProps
>(
    (
        {
            id,
            name,
            label,
            placeholder,
            helperText,
            error,
            disabled,
            required,
            fullWidth = true,
            size = "default",
            className,
            wrapperClassName,
            value,
            defaultValue,
            onValueChange,
            options = EMPTY_OPTIONS,
            iconStart,
            side = "bottom",
            align = "start",
            sideOffset = 4,
            alignOffset = 0,
            emptyText = "گزینه‌ای یافت نشد",
            searchable = false,
            searchPlaceholder = "جست‌وجو...",
            searchDebounceMs = 0,
            maxPopupHeightClass,
            isLoading,
            loadingText = "در حال بارگذاری...",
        },
        ref
    ) => {
        const generatedId = React.useId();
        const selectId = id || generatedId;
        const errorId = `${selectId}-error`;
        const helperId = `${selectId}-helper`;

        // مدیریت وضعیت جست‌وجو
        const [rawQuery, setRawQuery] = React.useState("");
        const [debouncedQuery, setDebouncedQuery] = React.useState("");
        const [isOpen, setIsOpen] = React.useState(false);
        const searchInputRef = React.useRef<HTMLInputElement>(null);

        const isEffectivelyDisabled = Boolean(disabled || isLoading);

        // اعمال دیبانس تنها در صورت مقداردهی تایمر مثبت
        React.useEffect(() => {
            if (searchDebounceMs <= 0) return;

            const timer = setTimeout(() => {
                setDebouncedQuery(rawQuery);
            }, searchDebounceMs);

            return () => clearTimeout(timer);
        }, [rawQuery, searchDebounceMs]);

        // استفاده مستقیم از rawQuery وقتی دیبانس صفر است (برای جلوگیری از خطای setState در effect)
        const effectiveQuery = searchDebounceMs > 0 ? debouncedQuery : rawQuery;

        const handleOpenChange = (open: boolean) => {
            setIsOpen(open);
            if (!open) {
                setRawQuery("");
                if (searchDebounceMs > 0) {
                    setDebouncedQuery("");
                }
            }
        };

        // فوکوس روی اینپوت بعد از باز شدن منو
        React.useEffect(() => {
            if (isOpen && searchable) {
                const timer = setTimeout(() => {
                    searchInputRef.current?.focus();
                }, 50);
                return () => clearTimeout(timer);
            }
        }, [isOpen, searchable]);

        // فیلتر کردن بهینه گزینه‌ها
        const filteredOptions = React.useMemo(() => {
            if (!searchable || !effectiveQuery.trim()) {
                return options;
            }
            return filterOptions(options, effectiveQuery);
        }, [options, searchable, effectiveQuery]);

        const hasError = Boolean(error);

        // نگاشت بهینه بدون تولید آرایه واسطه
        const labelMap = React.useMemo(() => {
            const map = new Map<string, string>();
            for (const item of options) {
                if (isSelectOptionGroup(item)) {
                    for (const sub of item.options) {
                        map.set(sub.value, sub.label);
                    }
                } else {
                    map.set(item.value, item.label);
                }
            }
            return map;
        }, [options]);

        const searchInputSize = size === "lg" ? "default" : "sm";

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
                        disabled={disabled}
                        hasError={hasError}
                        required={required}
                    >
                        {label}
                    </Label>
                )}

                <SelectRoot
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={onValueChange}
                    open={isOpen}
                    onOpenChange={handleOpenChange}
                    disabled={isEffectivelyDisabled}
                    required={required}
                    size={size}
                >
                    <SelectTrigger
                        ref={ref}
                        id={selectId}
                        hasError={hasError}
                        fullWidth={fullWidth}
                        className={className}
                        hideDefaultIndicator={Boolean(isLoading)}
                        aria-invalid={hasError ? true : undefined}
                        aria-describedby={
                            hasError ? errorId : helperText ? helperId : undefined
                        }
                    >
                        <div className="flex items-center gap-2 truncate">
                            {iconStart && (
                                <span className="size-4 shrink-0 text-muted-foreground flex items-center justify-center">
                                    {iconStart}
                                </span>
                            )}
                            <SelectValue
                                placeholder={placeholder}
                                className="data-placeholder:text-muted-foreground"
                            >
                                {(val) => {
                                    if (val == null || val === "") {
                                        return placeholder ?? null;
                                    }
                                    return labelMap.get(String(val)) ?? String(val);
                                }}
                            </SelectValue>
                        </div>

                        {isLoading && (
                            <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                        )}
                    </SelectTrigger>

                    <SelectContent
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        className={maxPopupHeightClass}
                    >
                        {searchable && (
                            <div className="p-1.5 border-b border-border/80 sticky top-0 bg-popover z-10">
                                <Input
                                    ref={searchInputRef}
                                    value={rawQuery}
                                    onChange={(e) => setRawQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    size={searchInputSize}
                                    iconStart={<Search className="size-3.5" />}
                                    className="h-8 text-xs bg-muted/30 focus-visible:bg-background"
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

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
                    </SelectContent>
                </SelectRoot>

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

Select.displayName = "Select";
