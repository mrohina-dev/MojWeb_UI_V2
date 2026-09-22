import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { labelVariants } from "./label.variants";

export interface LabelProps
  extends React.ComponentProps<"label">,
    VariantProps<typeof labelVariants> {
  /**
   * نمایش ستاره‌ی اجباری کنار متن
   */
  required?: boolean;
}
