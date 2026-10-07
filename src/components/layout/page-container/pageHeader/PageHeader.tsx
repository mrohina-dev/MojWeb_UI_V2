import { cn } from '@/lib/utils';
import PageTitle from '@/components/ui/title';
import { useRouteMetadata } from '@/hooks/useRouteMetadata';
import { pageHeaderVariants } from './PageHeader.variants';
import type { PageHeaderProps, PageHeaderSize } from './PageHeader.type';
import type { pageTitleVariants } from '@/components/ui/title/title.variants';
import type { VariantProps } from 'class-variance-authority';

type TitleSize = NonNullable<VariantProps<typeof pageTitleVariants>['size']>;

function mapHeaderSizeToTitleSize(size?: PageHeaderSize): TitleSize {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'lg':
      return 'lg';
    case 'default':
    default:
      return 'md';
  }
}

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

  const titleSize = mapHeaderSizeToTitleSize(size ?? 'default');

  return (
    <header
      className={cn(pageHeaderVariants({ size, variant, bordered }), className)}
      {...props}
    >
      {/* بخش راست: تایتل، اسلات بج/آیکون و متن توضیحات */}
      <div className="min-w-0 flex-1 flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-3">
          {resolvedTitle && (
            <PageTitle
              title={resolvedTitle}
              size={titleSize}
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

      {/* بخش چپ: اکشن‌ها، فیلترها یا دکمه‌ها */}
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
