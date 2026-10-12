import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { tableContainerVariants } from "./table.variants";
import type { TableVariant } from "./table.types";

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: TableVariant;
}

export const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
    ({ className, variant = "default", ...props }, ref) => (
        <div
            ref={ref}
            className={cn(tableContainerVariants({ variant }), className)}
            {...props}
        />
    )
);
TableContainer.displayName = "TableContainer";

export const TableScrollWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "w-full overflow-x-auto overflow-y-auto custom-scrollbar scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent",
            className
        )}
        {...props}
    />
));
TableScrollWrapper.displayName = "TableScrollWrapper";

export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn(
            "select-none transition-colors",
            sticky && "sticky top-0 z-10 shadow-2xs backdrop-blur-md",
            className
        )}
        {...props}
    />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("bg-background text-foreground transition-colors", className)}
        {...props}
    />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t font-medium text-foreground bg-muted/40",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement> & {
        selected?: boolean;
        clickable?: boolean;
    }
>(({ className, selected, clickable, ...props }, ref) => (
    <tr
        ref={ref}
        data-state={selected ? "selected" : undefined}
        className={cn(
            "transition-colors",
            clickable && "cursor-pointer",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement> & {
        align?: "right" | "center" | "left";
    }
>(({ className, align = "right", ...props }, ref) => (
    <th
        ref={ref}
        scope="col"
        className={cn(
            "text-xs font-semibold tracking-wider uppercase transition-colors align-middle",
            align === "center" && "text-center",
            align === "left" && "text-left",
            align === "right" && "text-right",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement> & {
        align?: "right" | "center" | "left";
    }
>(({ className, align = "right", ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "align-middle leading-normal transition-colors",
            align === "center" && "text-center",
            align === "left" && "text-left",
            align === "right" && "text-right",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";
