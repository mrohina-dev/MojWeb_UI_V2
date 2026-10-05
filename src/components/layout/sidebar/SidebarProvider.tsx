import * as React from 'react';
import { SidebarContext } from './SidebarContext';
import type {
  SidebarContextValue,
  SidebarProviderProps,
  SidebarState,
} from './Sidebar.types';

export function SidebarProvider({
  defaultCollapsed = false,
  isCollapsed: controlledIsCollapsed,
  onCollapsedChange,
  collapseMode = 'mini',
  storageKey = 'sidebar_collapsed_state',
  children,
}: SidebarProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultCollapsed;
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === 'true' : defaultCollapsed;
  });

  const isControlled = controlledIsCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledIsCollapsed : internalCollapsed;

  const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // بررسی وضعیت موبایل (زیر 768px)
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setIsCollapsed = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const nextValue = typeof value === 'function' ? value(isCollapsed) : value;
      if (!isControlled) {
        setInternalCollapsed(nextValue);
        localStorage.setItem(storageKey, String(nextValue));
      }
      onCollapsedChange?.(nextValue);
    },
    [isControlled, isCollapsed, onCollapsedChange, storageKey]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [isMobile, setIsCollapsed]);

  // کلید میانبر کیبورد Ctrl+B
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable)
        ) {
          return;
        }
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state: SidebarState = isCollapsed ? 'collapsed' : 'expanded';

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      isCollapsed,
      setIsCollapsed,
      isMobileOpen,
      setIsMobileOpen,
      isMobile,
      toggleSidebar,
      collapseMode,
    }),
    [
      state,
      isCollapsed,
      setIsCollapsed,
      isMobileOpen,
      setIsMobileOpen,
      isMobile,
      toggleSidebar,
      collapseMode,
    ]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
