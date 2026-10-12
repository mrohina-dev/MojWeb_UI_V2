import { type HTMLAttributes, type TableHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { skeletonVariants } from "./skeleton.variants";

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    SkeletonVariantProps {
  /** عرض به صورت عدد (px) یا رشته (rem/%) */
  width?: string | number;
  /** ارتفاع به صورت عدد (px) یا رشته (rem/%) */
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
