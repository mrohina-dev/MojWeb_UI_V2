import { cva } from "class-variance-authority";

/**
 * استایل کانتینر اصلی کامپوننت
 * در وارینت ghost، کانتینر کاملاً شفاف و بدون فریم است تا به عنوان Headless عمل کند.
 */
export const collapsibleRootVariants = cva(
  "group/collapsible w-full min-w-0 transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border border-border bg-card text-card-foreground shadow-xs hover:border-border/80 hover:shadow-sm",
        primary:
          "rounded-lg border border-primary-200/70 bg-card text-foreground shadow-xs hover:border-primary/50 data-[panel-open]:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-ring",
        secondary:
          "rounded-lg border border-border/70 bg-secondary/30 text-secondary-foreground hover:border-border",
        destructive:
          "rounded-lg border border-destructive/25 bg-card text-card-foreground shadow-xs hover:border-destructive/50 data-[panel-open]:border-destructive",
        // وارینت Headless: کاملاً شفاف و بدون حاشیه/سایه
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
        // در حالت ghost استایل‌های ابعادی و هاور پیش‌فرض پاک شده و به والد واگذار می‌شود
        ghost: "text-foreground",
      },
    },
    compoundVariants: [
      // حذف ارتفاع و پدینگ پیش‌فرض در وارینت ghost برای سازگاری کامل با کامپوننت‌های والد مثل Sidebar
      {
        variant: "ghost",
        className: "h-auto px-0 py-0",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

/**
 * ابعاد، انیمیشن چرخش و فیدبک نوری آیکون Chevron در هاور
 */
export const collapsibleChevronVariants = cva(
  [
    "shrink-0 text-muted-foreground/70 transition-transform duration-200 ease-in-out",
    "group-data-[panel-open]/trigger:rotate-180 group-data-[panel-open]:rotate-180 group-data-panel-open/trigger:rotate-180",
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
 * انیمیشن و فاصله‌گذاری پنل محتوا
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
      variant: {
        default: "",
        primary: "",
        secondary: "",
        destructive: "",
        // در حالت ghost هیچ پدینگ تحمیلی اعمال نمی‌شود
        ghost: "p-0",
      },
      divided: {
        true: "border-t border-border/60 mt-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        className: "p-0",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
      divided: false,
    },
  }
);
