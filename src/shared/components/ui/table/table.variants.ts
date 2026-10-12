import { cva } from "class-variance-authority";

export const tableVariants = cva(
  "w-full caption-bottom text-sm border-collapse text-right transition-colors",
  {
    variants: {
      variant: {
        default: [
          "[&_th]:bg-muted/60 [&_th]:text-muted-foreground",
          "[&_th]:border-border",
          "[&_td]:border-border/60",
          "[&_tbody_tr:hover]:bg-muted/40",
          "[&_tbody_tr[data-state=selected]]:bg-muted/60 [&_tbody_tr[data-state=selected]:hover]:bg-muted/70",
        ],
        primary: [
          "[&_th]:bg-primary [&_th]:text-primary-foreground [&_th]:font-semibold",
          "[&_th]:border-primary-600/40",
          "[&_td]:border-primary-100/70",
          "[&_tbody_tr:hover]:bg-primary-50/50",
          "[&_tbody_tr[data-state=selected]]:bg-primary-100/70 [&_tbody_tr[data-state=selected]:hover]:bg-primary-100/90",
        ],
        lightPrimary: [
          "[&_th]:bg-primary-50/70 [&_th]:text-primary-950",
          "[&_th]:border-primary-200/80",
          "[&_td]:border-primary-100/60",
          "[&_tbody_tr:hover]:bg-primary-50/40",
          "[&_tbody_tr[data-state=selected]]:bg-primary-100/60 [&_tbody_tr[data-state=selected]:hover]:bg-primary-100/80",
        ],
        secondary: [
          "[&_th]:bg-secondary/60 [&_th]:text-secondary-foreground",
          "[&_th]:border-secondary-200",
          "[&_td]:border-secondary-100/70",
          "[&_tbody_tr:hover]:bg-secondary/30",
          "[&_tbody_tr[data-state=selected]]:bg-secondary/40 [&_tbody_tr[data-state=selected]:hover]:bg-secondary/50",
        ],
        ghost: [
          "[&_th]:bg-transparent [&_th]:text-muted-foreground",
          "[&_th]:border-border/40",
          "[&_td]:border-border/30",
          "[&_tbody_tr:hover]:bg-muted/20",
          "[&_tbody_tr[data-state=selected]]:bg-muted/40 [&_tbody_tr[data-state=selected]:hover]:bg-muted/50",
        ],
      },
      density: {
        compact: "[&_td]:py-1.5 [&_td]:px-2.5 [&_th]:py-2 [&_th]:px-2.5 text-xs",
        default: "[&_td]:py-3 [&_td]:px-3.5 [&_th]:py-3 [&_th]:px-3.5 text-sm",
        relaxed: "[&_td]:py-4 [&_td]:px-5 [&_th]:py-3.5 [&_th]:px-5 text-base",
      },
      bordered: {
        true: "[&_th]:border-b [&_td]:border-b",
        false: "[&_th]:border-b [&_td]:border-b-0",
      },
      striped: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        striped: true,
        className: "[&_tbody_tr:nth-child(even)]:bg-muted/25",
      },
      {
        variant: "primary",
        striped: true,
        className: "[&_tbody_tr:nth-child(even)]:bg-primary-50/30",
      },
      {
        variant: "lightPrimary",
        striped: true,
        className: "[&_tbody_tr:nth-child(even)]:bg-primary-50/25",
      },
      {
        variant: "secondary",
        striped: true,
        className: "[&_tbody_tr:nth-child(even)]:bg-secondary/20",
      },
      {
        variant: "ghost",
        striped: true,
        className: "[&_tbody_tr:nth-child(even)]:bg-muted/15",
      },
    ],
    defaultVariants: {
      variant: "default",
      density: "default",
      bordered: true,
      striped: false,
    },
  }
);

export const tableContainerVariants = cva(
  "relative w-full overflow-hidden rounded-xl transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border bg-card shadow-xs",
        primary: "border border-primary-500/30 bg-card shadow-xs",
        lightPrimary: "border border-primary-200 bg-card shadow-xs",
        secondary: "border border-secondary-200 bg-card shadow-xs",
        ghost: "border-transparent bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const tablePaginationVariants = cva(
  "flex flex-wrap items-center justify-between gap-3 px-4 py-3 select-none transition-colors border-t",
  {
    variants: {
      variant: {
        default: "border-border bg-card/60",
        primary: "border-primary-200/60 bg-primary-50/30 text-primary-950",
        lightPrimary: "border-primary-200/60 bg-primary-50/20 text-primary-950",
        secondary: "border-secondary-200 bg-secondary/15 text-secondary-foreground",
        ghost: "border-border/40 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
