import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Mail } from 'lucide-react';
import Badge from './Badge';

const meta = {
  title: 'Components/UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'muted',
        'destructive',
        'success',
        'warning',
        'info',
        'primary-subtle',
        'secondary-subtle',
        'success-subtle',
        'warning-subtle',
        'destructive-subtle',
        'info-subtle',
        'outline',
      ],
      description: 'تم رنگی واریانت بج بر اساس توکن‌های رنگی سیستم',
    },
    size: {
      control: 'select',
      options: ['dot', 'counter', 'sm', 'default', 'lg', 'xl', 'full'],
      description: 'اندازه بج بر اساس استاندارد سیستم و حالات اختصاصی',
    },
    placement: {
      control: 'select',
      options: ['none', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'موقعیت قرارگیری بج نسبت به عنصر والد (RTL-aware)',
    },
    dot: {
      control: 'boolean',
      description: 'تبدیل به نقطه وضعیت بدون محتوا',
    },
    count: {
      control: 'number',
      description: 'مقدار عددی در حالت شمارنده',
    },
    maxCount: {
      control: 'number',
      description: 'سقف شمارش قبل از نمایش فرمت +',
    },
    showZero: {
      control: 'boolean',
      description: 'آیا عدد صفر نمایش داده شود یا کلاً مخفی بماند؟',
    },
    children: {
      control: 'text',
      description: 'محتوای متنی بج در حالت برچسب',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. حالت برچسب متنی پیش‌فرض
export const Default: Story = {
  args: {
    children: 'جدید',
    variant: 'primary',
    size: 'default',
  },
};

// ۲. تمام واریانت‌های رنگی (Solid, Subtle, Outline)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5 text-right font-sans">
      {/* سالید های اصلی */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">رنگ‌های اصلی (Solid):</span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">اصلی (Primary)</Badge>
          <Badge variant="secondary">ثانویه (Secondary)</Badge>
          <Badge variant="muted">خاکستری (Muted)</Badge>
          <Badge variant="destructive">خطا / حذف</Badge>
          <Badge variant="success">موفقیت</Badge>
          <Badge variant="warning">هشدار</Badge>
          <Badge variant="info">اطلاعیه</Badge>
          <Badge variant="outline">حاشیه‌دار (Outline)</Badge>
        </div>
      </div>

      {/* حالت‌های ملایم (Subtle / Soft) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">حالت‌های ملایم سازمانی (Subtle):</span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary-subtle">اصلی ملایم</Badge>
          <Badge variant="secondary-subtle">ثانویه ملایم</Badge>
          <Badge variant="success-subtle">فعال / تایید شده</Badge>
          <Badge variant="warning-subtle">در انتظار بررسی</Badge>
          <Badge variant="destructive-subtle">مسدود شده</Badge>
          <Badge variant="info-subtle">در حال پردازش</Badge>
        </div>
      </div>
    </div>
  ),
};

// ۳. تمام مقیاس‌های سایزبندی سیستم
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex flex-wrap items-center gap-3">
        <Badge size="sm" variant="primary">کوچک (sm)</Badge>
        <Badge size="default" variant="primary">پیش‌فرض (default)</Badge>
        <Badge size="lg" variant="primary">بزرگ (lg)</Badge>
        <Badge size="xl" variant="primary">خیلی بزرگ (xl)</Badge>
        <Badge size="counter" variant="primary">9</Badge>
        <Badge size="dot" variant="primary" />
      </div>

      <div className="w-64 pt-2">
        <span className="mb-1 block text-xs text-muted-foreground">عرض کامل (full):</span>
        <Badge size="full" variant="primary-subtle">برچسب تمام‌عرض وضعیت</Badge>
      </div>
    </div>
  ),
};

// ۴. وضعیت‌های مختلف شمارنده (Counter)
export const CounterStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground font-sans">
      <div className="flex items-center gap-1.5">
        <span>تعداد عادی:</span>
        <Badge count={7} variant="destructive" />
      </div>

      <div className="flex items-center gap-1.5">
        <span>بیش از سقف (+99):</span>
        <Badge count={125} maxCount={99} variant="destructive" />
      </div>

      <div className="flex items-center gap-1.5">
        <span>صفر (مخفی اتوماتیک):</span>
        <Badge count={0} variant="destructive" />
        <span className="text-[11px] text-muted-foreground/60">(رندر نشد)</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span>صفر با نمایش اجباری:</span>
        <Badge count={0} showZero variant="muted" />
      </div>
    </div>
  ),
};

// ۵. نشانگر نقطه‌ای (Dot Badge)
export const DotBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4 font-sans">
      <div className="flex items-center gap-2">
        <Badge dot variant="success" />
        <span className="text-sm">آنلاین</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot variant="warning" />
        <span className="text-sm">غایب</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot variant="destructive" />
        <span className="text-sm">آفلاین</span>
      </div>
    </div>
  ),
};

// ۶. موقعیت‌دهی روی آیکون‌ها و المان‌ها (RTL Placements)
export const PlacementOnIcons: Story = {
  render: () => (
    <div className="flex items-center gap-8 py-4 font-sans">
      {/* دکمه با شمارنده در گوشه بالا */}
      <div className="relative inline-flex items-center justify-center rounded-lg border border-border p-2.5 bg-card">
        <Bell className="size-5 text-foreground" />
        <Badge count={3} variant="destructive" placement="top-end" />
      </div>

      {/* دکمه با نشانگر Dot */}
      <div className="relative inline-flex items-center justify-center rounded-lg border border-border p-2.5 bg-card">
        <Mail className="size-5 text-foreground" />
        <Badge dot variant="primary" placement="top-end" />
      </div>

      {/* شمارنده در گوشه پایین */}
      <div className="relative inline-flex items-center justify-center rounded-lg border border-border p-2.5 bg-card">
        <Bell className="size-5 text-foreground" />
        <Badge count={99} variant="info" placement="bottom-end" />
      </div>
    </div>
  ),
};
