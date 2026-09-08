import * as React from "react";
import { cn } from "@/lib/utils";
import { labelVariants } from "./label.variants";
import { type LabelProps } from "./label.type";

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, disabled, hasError, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ disabled, hasError }), className)}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" className="text-destructive mr-1">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;
