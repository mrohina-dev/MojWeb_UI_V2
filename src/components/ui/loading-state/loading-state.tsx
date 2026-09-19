import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadingStateVariants } from "./loading-state.variants";
import type { LoadingStateProps } from "./loading-state.type";

export const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  mode,
  size,
  text = "در حال بارگذاری...",
  showText = true,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(loadingStateVariants({ mode, size }), className)}
      {...props}
    >
      <Loader2 className="animate-spin text-primary shrink-0" />
      {showText && text && (
        <span className="font-medium animate-pulse select-none">{text}</span>
      )}
    </div>
  );
};

export default LoadingState;
