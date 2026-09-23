import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/Common/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'کامپوننت جنریک `ConfirmDialog` جهت دریافت تاییدیه از کاربر پیش از انجام اقدامات حساس (مانند خروج از حساب کاربری، حذف داده‌ها یا لغو تغییرات).',
      },
    },
  },
  // استفاده از Wrapper برای مدیریت state در Storybook
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

// کامپوننت کمکی برای تست وضعیت‌های تعاملی
const ConfirmDialogWrapper = (args: React.ComponentProps<typeof ConfirmDialog>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <ConfirmDialog {...args} open={open} onOpenChange={setOpen} />
    </>
  );
};

// 1. حالت استاندارد (Primary)
export const Primary: Story = {
  render: (args) => <ConfirmDialogWrapper {...args} />,
  args: {
    title: 'تایید عملیات',
    message: 'آیا مطمئن هستید که می‌خواهید این آیتم را ذخیره کنید؟',
    confirmText: 'ذخیره',
    onConfirm: () => alert('Confirmed!'),
  },
};

// 2. حالت مخرب (Destructive) - مناسب برای خروج یا حذف
export const Destructive: Story = {
  render: (args) => <ConfirmDialogWrapper {...args} />,
  args: {
    title: 'خروج از حساب',
    message: 'آیا مطمئن هستید؟ با انجام این کار از تمام سیستم‌ها خارج می‌شوید.',
    confirmText: 'خروج',
    variant: 'destructive',
    onConfirm: () => alert('Logged out!'),
  },
};

// 3. حالت در حال بارگذاری (Loading) - برای سناریوهای API
export const LoadingState: Story = {
  render: (args) => <ConfirmDialogWrapper {...args} />,
  args: {
    title: 'در حال پردازش',
    message: 'لطفاً منتظر بمانید...',
    confirmText: 'تایید',
    isLoading: true,
    onConfirm: () => {},
  },
};

// 4. حالت با فرزندان سفارشی (Custom Children)
export const CustomContent: Story = {
  render: (args) => <ConfirmDialogWrapper {...args} />,
  args: {
    title: 'تنظیمات پیشرفته',
    children: (
      <div className="rounded-md border bg-gray-50 p-4 text-sm">
        این یک محتوای سفارشی است که داخل دیالوگ قرار گرفته است.
      </div>
    ),
    onConfirm: () => alert('Custom action!'),
  },
};
