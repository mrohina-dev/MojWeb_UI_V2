import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Filter,
  SlidersHorizontal,
  Settings2,
  Check,
  AlignRight,
  AlignCenter,
  AlignLeft,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../button/button"; // مسیر دکمه خودتان را در صورت نیاز تطبیق دهید
import {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "کامپوننت Popover شناور و کاملاً سازگار با فونت وزیرمتن و چیدمان راست‌به‌چپ (RTL)، ساخته شده با `@base-ui/react` و Tailwind CSS v4. این کامپوننت هم از الگوی ترکیبی (Compound) و هم الگوی سریع (Shorthand) و کودکان تابعی جهت سناریوهای جدول و فرم پشتیبانی می‌کند.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "auto"],
      description: "ابعاد و پدینگ کادر شناور",
      table: { defaultValue: { summary: "default" } },
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "جهت قرارگیری کادر نسبت به محرک",
      table: { defaultValue: { summary: "bottom" } },
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "تراز کادر نسبت به لبه‌های محرک (پیش‌فرض start برای RTL)",
      table: { defaultValue: { summary: "start" } },
    },
    sideOffset: {
      control: "number",
      description: "فاصله کادر تا دکمه به پیکسل",
      table: { defaultValue: { summary: "8" } },
    },
    showClose: {
      control: "boolean",
      description: "نمایش دکمه ضربدر بستن در گوشه کادر",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/* ۱. استوری پیش‌فرض با قابلیت دستکاری در Controls */
export const Default: Story = {
  args: {
    trigger: <Button variant="primary">باز کردن پنجره</Button>,
    title: "تنظیمات پیش‌فرض",
    description: "تغییرات مورد نظر را از کنترل‌های استوری‌بوک اعمال کنید.",
    children: (
      <div className="mt-3 text-sm text-muted-foreground">
        محتوای درون پاپ‌اور با فونت وزیرمتن و پشتیبانی از تم تاریک/روشن.
      </div>
    ),
    size: "default",
    side: "bottom",
    align: "start",
    showClose: true,
  },
  render: (args) => (
    <div className="flex items-center justify-center p-8">
      <Popover {...args} />
    </div>
  ),
};

/* ۲. استوری ترازها (Alignments: start / center / end) */
export const Alignments: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8">
      <Popover
        align="start"
        side="bottom"
        title="تراز راست / شروع (start)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<AlignRight />}
          >
            شروع (start - راست در RTL)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">
          کادر پاپ‌اور از سمت راست دکمه (شروع محتوا در RTL) تراز می‌شود.
        </p>
      </Popover>

      <Popover
        align="center"
        side="bottom"
        title="تراز وسط (center)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<AlignCenter />}
          >
            وسط (center)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">
          کادر پاپ‌اور دقیقاً در مرکز افقی دکمه محرک تراز می‌شود.
        </p>
      </Popover>

      <Popover
        align="end"
        side="bottom"
        title="تراز چپ / پایان (end)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<AlignLeft />}
          >
            پایان (end - چپ در RTL)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">
          کادر پاپ‌اور از سمت چپ دکمه (انتهای محتوا در RTL) تراز می‌شود.
        </p>
      </Popover>
    </div>
  ),
};

/* ۳. استوری جهت‌ها (Directions: top / bottom / right / left) */
export const Directions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Popover
        side="top"
        title="جهت بالا (top)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<ArrowUp />}
          >
            بالا (Top)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">پاپ‌اور در بالای دکمه باز می‌شود.</p>
      </Popover>

      <Popover
        side="bottom"
        title="جهت پایین (bottom)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<ArrowDown />}
          >
            پایین (Bottom)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">پاپ‌اور در پایین دکمه باز می‌شود.</p>
      </Popover>

      <Popover
        side="right"
        title="جهت راست (right)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<ArrowRight />}
          >
            راست (Right)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">پاپ‌اور در سمت راست دکمه باز می‌شود.</p>
      </Popover>

      <Popover
        side="left"
        title="جهت چپ (left)"
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<ArrowLeft />}
          >
            چپ (Left)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">پاپ‌اور در سمت چپ دکمه باز می‌شود.</p>
      </Popover>
    </div>
  ),
};

