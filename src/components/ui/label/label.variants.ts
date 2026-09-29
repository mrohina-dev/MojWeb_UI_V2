import { cva, type VariantProps } from "class-variance-authority";

export const labelVariants = cva(
  "font-medium leading-none select-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
        false: "",
      },
      hasError: {
        true: "text-destructive",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      disabled: false,
      hasError: false,
    },
  }
);

export type LabelVariantProps = VariantProps<typeof labelVariants>;
