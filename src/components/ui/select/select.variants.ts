import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  [
    "group flex items-center justify-between gap-2 rounded-lg border bg-card text-foreground shadow-xs transition-colors",
    "outline-none select-none text-right",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-xs px-2.5",
        default: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
      hasError: {
        true: "border-destructive focus-visible:ring-destructive/50 data-[popup-open]:border-destructive data-[popup-open]:ring-1 data-[popup-open]:ring-destructive/50",
        false: "border-primary-200 hover:border-primary-300 focus-visible:border-primary data-[popup-open]:border-primary data-[popup-open]:ring-1 data-[popup-open]:ring-ring",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit min-w-48",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
      fullWidth: false,
    },
  }
);

export const selectPopupVariants = cva(
  [
    "z-50 min-w-(--anchor-width) overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-none",
    "max-h-[min(var(--available-height),18rem)] flex flex-col",
    "origin-(--transform-origin)",
    "transition-[transform,opacity] duration-150 ease-out",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const selectItemVariants = cva(
  [
    "relative flex w-full cursor-default select-none items-center justify-between rounded-md px-2.5 py-1.5 outline-none transition-colors",
    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    "data-[selected]:bg-primary/10 data-[selected]:font-medium data-[selected]:text-primary",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
  ],
  {
    variants: {
      size: {
        sm: "text-xs py-1 px-2",
        default: "text-sm py-1.5 px-2.5",
        lg: "text-base py-2 px-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
