import * as React from "react";
import { cn } from "@/lib/utils";
import { pageTitleVariants } from "./title.variants";
import { type PageTitleProps } from "./title.type";

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ title, description, size, align, variant, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-col gap-2",
          align === "center" && "items-center",
          align === "end" && "items-end"
        )}
      >
        <h1
          ref={ref}
          className={cn(pageTitleVariants({ size, align, variant }), className)}
          {...props}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed ">
            {description}
          </p>
        )}
      </div>
    );
  }
);

PageTitle.displayName = "PageTitle";

export default PageTitle;
