import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../AppShell';
import { SidebarProvider } from '../sidebar/SidebarProvider';
import { Sidebar } from '../sidebar/Sidebar';
import type { SidebarNavGroup, SidebarNavItem } from '../sidebar/Sidebar.types';
import {
  getModuleNavigationConfig,
  type NavigationGroup,
  type NavigationItem,
  type DynamicBadgesMap,
} from '@/constants/navigation.constants';
import type { ModuleLayoutProps } from './ModuleLayout.type';

/**
 * تبدیل بازگشتی آیتم‌های منو از تایپ خالص (کانفیگ) به تایپ نمایشی سایدبار (JSX)
 */
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

/**
 * پوسته صفحات ماژول:
 * هدر دارای دکمه سایدبار در موبایل + سایدبار اختصاصی ماژول
 */
export const ModuleLayout = ({ moduleKey }: ModuleLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // در صورت نیاز به اتصال مستقیم هوک یا کانتکست دریافت بج‌ها (مثلاً هوک نوتیفیکیشن)
  // می‌توانید مقادیر را در این شیء قرار دهید
  const dynamicBadges: DynamicBadgesMap = React.useMemo(() => {
    return {
      // به عنوان نمونه:
      // 'svj-notification': unreadNotificationsCount,
    };
  }, []);

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

  const HeaderIcon = moduleConfig?.icon;

  return (
    <SidebarProvider>
      <AppShell
        showSidebarToggle={false}
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
            onNavigate={(item) => {
              if (item.path) {
                navigate(item.path);
              }
            }}
          />
        }
      >
        <Outlet />
      </AppShell>
    </SidebarProvider>
  );
};

export default ModuleLayout;
