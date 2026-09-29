import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "flex w-full rounded-lg border bg-card px-3 text-sm text-foreground shadow-xs transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ],
  {
    variants: {
      size: {
        xs: "h-7 text-xs px-2 rounded-md",
        sm: "h-8 text-xs px-2.5",
        default: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
      hasError: {
        true: "border-destructive focus-visible:ring-destructive/50",
        false: "border-primary-200 focus-visible:border-primary",
      },
      isTableInline: {
        true: "border-transparent bg-transparent shadow-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:bg-background",
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
