import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import type { BadgeProps, BadgeSize } from './Badge.types';
import { badgeVariants } from './Badge.variants';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      count,
      maxCount = 99,
      showZero = false,
      dot = false,
      variant,
      size,
      placement,
      className,
      ...props
    },
    ref
  ) => {
    const isCounter = typeof count === 'number';

    // عدم رندر وقتی مقدار صفر است و showZero فالس باشد
    if (!dot && isCounter && count <= 0 && !showZero) {
      return null;
    }

    // اولویت‌بندی سایز: dot > size پاس داده شده > حالت پیش‌فرض بر اساس شمارنده/متن
    const resolvedSize: BadgeSize = dot
      ? 'dot'
      : (size ?? (isCounter ? 'counter' : 'default'));

    const renderContent = () => {
      if (dot) {
        return null;
      }

      if (isCounter) {
        if (count > maxCount) {
          return (
            <span dir="ltr" className="inline-flex items-center">
              <span>{maxCount}</span>
              <span>+</span>
            </span>
          );
        }
        return count;
      }

      return children;
    };

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size: resolvedSize,
            placement,
          }),
          className
        )}
        {...props}
      >
        {renderContent()}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
