import * as React from 'react';
import { cn } from '@/lib/utils';
import { PageHeader } from './pageHeader';
import { PageCard } from './pageCard';
import type { PageContainerProps } from './PageContainer.type';

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    {
      size = 'default',
      variant = 'default',
      bordered,
      title,
      description,
      titleSlot,
      extra,
      moduleKey,
      header,
      headerProps,
      withCard = true,
      headerInsideCard = false,
      cardProps,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // بررسی نیاز به رندر هدر
    const hasHeaderContent =
      header !== false &&
      (Boolean(header) ||
        Boolean(title) ||
        Boolean(description) ||
        Boolean(titleSlot) ||
        Boolean(extra) ||
        Boolean(moduleKey) ||
        Boolean(headerProps));

    // آماده‌سازی هدر استاندارد با ارث‌بری خودکار پراپ‌ها
    const renderedHeader = hasHeaderContent ? (
      React.isValidElement(header) ? (
        header
      ) : (
        <PageHeader
          size={headerProps?.size ?? size}
          variant={headerProps?.variant ?? variant}
          bordered={headerProps?.bordered ?? (headerInsideCard ? true : bordered)}
          title={title}
          description={description}
          titleSlot={titleSlot}
          extra={extra}
          moduleKey={moduleKey}
          {...headerProps}
        />
      )
    ) : null;

    // محتوای درونی (بدنه کارت یا بدنه عمومی)
    const content = (
      <>
        {headerInsideCard && renderedHeader}
        {children}
      </>
    );

    return (
      <div
        ref={ref}
        className={cn('w-full flex flex-col transition-colors', className)}
        {...props}
      >
        {/* رندر هدر خارج از کارت */}
        {!headerInsideCard && renderedHeader}

        {/* بخش بدنه: داخل PageCard یا به صورت ساده */}
        {withCard ? (
          <PageCard
            size={size}
            variant={variant}
            bordered={bordered}
            {...cardProps}
          >
            {content}
          </PageCard>
        ) : (
          <div className="w-full">{content}</div>
        )}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
