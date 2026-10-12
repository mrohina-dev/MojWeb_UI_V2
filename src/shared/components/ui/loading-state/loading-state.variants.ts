import { cva } from "class-variance-authority";

export const loadingStateVariants = cva(
  "flex flex-col items-center justify-center text-muted-foreground",
  {
    variants: {
      mode: {
        viewport: "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs",
        contained: "size-full min-h-[200px] flex-1 p-6",
        inline: "inline-flex flex-row gap-2 p-2",
      },
      size: {
        sm: "[&_svg]:size-4 text-xs gap-1.5",
        md: "[&_svg]:size-8 text-sm gap-2.5",
        lg: "[&_svg]:size-12 text-base gap-3.5",
      },
    },
    defaultVariants: {
      mode: "contained",
      size: "md",
    },
  }
);