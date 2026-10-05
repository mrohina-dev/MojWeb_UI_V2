import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  CreditCard,
  Package,
  Boxes,
  FileSpreadsheet,
  Settings,
  FolderLock,
  Layers,
  FileCheck2,
  Users,
} from 'lucide-react';
import { SidebarProvider } from './SidebarProvider';
import { Sidebar } from './Sidebar';
import Header from '../Header';
import type { SidebarNavGroup } from './Sidebar.types';
import { cn } from '@/lib/utils';

// ماژول مالی و اعتبارات
const financeNavGroups: SidebarNavGroup[] = [
  {
    id: 'overview',
    title: 'داشبورد و گزارش‌ها',
    items: [
      {
        id: 'fin-dash',
        title: 'داشبورد مالی',
        icon: <LayoutDashboard className="size-4" />,
        path: '/finance/dashboard',
      },
      {
        id: 'fin-tx',
        title: 'تراکنش‌های روزانه',
        icon: <ReceiptText className="size-4" />,
        path: '/finance/transactions',
        badge: '۱۲ جدید',
        badgeVariant: 'warning',
      },
    ],
  },
  {
    id: 'management',
    title: 'مدیریت و حسابداری',
    items: [
      {
        id: 'fin-accounts',
        title: 'حساب‌ها و فاکتورها',
        icon: <Wallet className="size-4" />,
        children: [
          {
            id: 'fin-acc-in',
            title: 'اسناد دریافتنی',
            path: '/finance/accounts/inbound',
            icon: <FileCheck2 className="size-4" />,
          },
          {
            id: 'fin-acc-out',
            title: 'اسناد پرداختنی',
            path: '/finance/accounts/outbound',
            badge: '۵',
            badgeVariant: 'destructive',
          },
        ],
      },
      {
        id: 'fin-cards',
        title: 'کارت‌های متصل',
        icon: <CreditCard className="size-4" />,
        path: '/finance/cards',
      },
    ],
  },
];

// ماژول انبارداری
const inventoryNavGroups: SidebarNavGroup[] = [
  {
    id: 'inv-main',
    title: 'انبارداری و کالا',
    items: [
      {
        id: 'inv-dash',
        title: 'وضعیت موجودی',
        icon: <Boxes className="size-4" />,
        path: '/inventory/dashboard',
      },
      {
        id: 'inv-products',
        title: 'کالاها و خدمات',
        icon: <Package className="size-4" />,
        children: [
          {
            id: 'inv-prod-list',
            title: 'لیست اقلام انبار',
            path: '/inventory/products/list',
          },
          {
            id: 'inv-prod-sheets',
            title: 'حواله‌های خروج',
            icon: <FileSpreadsheet className="size-4" />,
            path: '/inventory/products/orders',
          },
        ],
      },
    ],
  },
];

// ماژول مدیریت دسترسی و امنیت
const securityNavGroups: SidebarNavGroup[] = [
  {
    id: 'sec-main',
    title: 'مرکز امنیت و دسترسی',
    items: [
      {
        id: 'sec-roles',
        title: 'نقش‌ها و دسترسی‌ها',
        icon: <FolderLock className="size-4" />,
        path: '/security/roles',
      },
      {
        id: 'sec-users',
        title: 'کاربران سامانه',
        icon: <Users className="size-4" />,
        path: '/security/users',
        badge: 'آنلاین',
        badgeVariant: 'success',
      },
    ],
  },
];

/**
 * ### کامپوننت ناوبری سایدبار (Sidebar)
 *
 * کامپوننت سایدبار سامانه موج بانک صادرات ایران با قابلیت‌های زیر توسعه داده شده است:
 * - **پشتیبانی کامل از RTL:** چینش بهینه آیکون در سمت راست عنوان و نشانگرها در سمت چپ.
 * - **حالت‌های نمایشی (Expanded & Collapsed):** در حالت باز از آکاردئون (`Collapsible`) و در حالت مینی از منوی پاپ‌آپ چندسطحی (`DropdownMenu`) استفاده می‌شود.
 * - **کنترل انعطاف‌پذیر رفتار Collapse:** امکان مخفی‌سازی کامل سایدبار (`collapseMode="hidden"`) به جای مینی‌آیکون.
 * - **امکان پنهان‌سازی تاگل داخلی:** از طریق `showToggle={false}` برای کاربردهایی که تاگل فقط در Header است.
 * - **ریسپانسیو خودکار:** در نمایشگرهای موبایل به صورت منوی کشویی راست‌چین باز می‌شود.
 * - **کلید میانبر کیبورد:** باز و بسته شدن سریع با کلید میانبر `Ctrl + B`.
 */
