import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { pageTitleVariants } from "./title.variants";

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
          VariantProps<typeof pageTitleVariants> {
  title: string;
  description?: string | React.ReactNode;
}
