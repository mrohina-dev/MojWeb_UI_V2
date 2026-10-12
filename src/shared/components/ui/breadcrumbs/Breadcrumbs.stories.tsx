import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Home, FolderOpen } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import type { BreadcrumbSize, BreadcrumbSeparatorVariant } from './Breadcrumbs.type';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/UI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'اندازه کلی کامپوننت (سایزهای معتبر BreadcrumbSize)',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'ghost', 'lightPrimary'],
      description: 'واریانت رنگی لینک‌ها',
    },
    separatorVariant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted', 'lightPrimary'],
      description: 'واریانت رنگی آیکون جداکننده (مستقل از رنگ لینک‌ها)',
    },
    separator: { control: false, description: 'آیکون جداکننده بین آیتم‌ها' },
    maxItemsBeforeCollapse: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'تعداد آیتم‌های ابتدایی که هنگام جمع‌شدن نمایش داده می‌شوند',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/**
 * ۱. حالت پایه: ترکیب لینک‌ها و آیتم جاری غیرقابل کلیک
 */
export const Default: Story = {
  args: {
    items: [
      { label: 'پیشخوان', href: '/' },
      { label: 'ماژول مدیریت', href: '/management' },
      { label: 'لیست رکوردها' },
    ],
  },
};

/**
 * ۲. با آیکون اختیاری برای آیتم‌ها
 */
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'خانه', href: '/', icon: <Home className="size-3.5" /> },
      { label: 'پروژه‌ها', href: '/projects', icon: <FolderOpen className="size-3.5" /> },
      { label: 'جزئیات پروژه' },
    ],
  },
};

/**
 * ۳. مقایسه تمام سایزهای پشتیبانی‌شده (BreadcrumbSize)
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      {(['sm', 'default', 'lg', 'xl'] as const satisfies readonly BreadcrumbSize[]).map((s) => (
        <div key={s} className="space-y-1">
          <code className="text-xs text-primary font-mono">size=&quot;{s}&quot;</code>
          <Breadcrumbs
            size={s}
            items={[
              { label: 'پیشخوان', href: '/' },
              { label: 'ماژول مدیریت', href: '/management' },
              { label: 'لیست رکوردها' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * ۴. مقایسه تمام واریانت‌های لینک
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['default', 'primary', 'secondary', 'ghost', 'lightPrimary'] as const).map((v) => (
        <div key={v} className="space-y-1">
          <code className="text-xs text-primary font-mono">variant=&quot;{v}&quot;</code>
          <Breadcrumbs
            variant={v}
            items={[
              { label: 'پیشخوان', href: '/' },
              { label: 'ماژول مدیریت', href: '/management' },
              { label: 'لیست رکوردها' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * ۵. مقایسه واریانت‌های رنگی جداکننده (Separator Variants)
 */
export const SeparatorVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['default', 'primary', 'secondary', 'muted', 'lightPrimary'] as const satisfies readonly BreadcrumbSeparatorVariant[]).map((sv) => (
        <div key={sv} className="space-y-1">
          <code className="text-xs text-primary font-mono">separatorVariant=&quot;{sv}&quot;</code>
          <Breadcrumbs
            separatorVariant={sv}
            items={[
              { label: 'پیشخوان', href: '/' },
              { label: 'ماژول مدیریت', href: '/management' },
              { label: 'لیست رکوردها' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * ۶. مسیر طولانی با قابلیت جمع‌شدن (Collapse):
 * آیتم‌های میانی به صورت «...» فشرده می‌شوند
 */
export const Collapsed: Story = {
  args: {
    maxItemsBeforeCollapse: 1,
    items: [
      { label: 'پیشخوان', href: '/' },
      { label: 'مدیریت سیستم', href: '/system' },
      { label: 'تنظیمات ماژول‌ها', href: '/system/modules' },
      { label: 'پیکربندی پیشرفته', href: '/system/modules/advanced' },
      { label: 'ویرایش کلیدها' },
    ],
  },
};

/**
 * ۷. جداکننده سفارشی
 */
export const CustomSeparator: Story = {
  args: {
    separator: <span className="text-muted-foreground/50">/</span>,
    items: [
      { label: 'پیشخوان', href: '/' },
      { label: 'گزارش‌ها', href: '/reports' },
      { label: 'گزارش ماهانه' },
    ],
  },
};

/**
 * ۸. حالت سفارشی: ارسال ReactNode مستقیم (بدون آیتم‌های داده‌ای)
 */
export const CustomChildren: Story = {
  args: {
    children: (
      <span className="text-xs text-muted-foreground">
        مسیر کاملاً سفارشی — <span className="font-medium text-foreground">بدون آیتم داده‌ای</span>
      </span>
    ),
  },
};
