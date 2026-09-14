import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.type";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      fullWidth,
      outline = false,
      loading = false,
      disabled,
      iconStart,
      iconEnd,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, iconOnly, fullWidth, outline, className })
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          iconStart && <span className="inline-flex shrink-0">{iconStart}</span>
        )}

        {children && <span className="leading-none">{children}</span>}

        {!loading && iconEnd && (
          <span className="inline-flex shrink-0">{iconEnd}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
