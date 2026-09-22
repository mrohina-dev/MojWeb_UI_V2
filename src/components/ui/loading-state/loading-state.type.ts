import type { VariantProps } from "class-variance-authority";
import type { loadingStateVariants } from "./loading-state.variants";

export interface LoadingStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingStateVariants> {
  text?: string;
  showText?: boolean;
}