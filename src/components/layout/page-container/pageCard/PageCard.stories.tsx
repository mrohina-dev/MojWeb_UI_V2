import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageCard } from './PageCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, ArrowLeft, Info } from 'lucide-react';

const meta: Meta<typeof PageCard> = {
  title: 'Layout/PageCard',
  component: PageCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'mute', 'secondary', 'outline', 'ghost', 'plain'],
      description: 'سبک بصری کارت منطبق با توکن‌های طراحی تم',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'xl'],
      description: 'میزان فاصله‌گذاری داخلی کارت',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'میزان گردی گوشه‌ها متناسب با مقادیر radius تم',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'افزودن افکت هاور و سایه در صورت تعاملی بودن کارت',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main'],
      description: 'تگ معنایی HTML رندر شده در خروجی DOM',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
  args: {
    variant: 'default',
    padding: 'default',
    rounded: 'default',
    interactive: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof PageCard>;

/**
 * ۱. حالت پیش‌فرض و Playground تعاملی با تمام کنترل‌ها
 */
export const Playground: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">کارت استاندارد صفحه</h3>
          </div>
          <Badge variant="outline">پیش‌فرض</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          این کامپوننت به عنوان لایه محفظه (Container) منعطف برای بخش‌های مختلف صفحه عمل می‌کند
          و فاصله‌گذاری داخلی، بوردرها و استایل‌های بصری را بر اساس دیزاین سیستم کنترل می‌نماید.
        </p>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button outline size="sm">
            انصراف
          </Button>
          <Button size="sm">تأیید و ادامه</Button>
        </div>
      </div>
    ),
  },
};

/**
 * ۲. مقایسه تمام واریانت‌های بصری (Variants Comparison)
 */
export const AllVariants: Story = {
  render: () => {
    const variants = [
      { key: 'default', title: 'کارت اصلی (Default)', desc: 'بوردر نرم، زمینه روشن/کارت، سایه خفیف' },
      { key: 'mute', title: 'کارت خنثی (Mute)', desc: 'پس‌زمینه مات/تیره مناسب فیلترها و فرم‌های فرعی' },
      { key: 'secondary', title: 'کارت ثانویه (Secondary)', desc: 'تینت ملایم از پالت رنگی ثانویه' },
      { key: 'outline', title: 'کارت خطی (Outline)', desc: 'بوردر واضح بدون سایه، مناسب پنل‌های داده' },
      { key: 'ghost', title: 'کارت شفاف (Ghost)', desc: 'بدون بوردر و زمینه، مناسب محتوای ادغام‌شده' },
      { key: 'plain', title: 'بدون استایل (Plain)', desc: 'تنها نقش نگه‌دارنده layout بدون افکت' },
    ] as const;

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {variants.map((item) => (
          <PageCard key={item.key} variant={item.key}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{item.title}</span>
                <code className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  variant="{item.key}"
                </code>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </PageCard>
        ))}
      </div>
    );
  },
};

/**
 * ۳. مقایسه مقادیر مختلف فاصله‌گذاری داخلی (Padding Comparison)
 */
export const PaddingScales: Story = {
  render: () => {
    const paddings = [
      { key: 'none', label: 'بدون فاصله (none / p-0)' },
      { key: 'sm', label: 'کوچک (sm / p-4)' },
      { key: 'default', label: 'استاندارد (default / p-6)' },
      { key: 'lg', label: 'بزرگ (lg / p-8)' },
      { key: 'xl', label: 'خیلی بزرگ (xl / p-10)' },
    ] as const;

    return (
      <div className="flex flex-col gap-4">
        {paddings.map((pad) => (
          <PageCard key={pad.key} padding={pad.key} variant="outline">
            <div className="rounded-md border border-dashed border-primary/40 bg-primary/5 p-3 text-center text-xs font-medium text-primary">
              محتوای کارت با پدینگ: <strong>{pad.label}</strong>
            </div>
          </PageCard>
        ))}
      </div>
    );
  },
};

/**
 * ۴. حالت تعاملی با افکت هاور (Interactive Card)
 */
export const InteractiveCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <PageCard interactive variant="default">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">کارت قابل کلیک ۱</h4>
            <p className="text-xs text-muted-foreground">با هاور روی کارت، سایه و کادر تغییر می‌کند</p>
          </div>
          <ArrowLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
        </div>
      </PageCard>

      <PageCard interactive variant="secondary">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">کارت قابل کلیک ۲</h4>
            <p className="text-xs text-muted-foreground">ترکیب حالت تعاملی با واریانت ثانویه</p>
          </div>
          <ArrowLeft className="size-5 text-muted-foreground" />
        </div>
      </PageCard>
    </div>
  ),
};

/**
 * ۵. نمونه کاربرد واقعی با تگ معنایی section
 */
export const RealWorldSection: Story = {
  args: {
    as: 'section',
    variant: 'default',
    padding: 'default',
    children: (
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">اطلاعات حساب کاربری</h3>
            <p className="text-xs text-muted-foreground mt-1">مشخصات هویتی و دسترسی‌های ثبت‌شده در سامانه</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Info className="size-3.5" />
            <span>تأیید شده</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="block text-xs text-muted-foreground">نام و نام خانوادگی</span>
            <span className="font-medium text-foreground">سید علی محمدی</span>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="block text-xs text-muted-foreground">نقش کاربری</span>
            <span className="font-medium text-foreground">مدیر ارشد فنی</span>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="block text-xs text-muted-foreground">وضعیت حساب</span>
            <span className="font-medium text-success-600">فعال</span>
          </div>
        </div>
      </div>
    ),
  },
};
