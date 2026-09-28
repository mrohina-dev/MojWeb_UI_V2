import { cva, type VariantProps } from "class-variance-authority";

export const popoverContentVariants = cva(
  [
    "z-50 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
    "text-right font-sans",
  ],
  {
    variants: {
      size: {
        sm: "p-3 text-xs w-64",
        default: "p-4 text-sm w-72",
        lg: "p-5 text-base w-80",
        auto: "p-4 text-sm w-auto min-w-[12rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type PopoverContentVariantProps = VariantProps<typeof popoverContentVariants>;
