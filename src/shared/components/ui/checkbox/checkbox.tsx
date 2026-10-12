import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";

import type { CheckboxProps } from "./checkbox.types";
import {
  checkboxControlVariants,
  checkboxDescriptionVariants,
  checkboxRootVariants,
} from "./checkbox.variants";
import { cn } from "@/shared/lib/utils";
import Label from "../label/label"; // مسیر قرارگیری کامپوننت Label

// استخراج تایپ دقیق المان DOM مربوط به BaseCheckbox.Root
type BaseCheckboxElement = React.ComponentRef<typeof BaseCheckbox.Root>;

// استخراج تایپ دقیق ایونت کلیک Base UI
type BaseCheckboxClickEvent = Parameters<
  NonNullable<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>["onClick"]>
>[0];

const Checkbox = React.forwardRef<BaseCheckboxElement, CheckboxProps>(
  (
    {
      label,
      description,
      size = "default",
      hasError = false,
      isTableInline = false,
      stopPropagation = false,
      className,
      indicatorClassName,
      labelWrapperClassName,
      labelClassName,
      descriptionClassName,
      disabled,
      required,
      onClick,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const finalLabel = children ?? label;

    // متوقف کردن انتشار رویداد برای سناریوهایی مثل ردیف‌های جدول
    const handleClick = (e: BaseCheckboxClickEvent) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      onClick?.(e);
    };

    const checkboxElement = (
      <BaseCheckbox.Root
        ref={ref}
        id={checkboxId}
        disabled={disabled}
        className={cn(
          checkboxControlVariants({ size, hasError, isTableInline }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <BaseCheckbox.Indicator
          className={cn(
            "flex items-center justify-center text-current transition-none",
            indicatorClassName
          )}
        >
          <Check
            className={cn(
              "hidden [[data-checked]:not([data-indeterminate])_&]:block",
              size === "xs" ? "size-3" : size === "sm" ? "size-3.5" : "size-4"
            )}
          />
          <Minus
            className={cn(
              "hidden in-[data-indeterminate]:block",
              size === "xs" ? "size-3" : size === "sm" ? "size-3.5" : "size-4"
            )}
          />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    // اگر لیبل و توضیحات وجود نداشته باشد، فقط خود جعبه را برگردان
    if (!finalLabel && !description) {
      return checkboxElement;
    }

    return (
      <div
        className={checkboxRootVariants({ size, isTableInline })}
        onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      >
        {checkboxElement}

        <div
          className={cn(
            "flex flex-col select-none leading-none",
            !disabled && "cursor-pointer",
            disabled && "cursor-not-allowed opacity-50",
            labelWrapperClassName
          )}
        >
          {finalLabel && (
            <Label
              htmlFor={checkboxId}
              hasError={hasError}
              size={size}
              disabled={Boolean(disabled)}
              required={required}
              className={cn(
                "cursor-pointer",
                disabled && "cursor-not-allowed",
                labelClassName
              )}
            >
              {finalLabel}
            </Label>
          )}

          {description && (
            <span
              className={cn(
                checkboxDescriptionVariants({ size }),
                "mt-1",
                descriptionClassName
              )}
            >
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
