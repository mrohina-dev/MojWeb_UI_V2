import { forwardRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
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
      shape,
      fullWidth,
      outline = false,
      loading = false,
      disabled,
      iconStart,
      iconEnd,
      stopPropagation = false,
      onClick,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      onClick?.(e);
    };

    return (
      <BaseButton
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          buttonVariants({
            variant,
            size,
            iconOnly,
            shape,
            fullWidth,
            outline,
            className,
          })
        )}
        {...props}
      >
        {/* وضعیت لودینگ */}
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          iconStart && <span className="inline-flex shrink-0">{iconStart}</span>
        )}

        {children && <span className="leading-none">{children}</span>}

        {!loading && iconEnd && (
          <span className="inline-flex shrink-0">{iconEnd}</span>
        )}
      </BaseButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
