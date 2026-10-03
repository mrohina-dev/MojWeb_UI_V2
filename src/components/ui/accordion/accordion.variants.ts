import { cva } from "class-variance-authority";

/**
 * استایل کانتینر اصلی والد (Root)
 */
export const accordionRootVariants = cva(
  "flex w-full min-w-0 flex-col gap-2 transition-all"
);

/**
 * استایل هر آیتم آکاردئون بر اساس تم رنگی OKLCH و استایل‌های پروژه
 */
export const accordionItemVariants = cva(
  "group/accordion w-full min-w-0 rounded-md transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-card text-card-foreground shadow-xs hover:border-border/80 hover:shadow-sm",
        primary:
          "border border-primary-200/70 bg-card text-foreground shadow-xs hover:border-primary/50 data-[panel-open]:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-ring",
        secondary:
          "border border-border/70 bg-secondary/30 text-secondary-foreground hover:border-border",
        destructive:
          "border border-destructive/25 bg-card text-card-foreground shadow-xs hover:border-destructive/50 data-[panel-open]:border-destructive",
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
export const accordionTriggerVariants = cva(
  [
    "group/trigger flex w-full min-w-0 items-center justify-between gap-3 text-start font-medium select-none",
    "outline-none transition-colors duration-150 cursor-pointer",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-2.5 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        default:
          "text-foreground/80 hover:text-foreground data-[panel-open]:text-foreground",
        primary:
          "text-foreground/85 hover:text-primary data-[panel-open]:text-primary",
        secondary:
          "text-secondary-foreground/85 hover:text-secondary-foreground data-[panel-open]:text-secondary-foreground",
        destructive:
          "text-destructive/80 hover:text-destructive data-[panel-open]:text-destructive",
        ghost:
          "rounded-md hover:bg-muted/60 text-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

/**
 * ابعاد و انیمیشن چرخش آیکون Chevron در هنگام باز شدن
 */
export const accordionChevronVariants = cva(
  [
    "shrink-0 text-muted-foreground/70 transition-all duration-200 ease-in-out",
    // چرخش هنگام باز بودن پنل
    "group-data-[panel-open]/trigger:rotate-180 group-data-[panel-open]:rotate-180",
    // واکنش نوری به هاور دکمه (حتی اگر پنل از قبل باز باشد)
    "group-hover/trigger:text-foreground group-data-[panel-open]/trigger:text-foreground",
  ],
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
 * انیمیشن پنل محتوا هماهنگ با Base UI
 */
export const accordionPanelVariants = cva(
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
      inset: {
        true: "pt-0 pb-2 px-2 sm:px-2.5",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      divided: false,
      inset: false,
    },
  }
);

/**
 * استایل کادر فرورفته داخلی (Sunken/Inset Content Box)
 */
export const accordionInsetBoxVariants = cva(
  "w-full rounded-md border border-border/50 bg-muted/40 shadow-inner text-foreground transition-colors",
  {
    variants: {
      size: {
        xs: "p-2 text-xs",
        sm: "p-2.5 text-xs",
        default: "p-3 text-sm",
        lg: "p-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
