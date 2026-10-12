import * as React from 'react';

export type SidebarState = 'expanded' | 'collapsed';
export type SidebarVariant = 'default' | 'primary';
export type SidebarCollapseMode = 'mini' | 'hidden';

export interface SidebarContextValue {
  state: SidebarState;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  collapseMode: SidebarCollapseMode;
}

export interface SidebarProviderProps {
  defaultCollapsed?: boolean;
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapseMode?: SidebarCollapseMode;
  storageKey?: string;
  children: React.ReactNode;
}

export interface SidebarNavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path?: string;
  badge?: string | number | React.ReactNode;
  badgeVariant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'outline'
    | 'primary-subtle'
    | 'secondary-subtle';
  disabled?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarNavGroup {
  id: string;
  /** عنوان گروه (در صورت خالی بودن، آیتم‌ها به صورت فلت و بدون هدر رندر می‌شوند) */
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SidebarVariant;
  collapseMode?: SidebarCollapseMode;
  /** کنترل نمایش دکمه تاگل داخلی سایدبار */
  showToggle?: boolean;
  headerTitle?: string;
  headerIcon?: React.ReactNode;
  headerExtra?: React.ReactNode;
  footer?: React.ReactNode;
  groups?: SidebarNavGroup[];
  currentPath?: string;
  onNavigate?: (item: SidebarNavItem) => void;
}

export interface SidebarToggleProps {
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'menu';
}
