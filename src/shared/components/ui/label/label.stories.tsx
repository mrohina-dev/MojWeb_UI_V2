import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Components/UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
      description: "اندازه متن لیبل متناسب با فیلدهای ورودی و کامپوننت‌ها",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    children: {
      control: { type: "text" },
      description: "محتوای متن لیبل",
    },
    required: {
      control: { type: "boolean" },
      description: "نمایش ستاره (اجباری) کنار متن لیبل",
    },
    disabled: {
      control: { type: "boolean" },
      description: "غیرفعال کردن لیبل (کاهش شفافیت)",
    },
    hasError: {
      control: { type: "boolean" },
      description: "قرمز شدن متن لیبل در حالت خطا",
    },
    htmlFor: {
      control: { type: "text" },
      description: "اتریبیوت HTML برای اتصال لیبل به فیلد ورودی مربوطه",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// ۱. حالت پیش‌فرض
export const Default: Story = {
  args: {
    children: "نام کاربری",
    size: "default",
  },
};

// ۲. نمایش تمام سایزها
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start" dir="rtl">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-16">XS:</span>
        <Label size="xs">لیبل سایز خیلی کوچک (Extra Small)</Label>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-16">SM:</span>
        <Label size="sm">لیبل سایز کوچک (Small)</Label>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-16">Default:</span>
        <Label size="default">لیبل سایز پیش‌فرض (Default)</Label>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-16">LG:</span>
        <Label size="lg">لیبل سایز بزرگ (Large)</Label>
      </div>
    </div>
  ),
};

// ۳. حالت اجباری (با ستاره)
export const Required: Story = {
  args: {
    children: "شماره همراه",
    required: true,
    size: "default",
  },
};

// ۴. حالت غیرفعال
export const Disabled: Story = {
  args: {
    children: "ایمیل",
    disabled: true,
    size: "default",
  },
};

// ۵. حالت خطا همراه با ستاره
export const HasError: Story = {
  args: {
    children: "رمز عبور",
    hasError: true,
    required: true,
    size: "default",
  },
};

// ۶. با استایل‌های سفارشی
export const WithCustomClass: Story = {
  args: {
    children: "توضیحات تکمیلی",
    className: "text-muted-foreground font-light",
    size: "default",
  },
};
