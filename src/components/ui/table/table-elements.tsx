import * as React from "react";
import { cn } from "@/lib/utils";

export const TableContainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-xs",
            className
        )}
        {...props}
    />
));
TableContainer.displayName = "TableContainer";

export const TableScrollWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("w-full overflow-x-auto overflow-y-auto custom-scrollbar", className)}
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
            "bg-muted/50 text-muted-foreground font-medium select-none border-b border-border",
            sticky && "sticky top-0 z-10 backdrop-blur-md bg-muted/80 shadow-2xs",
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
        className={cn("divide-y divide-border/50 bg-background text-foreground", className)}
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
            "border-t border-border bg-muted/40 font-medium text-foreground",
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
            clickable && "cursor-pointer hover:bg-muted/40",
            !clickable && "hover:bg-muted/20",
            selected && "bg-primary/5 hover:bg-primary/10",
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
            "text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors",
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
            "align-middle leading-normal",
            align === "center" && "text-center",
            align === "left" && "text-left",
            align === "right" && "text-right",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";
