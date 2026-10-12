import { cn } from '@/shared/lib/utils';
import PageTitle from '@/shared/components/ui/title';
import { useRouteMetadata } from '@/shared/hooks/useRouteMetadata';
import { pageHeaderVariants } from './PageHeader.variants';
import type { PageHeaderProps } from './PageHeader.type';

export function PageHeader({
  title,
  description,
  titleSlot,
  extra,
  moduleKey,
  size = 'default',
  variant = 'default',
  bordered = false,
  className,
  children,
  ...props
}: PageHeaderProps) {
  const { title: routeTitle } = useRouteMetadata(title ? undefined : moduleKey);
  const resolvedTitle = title ?? routeTitle;

  if (!resolvedTitle && !description && !titleSlot && !extra && !children) {
    return null;
  }

  return (
    <header
      className={cn(pageHeaderVariants({ size, variant, bordered }), className)}
      {...props}
    >
      {/* بخش راست: تایتل، نشانگر وضعیت و توضیحات */}
      <div className="min-w-0 flex-1 flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-3">
          {resolvedTitle && (
            <PageTitle
              title={resolvedTitle}
              size={size}
              variant={variant}
            />
          )}
          {titleSlot}
        </div>

        {description && (
          <div className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </div>
        )}
      </div>

      {/* بخش چپ: اکشن‌ها و ابزارها */}
      {extra && (
        <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:justify-end">
          {extra}
        </div>
      )}

      {children}
    </header>
  );
}

PageHeader.displayName = 'PageHeader';

export default PageHeader;
