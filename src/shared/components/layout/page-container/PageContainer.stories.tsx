import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { PageContainer } from './PageContainer';
import { PageCard } from './pageCard';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Plus,
  Download,
  Filter,
  Settings,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';

const meta: Meta<typeof PageContainer> = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-full max-w-5xl mx-auto">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'مقیاس کلی کامپوننت هماهنگ‌شده میان هدر و کارت',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'secondary', 'primary', 'destructive', 'ghost'],
      description: 'تم رنگی و استایل بصری مشترک هدر و کارت',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'فعال‌سازی خطوط حاشیه ساختاری در هدر و کارت',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    withCard: {
      control: 'boolean',
      description: 'آیا محتوای فرزند درون PageCard قرار گیرد؟',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    headerInsideCard: {
      control: 'boolean',
      description: 'آیا هدر درون بدنه کارت رندر شود یا به صورت مجزا بالای آن قرار گیرد؟',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'عنوان صفحه',
    },
    description: {
      control: 'text',
      description: 'زیرعنوان یا توضیحات راهنما',
    },
  },
  args: {
    size: 'default',
    variant: 'default',
    bordered: true,
    withCard: true,
    headerInsideCard: false,
    title: 'مدیریت کاربران و دسترسی‌ها',
    description: 'مشاهده لیست کاربران فعال، ویرایش سطح دسترسی‌ها و ایجاد حساب‌های جدید در سامانه.',
  },
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

/**
 * ۱. زمین بازی و پیش‌فرض با قابلیت تعامل کامل کنترل‌ها
 */
export const Playground: Story = {
  args: {
    titleSlot: <Badge variant="outline">۲۴ کاربر فعال</Badge>,
    extra: (
      <div className="flex items-center gap-2">
        <Button outline size="sm" className="gap-1.5" iconStart={<Download />}>
          <span>خروجی اکسل</span>
        </Button>
        <Button size="sm" className="gap-1.5" iconStart={<Plus />}>
          <span>کاربر جدید</span>
        </Button>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-lg border border-dashed border-border/80 p-4">
          <span className="text-sm text-muted-foreground">محل قرارگیری محتوای صفحه (جدول، فرم یا گرید)</span>
          <Button variant="secondary" size="sm">
            بارگذاری مجدد
          </Button>
        </div>
        <div className="rounded-md bg-muted/40 p-4 text-xs text-muted-foreground leading-relaxed">
          این کانتینر چیدمان به صورت هماهنگ هم‌زمان هدر و کارت را براساس مقادیر دریافتی پیکربندی می‌کند.
        </div>
      </div>
    ),
  },
};

/**
 * ۲. سفارشی‌سازی هدر با headerProps (Override کردن Variant و Size هدر)
 */
export const CustomHeaderProps: Story = {
  args: {
    variant: 'default',
    size: 'default',
    title: 'مرکز اعلان‌های سیستم',
    description: 'کارت دارای ظاهر پیش‌فرض است، اما هدر از طریق headerProps دارای واریانت primary و سایز lg است.',
    headerProps: {
      variant: 'primary',
      size: 'lg',
      bordered: true,
      extra: (
        <Button size="sm" className="gap-1.5" iconStart={<SlidersHorizontal />}>
          <span>پیکربندی اعلان</span>
        </Button>
      ),
    },
    children: (
      <div className="space-y-3 p-2">
        <p className="text-sm text-muted-foreground">
          این نمونه نشان می‌دهد چگونه بدون شکستن ساختار کلی کانتینر، می‌توان صرفاً به هدر واریانت متفاوتی (مانند <code>primary</code>) داد در حالی که کارت تم اصلی خود را حفظ کرده است.
        </p>
        <div className="rounded-md border border-border p-3 text-xs text-muted-foreground">
          وضعیت: <strong>headerProps.variant = &quot;primary&quot;</strong> | <strong>Container.variant = &quot;default&quot;</strong>
        </div>
      </div>
    ),
  },
};

/**
 * ۳. سفارشی‌سازی کارت با cardProps (Override کردن Variant و تگ سمانتیک کارت)
 */
export const CustomCardProps: Story = {
  args: {
    title: 'آمار و گزارش‌های مصرفی',
    description: 'هدر تم استاندارد دارد ولی کارت زیرین از طریق cardProps با واریانت muted و به شکل سمانتیک رندر شده است.',
    cardProps: {
      as: 'section',
      variant: 'muted',
      className: 'shadow-inner border-dashed',
    },
    extra: (
      <Button variant="secondary" size="sm" className="gap-1.5" iconStart={<Layers />}>
        <span>مشاهده جزییات</span>
      </Button>
    ),
    children: (
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">بخش رندر شده با تگ سمانتیک &lt;section&gt;</div>
        <p className="text-xs text-muted-foreground">
          استفاده از <code>cardProps</code> اجازه می‌دهد ویژگی‌های اختصاصی کارت مثل <code>as</code>، <code>className</code> و استایل‌های تکمیلی را مستقل از کانتینر تنظیم نمایید.
        </p>
      </div>
    ),
  },
};

/**
 * ۴. هدر درون کارت (Header Inside Card) - ایده‌آل برای فرم‌ها و پنل‌های تنظیمات
 */
