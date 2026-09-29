import { cva } from "class-variance-authority";

export const checkboxRootVariants = cva(
  "group inline-flex select-none items-center align-middle",
  {
    variants: {
      size: {
        xs: "gap-1.5",
        sm: "gap-2",
        default: "gap-2",
        lg: "gap-2.5",
      },
      isTableInline: {
        true: "gap-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      isTableInline: false,
    },
  }
);

export const checkboxControlVariants = cva(
  [
    // ساختار اصلی جعبه چک‌باکس (مربعی با گوشه‌های بسیار ظریف)
    "peer relative inline-flex shrink-0 items-center justify-center border bg-card text-foreground shadow-2xs transition-colors cursor-pointer",
    // وضعیت فوکوس کیبورد
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    // وضعیت غیرفعال
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
  ],
  {
    variants: {
      size: {
        xs: "size-3.5 rounded-[2.5px]",
        sm: "size-4 rounded-[3px]",
        default: "size-[18px] rounded-[4px]",
        lg: "size-5 rounded-[5px]",
      },
      hasError: {
        // حالت خطای نرمال و زمانی که تیک خورده است (روی تم رنگی خطا باقی می‌ماند)
        true: [
          "border-destructive text-destructive-foreground focus-visible:ring-destructive/40",
          "data-[checked]:bg-destructive data-[checked]:border-destructive data-[checked]:text-destructive-foreground",
          "data-[indeterminate]:bg-destructive data-[indeterminate]:border-destructive data-[indeterminate]:text-destructive-foreground",
        ],
        // حالت عادی
        false: [
          "border-primary-200 hover:border-primary-400 focus-visible:border-primary",
          "data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground",
          "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground",
        ],
      },
      isTableInline: {
        true: "border-transparent bg-transparent shadow-none hover:border-border focus-visible:ring-1 focus-visible:ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
      isTableInline: false,
    },
  }
);

export const checkboxLabelVariants = cva("text-foreground font-normal select-none", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
    disabled: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    disabled: false,
  },
});

export const checkboxDescriptionVariants = cva("text-muted-foreground select-none", {
  variants: {
    size: {
      xs: "text-[10px]",
      sm: "text-[11px]",
      default: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
