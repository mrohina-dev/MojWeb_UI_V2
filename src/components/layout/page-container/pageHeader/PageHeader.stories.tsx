import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { PageHeader } from './PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Download } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
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
      description: 'اندازه و فاصله‌بندی هدر صفحه',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'destructive'],
      description: 'تُن رنگی و استایل عنوان هدر',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'افزودن خط جداکننده به پایین هدر',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'متن عنوان صفحه',
    },
    description: {
      control: 'text',
      description: 'توضیحات تکمیلی زیر عنوان',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'تنظیمات حساب کاربری',
  },
};

// ۱. نمایش تمام واریانت‌های رنگی در کنار هم
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Default Variant"
        variant="default"
        description="حالت استاندارد و خنثی"
      />
      <PageHeader
        title="Muted Variant"
        variant="muted"
        description="حالت ملایم و کم‌رنگ‌تر برای بخش‌های فرعی"
      />
      <PageHeader
        title="Primary Variant"
        variant="primary"
        description="عنوان هدر با رنگ تم اصلی (Primary)"
      />
      <PageHeader
        title="Secondary Variant"
        variant="secondary"
        description="عنوان هدر با رنگ ثانویه"
      />
      <PageHeader
        title="Destructive Variant"
        variant="destructive"
        description="عنوان هدر برای صفحات هشدار، حذف یا بخش‌های حساس"
      />
      <PageHeader
        title="Bordered Example"
        bordered
        description="ترکیب هدر با خط جداکننده زیرین"
      />
    </div>
  ),
};

// ۲. نمایش تمام سایزها در کنار هم (شامل سایز جدید xl)
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader title="Small Size" size="sm" description="سایز فشرده" />
      <PageHeader title="Default Size" size="default" description="سایز استاندارد صفحات" />
      <PageHeader title="Large Size" size="lg" description="سایز برجسته داشبوردها" />
      <PageHeader title="Extra Large Size" size="xl" description="سایز فوق برجسته برای لندینگ‌ها یا داشبوردهای اصلی" />
    </div>
  ),
};

// ۳. محیط آزمایش جامع (Playground)
export const Playground: Story = {
  args: {
    title: 'تراکنش‌های مالی',
    description: 'مشاهده و مدیریت تمامی تراکنش‌های ثبت شده در سامانه.',
    size: 'default',
    variant: 'default',
    bordered: true,
    titleSlot: <Badge variant="secondary">فعال</Badge>,
    extra: (
      <div className="flex items-center gap-2">
        <Button outline size="sm" iconStart = {<Download/>}>
          <span>خروجی</span>
        </Button>
        <Button size="sm" iconStart = {<Plus />}>
          <span>جدید</span>
        </Button>
      </div>
    ),
  },
};
