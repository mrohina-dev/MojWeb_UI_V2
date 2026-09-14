import { type HTMLAttributes, type TableHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { skeletonVariants } from "./skeleton.variants";

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    SkeletonVariantProps {
  width?: string | number;
  height?: string | number;
}

export interface SkeletonTableProps
  extends TableHTMLAttributes<HTMLTableElement> {
  /** تعداد سطرها (پیش‌فرض: 5) */
  rows?: number;
  /** تعداد ستون‌ها (پیش‌فرض: 4) */
  columns?: number;
  /** نمایش هدر جدول (پیش‌فرض: true) */
  showHeader?: boolean;
}
