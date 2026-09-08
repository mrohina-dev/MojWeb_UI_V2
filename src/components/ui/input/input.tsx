import * as React from "react";
import { cn } from "@/lib/utils"; // یا هر متدی که با clsx و twMerge ترکیب شده است
import { inputVariants } from "./input.variants";
import { type InputProps } from "./input.type";
import { Label } from "../label";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            size,
            label,
            helperText,
            error,
            iconStart,
            iconEnd,
            id,
            disabled,
            required,
            wrapperClassName,
            ...props
        },
        ref
    ) => {
        // ایجاد آی‌دی خودکار در صورت عدم ارسال برای اتصال label و aria-describedby
        const generatedId = React.useId();
        const inputId = id || generatedId;
        const errorId = `${inputId}-error`;
        const helperId = `${inputId}-helper`;

        const hasError = Boolean(error);

        return (
            <div className={cn("flex flex-col gap-1.5 w-full text-right", wrapperClassName)}>
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

                <div className="relative flex items-center w-full">
                    {iconStart && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none size-4">
                            {iconStart}
                        </div>
                    )}

                    <input
                        id={inputId}
                        type={type}
                        ref={ref}
                        disabled={disabled}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? errorId : helperText ? helperId : undefined
                        }
                        className={cn(
                            inputVariants({ size, hasError }),
                            iconStart && "pr-9",
                            iconEnd && "pl-9",
                            className
                        )}
                        {...props}
                    />

                    {iconEnd && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
                            {iconEnd}
                        </div>
                    )}
                </div>

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
