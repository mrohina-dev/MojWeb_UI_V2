import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import { userService } from "@/services/api/user.service";
import type { CaptchaInputProps } from "./captcha-input.type";

const imageSizes = {
  sm: "h-8 w-24",
  default: "h-10 w-28",
  lg: "h-12 w-32",
} as const;

export const CaptchaInput = forwardRef<HTMLInputElement, CaptchaInputProps>(
  (
    {
      size = "default",
      orientation = "horizontal",
      className,
      wrapperClassName,
      disabled = false,
      value,
      defaultValue,
      onChange,
      onRefresh,
      ...props
    },
    ref
  ) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // true از ابتدا برای skeleton صحیح

    const [internalValue, setInternalValue] = useState<string>(
      String(value ?? defaultValue ?? "")
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;
    const hasValue = Boolean(currentValue && currentValue.length > 0);

    const isHorizontal = orientation === "horizontal";
    const hasBottomMessage = Boolean(props.error || props.helperText);

    // disabled هنگام لود یا disabled خارجی
    const isDisabled = disabled || loading;

    const loadCaptcha = async () => {
      setLoading(true);
      try {
        const res = await userService.getCaptcha();
        if (res?.captcha) {
          const src = res.captcha.startsWith("data:")
            ? res.captcha
            : `data:image/png;base64,${res.captcha}`;
          setImageSrc(src);
        }
      } catch {
        // مدیریت خطا در Axios Interceptor
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      loadCaptcha();
    }, []);

    const handleRefresh = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (loading || disabled) return;

      // خالی کردن input هنگام refresh
      if (isControlled) {
        onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
      } else {
        setInternalValue("");
      }

      onRefresh?.();
      loadCaptcha();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div
        className={cn(
          "w-full",
          isHorizontal ? "flex items-end gap-2" : "flex flex-col gap-2.5",
          wrapperClassName
        )}
      >
        {/* اینپوت ورودی */}
        <div className={cn(isHorizontal ? "flex-1" : "order-2")}>
          <Input
            {...props}
            ref={ref}
            size={size}
            disabled={isDisabled} // disabled در حین لود
            value={isControlled ? value : internalValue}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleInputChange}
            dir={hasValue ? "ltr" : "rtl"}
            className={cn(
              "transition-all duration-150",
              hasValue
                ? "tracking-wider"
                : "tracking-normal",
              className
            )}
          />
        </div>

        {/* تصویر کپچا و دکمه رفرش */}
        <div
          className={cn(
            "flex items-center gap-2 shrink-0",
            isHorizontal && "mb-px",
            isHorizontal && hasBottomMessage && "mb-5",
            !isHorizontal && "order-1"
          )}
        >
          <div
            className={cn(
              "relative flex items-center justify-center rounded-lg border border-border overflow-hidden select-none shadow-xs bg-muted/20",
              imageSizes[size]
            )}
          >
            {loading || !imageSrc ? (
              <Skeleton
                variant="sharp"
                animation="pulse"
                className="size-full"
              />
            ) : (
              <img
                src={imageSrc}
                alt="عبارت امنیتی"
                className="size-full object-cover select-none pointer-events-none"
              />
            )}
          </div>

          <Button
            type="button"
            variant="secondary"
            outline
            iconOnly
            size={size}
            onClick={handleRefresh}
            disabled={isDisabled} // disabled در حین لود
            aria-label="بارگذاری مجدد عبارت امنیتی"
            title="بارگذاری مجدد عبارت امنیتی"
          >
            <RotateCw className={cn(loading && "animate-spin text-primary")} />
          </Button>
        </div>
      </div>
    );
  }
);

CaptchaInput.displayName = "CaptchaInput";

export default CaptchaInput;