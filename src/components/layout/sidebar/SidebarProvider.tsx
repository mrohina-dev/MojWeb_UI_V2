import * as React from 'react';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { SidebarContext } from './SidebarContext';
import type { SidebarContextValue, SidebarProviderProps, SidebarState } from './Sidebar.types';

const DEFAULT_STORAGE_KEY = 'sidebar_collapsed_state';

export function SidebarProvider({
  defaultCollapsed = false,
  isCollapsed: controlledCollapsed,
  onCollapsedChange,
  storageKey = DEFAULT_STORAGE_KEY,
  children,
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [mobileOpenState, setMobileOpenState] = React.useState<boolean>(false);

  // محاسبه هوشمند وضعیت باز بودن در موبایل (اگر دسکتاپ باشد همواره false)
  const isMobileOpen = isMobile ? mobileOpenState : false;

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultCollapsed;
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? JSON.parse(saved) : defaultCollapsed;
    } catch {
      return defaultCollapsed;
    }
  });

  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

  const setIsCollapsed = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const nextValue = typeof value === 'function' ? value(isCollapsed) : value;

      if (!isControlled) {
        setUncontrolledCollapsed(nextValue);
        try {
          localStorage.setItem(storageKey, JSON.stringify(nextValue));
        } catch {
          // نادیده گرفتن خطا در صورت عدم دسترسی به استوریج
        }
      }

      onCollapsedChange?.(nextValue);
    },
    [isControlled, isCollapsed, onCollapsedChange, storageKey]
  );

  const setIsMobileOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setMobileOpenState((prev) => {
        const nextValue = typeof value === 'function' ? value(prev) : value;
        return nextValue;
      });
    },
    []
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileOpenState((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [isMobile, setIsCollapsed]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSidebar]);

  const state: SidebarState = isCollapsed ? 'collapsed' : 'expanded';

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      isCollapsed,
      setIsCollapsed,
      isMobileOpen,
      setIsMobileOpen,
      isMobile,
      toggleSidebar,
    }),
    [state, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, isMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