export const HeaderInsideCard: Story = {
  args: {
    title: 'تنظیمات اعلانات پیامکی',
    description: 'شماره فرستنده و رویدادهای ارسالی پیامک به مشتریان را تنظیم کنید.',
    headerInsideCard: true,
    withCard: true,
    titleSlot: <Badge variant="secondary">سرویس فعال</Badge>,
    extra: (
      <Button size="sm" className="gap-1.5" iconStart={<Settings />}>
        <span>ذخیره تغییرات</span>
      </Button>
    ),
    children: (
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 p-3">
            <span className="text-xs font-semibold text-foreground">ارسال پیامک خوش‌آمدگویی</span>
            <span className="text-xs text-muted-foreground">بلافاصله پس از ثبت‌نام کاربر ارسال شود</span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 p-3">
            <span className="text-xs font-semibold text-foreground">گزارش ورودهای مشکوک</span>
            <span className="text-xs text-muted-foreground">ارسال کد تایید دو مرحله‌ای هنگام لاگین</span>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * ۵. بدون کارت محتوا (withCard: false) - مناسب داشبورد با گرید چند کارته
 */
export const WithoutCardDashboard: Story = {
  args: {
    title: 'داشبورد فروش و مالی',
    description: 'خلاصه درآمد، تراکنش‌های اخیر و عملکرد شعب در ماه جاری.',
    withCard: false,
    extra: (
      <Button outline size="sm" className="gap-1.5" iconStart={<Filter />}>
        <span>فیلتر بازه زمانی</span>
      </Button>
    ),
    children: (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <PageCard variant="default">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">فروش ناخالص</span>
            <span className="text-2xl font-bold text-foreground">۴۵۰,۰۰۰,۰۰۰ ریال</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">۱۲٪ افزایش نسبت به ماه گذشته</span>
          </div>
        </PageCard>

        <PageCard variant="default">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">تعداد سفارشات</span>
            <span className="text-2xl font-bold text-foreground">۱,۲۸۰ سفارش</span>
            <span className="text-xs text-muted-foreground">میانگین روزانه ۴۲ سفارش</span>
          </div>
        </PageCard>

        <PageCard variant="default">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">تراکنش‌های ناموفق</span>
            <span className="text-2xl font-bold text-destructive">۳ مورد</span>
            <span className="text-xs text-muted-foreground">نرخ موفقیت ۹۹.۸٪</span>
          </div>
        </PageCard>
      </div>
    ),
  },
};

/**
 * ۶. مقایسه اندازه‌ها (Size Scales Comparison)
 */
export const SizeComparison: Story = {
  render: () => {
    const sizes = ['sm', 'default', 'lg', 'xl'] as const;

    return (
      <div className="flex flex-col gap-8">
        {sizes.map((s) => (
          <PageContainer
            key={s}
            size={s}
            title={`کانتینر اندازه ${s}`}
            description={`فاصله‌گذاری داخلی کارت و اندازه عنوان در مقیاس ${s} کاملاً هماهنگ شده است.`}
            extra={<Button size={s === 'xl' ? 'lg' : s}>عملیات {s}</Button>}
          >
            <div className="rounded border border-dashed border-primary/30 bg-primary/5 p-3 text-center text-xs text-primary">
              محتوای کانتینر در مقیاس <strong>{s}</strong>
            </div>
          </PageContainer>
        ))}
      </div>
    );
  },
};

/**
 * ۷. مقایسه تمام واریانت‌های تم استاندارد (Variants Comparison)
 */
export const VariantsComparison: Story = {
  render: () => {
    const variants = ['default', 'muted', 'secondary', 'primary', 'destructive', 'ghost'] as const;

    return (
      <div className="flex flex-col gap-6">
        {variants.map((v) => (
          <PageContainer
            key={v}
            variant={v}
            bordered={v !== 'ghost'}
            title={`کانتینر با تم ${v}`}
            description={`رنگ‌بندی، حاشیه‌ها و پس‌زمینه با واریانت ${v} تنظیم شده‌اند.`}
            titleSlot={
              <code className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {v}
              </code>
            }
          >
            <p className="text-xs text-muted-foreground">
              هماهنگی خودکار پالت رنگی بین کارت و هدر بدون نیاز به تعریف جداگانه.
            </p>
          </PageContainer>
        ))}
      </div>
    );
  },
};

/**
 * ۸. حالت بدون هدر (صرفاً بدنه و کانتینر یکپارچه)
 */
export const WithoutHeader: Story = {
  args: {
    header: false,
    children: (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle2 className="size-10 text-emerald-600 dark:text-emerald-400" />
        <h4 className="font-semibold text-foreground">عملیات با موفقیت انجام شد</h4>
        <p className="max-w-md text-xs text-muted-foreground">
          این نمونه نشان‌دهنده استفاده از PageContainer صرفاً به عنوان قاب صفحه بدون هدر پیش‌فرض است.
        </p>
      </div>
    ),
  },
};

/**
 * ۹. بخش حساس و هشدار با واریانت Destructive
 */
export const DestructiveSection: Story = {
  args: {
    variant: 'destructive',
    title: 'حذف اشتراک سازمانی',
    description: 'در صورت لغو، کلیه داده‌های تیم به همراه گزارش‌ها پس از ۳۰ روز حذف خواهد شد.',
    titleSlot: (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="size-3" />
        <span>غیرقابل بازگشت</span>
      </Badge>
    ),
    extra: (
      <Button variant="destructive" size="sm">
        تأیید و لغو اشتراک
      </Button>
    ),
    children: (
      <div className="text-xs text-muted-foreground leading-relaxed">
        توجه داشته باشید که تمامی دسترسی‌های API و توکن‌های فعال برای این سازمان به صورت خودکار باطل خواهند شد.
      </div>
    ),
  },
};
