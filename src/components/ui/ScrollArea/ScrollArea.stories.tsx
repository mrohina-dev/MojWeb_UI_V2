import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';

const meta = {
  title: 'Components/UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal', 'both'],
      description: 'جهت هدایت اسکرول',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'ضخامت و مقیاس اسکرول‌بار بر اساس سیستم سایزبندی',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'success', 'warning'],
      description: 'رنگ‌آمیزی اسکرول‌بار منطبق بر توکن‌های تم',
    },
    hoverOnly: {
      control: 'boolean',
      description: 'نمایش اسکرول‌بار تنها در زمان قرارگیری ماوس (Hover)',
    },
    maxHeight: {
      control: 'text',
      description: 'حداکثر ارتفاع (مثلاً 240px)',
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. حالت پیش‌فرض عمودی
export const Default: Story = {
  args: {
    orientation: 'vertical',
    size: 'default',
    variant: 'default',
    maxHeight: '220px',
  },
  render: (args) => (
    <ScrollArea {...args} className="w-72 rounded-lg border border-border p-4 bg-card">
      <div className="flex flex-col gap-3 font-sans text-sm">
        <h4 className="font-semibold text-foreground">فهرست اطلاعیه‌ها</h4>
        {Array.from({ length: 14 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md border border-border/50 p-2.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
          >
            اطلاعیه شماره {index + 1}: بروزرسانی سامانه با موفقیت انجام شد.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// ۲. شبیه‌سازی منوی طولانی در سایدبار (Sidebar Case Study)
export const InSidebarMenu: Story = {
  render: () => (
    <div className="w-64 rounded-xl border border-sidebar-border bg-sidebar p-3 text-sidebar-foreground font-sans">
      <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">منوی سایدبار</div>
      <ScrollArea orientation="vertical" size="sm" hoverOnly maxHeight="260px" className="pe-1">
        <div className="flex flex-col gap-1">
          {Array.from({ length: 20 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <span>آیتم ناوبری {index + 1}</span>
              <span className="text-[10px] text-muted-foreground">ماژول</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

// ۳. اسکرول افقی و دوطرفه برای جداول داده‌ای (Data Table Case Study)
export const HorizontalDataTable: Story = {
  render: () => (
    <div className="w-120 rounded-xl border border-border bg-card p-4 font-sans shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">گزارش مالی کاربران</h4>
        <span className="text-[11px] text-muted-foreground">اسکرول افقی و عمودی</span>
      </div>

      {/* کانتینر با ارتفاع مشخص و عرض ۱۰۰٪ والد */}
      <div className="rounded-lg border border-border/60 overflow-hidden">
        <ScrollArea orientation="both" size="default" maxHeight="220px" className="w-full">
          <table className="min-w-200 w-full border-collapse text-right text-xs">
            <thead className="sticky top-0 z-10 bg-muted/90 backdrop-blur-xs">
              <tr className="border-b border-border text-muted-foreground">
                <th className="p-3 font-semibold whitespace-nowrap">شناسه</th>
                <th className="p-3 font-semibold whitespace-nowrap">نام و نام خانوادگی</th>
                <th className="p-3 font-semibold whitespace-nowrap">شماره شبا</th>
                <th className="p-3 font-semibold whitespace-nowrap">مبلغ تراکنش</th>
                <th className="p-3 font-semibold whitespace-nowrap">وضعیت</th>
                <th className="p-3 font-semibold whitespace-nowrap">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {Array.from({ length: 12 }).map((_, index) => (
                <tr key={index} className="hover:bg-muted/40 transition-colors">
                  <td className="p-3 font-mono text-muted-foreground whitespace-nowrap">10{index + 24}</td>
                  <td className="p-3 font-medium text-foreground whitespace-nowrap">کاربر سیستم شماره {index + 1}</td>
                  <td className="p-3 font-mono text-muted-foreground whitespace-nowrap">IR820560000000123456789012</td>
                  <td className="p-3 font-semibold text-foreground whitespace-nowrap">{(index + 1) * 250_000} ریال</td>
                  <td className="p-3 text-success-600 font-medium whitespace-nowrap">موفق</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">۱۴۰۳/۰۷/{10 + index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  ),
};


// ۴. مقایسه تمام اندازه‌ها (Sizes)
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 font-sans">
      {(['sm', 'default', 'lg', 'xl'] as const).map((s) => (
        <div key={s} className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground font-medium">سایز: {s}</span>
          <ScrollArea size={s} maxHeight="130px" className="w-44 rounded-md border border-border p-2 bg-card">
            <div className="flex flex-col gap-2 text-xs">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-1 rounded bg-muted/40">ردیف آزمایشی {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  ),
};

// ۵. تمام واریانت‌های رنگی تم
export const AllColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans">
      {(['default', 'primary', 'secondary', 'destructive', 'success', 'warning'] as const).map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">{v}</span>
          <ScrollArea variant={v} maxHeight="120px" className="w-48 rounded-md border border-border p-2.5 bg-card">
            <div className="flex flex-col gap-2 text-xs">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="text-muted-foreground">خط تست شماره {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  ),
};
