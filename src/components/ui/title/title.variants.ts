import { cva } from "class-variance-authority";

export const pageTitleVariants = cva(
  "font-bold leading-tight tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg md:text-xl",
        md: "text-xl md:text-2xl",
        lg: "text-2xl md:text-3xl",
        xl: "text-3xl md:text-4xl",
      },
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        gradient: "bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      align: "start",
      variant: "default",
    },
  }
);
