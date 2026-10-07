import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.type';
import {
  breadcrumbsVariants,
  breadcrumbsLinkVariants,
  breadcrumbsSeparatorVariants,
} from './Breadcrumbs.variants';

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator = <ChevronLeft aria-hidden="true" />,
      size = 'default',
      variant = 'default',
      separatorVariant = 'default',
      maxItemsBeforeCollapse,
      collapseLabel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // ۱. رندر سفارشی در صورت ارسال مستقیم children (بدون آرایه items)
    if (!items) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(breadcrumbsVariants({ size }), className)}
          {...props}
        >
          {children}
        </nav>
      );
    }

    // ۲. نرمال‌سازی آیتم‌ها و شناسایی آیتم پایانی
    const lastIndex = items.length - 1;
    const normalizedItems: BreadcrumbItem[] = items.map((item, index) => ({
      ...item,
      current: item.current ?? index === lastIndex,
    }));

    // ۳. لاجیک فشرده‌سازی (Collapse) برای مسیرهای طولانی
    const shouldCollapse =
      typeof maxItemsBeforeCollapse === 'number' &&
      normalizedItems.length > maxItemsBeforeCollapse + 2;

    const renderItems: BreadcrumbItem[] = shouldCollapse
      ? [
          ...normalizedItems.slice(0, maxItemsBeforeCollapse),
          { label: '__collapsed__', current: false },
          ...normalizedItems.slice(-2),
        ]
      : normalizedItems;

    const renderBreadcrumbNode = (item: BreadcrumbItem, isCollapsedNode: boolean) => {
      if (isCollapsedNode) {
        return (
          <span
            role="presentation"
            title={collapseLabel ? undefined : 'مسیرهای میانی'}
            className="inline-flex cursor-default items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="مسیرهای میانی مخفی شده"
          >
            {collapseLabel ?? <MoreHorizontal aria-hidden="true" className="size-4" />}
          </span>
        );
      }

      // آیتم صفحه جاری یا آیتم‌های بدون href (غیرقابل کلیک)
      if (item.current || !item.href) {
        return (
          <span
            aria-current={item.current ? 'page' : undefined}
            className={cn(
              'inline-flex items-center gap-1.5',
              item.current
                ? 'truncate font-semibold text-foreground'
                : 'truncate text-muted-foreground',
              item.className
            )}
          >
            {item.icon}
            {item.label}
          </span>
        );
      }

      // آیتم لینک‌دار فعال
      return (
        <Link
          to={item.href}
          aria-current={item.current ? 'page' : undefined}
          className={cn(
            breadcrumbsLinkVariants({ variant }),
            'truncate',
            item.className
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbsVariants({ size }), className)}
        {...props}
      >
        <ol className="flex min-w-0 items-center gap-1.5 flex-wrap">
          {renderItems.map((item, index) => {
            const isCollapsedNode = item.label === '__collapsed__';
            return (
              <li
                key={
                  isCollapsedNode
                    ? 'collapsed'
                    : `${index}-${String(item.href ?? item.label)}`
                }
                className="flex min-w-0 items-center gap-1.5"
              >
                {index > 0 && (
                  <span
                    role="presentation"
                    className={cn(
                      breadcrumbsSeparatorVariants({
                        size,
                        variant: separatorVariant,
                      })
                    )}
                  >
                    {separator}
                  </span>
                )}
                {renderBreadcrumbNode(item, isCollapsedNode)}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
