import { cn } from '@/lib/utils';
import type { BadgeProps } from './Badge.types';
import { badgeVariants } from './Badge.variants';

const Badge = ({
  children,
  count,
  maxCount = 99,
  showZero = false,
  variant,
  size,
  placement,
  className,
  ...props
}: BadgeProps) => {
  // اگر پراپ count پاس داده شده باشد، رفتار کامپوننت به شکل شمارنده تنظیم می‌شود
  const isCounter = typeof count === 'number';

  if (isCounter && count <= 0 && !showZero) {
    return null;
  }

  // محاسبه متن شمارنده در صورت نیاز
  const content = isCounter
    ? count > maxCount
      ? `+${maxCount}`
      : count
    : children;

  // اگر کاربر صراحتاً سایز نداده باشد و شمارنده باشد، از سایز counter استفاده می‌کنیم
  const resolvedSize = size ?? (isCounter ? 'counter' : 'default');

  return (
    <span
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
      {content}
    </span>
  );
};

export default Badge
