import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, CheckCircle2, Info, Sparkles } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  SimpleTooltip,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const meta = {
  title: 'Components/UI/Tooltip',
  component: SimpleTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'کامپوننت راهنما (Tooltip) مبتنی بر Base UI و CVA، با هماهنگی کامل با توکن‌های طراحی، کامپوننت Button، پشتیبانی از تم‌های NovaFlow و زبان فارسی (RTL).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'محتوای متنی یا المنت داخل تولتیپ',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'جهت باز شدن پاپ‌آپ',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'تراز نسبت به المان اصلی',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'info', 'success', 'destructive'],
      description: 'تم رنگی تولتیپ مطابق با توکن‌های طراحی',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'سایز پدینگ/تایپوگرافی و محدودیت عرض تولتیپ',
      table: {
        type: { summary: "'sm' | 'default' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: 'default' },
      },
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 24, step: 2 },
      description: 'فاصله از المان (px)',
    },
    alignOffset: {
      control: { type: 'number', min: -20, max: 20, step: 2 },
      description: 'جابجایی افقی یا عمودی در امتداد تراز (px)',
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'تاخیر در باز شدن (ms)',
    },
    showArrow: {
      control: 'boolean',
      description: 'نمایش فلش اشاره‌گر',
    },
    disabled: {
      control: 'boolean',
      description: 'غیرفعال‌سازی نمایش تولتیپ',
    },
    open: {
      control: 'boolean',
      description: 'وضعیت کنترل‌شده باز/بسته بودن',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    content: 'متن راهنما',
    children: (
      <Button variant="secondary" outline>
        روی من هاور کنید
      </Button>
    ),
    side: 'bottom',
    align: 'center',
    sideOffset: 6,
    alignOffset: 0,
    variant: 'default',
    size: 'default',
    delay: 200,
    showArrow: false,
    disabled: false,
  },
} satisfies Meta<typeof SimpleTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. حالت تعاملی با کنترل‌ها (Interactive)
export const Default: Story = {
  args: {
    content: 'راهنمای دکمه پیش‌فرض',
    children: (
      <Button variant="secondary" outline>
        هاور کنید
      </Button>
    ),
  },
};

// ۲. جهت‌های مختلف (Placements)
export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 p-10">
      <SimpleTooltip content="نمایش در بالا (Top)" side="top" showArrow>
        <Button variant="secondary">بالا (Top)</Button>
      </SimpleTooltip>

      <SimpleTooltip content="نمایش در پایین (Bottom)" side="bottom" showArrow>
        <Button variant="secondary">پایین (Bottom)</Button>
      </SimpleTooltip>

      <SimpleTooltip content="نمایش در راست (Right)" side="right" showArrow>
        <Button variant="secondary">راست (Right)</Button>
      </SimpleTooltip>

      <SimpleTooltip content="نمایش در چپ (Left)" side="left" showArrow>
        <Button variant="secondary">چپ (Left)</Button>
      </SimpleTooltip>
    </div>
  ),
};

// ۳. تمام وریانت‌های استایلی بر اساس توکن‌های سیستم (Variants)
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SimpleTooltip content="استایل پیش‌فرض تم (Default)" variant="default" showArrow>
        <Button variant="secondary" outline>
          پیش‌فرض
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="استایل تیره با کنتراست معکوس (Dark)" variant="dark" showArrow>
        <Button variant="secondary" outline>
          تیره (Dark)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="پیام اطلاعیه سیستم (Info)" variant="info" showArrow>
        <Button variant="secondary" outline iconStart={<Info className="size-4" />}>
          اطلاعاتی (Info)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="عملیات با موفقیت تایید شد (Success)" variant="success" showArrow>
        <Button variant="secondary" outline iconStart={<CheckCircle2 className="size-4" />}>
          موفقیت (Success)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip
        content="هشدار: این عملیات غیرقابل بازگشت است (Destructive)"
        variant="destructive"
        showArrow
      >
        <Button variant="destructive" outline iconStart={<AlertTriangle className="size-4" />}>
          خطا (Destructive)
        </Button>
      </SimpleTooltip>
    </div>
  ),
};

// ۴. سایزهای مختلف (Sizes)
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SimpleTooltip content="اندازه کوچک (Small)" size="sm">
        <Button size="sm" variant="ghost">
          کوچک (sm)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="اندازه استاندارد سیستم (Default)" size="default">
        <Button variant="secondary" outline>
          استاندارد (default)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="اندازه بزرگ برای متون توضیحی (Large)" size="lg">
        <Button size="lg" variant="secondary">
          بزرگ (lg)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="اندازه خیلی بزرگ (XL)" size="xl" showArrow>
        <Button size="lg" variant="secondary" outline>
          خیلی بزرگ (xl)
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="تمام‌عرض (Full)" size="full" showArrow>
        <Button className="w-64" variant="secondary" outline>
          تمام‌عرض (full)
        </Button>
      </SimpleTooltip>
    </div>
  ),
};

// ۵. استفاده برای سایدبار جمع‌شده (Collapsed / Rail Mode)
export const SidebarCollapsed: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-4">
      <SimpleTooltip content="داشبورد" side="left" sideOffset={10} showArrow>
        <Button variant="secondary" outline iconOnly aria-label="داشبورد">
          <Info className="size-4" />
        </Button>
      </SimpleTooltip>

      <SimpleTooltip content="تأیید عملیات" side="left" sideOffset={10} showArrow variant="success">
        <Button variant="secondary" outline iconOnly aria-label="تأیید عملیات">
          <CheckCircle2 className="size-4" />
        </Button>
      </SimpleTooltip>

      <SimpleTooltip
        content="هشدار سیستم"
        side="left"
        sideOffset={10}
        showArrow
        variant="destructive"
      >
        <Button variant="secondary" outline iconOnly aria-label="هشدار سیستم">
          <AlertTriangle className="size-4" />
        </Button>
      </SimpleTooltip>
    </div>
  ),
};

// ۶. محتوای غنی با فونت فارسی (Rich Content)
export const RichContent: Story = {
  render: () => (
    <SimpleTooltip
      side="top"
      showArrow
      content={
        <div className="space-y-1 py-0.5">
          <div className="flex items-center gap-1.5 font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>ویژگی شخصی سازی متن</span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            با نوشتن کد ReactNode داخل پراپرتی <code className="px-1">content</code> می‌توانید
            محتوای سفارشی نمایش دهید.
          </p>
        </div>
      }
    >
      <Button variant="primary">قابلیت شخصی سازی متن</Button>
    </SimpleTooltip>
  ),
};

// ۷. استفاده با Primitiveهای پایه (Advanced Primitives)
export const AdvancedPrimitives: Story = {
  render: () => (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="secondary" outline iconStart={<Info className="size-4" />}>
              استفاده مستقیم از Primitive
            </Button>
          }
        />
        <TooltipContent
          side="right"
          align="center"
          alignOffset={4}
          variant="info"
          size="default"
          showArrow
        >
          پیاده‌سازی سفارشی با کامپوننت‌های پایه
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
