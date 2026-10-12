import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";
import { skeletonVariants } from "./skeleton.variants";
import type { SkeletonProps, SkeletonTableProps } from "./skeleton.type";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      animation,
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyles = {
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        role="status"
        className={cn(skeletonVariants({ variant, animation, className }))}
        style={inlineStyles}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/**
 * کامپوننت آماده برای نمایش لودینگ جدول
 */
export const SkeletonTable = forwardRef<HTMLTableElement, SkeletonTableProps>(
  (
    {
      rows = 5,
      columns = 4,
      showHeader = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full overflow-hidden border border-border rounded-lg bg-card">
        <table
          ref={ref}
          className={cn("w-full border-collapse text-right", className)}
          {...props}
        >
          {showHeader && (
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <th key={colIndex} className="p-3">
                    <Skeleton className="h-4 w-3/4" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-border">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-muted/10">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <Skeleton
                      className={cn(
                        "h-4",
                        colIndex === 0 ? "w-1/2" : colIndex === columns - 1 ? "w-1/3" : "w-4/5"
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

SkeletonTable.displayName = "SkeletonTable";

export default Skeleton;
