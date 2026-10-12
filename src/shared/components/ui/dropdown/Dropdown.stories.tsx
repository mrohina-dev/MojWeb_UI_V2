import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";
import Button from "@/shared/components/ui/button";

const meta: Meta<typeof Dropdown> = {
  title: "Components/UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "warning",
        "success",
        "ghost",
        "link",
      ],
      description: "وریانت ظاهری دکمه تریگر",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "اندازه مشترک تریگر و پنل منو",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "تراز باز شدن منو نسبت به تریگر",
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "جهت باز شدن منو",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال بودن دراپ‌داون",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/**
 * ۱. حالت پیش‌فرض (استفاده ساده بدون هیچ کلاس دستی)
 */
export const Default: Story = {
  args: {
    trigger: "منوی کاربری",
    variant: "secondary",
    size: "default",
    children: (
      <>
        <button className="w-full text-right px-2.5 py-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
          پروفایل کاربری
        </button>
        <button className="w-full text-right px-2.5 py-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
          تنظیمات سیستم
        </button>
        <div className="h-px bg-border my-1" />
        <button className="w-full text-right px-2.5 py-1.5 text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
          خروج از حساب
        </button>
      </>
    ),
  },
};

/**
 * ۲. بررسی اندازه‌های مختلف (کنترل همزمان تریگر و محتوا با سایز)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Dropdown trigger="کوچک (sm)" size="sm" variant="secondary">
        <button className="w-full text-right px-2 py-1 rounded hover:bg-accent">
          آیتم اول
        </button>
        <button className="w-full text-right px-2 py-1 rounded hover:bg-accent">
          آیتم دوم
        </button>
      </Dropdown>

      <Dropdown trigger="پیش‌فرض (default)" size="default" variant="secondary">
        <button className="w-full text-right px-2.5 py-1.5 rounded-lg hover:bg-accent">
          آیتم اول
        </button>
        <button className="w-full text-right px-2.5 py-1.5 rounded-lg hover:bg-accent">
          آیتم دوم
        </button>
      </Dropdown>

      <Dropdown trigger="بزرگ (lg)" size="lg" variant="secondary">
        <button className="w-full text-right px-3 py-2 rounded-lg hover:bg-accent">
          آیتم اول
        </button>
        <button className="w-full text-right px-3 py-2 rounded-lg hover:bg-accent">
          آیتم دوم
        </button>
      </Dropdown>
    </div>
  ),
};

/**
 * ۳. انواع وریانت‌های تریگر
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown trigger="اصلی (Primary)" variant="primary">
        <div className="px-2 py-1.5">محتوای منوی Primary</div>
      </Dropdown>

      <Dropdown trigger="خنثی (Secondary)" variant="secondary">
        <div className="px-2 py-1.5">محتوای منوی Secondary</div>
      </Dropdown>

      <Dropdown trigger="شبحی (Ghost)" variant="ghost">
        <div className="px-2 py-1.5">محتوای منوی Ghost</div>
      </Dropdown>

      <Dropdown trigger="هشدار (Destructive)" variant="destructive">
        <div className="px-2 py-1.5">محتوای منوی Destructive</div>
      </Dropdown>
    </div>
  ),
};

/**
 * ۴. جهت‌ها و ترازهای مختلف باز شدن (Align & Side)
 */
export const AlignAndSides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown trigger="راست‌چین (Start)" align="start" side="bottom">
        <div className="p-2 text-right">باز شدن تراز راست (Start)</div>
      </Dropdown>

      <Dropdown trigger="وسط‌چین (Center)" align="center" side="bottom">
        <div className="p-2 text-center">باز شدن وسط (Center)</div>
      </Dropdown>

      <Dropdown trigger="چپ‌چین (End)" align="end" side="bottom">
        <div className="p-2 text-left">باز شدن تراز چپ (End)</div>
      </Dropdown>

      <Dropdown trigger="به سمت بالا (Top)" align="center" side="top">
        <div className="p-2 text-center">باز شدن به بالا (Top)</div>
      </Dropdown>
    </div>
  ),
};

/**
 * ۵. فرم و محتوای سفارشی (با امکان بازنویسی عرض در صورت نیاز)
 */
export const CustomContent: Story = {
  render: () => (
    <Dropdown
      trigger="فیلتر وضعیت"
      variant="secondary"
      contentClassName="w-64 p-3"
    >
      <div className="font-medium border-b border-border pb-2 mb-2">
        انتخاب وضعیت
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" defaultChecked />
          <span>فعال</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" />
          <span>در حال پردازش</span>
        </label>
      </div>
      <div className="pt-2 mt-2 border-t border-border">
        <Button size="sm" variant="primary" className="w-full">
          ثبت
        </Button>
      </div>
    </Dropdown>
  ),
};

/**
 * ۶. استفاده پیشرفته به صورت Compound Component با تریگر سفارشی
 */
export const CompoundUsage: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent transition-colors text-sm">
          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
            NF
          </span>
          <span>پروفایل NovaFlow</span>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content size="default" align="start">
        <div className="px-2 py-1 text-xs text-muted-foreground border-b border-border mb-1">
          admin@novaflow.local
        </div>
        <button className="w-full text-right px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
          داشبورد
        </button>
        <button className="w-full text-right px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
          تنظیمات
        </button>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
