import { cva } from "class-variance-authority";

export const tableVariants = cva(
    "w-full caption-bottom text-sm border-collapse text-right",
    {
        variants: {
            density: {
                compact: "[&_td]:py-1.5 [&_td]:px-2.5 [&_th]:py-2 [&_th]:px-2.5 text-xs",
                default: "[&_td]:py-3 [&_td]:px-3.5 [&_th]:py-3 [&_th]:px-3.5 text-sm",
                relaxed: "[&_td]:py-4 [&_td]:px-5 [&_th]:py-3.5 [&_th]:px-5 text-base",
            },
            bordered: {
                true: "border border-border [&_th]:border-b [&_th]:border-border [&_td]:border-b [&_td]:border-border/60",
                false: "[&_th]:border-b [&_th]:border-border [&_td]:border-b [&_td]:border-border/40",
            },
            striped: {
                true: "[&_tbody_tr:nth-child(even)]:bg-muted/25",
                false: "",
            },
        },
        defaultVariants: {
            density: "default",
            bordered: true,
            striped: false,
        },
    }
);
