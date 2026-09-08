import { cva } from "class-variance-authority";

export const labelVariants = cva(
  ["text-sm font-medium leading-none select-none text-foreground"],
  {
    variants: {
      disabled: {
        true: "opacity-60 cursor-not-allowed",
      },
      hasError: {
        true: "text-destructive",
      },
    },
    defaultVariants: {
      disabled: false,
      hasError: false,
    },
  }
);
