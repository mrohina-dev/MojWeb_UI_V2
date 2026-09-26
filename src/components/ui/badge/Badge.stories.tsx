import type { Meta, StoryObj } from '@storybook/react-vite';
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
        'success-subtle',
        'warning-subtle',
        'destructive-subtle',
        'info-subtle',
        'outline',
      ],
      description: 'تم رنگی واریانت بج بر اساس توکن‌های تم',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'sm', 'counter'],
      description: 'اندازه بج متنی یا شمارنده',
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
      description: 'محتوای متنی بج در حالت غیرشمارنده',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. حالت برچسب متنی پیش‌فرض
export const Default: Story = {
  args: {
    children: 'متن',
    variant: 'primary',
    size: 'default',
  },
};

// ۲. تمام واریانت‌های رنگی در کنار هم
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary">اصلی (Primary)</Badge>
        <Badge variant="secondary">ثانویه (Secondary)</Badge>
        <Badge variant="muted">خاکستری (Muted)</Badge>
        <Badge variant="destructive">خطا / هشدار بالا</Badge>
        <Badge variant="outline">حاشیه‌دار (Outline)</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success">موفق</Badge>
        <Badge variant="warning">هشدار</Badge>
        <Badge variant="info">اطلاعات</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success-subtle">تأیید شده (Subtle)</Badge>
        <Badge variant="warning-subtle">در انتظار بررسی</Badge>
        <Badge variant="destructive-subtle">رد شده</Badge>
        <Badge variant="info-subtle">در حال پردازش</Badge>
      </div>
    </div>
  ),
};

// ۳. حالت شمارنده (Counter)
export const Counter: Story = {
  args: {
    count: 7,
    variant: 'destructive',
  },
};

// ۴. وضعیت‌های مختلف شمارنده (عادی، عبور از ۹۹، مقدار صفر)
export const CounterStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">تعداد کم:</span>
        <Badge count={5} variant="destructive" />
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">بیش از سقف:</span>
        <Badge count={120} maxCount={99} variant="destructive" />
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">صفر (مخفی به طور خودکار):</span>
        <Badge count={0} variant="destructive" />
        <span className="text-[11px] text-muted-foreground">(بدون رندر)</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">صفر با نمایش اجباری:</span>
        <Badge count={0} showZero variant="muted" />
      </div>
    </div>
  ),
};

// ۵. اندازه‌های مختلف
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="default" variant="primary">اندازه استاندارد (Default)</Badge>
      <Badge size="sm" variant="primary">اندازه کوچک (Small)</Badge>
      <Badge size="counter" variant="primary">شمارنده</Badge>
    </div>
  ),
};
