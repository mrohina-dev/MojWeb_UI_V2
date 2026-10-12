import type { Meta, StoryObj } from '@storybook/react-vite';
import { UploadCloud, Users, Settings, Activity } from 'lucide-react';
import ModuleCard from './module-card';

const meta: Meta<typeof ModuleCard> = {
  title: 'Components/Common/ModuleCard',
  component: ModuleCard,
  tags: ['autodocs'],
  argTypes: {
    iconBgColor: {
      control: 'select',
      options: ['blue', 'emerald', 'violet', 'amber', 'rose'],
      description: 'تم رنگی پس‌زمینه و آیکون کارت',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full font-sans antialiased">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ModuleCard>;

/**
 * ۱. حالت پیش‌فرض با توضیحات رشته‌ای ساده
 */
export const Default: Story = {
  args: {
    title: 'مدیریت و بارگذاری فایل‌ها',
    description: 'بارگذاری گروهی فایل‌ها، مدیریت دسترسی‌ها و جایگزینی فایل‌های تکراری با الگوریتم DPK.',
    icon: <UploadCloud className="h-6 w-6" />,
    iconBgColor: 'blue',
    actionText: 'ورود به ماژول فایل‌ها',
  },
};

/**
 * ۲. حالت تعاملی همراه با اکشن کلیک نمادین (Interactive Clickable)
 */
export const InteractiveClick: Story = {
  args: {
    title: 'مدیریت کاربران و سطوح دسترسی',
    description: 'جهت بررسی رخداد کلیک، روی این کارت کلیک کنید (پیام در کنسول و صفحه نمایش داده می‌شود).',
    icon: <Users className="h-6 w-6" />,
    iconBgColor: 'emerald',
    badge: 'فعال',
    actionText: 'مشاهده لیست کاربران',
    onClick: () => {
      alert('ماژول مدیریت کاربران فراخوانی شد!');
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<ModuleCard
  title="مدیریت کاربران و سطوح دسترسی"
  description="جهت بررسی رخداد کلیک، روی این کارت کلیک کنید."
  icon={<Users className="h-6 w-6" />}
  iconBgColor="emerald"
  badge="فعال"
  actionText="مشاهده لیست کاربران"
  onClick={() => {
    alert('ماژول مدیریت کاربران فراخوانی شد!');
  }}
/>`,
      },
    },
  },
};

/**
 * ۳. توضیحات چندخطی به صورت آرایه از رشته‌ها (Multi-line String Array)
 */
export const MultiLineDescription: Story = {
  args: {
    title: 'شرایط و ضوابط آپلود مستندات',
    icon: <UploadCloud className="h-6 w-6" />,
    iconBgColor: 'rose',
    badge: 'راهنما',
    description: [
      '• حداکثر حجم هر فایل: ۵۰ مگابایت',
      '• پسوندهای مجاز: PDF, PNG, JPG, ZIP',
      '• قابلیت جایگزینی خودکار فایل‌های همنام',
    ],
    actionText: 'مطالعه مستندات کامل',
  },
};

/**
 * ۴. توضیحات کاستوم با المان‌های JSX و استایل‌های منطبق بر سیستم رنگی
 */
export const CustomJsxDescription: Story = {
  args: {
    title: 'وضعیت سلامت سرویس‌ها',
    icon: <Activity className="h-6 w-6" />,
    iconBgColor: 'amber',
    badge: 'زنده',
    description: (
      <div className="mt-1 space-y-1.5 rounded-lg bg-muted/50 p-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">سرویس بارگذاری:</span>
          <span className="font-semibold text-success-600 dark:text-success-500">● آنلاین</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">فضای باقیمانده دیسک:</span>
          <span className="font-semibold text-foreground/80">۱۲۰ گیگابایت</span>
        </div>
      </div>
    ),
    actionText: 'مشاهده لاگ‌های مانیتورینگ',
  },
};

/**
 * ۵. کارت ساده بدون آیکون و بدون توضیحات
 */
export const MinimalWithoutIcon: Story = {
  args: {
    title: 'گزارش‌های دوره‌ای مالی',
    badge: 'جدید',
    actionText: 'دریافت خروجی اکسل',
  },
};

/**
 * ۶. حالت غیرفعال (Disabled)
 */
export const Disabled: Story = {
  args: {
    title: 'تنظیمات پیشرفته هوش مصنوعی',
    description: 'این بخش در فاز دوم توسعه سامانه در دسترس قرار خواهد گرفت.',
    icon: <Settings className="h-6 w-6" />,
    iconBgColor: 'violet',
    badge: 'به زودی',
    disabled: true,
    actionText: 'غیرفعال',
    onClick: () => {
      alert('این پیام نباید در حالت disabled اجرا شود.');
    },
  },
};

/**
 * ۷. گرید کامل نمای داشبورد (Dashboard Grid Layout)
 */
export const DashboardGrid: StoryObj = {
  render: () => (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
      <ModuleCard
        title="مدیریت و بارگذاری فایل‌ها"
        description={[
          '• صف بارگذاری همزمان',
          '• پشتیبانی از الگوریتم DPK',
          '• مدیریت فایل‌های تکراری',
        ]}
        icon={<UploadCloud className="h-6 w-6" />}
        iconBgColor="blue"
        badge="نسخه جدید"
        actionText="ورود به ماژول فایل‌ها"
        onClick={() => alert('ورود به ماژول فایل‌ها')}
      />
      <ModuleCard
        title="مدیریت اعضای تیم"
        description="مشاهده لیست کاربران فعال، انتساب نقش‌ها و بررسی دسترسی‌های امنیتی سازمان."
        icon={<Users className="h-6 w-6" />}
        iconBgColor="emerald"
        badge="فعال"
        actionText="مدیریت کاربران"
        onClick={() => alert('ورود به مدیریت اعضا')}
      />
      <ModuleCard
        title="تنظیمات سامانه"
        description="پیکربندی پارامترهای سرور، وب‌هوک‌ها، تم ظاهری و کلیدهای ارتباطی API."
        icon={<Settings className="h-6 w-6" />}
        iconBgColor="violet"
        actionText="تنظیمات سیستم"
        onClick={() => alert('ورود به تنظیمات')}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto box-border w-full max-w-6xl p-6">
        <Story />
      </div>
    ),
  ],
};
