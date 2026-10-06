import { cn } from '@/lib/utils';
import { useSidebar } from './useSidebar';
import { SidebarToggle } from './SidebarToggle';
import { SidebarNavItemRow } from './SidebarNavItemRow';
import {
  sidebarContainerVariants,
  sidebarGroupLabelVariants,
  sidebarHeaderVariants,
} from './Sidebar.variants';
import type { SidebarProps } from './Sidebar.types';

export function Sidebar({
  variant = 'default',
  collapseMode: propCollapseMode,
  showToggle = true,
  headerTitle,
  headerIcon,
  headerExtra,
  footer,
  groups = [],
  currentPath,
  onNavigate,
  className,
  ...props
}: SidebarProps) {
  const {
    state,
    isCollapsed,
    isMobile,
    isMobileOpen,
    setIsMobileOpen,
    collapseMode: contextCollapseMode,
  } = useSidebar();

  const effectiveCollapseMode = propCollapseMode ?? contextCollapseMode;

  // بررسی اینکه آیا اصلاً گروهی دارای عنوان (title) هست یا نه
  const hasNamedGroups = groups.some((group) => Boolean(group.title));

  // تابع رندر محتوای لیست آیتم‌ها
  const renderNavList = () => (
    <div className={cn('overflow-x-hidden', hasNamedGroups ? 'space-y-4' : 'space-y-1')}>
      {groups.map((group) => (
        <div key={group.id} className="space-y-1">
          {group.title && (
            <div
              className={sidebarGroupLabelVariants({
                variant,
                isCollapsed: isMobile ? false : isCollapsed,
              })}
            >
              {group.title}
            </div>
          )}
          {group.items.map((item) => (
            <SidebarNavItemRow
              key={item.id}
              item={item}
              variant={variant}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </div>
  );

  /* ------------------------------------------------------------------
     حالت موبایل: نمایش به‌صورت Overlay کشویی
     ------------------------------------------------------------------ */
  if (isMobile) {
    return (
      <>
        {/* Overlay پس‌زمینه */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={cn(
            'fixed inset-y-0 inset-s-0 z-50 flex w-72 flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out',
            isMobileOpen ? 'translate-x-0' : 'rtl:translate-x-full ltr:-translate-x-full',
            className
          )}
          {...props}
        >
          {/* هدر موبایل */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              {headerIcon && <span className="size-5 shrink-0">{headerIcon}</span>}
              {headerTitle && <span className="font-bold text-sm truncate">{headerTitle}</span>}
            </div>
            {showToggle && <SidebarToggle />}
          </div>

          {/* محتوای اسکرول‌شونده موبایل */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            {renderNavList()}
          </div>

          {/* فوتر موبایل */}
          {footer && <div className="shrink-0 border-t p-3">{footer}</div>}
        </aside>
      </>
    );
  }

  /* ------------------------------------------------------------------
     حالت دسکتاپ
     ------------------------------------------------------------------ */
  return (
    <aside
      className={cn(
        sidebarContainerVariants({
          variant,
          state,
          collapseMode: effectiveCollapseMode,
        }),
        className
      )}
      {...props}
    >
      {/* هدر سایدبار */}
      <div
        className={cn(
          sidebarHeaderVariants({
            variant,
            isCollapsed: isCollapsed && effectiveCollapseMode === 'mini',
          })
        )}
      >
        {(!isCollapsed || effectiveCollapseMode === 'mini') && (
          <div className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            {headerIcon && <span className="size-5 shrink-0">{headerIcon}</span>}
            {!isCollapsed && headerTitle && (
              <span className="font-bold text-sm truncate leading-none">{headerTitle}</span>
            )}
          </div>
        )}

        {/* دکمه تاگل سایدبار فقط در صورت فعال بودن showToggle */}
        {showToggle && (!isCollapsed || effectiveCollapseMode === 'mini') && (
          <div className="flex items-center gap-1 shrink-0">
            {!isCollapsed && headerExtra}
            <SidebarToggle />
          </div>
        )}
      </div>

      {/* محتوای آیتم‌ها و گروه‌ها */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3">
        {renderNavList()}
      </div>

      {/* فوتر سایدبار */}
      {footer && (!isCollapsed || effectiveCollapseMode === 'mini') && (
        <div className="shrink-0 border-t p-2.5 overflow-hidden">{footer}</div>
      )}
    </aside>
  );
}

export default Sidebar;
