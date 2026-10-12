import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import type { PageCardProps } from './PageCard.type';
import { pageCardVariants } from './PageCard.variants';

export const PageCard = React.forwardRef<HTMLDivElement, PageCardProps>(
  (
    {
      as: Component = 'div',
      className,
      size = 'default',
      variant = 'default',
      bordered = true,
      interactive = false,
      padding,
      rounded,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          pageCardVariants({ size, variant, bordered, interactive, padding, rounded }),
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
