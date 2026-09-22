import { cva, type VariantProps } from "class-variance-authority";

export const labelVariants = cva(
  "text-sm font-medium leading-none select-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
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

export type LabelVariantProps = VariantProps<typeof labelVariants>;
