import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { inputVariants } from "./input.variants";
import { type InputProps } from "./input.type";
import { Label } from "../label";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size = "default",
      label,
      helperText,
      error,
      iconStart,
      iconEnd,
      id,
      disabled,
      required,
      plain = false,
      isTableInline = false,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = Boolean(error);

    // Padding داینامیک بر اساس سایز و وجود آیکون
    const startPadding = iconStart
      ? size === "xs" || size === "sm"
        ? "pr-7"
        : "pr-9"
      : "";

    const endPadding = iconEnd
      ? size === "xs" || size === "sm"
        ? "pl-7"
        : "pl-9"
      : "";

    const inputCore = (
      <div className="relative flex items-center w-full">
        {iconStart && (
          <div
            className={cn(
              "absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none",
              size === "xs" ? "size-3.5" : "size-4"
            )}
          >
            {iconStart}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={cn(
            inputVariants({ size, hasError, isTableInline }),
            startPadding,
            endPadding,
            className
          )}
          {...props}
        />

        {iconEnd && (
          <div
            className={cn(
              "absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground",
              size === "xs" ? "size-3.5" : "size-4"
            )}
          >
            {iconEnd}
          </div>
        )}
      </div>
    );

    // حالت ساده (برای جدول/فیلترها): بدون label/error/helper wrapper
    if (plain) {
      return inputCore;
    }

    // حالت فرم: به همراه label و helper/error
    return (
      <div className={cn("flex w-full flex-col gap-1.5 text-right", wrapperClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            disabled={disabled}
            hasError={hasError}
            required={required}
          >
            {label}
          </Label>
        )}

        {inputCore}

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

Input.displayName = "Input";

export default Input;