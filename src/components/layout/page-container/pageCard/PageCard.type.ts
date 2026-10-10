import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { pageCardVariants } from './PageCard.variants';
import type { ComponentSize, ComponentVariant } from '@/types/ui.types';

/**
 * پدینگ‌های معنادار کارت برگرفته از تایپ سراسری
 */
export type PageCardPadding = Extract<ComponentSize, 'sm' | 'default' | 'lg' | 'xl'> | 'none';

/**
 * واریانت‌های بصری کارت برگرفته از تایپ سراسری کامپوننت‌ها
 */
export type PageCardVariant = Extract<
  ComponentVariant,
  'default' | 'secondary' | 'ghost' | 'mute'
> | 'outline' | 'plain';

export interface PageCardVariantsProps extends VariantProps<typeof pageCardVariants> {
  variant?: PageCardVariant;
  padding?: PageCardPadding;
}

export interface PageCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PageCardVariantsProps {
  /**
   * در صورت نیاز به رندر به عنوان تگ معنایی دیگر مانند section یا article
   */
  as?: 'div' | 'section' | 'article' | 'main';
}
