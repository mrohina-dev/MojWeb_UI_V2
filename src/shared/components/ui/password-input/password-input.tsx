import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../input/input";
import { type PasswordInputProps } from "./password-input.type";

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showToggleIcon = true,
      visibleIcon,
      hiddenIcon,
      iconEnd,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = React.useCallback(() => {
      setIsVisible((prev) => !prev);
    }, []);

    // تعیین آیکون انتهایی (Toggle Button)
    const renderIconEnd = () => {
      if (!showToggleIcon) {
        return iconEnd;
      }

      const EyeOpenIcon = visibleIcon || <Eye className="size-4" />;
      const EyeCloseIcon = hiddenIcon || <EyeOff className="size-4" />;

      return (
        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          tabIndex={-1}
          aria-label={isVisible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          className="flex items-center justify-center rounded p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {isVisible ? EyeCloseIcon : EyeOpenIcon}
        </button>
      );
    };

    return (
      <Input
        ref={ref}
        type={isVisible ? "text" : "password"}
        disabled={disabled}
        iconEnd={renderIconEnd()}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
