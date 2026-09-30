import { cva } from "class-variance-authority";

/**
 * استایل کانتینر اصلی کامپوننت هماهنگ با تم و کارت/اینپوت
 */
export const collapsibleRootVariants = cva(
  "group/collapsible w-full min-w-0 rounded-lg transition-all",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-card text-card-foreground shadow-xs",
        primary:
          "border border-primary-200 bg-card text-foreground shadow-xs data-[panel-open]:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-ring",
        secondary:
          "border border-border/80 bg-secondary/30 text-secondary-foreground",
        destructive:
          "border border-destructive/30 bg-card text-card-foreground shadow-xs data-[panel-open]:border-destructive",
        ghost: "border-transparent bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * استایل دکمه بازکننده (Trigger)
 */
export const collapsibleTriggerVariants = cva(
  [
    "flex w-full min-w-0 items-center justify-between gap-3 text-start font-medium select-none",
    "rounded-lg outline-none transition-colors duration-150 cursor-pointer",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-xs rounded-md",
        sm: "h-8 px-2.5 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        default:
          "hover:bg-accent hover:text-accent-foreground text-foreground data-[panel-open]:text-foreground",
        primary:
          "hover:bg-primary-50/50 text-foreground data-[panel-open]:text-primary",
        secondary:
          "hover:bg-secondary/60 text-secondary-foreground",
        destructive:
          "hover:bg-destructive-50/40 text-destructive data-[panel-open]:text-destructive",
        ghost:
          "hover:bg-muted/80 text-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

/**
 * ابعاد و ترنزیشن آیکون Chevron
 */
export const collapsibleChevronVariants = cva(
  "shrink-0 text-muted-foreground transition-transform duration-200 ease-in-out group-data-panel-open/trigger:rotate-180 group-data-[panel-open]/trigger:rotate-180 group-data-[panel-open]:rotate-180",
  {
    variants: {
      size: {
        xs: "size-3.5",
        sm: "size-4",
        default: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * انیمیشن پنل محتوا با Base UI و tw-animate-css
 */
export const collapsiblePanelVariants = cva(
  "w-full min-w-0 overflow-hidden text-muted-foreground transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
  {
    variants: {
      size: {
        xs: "px-2 pb-2 pt-1.5 text-xs",
        sm: "px-2.5 pb-2.5 pt-2 text-xs",
        default: "px-3 pb-3 pt-2 text-sm",
        lg: "px-4 pb-4 pt-3 text-base",
      },
      divided: {
        true: "border-t border-border/60 mt-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      divided: false,
    },
  }
);
