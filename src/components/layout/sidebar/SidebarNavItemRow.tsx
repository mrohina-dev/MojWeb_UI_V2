import * as React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './useSidebar';
import { Button } from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import { SimpleTooltip } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import {
  BaseCollapsible,
  BaseCollapsibleTrigger,
  BaseCollapsibleContent,
} from '@/components/ui/collapsible';
import { sidebarItemVariants } from './Sidebar.variants';
import type { SidebarNavItem, SidebarVariant } from './Sidebar.types';

interface SidebarNavItemRowProps {
  item: SidebarNavItem;
  variant?: SidebarVariant;
  currentPath?: string;
  onNavigate?: (item: SidebarNavItem) => void;
  level?: number;
}

export function SidebarNavItemRow({
  item,
  variant = 'default',
  currentPath,
  onNavigate,
  level = 0,
}: SidebarNavItemRowProps) {
  const { isCollapsed, isMobile, setIsMobileOpen } = useSidebar();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // بررسی فعال بودن روت جاری
  const isActive = Boolean(item.path && currentPath === item.path);

  // بررسی فعال بودن یکی از فرزندان (برای باز نگه داشتن و هایلایت ریشه)
  const isChildActive = React.useMemo(() => {
    if (!hasChildren || !currentPath) return false;
    const checkActive = (children: SidebarNavItem[]): boolean =>
      children.some(
        (child) =>
          child.path === currentPath || (child.children && checkActive(child.children))
      );
    return checkActive(item.children!);
  }, [hasChildren, currentPath, item.children]);

  // همگام‌سازی State رندر به شیوه React 19 بدون نیاز به useEffect
  const [openState, setOpenState] = React.useState<boolean>(isChildActive);
  const [prevChildActive, setPrevChildActive] = React.useState<boolean>(isChildActive);

  if (prevChildActive !== isChildActive) {
    setPrevChildActive(isChildActive);
    if (isChildActive) {
      setOpenState(true);
    }
  }

  const handleSelect = (selectedItem: SidebarNavItem) => {
    if (selectedItem.disabled) return;
    if (selectedItem.path) {
      onNavigate?.(selectedItem);
      if (isMobile) {
        setIsMobileOpen(false);
      }
    }
  };

  // رندر نشانگر و بج (ظریف، فشرده و بدون شکست خط)
  const renderBadge = (targetItem: SidebarNavItem, isNested: boolean = false) => {
    if (!targetItem.badge) return null;
    if (level >= 3) return null;

    const badgeContent = targetItem.badge;
    return typeof badgeContent === 'string' || typeof badgeContent === 'number' ? (
      <Badge
        size="sm"
        variant={
          targetItem.badgeVariant ?? (variant === 'primary' ? 'secondary' : 'primary-subtle')
        }
        className={cn(
          'shrink-0 whitespace-nowrap leading-none transition-all select-none',
          isNested ? 'px-1.5 py-0.5 text-[10px] h-4.5 min-w-0 font-medium' : 'text-xs h-5',
          isCollapsed && !isMobile && 'hidden'
        )}
      >
        {badgeContent}
      </Badge>
    ) : (
      <span className="shrink-0 whitespace-nowrap select-none">{badgeContent}</span>
    );
  };

  /* -------------------------------------------------------------
     ۱. وضعیت سایدبار جمع‌شده (Collapsed) در دسکتاپ
     ------------------------------------------------------------- */
  if (isCollapsed && !isMobile) {
    if (hasChildren) {
      return (
        <div className="flex w-full justify-center">
          <DropdownMenu
            side="left"
            align="start"
            sideOffset={12}
            trigger={
              <Button
                variant="ghost"
                iconOnly
                aria-label={item.title}
                className={cn(
                  sidebarItemVariants({
                    variant,
                    isActive,
                    isSubActive: isChildActive,
                    isCollapsed: true,
                  })
                )}
              >
                {item.icon}
              </Button>
            }
          >
            <DropdownMenuGroupLabel className="truncate max-w-50" title={item.title}>
              {item.title}
            </DropdownMenuGroupLabel>
            <DropdownMenuSeparator />
            {renderDropdownItems(item.children!)}
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex w-full justify-center">
        <SimpleTooltip content={item.title} side="left" sideOffset={12}>
          <Button
            variant="ghost"
            iconOnly
            disabled={item.disabled}
            onClick={() => handleSelect(item)}
            aria-label={item.title}
            className={cn(
              sidebarItemVariants({
                variant,
                isActive,
                isCollapsed: true,
              })
            )}
          >
            {item.icon}
          </Button>
        </SimpleTooltip>
      </div>
    );
  }

  /* -------------------------------------------------------------
     رندر بازگشتی آیتم‌های دراپ‌دان منو (هنگام جمع بودن سایدبار)
     ------------------------------------------------------------- */
  function renderDropdownItems(children: SidebarNavItem[]) {
    return children.map((child) => {
      const childHasNested = Boolean(child.children && child.children.length > 0);
      const isItemActive = Boolean(child.path && currentPath === child.path);

      if (childHasNested) {
        return (
          <DropdownMenuSub key={child.id}>
            <DropdownMenuSubTrigger
              disabled={child.disabled}
              className={cn(
                'flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer',
                isItemActive && 'bg-primary/10 text-primary font-bold'
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                {child.icon && <span className="size-4 shrink-0">{child.icon}</span>}
                <span className="truncate min-w-0 flex-1 text-start" title={child.title}>
                  {child.title}
                </span>
              </div>
              <ChevronRight className="size-3.5 opacity-60 rtl:rotate-0 ltr:rotate-180 shrink-0 ms-1" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={4} alignOffset={-4}>
              {renderDropdownItems(child.children!)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={child.id}
          disabled={child.disabled}
          onClick={() => handleSelect(child)}
          className={cn(
            'flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs cursor-pointer',
            isItemActive && 'bg-primary/10 text-primary font-bold'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {child.icon && <span className="size-4 shrink-0">{child.icon}</span>}
            <span className="truncate min-w-0 flex-1 text-start" title={child.title}>
              {child.title}
            </span>
          </div>
          {child.badge && (
            <Badge
              size="sm"
              variant={child.badgeVariant ?? 'primary-subtle'}
              className="shrink-0 whitespace-nowrap text-[10px] h-4.5 px-1.5 ms-1.5"
            >
              {child.badge}
            </Badge>
          )}
        </DropdownMenuItem>
      );
    });
  }

  /* -------------------------------------------------------------
     ۲. منوی تاشو (Collapsible) در حالت باز یا موبایل
     ------------------------------------------------------------- */
  if (hasChildren) {
    return (
      <BaseCollapsible
        open={openState}
        onOpenChange={setOpenState}
        variant="ghost"
        className="w-full space-y-1"
      >
        <BaseCollapsibleTrigger
          showChevron={false}
          className={cn(
            sidebarItemVariants({
              variant,
              isActive: false,
              isSubActive: isChildActive,
              isCollapsed: false,
            }),
            'w-full flex! flex-row! flex-nowrap! items-center justify-between min-h-10 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer',
            level > 0 && 'min-h-8.5 py-1 px-2.5 text-xs'
          )}
        >
          {/* سمت راست: آیکون و عنوان با قابلیت truncate */}
          <div className="flex min-w-0 flex-1 flex-row items-center gap-2 overflow-hidden text-start">
            {item.icon && (
              <span className="size-4 shrink-0 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span className="truncate leading-normal min-w-0 flex-1" title={item.title}>
              {item.title}
            </span>
          </div>

          {/* سمت چپ: بج و آیکون بازشونده */}
          <div className="flex shrink-0 flex-row items-center gap-1.5 ms-1.5">
            {renderBadge(item, level > 0)}
            <ChevronDown
              className={cn(
                'size-4 opacity-70 transition-transform duration-200 ease-in-out shrink-0',
                openState && 'rotate-180'
              )}
            />
          </div>
        </BaseCollapsibleTrigger>

        {/* پنل فرزندان */}
        <BaseCollapsibleContent className="space-y-1">
          <div
            className={cn(
              'ms-2.5 border-s ps-1.5 space-y-1 my-1',
              variant === 'primary' ? 'border-white/20' : 'border-border/70'
            )}
          >
            {item.children!.map((child) => (
              <SidebarNavItemRow
                key={child.id}
                item={child}
                variant={variant}
                currentPath={currentPath}
                onNavigate={onNavigate}
                level={level + 1}
              />
            ))}
          </div>
        </BaseCollapsibleContent>
      </BaseCollapsible>
    );
  }

  /* -------------------------------------------------------------
     ۳. آیتم تک‌سطری نهایی با استفاده مستقیم از Button
     ------------------------------------------------------------- */
  return (
    <Button
      variant="ghost"
      fullWidth
      disabled={item.disabled}
      onClick={() => handleSelect(item)}
      iconStart={
        item.icon ? (
          <span className="size-4 shrink-0 flex items-center justify-center">
            {item.icon}
          </span>
        ) : level > 0 ? (
          <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/40 me-0.5" />
        ) : undefined
      }
      iconEnd={
        item.badge ? (
          <span className="shrink-0 flex items-center">
            {renderBadge(item, level > 0)}
          </span>
        ) : undefined
      }
      className={cn(
        sidebarItemVariants({
          variant,
          isActive,
          isCollapsed: false,
        }),
        // بازنویسی دقیق استایل‌های Button جهت قفل‌کردن در یک خط و تراز طرفین:
        'w-full flex! flex-row! flex-nowrap! items-center justify-between! text-start! min-h-10 px-3 py-2 text-sm font-medium transition-colors',
        '[&>span:nth-child(2)]:min-w-0 [&>span:nth-child(2)]:flex-1 [&>span:nth-child(2)]:overflow-hidden',
        level > 0 && 'min-h-8.5 py-1 px-2.5 text-xs'
      )}
    >
      <span className="block truncate w-full text-start leading-normal" title={item.title}>
        {item.title}
      </span>
    </Button>
  );
}
