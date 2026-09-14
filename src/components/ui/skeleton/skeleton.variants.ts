import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  "bg-muted/70 dark:bg-muted/40 shrink-0",
  {
    variants: {
      variant: {
        // دادن ابعاد حداقلی پیش‌فرض تا در صورت ارسال نکردن کلاس هم دیده شود
        default: "h-4 w-full rounded-md",
        circular: "size-10 rounded-full",
        rounded: "h-10 w-full rounded-lg",
        sharp: "rounded-none",
      },
      animation: {
        pulse: "animate-pulse",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "pulse",
    },
  }
);
