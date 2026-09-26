import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  BaseDialog,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

/**
 * کامپوننت Dialog برای نمایش پنجره‌های مودال، پیام‌های تاییدی و فرم‌ها.
 * 
 * این ماژول دو رویکرد در اختیار قرار می‌دهد:
 * 1. **High-Level (`Dialog`):** تعریف مودال تنها با پاس دادن پراپ‌های `title`، `description`، `trigger`، `footer` و محتوا به عنوان `children`.
 * 2. **Compound / Low-Level (`BaseDialog`):** دسترسی کامل به اجزای اتمیک شامل Header، Content، Title و Footer برای سناریوهای منعطف و سفارشی.
 */
const meta: Meta<typeof Dialog> = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'حداکثر عرض مودال',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'نمایش دکمه ضربدر بستن در گوشه بالا',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      control: 'text',
      description: 'عنوان مودال',
    },
    description: {
      control: 'text',
      description: 'توضیحات کوتاه زیر عنوان',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/* -------------------------------------------------------------------------- */
/*                        ۱. حالت پایه (High-Level Dialog)                     */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  args: {
    size: 'default',
    showCloseButton: true,
    title: 'عنوان دیالوگ',
    description: 'این بخش برای توضیحات کوتاه و راهنمای کاربر استفاده می‌شود.',
  },
  render: (args) => (
    <Dialog
      {...args}
      trigger={<Button>باز کردن دیالوگ</Button>}
      footer={
        <>
          <DialogClose render={<Button variant="secondary" outline>انصراف</Button>} />
          <Button variant="primary">ذخیره اطلاعات</Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        این یک نمونه استفاده سریع و استاندارد از کامپوننت مودال است که تمام بخش‌های هدر، توضیحات، فوتر و دکمه‌ها از طریق پراپ‌های سرراست تنظیم شده‌اند.
      </p>
    </Dialog>
  ),
};

/* -------------------------------------------------------------------------- */
/*                       ۲. دیالوگ تایید حذف (Destructive)                    */
/* -------------------------------------------------------------------------- */

export const Confirmation: Story = {
  render: () => (
    <Dialog
      size="sm"
      title="حذف حساب کاربری"
      trigger={<Button variant="destructive">حذف حساب</Button>}
      footer={
        <>
          <DialogClose render={<Button variant="secondary" outline>انصراف</Button>} />
          <Button variant="destructive">بله، حذف شود</Button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        تمامی اطلاعات و داده‌های مرتبط با این حساب به طور کامل از سرور پاک خواهند شد. آیا نسبت به ادامه اطمینان دارید؟
      </p>
    </Dialog>
  ),
};

/* -------------------------------------------------------------------------- */
/*                         ۳. فرم اطلاعات داخل دیالوگ                         */
/* -------------------------------------------------------------------------- */

export const WithForm: Story = {
  render: () => (
    <Dialog
      size="default"
      title="ویرایش مشخصات"
      description="اطلاعات کاربری جدید خود را وارد و ذخیره کنید."
      trigger={<Button variant="secondary">ویرایش پروفایل</Button>}
      footer={
        <>
          <DialogClose render={<Button variant="secondary" outline>انصراف</Button>} />
          <Button variant="primary">ثبت تغییرات</Button>
        </>
      }
    >
      <form className="flex flex-col gap-4 py-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullname" className="text-sm font-medium text-foreground">
            نام و نام خانوادگی
          </label>
          <input
            id="fullname"
            defaultValue="سهراب سپهری"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            آدرس ایمیل
          </label>
          <input
            id="email"
            type="email"
            defaultValue="sohrab@example.com"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </form>
    </Dialog>
  ),
};

/* -------------------------------------------------------------------------- */
/*                            ۴. اندازه‌های مختلف دیالوگ                        */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  render: () => {
    const sizes = ['sm', 'default', 'lg', 'xl'] as const;

    return (
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Dialog
            key={size}
            size={size}
            title={`نمایش در سایز (${size})`}
            description={`این پنجره با مقدار سایز size="${size}" باز شده است.`}
            trigger={<Button variant="secondary" outline>سایز {size}</Button>}
            footer={
              <DialogClose render={<Button variant="primary">متوجه شدم</Button>} />
            }
          >

          </Dialog>
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*            ۵. ساختار منعطف و لایه‌بندی دستی (BaseDialog Compound)           */
/* -------------------------------------------------------------------------- */

export const CompoundUsage: Story = {
  render: () => (
    <BaseDialog>
      <DialogTrigger render={<Button variant="ghost" outline>استفاده از BaseDialog</Button>} />
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>کنترل جزء‌به‌جزء چیدمان</DialogTitle>
          <DialogDescription>
            در سناریوهای چندمرحله‌ای، تب‌بندی‌ها یا چیدمان‌های بدون فوتر می‌توانید مستقیماً از اجزای BaseDialog استفاده کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          این بخش می‌تواند شامل هر ترکیب ساختاری پیچیده دلخواهی باشد.
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="secondary" outline>بستن</Button>} />
          <Button variant="primary">اقدام بعدی</Button>
        </DialogFooter>
      </DialogContent>
    </BaseDialog>
  ),
};

/* -------------------------------------------------------------------------- */
/*                         ۶. کنترل وضعیت باز/بسته (Controlled)               */
/* -------------------------------------------------------------------------- */

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm text-muted-foreground">
          وضعیت کنونی: <span className="font-semibold text-foreground">{open ? 'باز' : 'بسته'}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>باز کردن از طریق State</Button>
        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="مدیریت وضعیت برنامه‌نویسی‌شده"
          description="این مودال مستقیماً با open و onOpenChange کنترل می‌شود."
          footer={
            <Button variant="primary" onClick={() => setOpen(false)}>
              تایید و بستن
            </Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            مناسب برای سناریوهایی که مودال باید پس از دریافت پاسخ از API یا وقوع یک رویداد خارجی بسته شود.
          </p>
        </Dialog>
      </div>
    );
  },
};
