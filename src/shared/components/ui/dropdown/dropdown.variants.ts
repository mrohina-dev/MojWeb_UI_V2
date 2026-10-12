import { cva, type VariantProps } from "class-variance-authority";

export const dropdownContentVariants = cva(
  [
    "z-50 overflow-hidden rounded-xl border border-border",
    "bg-popover text-popover-foreground shadow-lg shadow-black/5 dark:shadow-black/20",
    "outline-none text-right font-sans",
    "transition-[transform,opacity] duration-150 ease-out",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  ],
  {
    variants: {
      size: {
        sm: "w-48 p-1 text-xs space-y-0.5",
        default: "w-56 p-1.5 text-sm space-y-1",
        lg: "w-64 p-2 text-base space-y-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type DropdownContentVariantsProps = VariantProps<typeof dropdownContentVariants>;
