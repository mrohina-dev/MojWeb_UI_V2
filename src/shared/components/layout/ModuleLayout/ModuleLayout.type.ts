import type { AppModuleKey } from '@/shared/constants/navigation.constants';

export interface ModuleLayoutProps {
  /** کلید ماژول جاری برای خواندن ساختار منو و متادیتا */
  moduleKey: AppModuleKey;

  /**
   * وضعیت نمایش نوار مسیر (Breadcrumbs)
   * در صورت وجود آیتم‌های مسیر، به صورت پیش‌فرض فعال است.
   * @default true
   */
  showBreadcrumbs?: boolean;
}
