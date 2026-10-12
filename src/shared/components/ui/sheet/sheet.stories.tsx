import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Menu,
  CreditCard,
  History,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  BaseSheet,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Components/UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### کامپوننت شیت (Sheet)
پیاده‌سازی شده با **@base-ui/react/dialog** نسخه 1.7.0 و Tailwind CSS v4.

#### جهت‌ها (Sides):
- **right:** باز شدن از راست به چپ (استاندارد RTL فارسی).
- **left:** باز شدن از چپ به راست.
- **top:** باز شدن از بالای صفحه.
- **bottom:** باتم‌شیت استاندارد موبایل.

#### تم‌ها (Variants):
- **default:** پس‌زمینه استاندارد کارت و رنگ‌های متنی تم.
- **primary:** پس‌زمینه رنگ آبی پرایمری برند با هماهنگی کامل متون و دکمه بستن.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'تم رنگی شیت',
      table: {
        type: { summary: "'default' | 'primary'" },
        defaultValue: { summary: 'default' },
      },
    },
    side: {
      control: 'select',
      options: ['right', 'left', 'top', 'bottom'],
      description: 'جهت باز شدن پنل',
      table: {
        type: { summary: "'right' | 'left' | 'top' | 'bottom'" },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'اندازه عرض یا ارتفاع پنل',
      table: {
        type: { summary: "'sm' | 'default' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: 'default' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'نمایش دکمه ضربدر بستن',
      table: { defaultValue: { summary: 'true' } },
    },
    title: {
      control: 'text',
      description: 'عنوان شیت',
    },
    description: {
      control: 'text',
      description: 'توضیحات هدر',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

/* 1. پیش‌فرض */
export const Default: Story = {
  args: {
    variant: 'default',
    side: 'right',
    size: 'default',
    title: 'عنوان شیت پیش‌فرض',
    description: 'این شیت با تگ رسمی Base UI رندر می‌شود.',
    showCloseButton: true,
  },
  render: (args) => (
    <Sheet
      {...args}
      trigger={<Button variant="primary">باز کردن شیت</Button>}
      footer={
        <div className="flex w-full gap-2">
          <Button variant="primary" className="flex-1">
            ذخیره
          </Button>
          <Button outline className="flex-1">
            انصراف
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-sm text-muted-foreground">
        <p>محتوای شیت با فونت وزیرمتن و توکن‌های تم سامانه.</p>
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="font-medium text-foreground">متن تستی</p>
          <p className="mt-1 text-xs text-muted-foreground">شعبه مرکزی</p>
        </div>
      </div>
    </Sheet>
  ),
};

/* 2. حالت پرایمری (رنگ پس‌زمینه آبی برند) */
export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    side: 'right',
    size: 'default',
    title: 'شیت با تم پرایمری',
    description: 'تمامی متن‌ها و دکمه بستن با کنتراست رنگ پرایمری هماهنگ شده‌اند.',
    showCloseButton: true,
  },
  render: (args) => (
    <Sheet
      {...args}
      trigger={<Button variant="primary">باز کردن شیت پرایمری</Button>}
      footer={
        <div className="flex w-full gap-2">
          <Button className="flex-1 bg-white text-primary hover:bg-white/90">
            تأیید عملیات
          </Button>
          <Button
            outline
            className="flex-1 border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            انصراف
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-sm text-primary-foreground/90">
        <p>در این حالت پس‌زمینه شیت آبی شده و تمام عناصر داخل آن دارای کنتراست استاندارد هستند.</p>
        <div className="rounded-lg border border-white/20 bg-white/10 p-4">
          <p className="font-medium text-white">اطلاعات حساب ویژه</p>
          <p className="mt-1 text-xs text-white/70">شماره شبا: IR000190000000000000000001</p>
        </div>
      </div>
    </Sheet>
  ),
};

/* 3. مقایسه واریانت‌ها */
export const VariantsComparison: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Sheet
        variant="default"
        side="right"
        title="شیت معمولی (Default)"
        description="پس‌زمینه کارتی روشن / دارک استاندارد"
        trigger={<Button outline>شیت Default</Button>}
      >
        <p className="text-sm text-muted-foreground">
          این شیت با رنگ‌بندی استاندارد تم و بوردرهای سیستم رندر می‌شود.
        </p>
      </Sheet>

      <Sheet
        variant="primary"
        side="right"
        title="شیت اختصاصی (Primary)"
        description="پس‌زمینه آبی با متون کنتراست بالا"
        trigger={<Button variant="primary">شیت Primary</Button>}
      >
        <p className="text-sm text-primary-foreground/90">
          این شیت با توکن‌های پس‌زمینه پرایمری برند رندر می‌شود.
        </p>
      </Sheet>
    </div>
  ),
};

/* 4. تمام جهت‌ها */
export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Sheet
        side="right"
        title="شیت سمت راست"
        description="جهت استاندارد سایدبار"
        trigger={<Button outline>راست (Right)</Button>}
      >
        <p className="text-sm text-muted-foreground">این پنل از سمت راست صفحه باز می‌شود.</p>
      </Sheet>

      <Sheet
        side="left"
        title="شیت سمت چپ"
        description="مناسب برای ابزارها و فیلترها"
        trigger={<Button outline>چپ (Left)</Button>}
      >
        <p className="text-sm text-muted-foreground">این پنل از سمت چپ صفحه باز می‌شود.</p>
      </Sheet>

      <Sheet
        side="top"
        title="شیت بالا"
        description="مناسب برای پیام‌ها و اعلانات سراسری"
        trigger={<Button outline>بالا (Top)</Button>}
      >
        <p className="text-sm text-muted-foreground">این پنل از بالای صفحه به پایین می‌آید.</p>
      </Sheet>

      <Sheet
        side="bottom"
        title="باتم شیت"
        description="مناسب برای گزینه‌ها و فرم‌های موبایل"
        trigger={<Button outline>پایین (Bottom)</Button>}
        footer={<Button className="w-full">تأیید و اعمال</Button>}
      >
        <p className="text-sm text-muted-foreground">این پنل از کف صفحه بالا می‌آید.</p>
      </Sheet>
    </div>
  ),
};