/* ۴. سناریوی فیلتر ستون جدول با بستن خودکار ({ close }) */
export const TableColumnFilter: Story = {
  render: () => (
    <div className="flex min-h-65 items-center justify-center p-8">
      <Popover
        trigger={
          <Button
            variant="secondary"
            outline
            size="sm"
            iconStart={<Filter />}
          >
            فیلتر وضعیت
          </Button>
        }
        title="فیلتر وضعیت سطرها"
        description="وضعیت‌های مد نظر برای نمایش را انتخاب کنید:"
        size="sm"
        align="start"
      >
        {({ close }) => {
          const statuses = ["فعال", "معلق", "مسدود شده"];
          return (
            <div className="mt-3 space-y-3">
              <div className="space-y-1.5">
                {statuses.map((item, idx) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-xs hover:bg-muted"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={idx === 0}
                      className="rounded border-border accent-primary"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-border pt-2.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={close}
                >
                  انصراف
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    // ثبت منطق فیلتر
                    close();
                  }}
                >
                  اعمال فیلتر
                </Button>
              </div>
            </div>
          );
        }}
      </Popover>
    </div>
  ),
};

/* ۵. مقایسه تمام اندازه‌ها (sm, default, lg, auto) */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Popover
        size="sm"
        title="سایز کوچک (sm)"
        trigger={
          <Button variant="secondary" outline size="sm">
            کوچک (w-64)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">مناسب برای نکات و فیلترهای تک‌ستونه کوچک.</p>
      </Popover>

      <Popover
        size="default"
        title="سایز پیش‌فرض (default)"
        trigger={
          <Button variant="secondary" outline size="sm">
            پیش‌فرض (w-72)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">مناسب برای فرم‌های تنظیمات، اعلان‌ها و ابزارها.</p>
      </Popover>

      <Popover
        size="lg"
        title="سایز بزرگ (lg)"
        trigger={
          <Button variant="secondary" outline size="sm">
            بزرگ (w-80)
          </Button>
        }
      >
        <p className="mt-2 text-xs text-muted-foreground">مناسب برای فرم‌های دو ستونه یا تقویم‌های کوچک.</p>
      </Popover>

      <Popover
        size="auto"
        trigger={
          <Button variant="secondary" outline size="sm">
            خودکار (auto)
          </Button>
        }
      >
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
          <Check className="size-4" />
          <span>عرض محتوا متناسب با متن کادر تنظیم می‌شود</span>
        </div>
      </Popover>
    </div>
  ),
};

/* ۶. الگوی کامپوننت ترکیبی دستی (Compound Pattern) */
export const CompoundCustom: Story = {
  render: () => (
    <div className="flex min-h-55 items-center justify-center p-8">
      <PopoverRoot>
        <PopoverTrigger
          render={(props) => (
            <Button
              {...props}
              variant="secondary"
              outline
              size="sm"
              iconStart={<Settings2 />}
            >
              الگوی ترکیبی دستی
            </Button>
          )}
        />
        <PopoverContent size="default" align="start" className="w-80">
          <div className="flex items-start justify-between">
            <PopoverTitle className="text-base font-bold">ستون‌های فعال جدول</PopoverTitle>
            <PopoverClose />
          </div>
          <PopoverDescription>
            مشخص کنید کدام ستون‌ها در نمای دسکتاپ نمایش داده شوند.
          </PopoverDescription>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded p-1 hover:bg-muted">
              <span>شناسه سطر</span>
              <span className="text-muted-foreground">الزامی</span>
            </div>
            <div className="flex items-center justify-between rounded p-1 hover:bg-muted">
              <span>عنوان سفارش</span>
              <span className="text-emerald-500 font-medium">نمایش داده شده</span>
            </div>
            <div className="flex items-center justify-between rounded p-1 hover:bg-muted">
              <span>مبلغ کل</span>
              <span className="text-emerald-500 font-medium">نمایش داده شده</span>
            </div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </div>
  ),
};

/* ۷. تریگر آیکونی (استفاده از قابلیت iconOnly دکمه) */
export const IconTrigger: Story = {
  render: () => (
    <div className="flex min-h-50 items-center justify-center p-8">
      <Popover
        showClose
        title="گزینه‌های پیشرفته"
        trigger={
          <Button
            variant="secondary"
            outline
            iconOnly
            size="default"
            aria-label="تنظیمات"
          >
            <SlidersHorizontal />
          </Button>
        }
      >
        <div className="mt-2 text-xs text-muted-foreground">
          دکمه بازکننده با استفاده از قابلیت <code>iconOnly</code> کامپوننت دکمه ساخته شده است.
        </div>
      </Popover>
    </div>
  ),
};
