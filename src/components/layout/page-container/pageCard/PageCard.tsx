import * as React from 'react';
import { cn } from '@/lib/utils';
import type { PageCardProps } from './PageCard.type';
import { pageCardVariants } from './PageCard.variants';

export const PageCard = React.forwardRef<HTMLDivElement, PageCardProps>(
  (
    {
      as: Component = 'div',
      className,
      variant,
      padding,
      rounded,
      interactive,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          pageCardVariants({ variant, padding, rounded, interactive }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

PageCard.displayName = 'PageCard';

export default PageCard;
