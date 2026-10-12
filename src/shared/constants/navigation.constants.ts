import type { LucideIcon } from 'lucide-react';
import {
  Landmark,
  Home,
  MessageSquare,
  Bell,
  Files,
  Upload,
  FileBarChart2,
  Network,
  Hash,
} from 'lucide-react';
import type { SidebarNavItem } from '@/shared/components/layout/sidebar/Sidebar.types';

// تعریف کلید‌های معتبر ماژول‌های سامانه موج
export type AppModuleKey = 'svj' | 'paya' | 'satna';

export interface NavigationItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  path?: string;
  badge?: string | number;
  badgeVariant?: SidebarNavItem['badgeVariant'];
  children?: NavigationItem[];
}

export interface NavigationGroup {
  id: string;
  title?: string;
  items: NavigationItem[];
}

export interface ModuleNavigationConfig {
  /** عنوان نمایشی ماژول در هدر سایدبار */
  title: string;
  /** کامپوننت آیکون شاخص ماژول در هدر سایدبار */
  icon?: LucideIcon;
  /** گروه‌ها و آیتم‌های منوی سایدبار */
  groups: NavigationGroup[];
}

/** تایپ برای بج‌های پویا بر اساس id هر آیتم منو */
export type DynamicBadgesMap = Partial<Record<string, string | number>>;

/**
 * دریافت کانفیگ ناوبری ماژول همراه با تزریق بج‌های دریافتی از API
 * @param moduleKey نام ماژول انتخابی
 * @param dynamicBadges مقادیر بج‌ها بر اساس شناسه آیتم منو (مثلاً: { 'svj-notification': 5 })
 */
export const getModuleNavigationConfig = (
  moduleKey: AppModuleKey,
  dynamicBadges: DynamicBadgesMap = {}
): ModuleNavigationConfig => {
  const baseConfigs: Record<AppModuleKey, ModuleNavigationConfig> = {
    svj: {
      title: 'واریز گروهی داخلی',
      icon: Landmark,
      groups: [
        {
          id: 'svj-main',
          items: [
            {
              id: 'home',
              title: 'خانه',
              icon: Home,
              path: '/SelectOptions',
            },
            {
              id: 'svj-message',
              title: 'پیام',
              icon: MessageSquare,
              badge: dynamicBadges['svj-message'],
              path: '/svj/Message',
            },
            {
              id: 'svj-notification',
              title: 'اطلاعیه',
              icon: Bell,
              path: '/svj/Notification',
              badge: dynamicBadges['svj-notification'],
              badgeVariant: 'primary-subtle',
            },
            {
              id: 'svj-sendFileList',
              title: 'لیست فایل های ارسالی',
              icon: Files,
              path: '/svj/SendFileList',
            },
            {
              id: 'svj-sendFile',
              title: 'ارسال فایل',
              icon: Upload,
              path: '/svj/SendFile',
            },
            {
              id: 'svj-reports',
              title: 'گزارش',
              icon: FileBarChart2,
              path: '/svj/Report',
            },
          ],
        },
      ],
    },

    // ماژول پایا
    paya: {
      title: 'واریز گروهی پایا',
      icon: Network,
      groups: [
        {
          id: 'paya-main',
          items: [
            {
              id: 'home',
              title: 'خانه',
              icon: Home,
              path: '/SelectOptions',
            },
            {
              id: 'paya-sendFileList',
              title: 'لیست فایل های ارسالی',
              icon: Files,
              path: '/paya/List',
            },
            {
              id: 'paya-sendFile',
              title: 'ارسال فایل',
              icon: Upload,
              path: '/Paya',
            },
            {
              id: 'paya-reports',
              title: 'گزارش',
              icon: FileBarChart2,
              path: '/Paya/Report',
            },
          ],
        },
      ],
    },

    // ماژول ساتنا
    satna: {
      title: 'واریز گروهی ساتنا',
      icon: Hash,
      groups: [
        {
          id: 'satna-main',
          items: [
            {
              id: 'home',
              title: 'خانه',
              icon: Home,
              path: '/SelectOptions',
            },
            {
              id: 'satna-sendFileList',
              title: 'لیست فایل های ارسالی',
              icon: Files,
              path: '/Satna/List',
            },
            {
              id: 'satna-sendFile',
              title: 'ارسال فایل',
              icon: Upload,
              path: '/Satna',
            },
            {
              id: 'paya-reports',
              title: 'گزارش',
              icon: FileBarChart2,
              path: '/Satna/Report',
            },
          ],
        },
      ],
    },
  };

  return baseConfigs[moduleKey];
};
