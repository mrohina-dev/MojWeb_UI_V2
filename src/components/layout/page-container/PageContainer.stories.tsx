import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Download, RefreshCw, Filter, Home, Layers } from 'lucide-react';
import PageContainer from './PageContainer';

const meta: Meta<typeof PageContainer> = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['default', 'full', 'sm', 'md', 'lg'],
      description: 'حداکثر عرض مجاز کانتینر صفحه',
    },
    contentVariant: {
      control: 'select',
      options: ['card', 'cardMuted', 'cardFlat', 'plain'],
      description: 'قالب و نحوه نمایش پس‌زمینه کانتینر محتوا',
    },
    titleSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'اندازه عنوان صفحه',
    },
    titleVariant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'destructive', 'gradient'],
      description: 'رنگ و استایل عنوان صفحه',
    },
    breadcrumbsSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'اندازه Breadcrumbs تعبیه‌شده',
    },
    breadcrumbsVariant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'ghost', 'lightPrimary'],
      description: 'تم رنگی لینک‌های Breadcrumbs',
    },
    breadcrumbsSeparatorVariant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted', 'lightPrimary'],
      description: 'تم رنگی آیکون جداکننده Breadcrumbs',
    },
    breadcrumbsMaxItemsBeforeCollapse: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'آستانه فشرده‌سازی مسیرهای طولانی Breadcrumbs',
    },
    title: {
      control: 'text',
      description: 'عنوان اصلی سربرگ صفحه',
    },
    description: {
      control: 'text',
      description: 'متن توضیحات تکمیلی زیر عنوان',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

/**
 * ۱. حالت پایه:
 * کانتینر کارت استاندارد (bg-card border-border/60 shadow-xs)
 */
export const Default: Story = {
  args: {
    title: 'عنوان صفحه پیش‌فرض',
    description: 'توضیحات تکمیلی ماژول: سامانه مدیریت اطلاعات و گزارش‌های یکپارچه',
    maxWidth: 'default',
    contentVariant: 'card',
    children: (
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">بخش محتوای اصلی</h2>
        <p className="text-sm text-muted-foreground">
          این محتوا در کانتینر کارت با حاشیه border-border/60 و پس‌زمینه استاندارد کارت قرار گرفته است.
        </p>
      </div>
    ),
  },
};

/**
 * ۲. حالت کامل همراه با دکمه‌های عملیاتی و مسیر ناوبری داده‌محور (Data-Driven Breadcrumbs):
 * تست تراز افقی هدر، عدم فشرده شدن عنوان و چیدمان دکمه‌ها در سمت چپ (RTL)
 */
export const WithActionsAndBreadcrumbs: Story = {
  args: {
    title: 'فهرست مدیریت رکوردها',
    description: 'شناسه ماژول: record-management | مسیر فعال: /records/list جهت پایش و پیگیری تراکنش‌ها',
    maxWidth: 'default',
    contentVariant: 'card',
    breadcrumbsItems: [
      { label: 'پیشخوان', href: '/', icon: <Home className="size-3.5" /> },
      { label: 'ماژول مدیریت', href: '/management', icon: <Layers className="size-3.5" /> },
      { label: 'لیست رکوردها' },
    ],
    breadcrumbsSeparatorVariant: 'muted',
    actions: (
      <>
        <Button outline size="sm" iconStart={<Filter className="size-4" />}>
          <span>فیلترها</span>
        </Button>
        <Button outline size="sm" iconStart={<Download className="size-4" />}>
          <span>خروجی</span>
        </Button>
        <Button size="sm" iconStart={<Plus className="size-4" />}>
          <span>ثبت رکورد جدید</span>
        </Button>
      </>
    ),
    children: (
      <div className="flex min-h-55 flex-col items-center justify-center rounded-lg border border-dashed border-border/80 p-8 text-center">
        <p className="text-sm font-medium text-foreground">جدول فهرست رکوردها و اطلاعات سامانه</p>
        <p className="mt-1 text-xs text-muted-foreground">
          جهت مشاهده آخرین وضعیت داده‌ها دکمه بازخوانی را انتخاب کنید.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          iconStart={<RefreshCw className="size-3.5" />}
        >
          بازخوانی اطلاعات
        </Button>
      </div>
    ),
  },
};

/**
 * ۳. نمایش مسیر طولانی فشرده‌شده (Breadcrumbs Collapsed):
 * تست فشرده‌سازی خودکار مسیرهای عمیق سازمانی در سربرگ PageContainer
 */
export const CollapsedBreadcrumbs: Story = {
  args: {
    title: 'ویرایش پارامترهای پایگاه داده',
    description: 'تنظیمات عمیق ماژول‌های زیرساختی سیستم',
    maxWidth: 'default',
    contentVariant: 'card',
    breadcrumbsMaxItemsBeforeCollapse: 1,
    breadcrumbsItems: [
      { label: 'پیشخوان', href: '/' },
      { label: 'مدیریت سیستم', href: '/system' },
      { label: 'زیرساخت و سرور', href: '/system/infrastructure' },
      { label: 'پایگاه‌های داده', href: '/system/infrastructure/db' },
      { label: 'ویرایش پارامترها' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-foreground">
          مسیرهای میانی به صورت خودکار با سه نقطه (...) فشرده شده‌اند تا هدر صفحه شلوغ نشود.
        </p>
      </div>
    ),
  },
};

/**
 * ۴. نمایش و مقایسه تمام واریانت‌های کانتینر (Content Variants):
 * نمایش هم‌زمان card، cardMuted، cardFlat و plain
 */
export const ContentVariants: Story = {
  render: () => (
    <div className="space-y-8 bg-background p-4 sm:p-6">
      {/* card */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            1. واریانت پیش‌فرض: card (بوردر ملایم، bg-card و سایه نرم)
          </span>
          <code className="text-xs text-primary font-mono">contentVariant="card"</code>
        </div>
        <PageContainer
          title="کارت استاندارد"
          description="حاشیه border-border/60 همراه با bg-card و سایه shadow-xs"
          contentVariant="card"
          maxWidth="full"
          className="p-0 sm:p-0 lg:p-0"
        >
          <p className="text-sm text-card-foreground">
            این قالب پیش‌فرض صفحات معمولی، جداول داده و فرم‌های اصلی سیستم است.
          </p>
        </PageContainer>
      </section>

      {/* cardMuted */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            2. واریانت ملایم: cardMuted (پس‌زمینه خنثی جهت تمایز با سایر بخش‌ها)
          </span>
          <code className="text-xs text-primary font-mono">contentVariant="cardMuted"</code>
        </div>
        <PageContainer
          title="کارت با پس‌زمینه ملایم"
          description="حاشیه border-border/50 همراه با bg-muted/30 جهت صفحات فرعی یا تنظیمات"
          contentVariant="cardMuted"
          maxWidth="full"
          className="p-0 sm:p-0 lg:p-0"
        >
          <p className="text-sm text-foreground">
            مناسب بخش‌های تنظیمات، پیش‌نمایش مدارک یا فرم‌های فرعی.
          </p>
        </PageContainer>
      </section>

      {/* cardFlat */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            3. واریانت تخت: cardFlat (حاشیه مشخص، بدون سایه)
          </span>
          <code className="text-xs text-primary font-mono">contentVariant="cardFlat"</code>
        </div>
        <PageContainer
          title="کارت تخت بدون سایه"
          description="حاشیه صریح border-border بدون سایه shadow-none"
          contentVariant="cardFlat"
          maxWidth="full"
          className="p-0 sm:p-0 lg:p-0"
        >
          <p className="text-sm text-card-foreground">
            مناسب طراحی‌های مینیمال فلت و کادرهایی که درون صفحات پیچیده یا دیالوگ‌ها قرار می‌گیرند.
          </p>
        </PageContainer>
      </section>

      {/* plain */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            4. واریانت آزاد: plain (بدون کادر، بوردر و پدینگ بیرونی)
          </span>
          <code className="text-xs text-primary font-mono">contentVariant="plain"</code>
        </div>
        <PageContainer
          title="قالب آزاد بدون کادر"
          description="بدون استایل کارت؛ مناسب قرار دادن گریدها یا کامپوننت‌های مستقل"
          contentVariant="plain"
          maxWidth="full"
          className="p-0 sm:p-0 lg:p-0"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-card p-4 shadow-xs">
              <span className="text-xs text-muted-foreground">کارت مستقل اول در گرید</span>
              <p className="mt-1 text-lg font-semibold text-foreground">۴,۵۲۰ آیتم</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-4 shadow-xs">
              <span className="text-xs text-muted-foreground">کارت مستقل دوم در گرید</span>
              <p className="mt-1 text-lg font-semibold text-foreground">۹۹.۴٪ پایداری</p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  ),
};

/**
 * ۵. نمایش و مقایسه تمام اندازه‌ها (MaxWidth Sizes):
 * مقایسه پهنای کانتینر در مقادیر sm، md، lg، default و full
 */
export const MaxWidthSizes: Story = {
  render: () => (
    <div className="space-y-10 bg-muted/20 py-6">
      {/* sm: max-w-3xl */}
      <section className="space-y-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold">سایز کوچک (sm): max-w-3xl (~768px)</span>
          <code className="font-mono text-primary">maxWidth="sm"</code>
        </div>
        <PageContainer
          title="فرم یا کادر فشرده"
          description="مناسب برای صفحات لاگین، فرم‌های تک‌ستونه و مراحل ویزارد"
          maxWidth="sm"
          contentVariant="card"
        >
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border/80 text-xs text-muted-foreground">
            محتوا در حداکثر عرض 768 پیکسل محدود شده است.
          </div>
        </PageContainer>
      </section>

      {/* md: max-w-5xl */}
      <section className="space-y-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold">سایز متوسط (md): max-w-5xl (~1024px)</span>
          <code className="font-mono text-primary">maxWidth="md"</code>
        </div>
        <PageContainer
          title="صفحه تنظیمات متوسط"
          description="مناسب صفحات پروفایل کاربری، تنظیمات و گزارش‌های خلوت"
          maxWidth="md"
          contentVariant="card"
        >
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border/80 text-xs text-muted-foreground">
            محتوا در حداکثر عرض 1024 پیکسل محدود شده است.
          </div>
        </PageContainer>
      </section>

      {/* lg: max-w-6xl */}
      <section className="space-y-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold">سایز بزرگ (lg): max-w-6xl (~1152px)</span>
          <code className="font-mono text-primary">maxWidth="lg"</code>
        </div>
        <PageContainer
          title="صفحه فرم چند ستونه"
          description="مناسب برای جداول با ستون‌های استاندارد و فرم‌های دو یا سه‌ستونه"
          maxWidth="lg"
          contentVariant="card"
        >
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border/80 text-xs text-muted-foreground">
            محتوا در حداکثر عرض 1152 پیکسل محدود شده است.
          </div>
        </PageContainer>
      </section>

      {/* default: max-w-7xl */}
      <section className="space-y-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold">سایز استاندارد سیستم (default): max-w-7xl (~1280px)</span>
          <code className="font-mono text-primary">maxWidth="default"</code>
        </div>
        <PageContainer
          title="اندازه پیش‌فرض ماژول‌ها"
          description="استاندارد اصلی برای اکثر صفحات، داشبوردها و فهرست رکوردها"
          maxWidth="default"
          contentVariant="card"
        >
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border/80 text-xs text-muted-foreground">
            محتوا در حداکثر عرض پیش‌فرض سیستم (1280 پیکسل) تراز می‌شود.
          </div>
        </PageContainer>
      </section>

      {/* full: max-w-full */}
      <section className="space-y-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold">تمام‌عرض (full): max-w-full (۱۰۰٪ بدون محدودیت پهنا)</span>
          <code className="font-mono text-primary">maxWidth="full"</code>
        </div>
        <PageContainer
          title="جداول گسترده و گزارش‌های جامع"
          description="گسترش به تمام عرض نمایشگر همراه با حفظ پدینگ امن حاشیه‌ها"
          maxWidth="full"
          contentVariant="card"
        >
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border/80 text-xs text-muted-foreground">
            محتوا بدون محدودیت عرضی و به میزان ۱۰۰٪ پهنای نمایشگر گسترش می‌یابد.
          </div>
        </PageContainer>
      </section>
    </div>
  ),
};

/**
 * ۶. حالت داشبورد با گرید چند کارته (Plain Layout):
 */
export const MultiCardDashboard: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-xs">
          <span className="text-xs text-muted-foreground">مجموع کل درخواست‌ها</span>
          <p className="mt-2 text-2xl font-bold text-foreground">۱,۲۴۸</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-xs">
          <span className="text-xs text-muted-foreground">عملیات موفق</span>
          <p className="mt-2 text-2xl font-bold text-success">۱,۲۳۰</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-xs">
          <span className="text-xs text-muted-foreground">خطاهای اعتبارسنجی</span>
          <p className="mt-2 text-2xl font-bold text-destructive">۱۸</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-6 text-card-foreground shadow-xs">
        <h3 className="font-semibold text-foreground">گزارش لحظه‌ای رویدادها</h3>
        <p className="mt-1 text-xs text-muted-foreground">فهرست تراکنش‌ها و رخدادهای پردازش‌شده در سامانه</p>
      </div>
    </PageContainer>
  ),
  args: {
    title: 'داشبورد نظارت عملیاتی',
    description: 'نمای اجمالی از وضعیت کلی و عملکرد شاخص‌های کلیدی سامانه',
    maxWidth: 'default',
    contentVariant: 'plain',
  },
};
