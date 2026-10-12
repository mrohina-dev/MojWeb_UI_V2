import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../AppShell';
import { SidebarProvider } from '../sidebar/SidebarProvider';
import { Sidebar } from '../sidebar/Sidebar';
import Breadcrumbs from '@/shared/components/ui/breadcrumbs/Breadcrumbs';
import { useRouteMetadata } from '@/shared/hooks/useRouteMetadata';
import { userService } from '@/features/auth/api/user.service';
import {
  getModuleNavigationConfig,
  type NavigationGroup,
  type NavigationItem,
  type DynamicBadgesMap,
} from '@/shared/constants/navigation.constants';
import type { SidebarNavItem, SidebarNavGroup } from '../sidebar/Sidebar.types';
import type { ModuleLayoutProps } from './ModuleLayout.type';

const LOGIN_ROUTE = '/login';

function mapNavItems(items: NavigationItem[]): SidebarNavItem[] {
  return items.map((item) => {
    const ItemIcon = item.icon;
    return {
      id: item.id,
      title: item.title,
      path: item.path,
      badge: item.badge,
      badgeVariant: item.badgeVariant,
      icon: ItemIcon ? <ItemIcon className="size-4 shrink-0" /> : undefined,
      children: item.children ? mapNavItems(item.children) : undefined,
    };
  });
}

export function ModuleLayout({
  moduleKey,
  showBreadcrumbs = true,
}: ModuleLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadcrumbs } = useRouteMetadata(moduleKey);

  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = React.useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await userService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [navigate]);

  const dynamicBadges: DynamicBadgesMap = React.useMemo(() => ({}), []);

  const moduleConfig = React.useMemo(() => {
    return getModuleNavigationConfig(moduleKey, dynamicBadges);
  }, [moduleKey, dynamicBadges]);

  const sidebarGroups: SidebarNavGroup[] = React.useMemo(() => {
    if (!moduleConfig?.groups) return [];
    return moduleConfig.groups.map((group: NavigationGroup) => ({
      id: group.id,
      title: group.title,
      items: mapNavItems(group.items),
    }));
  }, [moduleConfig]);

  const handleSidebarNavigate = React.useCallback(
    (item: SidebarNavItem) => {
      if (item.path) {
        navigate(item.path);
      }
    },
    [navigate]
  );

  const HeaderIcon = moduleConfig?.icon;

  // رندر مشروط نوار مسیر: پیش‌فرض فعال است مگر اینکه صریحاً false شود یا مسیری موجود نباشد
  const shouldRenderBreadcrumbs = showBreadcrumbs && breadcrumbs.length > 0;

  return (
    <SidebarProvider>
      <AppShell
        showSidebarToggle={false}
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
        sidebar={
          <Sidebar
            groups={sidebarGroups}
            headerTitle={moduleConfig?.title}
            headerIcon={
              HeaderIcon ? (
                <HeaderIcon className="size-5 text-primary shrink-0" />
              ) : undefined
            }
            currentPath={location.pathname}
            onNavigate={handleSidebarNavigate}
          />
        }
      >
        {/* فریم استاندارد عرض صفحه + Breadcrumbs سراسری */}
        <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
          {shouldRenderBreadcrumbs && (
            <div className="mb-4">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          <Outlet />
        </div>
      </AppShell>
    </SidebarProvider>
  );
}

export default ModuleLayout;
