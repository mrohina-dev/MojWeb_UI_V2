import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { pageCardVariants } from './PageCard.variants';

export type PageCardSize = NonNullable<VariantProps<typeof pageCardVariants>['size']>;
export type PageCardVariant = NonNullable<VariantProps<typeof pageCardVariants>['variant']>;

export interface PageCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageCardVariants> {
  /** امکان رندر با تگ‌های معنایی مختلف مانند section یا article */
  as?: 'div' | 'section' | 'article' | 'main';
}
