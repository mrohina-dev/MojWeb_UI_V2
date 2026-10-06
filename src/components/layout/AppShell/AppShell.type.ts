import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
  /** نمایش دکمه تاگل سایدبار در هدر */
  showSidebarToggle?: boolean;
  /** بدنه سایدبار برای چیدمان زیر هدر */
  sidebar?: ReactNode;
  className?: string;
}
