import * as React from 'react';
import { cn } from '@/lib/utils';
import PageTitle from '@/components/ui/title';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import type { PageContainerProps } from './PageContainer.type';
import { pageContainerVariants, pageContentVariants } from './PageContainer.variants';

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    {
      className,
      maxWidth,
      title,
      description,
      actions,
      breadcrumbs,
      breadcrumbsItems,
      breadcrumbsSize,
      breadcrumbsVariant,
      breadcrumbsSeparatorVariant,
      breadcrumbsMaxItemsBeforeCollapse,
      headerSlot,
      contentVariant = 'card',
      contentClassName,
      titleSize = 'md',
      titleVariant = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const hasHeader = Boolean(
      title || description || actions || breadcrumbs || breadcrumbsItems || headerSlot
    );

    // اولویت با حالت داده‌محور است؛ در غیر این صورت نود آزاد رندر می‌شود
    const renderedBreadcrumbs = breadcrumbsItems ? (
      <Breadcrumbs
        items={breadcrumbsItems}
        size={breadcrumbsSize}
        variant={breadcrumbsVariant}
        separatorVariant={breadcrumbsSeparatorVariant}
        maxItemsBeforeCollapse={breadcrumbsMaxItemsBeforeCollapse}
      />
    ) : (
      breadcrumbs
    );

    return (
      <div
        ref={ref}
        className={cn(pageContainerVariants({ maxWidth }), className)}
        {...props}
      >
        {/* مسیر ناوبری (Breadcrumbs) */}
        {renderedBreadcrumbs && <div className="mb-4">{renderedBreadcrumbs}</div>}

        {/* سربرگ صفحه با توزیع بالانس شده و فاصله استاندارد بین عنوان و دکمه‌ها */}
        {hasHeader && (
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            {/* بخش عنوان: با min-w معقول تا مانع از شکسته‌شدن تک‌کلمه‌ای متن شود */}
            {title ? (
              <div className="min-w-0 flex-1 sm:max-w-2xl lg:max-w-3xl">
                <PageTitle
                  title={title}
                  description={description}
                  size={titleSize}
                  variant={titleVariant}
                />
              </div>
            ) : (
              description && (
                <div className="flex-1 text-sm text-muted-foreground">{description}</div>
              )
            )}

            {/* اسلات میانی اختیاری */}
            {headerSlot}

            {/* دکمه‌ها و اکشن‌ها: جمع‌وجور، بدون فشردگی نامناسب و تراز شده با لبه ستون */}
            {actions && (
              <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:justify-end">
                {actions}
              </div>
            )}
          </header>
        )}

        {/* بدنه محتوای صفحه */}
        <main
          className={cn(
            pageContentVariants({ variant: contentVariant }),
            contentClassName
          )}
        >
          {children}
        </main>
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
