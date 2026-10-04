// src/components/ui/sidebar/Sidebar.types.ts
import * as React from 'react';

export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContextValue {
  /**
   * وضعیت فعلی نمایش سایدبار در دسکتاپ
   */
  state: SidebarState;
  /**
   * آیا سایدبار در حالت جمع‌شده (آیکون‌اونلی) است؟
   */
  isCollapsed: boolean;
  /**
   * تغییر مستقیم وضعیت جمع‌شدن سایدبار در دسکتاپ
   */
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  /**
   * آیا منوی موبایل (دراور) باز است؟
   */
  isMobileOpen: boolean;
  /**
   * تغییر وضعیت باز/بسته بودن منوی موبایل
   */
  setIsMobileOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  /**
   * آیا سایز صفحه جاری موبایل است؟ (< 768px)
   */
  isMobile: boolean;
  /**
   * تاگل هوشمند سایدبار (تغییر دسکتاپ یا موبایل بسته به ابعاد صفحه)
   */
  toggleSidebar: () => void;
}

export interface SidebarProviderProps {
  /**
   * وضعیت اولیه سایدبار در دسکتاپ (پیش‌فرض: false)
   */
  defaultCollapsed?: boolean;
  /**
   * کنترل وضعیت سایدبار به صورت Controlled از بیرون
   */
  isCollapsed?: boolean;
  /**
   * کال‌بک هنگام تغییر وضعیت جمع‌شدن
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * کلید ذخیره‌سازی وضعیت سایدبار در localStorage (در صورت ارسال، وضعیت در مرورگر ماندگار می‌شود)
   */
  storageKey?: string;
  /**
   * کامپوننت‌های فرزند
   */
  children: React.ReactNode;
}
