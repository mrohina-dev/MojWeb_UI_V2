import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageCard } from './PageCard';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Layers, ArrowLeft, Info, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof PageCard> = {
  title: 'Layout/PageCard',
  component: PageCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'مقیاس کلی کارت (شامل پدینگ و انحنای متناسب)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'secondary', 'primary', 'destructive', 'ghost'],
      description: 'سبک بصری کارت منطبق با توکن‌های طراحی تم',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'نمایش خط حاشیه دور کارت مستقل از پس‌زمینه',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'xl'],
      description: 'اورراید اختصاصی پدینگ داخلی در صورت نیاز به تفکیک از سایز',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'اورراید اختصاصی گردی گوشه‌ها متناسب با مقادیر radius تم',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'افزودن افکت هاور، سایه و کرسر اشاره‌گر برای کارت‌های تعاملی',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main'],
      description: 'تگ معنایی HTML رندر شده در ساختار DOM',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
  args: {
    size: 'default',
    variant: 'default',
    bordered: true,
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
 * ۲. مقایسه تمام واریانت‌های بصری همگام‌شده با توکن‌های تم (Variants Comparison)
 */
export const AllVariants: Story = {
  render: () => {
    const variants = [
      {
        key: 'default',
        title: 'اصلی (Default)',
        desc: 'بوردر نرم، زمینه کارت، سایه ملایم برای کانتینرهای اصلی داده',
      },
      {
        key: 'muted',
        title: 'خنثی (Muted)',
        desc: 'پس‌زمینه مات/تیره مناسب پنل‌های فیلتر و محتوای فرعی',
      },
      {
        key: 'secondary',
        title: 'ثانویه (Secondary)',
        desc: 'تینت نرم از پالت رنگی ثانویه برای ایجاد تمایز بصری',
      },
      {
        key: 'primary',
        title: 'برند / ویژه (Primary)',
        desc: 'تینت رنگ برند سازمانی برای بخش‌های شاخص و برجسته صفحه',
      },
      {
        key: 'destructive',
        title: 'هشدار و حساس (Destructive)',
        desc: 'حاشیه و تینت قرمز برای ناحیه‌های خطر، حذف داده یا خطا',
      },
      {
        key: 'ghost',
        title: 'شفاف (Ghost)',
        desc: 'بدون بوردر و زمینه، مناسب محتوای ادغام‌شده در پس‌زمینه کلی',
      },
    ] as const;

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {variants.map((item) => (
          <PageCard
            key={item.key}
            variant={item.key}
            bordered={item.key !== 'ghost'}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{item.title}</span>
                <code className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  variant="{item.key}"
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </PageCard>
        ))}
      </div>
    );
  },
};

/**
 * ۳. مقایسه مقیاس‌های کلی اندازه و پدینگ (Size / Padding Scales)
 */
export const SizeScales: Story = {
  render: () => {
    const sizes = [
      { key: 'sm', label: 'کوچک (sm / p-4 rounded-lg)' },
      { key: 'default', label: 'استاندارد (default / p-6 rounded-xl)' },
      { key: 'lg', label: 'بزرگ (lg / p-8 rounded-2xl)' },
      { key: 'xl', label: 'خیلی بزرگ (xl / p-10 rounded-3xl)' },
    ] as const;

    return (
      <div className="flex flex-col gap-4">
        {sizes.map((s) => (
          <PageCard key={s.key} size={s.key} variant="muted">
            <div className="rounded-md border border-dashed border-primary/40 bg-primary/5 p-3 text-center text-xs font-medium text-primary">
              مقیاس و اندازه کارت: <strong>{s.label}</strong>
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
            <p className="text-xs text-muted-foreground mt-0.5">
              با هاور روی کارت، سایه عمیق‌تر و کادر برجسته می‌شود
            </p>
          </div>
          <ArrowLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
        </div>
      </PageCard>

      <PageCard interactive variant="secondary">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">کارت قابل کلیک ۲</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              ترکیب حالت تعاملی با واریانت ثانویه
            </p>
          </div>
          <ArrowLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
        </div>
      </PageCard>
    </div>
  ),
};

/**
 * ۵. نمونه کارت بحرانی و منطقه خطر (Destructive Zone)
 */
export const DangerZone: Story = {
  render: () => (
    <PageCard variant="destructive" size="default">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-destructive">حذف دائمی ماژول</h4>
            <p className="text-xs text-muted-foreground mt-1">
              این عملیات برگشت‌پذیر نبوده و داده‌های ثبت‌شده در این بخش به‌طور کامل پاک خواهند شد.
            </p>
          </div>
        </div>
        <Button variant="destructive" size="sm" className="shrink-0">
          حذف نهایی
        </Button>
      </div>
    </PageCard>
  ),
};

/**
 * ۶. نمونه کاربرد واقعی با تگ معنایی section
 */
export const RealWorldSection: Story = {
  args: {
    as: 'section',
    variant: 'default',
    size: 'default',
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
            <span className="font-medium text-emerald-600 dark:text-emerald-400">فعال</span>
          </div>
        </div>
      </div>
    ),
  },
};