const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'سایدبار ماژولار و چندسطحی سامانه با هماهنگی کامل با توکن‌های دیزاین سیستم و کتابخانه Base UI.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary'],
      description: 'تم رنگی سایدبار (هماهنگ با Header)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    collapseMode: {
      control: 'radio',
      options: ['mini', 'hidden'],
      description: 'رفتار سایدبار در زمان بسته‌شدن (مینی‌آیکون یا محوشدن کامل)',
      table: {
        defaultValue: { summary: 'mini' },
      },
    },
    showToggle: {
      control: 'boolean',
      description: 'نمایش یا عدم نمایش دکمه تاگل در هدر سایدبار',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    headerTitle: {
      control: 'text',
      description: 'عنوان ماژول در بالای سایدبار',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/**
 * ۱) استوری پایه سایدبار با تم پیش‌فرض (`default`) به همراه ماژول مالی و Header بدون تاگل اختصاصی
 */
export const Default: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/finance/accounts/inbound');

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              headerTitle="ماژول مالی و اعتبارات"
              headerIcon={<Wallet className="size-4 text-primary" />}
              groups={financeNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
              footer={
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Settings className="size-4" />
                  <span>تنظیمات و پیکربندی ماژول</span>
                </div>
              }
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">صفحه جاری: {currentPath}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  برای باز/بسته کردن سایدبار می‌توانید از دکمه داخل هدر سایدبار
                  یا کلید میانبر Ctrl+B استفاده کنید.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۲) کنترل کامل سایدبار از داخل هدر اصلی (با فعال بودن showSidebarToggle)
 */
export const WithHeaderToggle: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/finance/dashboard');

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              headerTitle="ماژول مالی و اعتبارات"
              headerIcon={<Wallet className="size-4 text-primary" />}
              groups={financeNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">کنترل سایدبار از طریق دکمه موجود در Header</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  در این حالت دکمه منو در هدر فعال است و با کلیک بر روی آن وضعیت سایدبار تغییر می‌کند.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۳) سایدبار بدون دکمه تاگل داخلی (`showToggle={false}`)
 * مخصوص زمانی که می‌خواهیم تاگل تنها از طریق Header یا کلید میانبر صورت گیرد.
 */
export const WithoutSidebarToggle: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/finance/dashboard');

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              showToggle={false}
              headerTitle="ماژول مالی (بدون تاگل داخلی)"
              headerIcon={<Wallet className="size-4 text-primary" />}
              groups={financeNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">سایدبار فاقد دکمه باز/بسته در خود کامپوننت</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  در این حالت دکمه تاگل از بالای سایدبار حذف شده و کاربر تنها از طریق دکمه موجود در Header یا فشردن <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-xs">Ctrl+B</kbd> می‌تواند وضعیت سایدبار را تغییر دهد.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۴) مخفی‌شدن کامل در زمان بسته شدن (`collapseMode="hidden"`)
 * در این حالت دیگر ستون باریک آیکونی باقی نمی‌ماند و سایدبار کلاً محو می‌شود.
 */
export const FullyHiddenOnCollapse: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/finance/dashboard');

    return (
      <SidebarProvider collapseMode="hidden">
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              showToggle={false}
              headerTitle="حالت محوشدن کامل سایدبار"
              headerIcon={<Wallet className="size-4 text-primary" />}
              groups={financeNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">حالت مخفی‌سازی کامل (CollapseMode = Hidden)</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  با کلیک روی دکمه منوی Header، سایدبار به صورت کامل بسته و مخفی می‌شود (عرض صفر) و تمام پهنای مانیتور به صفحه اصلی اختصاص می‌یابد.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۵) نمای ریسپانسیو موبایل (همراه با شبیه‌سازی عرض موبایل و منوی کشویی Sheet)
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const [currentPath, setCurrentPath] = useState('/finance/dashboard');

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              headerTitle="ماژول مالی و اعتبارات"
              headerIcon={<Wallet className="size-4 text-primary" />}
              groups={financeNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-4 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
                <h2 className="text-base font-bold">نمای تلفن همراه (Mobile View)</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  در حالت موبایل، سایدبار مخفی است. با کلیک بر روی آیکون منوی ۳ خط (همبرگری) در هدر، سایدبار به شکل منوی کشویی راست‌چین (Drawer / Sheet) باز خواهد شد.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۶) استوری سایدبار با تم یکپارچه سرمه‌ای (`primary`) هماهنگ با هدر رنگی
 */
export const PrimaryTheme: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/inventory/products/list');

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header variant="primary" showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              variant="primary"
              headerTitle="ماژول انبارداری"
              headerIcon={<Boxes className="size-4 text-white" />}
              groups={inventoryNavGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
              footer={
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Layers className="size-4" />
                  <span>نسخه انبار: ۲.۴.۰</span>
                </div>
              }
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">ماژول انبارداری با تم Primary</h2>
                <p className="mt-2 text-sm text-muted-foreground">مسیر فعال: {currentPath}</p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۷) تغییر داینامیک ماژول‌ها در سایدبار (Multi-Module Switcher)
 */
export const MultiModuleExample: Story = {
  render: () => {
    const [activeModule, setActiveModule] = useState<'finance' | 'inventory' | 'security'>('finance');
    const [currentPath, setCurrentPath] = useState('/finance/dashboard');

    const moduleConfigs = {
      finance: {
        title: 'ماژول مالی',
        icon: <Wallet className="size-4 text-primary" />,
        groups: financeNavGroups,
      },
      inventory: {
        title: 'ماژول انبار و کالا',
        icon: <Boxes className="size-4 text-primary" />,
        groups: inventoryNavGroups,
      },
      security: {
        title: 'امنیت و دسترسی',
        icon: <FolderLock className="size-4 text-primary" />,
        groups: securityNavGroups,
      },
    };

    const currentConfig = moduleConfigs[activeModule];

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              headerTitle={currentConfig.title}
              headerIcon={currentConfig.icon}
              groups={currentConfig.groups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-base font-bold mb-3">انتخاب ماژول سامانه:</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('finance');
                      setCurrentPath('/finance/dashboard');
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                      activeModule === 'finance'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    )}
                  >
                    ماژول مالی
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('inventory');
                      setCurrentPath('/inventory/dashboard');
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                      activeModule === 'inventory'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    )}
                  >
                    ماژول انبار
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('security');
                      setCurrentPath('/security/roles');
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                      activeModule === 'security'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    )}
                  >
                    ماژول امنیت
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-sm font-bold">مسیر فعال جاری:</h3>
                <code className="text-xs text-primary font-mono mt-1 block">{currentPath}</code>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * ۸) ساختار تودرتو و سلسله‌مراتبی منو (Nested Navigation)
 */
export const NestedNavigation: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/org/units/tehran/tech');

    const deeplyNestedGroups: SidebarNavGroup[] = [
      {
        id: 'org-structure',
        title: 'ساختار و سلسله‌مراتب',
        items: [
          {
            id: 'org-tree',
            title: 'مدیریت شعب و واحدها',
            icon: <Layers className="size-4" />,
            children: [
              {
                id: 'org-central',
                title: 'ستاد مرکزی',
                path: '/org/units/central',
              },
              {
                id: 'org-tehran',
                title: 'اداره امور شعب تهران',
                children: [
                  {
                    id: 'org-tehran-tech',
                    title: 'فناوری اطلاعات و تحول دیجیتال',
                    path: '/org/units/tehran/tech',
                    badge: 'اصلی',
                    badgeVariant: 'primary',
                  },
                  {
                    id: 'org-tehran-hr',
                    title: 'منابع انسانی و آموزش',
                    path: '/org/units/tehran/hr',
                  },
                ],
              },
              {
                id: 'org-provinces',
                title: 'ادارات امور شعب استان‌ها',
                path: '/org/units/provinces',
              },
            ],
          },
        ],
      },
    ];

    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-background font-sans">
          <Header showSidebarToggle={true} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              headerTitle="تشکیلات و ساختار سازمانی"
              headerIcon={<Layers className="size-4 text-primary" />}
              groups={deeplyNestedGroups}
              currentPath={currentPath}
              onNavigate={(item) => item.path && setCurrentPath(item.path)}
            />
            <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-lg font-bold">تست ساختار درختی عمیق</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  مسیر فعال انتخابی: <code className="text-primary font-mono">{currentPath}</code>
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};
