import { cva, type VariantProps } from "class-variance-authority";

export const popoverContentVariants = cva(
  [
    // ساختار پایه و ظاهر کادر
    "z-50 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
    "text-right font-sans",
    
    // انیمیشن نرم باز و بسته شدن (سازگار با Base UI data attributes و tailwindcss-animate)
    "transition-[opacity,transform] duration-150 ease-out",
    "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
    "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
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
