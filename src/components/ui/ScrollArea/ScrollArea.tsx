import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ScrollAreaProps } from './ScrollArea.types';
import { scrollAreaVariants } from './ScrollArea.variants';

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      orientation,
      size,
      variant,
      hoverOnly,
      maxHeight,
      maxWidth,
      style,
      viewportRef,
      ...props
    },
    ref
  ) => {
    const inlineStyles: React.CSSProperties = {
      ...(maxHeight ? { maxHeight } : {}),
      ...(maxWidth ? { maxWidth } : {}),
      ...style,
    };

    return (
      <div
        ref={ref || viewportRef}
        role="region"
        tabIndex={0}
        aria-label="محتوای اسکرول‌پذیر"
        className={cn(
          scrollAreaVariants({ orientation, size, variant, hoverOnly }),
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/40',
          className
        )}
        style={inlineStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