/* 5. تمام اندازه‌ها */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(['sm', 'default', 'lg', 'xl', 'full'] as const).map((size) => (
        <Sheet
          key={size}
          side="right"
          size={size}
          title={`اندازه: ${size}`}
          description={`نمایش شیت با اندازه ${size}`}
          trigger={<Button outline>{size.toUpperCase()}</Button>}
        >
          <div className="py-4 text-sm text-muted-foreground">
            اندازه فعال: <span className="font-bold text-foreground">{size}</span>
          </div>
        </Sheet>
      ))}
    </div>
  ),
};

/* 6. سایدبار موبایل */
export const MobileSidebar: Story = {
  render: () => (
    <Sheet
      side="right"
      size="default"
      trigger={
        <Button variant="ghost" iconOnly aria-label="منوی سامانه">
          <Menu className="size-5" />
        </Button>
      }
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-border pb-4">
          <h2 className="text-base font-bold text-primary">سامانه موج بانک صادرات</h2>
          <p className="text-xs text-muted-foreground">نسخه ۲.۴.۰</p>
        </div>

        <nav className="flex-1 space-y-1 py-4">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="size-4 text-primary" />
              <span>مدیریت کارت‌ها</span>
            </div>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <History className="size-4 text-primary" />
              <span>گردش حساب</span>
            </div>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Settings className="size-4 text-primary" />
              <span>تنظیمات امنیتی</span>
            </div>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="size-4 text-primary" />
              <span>پشتیبانی و راهنما</span>
            </div>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
        </nav>

        <div className="border-t border-border pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            <span>خروج از حساب</span>
          </Button>
        </div>
      </div>
    </Sheet>
  ),
};

/* 7. استفاده ترکیبی (Compound با واریانت پرایمری) */
export const CompoundUsage: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* حالت Default */}
      <BaseSheet>
        <SheetTrigger render={<Button outline>ترکیبی استاندارد</Button>} />
        <SheetContent side="bottom" size="sm">
          <SheetHeader>
            <SheetTitle>تأیید تراکنش</SheetTitle>
            <SheetDescription>آیا از انتقال وجه اطمینان دارید؟</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button outline>انصراف</Button>} />
            <Button variant="primary">تأیید</Button>
          </SheetFooter>
        </SheetContent>
      </BaseSheet>

      {/* حالت Primary */}
      <BaseSheet>
        <SheetTrigger render={<Button variant="primary">ترکیبی پرایمری</Button>} />
        <SheetContent side="bottom" size="sm" variant="primary">
          <SheetHeader variant="primary">
            <SheetTitle variant="primary">عملیات انتقال ویژه</SheetTitle>
            <SheetDescription variant="primary">
              این عملیات نیازمند تأیید با رمز یک‌بارمصرف است.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose
              render={
                <Button
                  outline
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  انصراف
                </Button>
              }
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              ارسال پیامک رمز
            </Button>
          </SheetFooter>
        </SheetContent>
      </BaseSheet>
    </div>
  ),
};
