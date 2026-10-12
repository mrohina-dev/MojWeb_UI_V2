import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "default", "lg"] },
    hasError: { control: "boolean" },
    isTableInline: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// 1. حالت پیش‌فرض
export const Default: Story = {
  args: {
    label: "گزینه انتخابی",
  },
};

// 2. نمایش تمامی سایزها
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4" dir="rtl">
      <Checkbox size="xs" label="سایز XS" />
      <Checkbox size="sm" label="سایز SM" />
      <Checkbox size="default" label="سایز Default" />
      <Checkbox size="lg" label="سایز LG" />
    </div>
  ),
};

// 3. نمایش وضعیت‌های مختلف (States)
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4" dir="rtl">
      <Checkbox label="حالت فعال (Checked)" checked={true} readOnly />
      <Checkbox label="حالت نامشخص (Indeterminate)" indeterminate={true} />
      <Checkbox label="حالت خطا (Error)" hasError={true} />
      <Checkbox label="حالت غیرفعال (Disabled)" disabled={true} />
    </div>
  ),
};

// 4. دمو در محیط جدول (Inline)
export const TableInline: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden" dir="rtl">
      <div className="bg-muted/30 px-4 py-2 text-xs font-semibold text-muted-foreground border-b border-border">
        جدول کاربران
      </div>
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-border hover:bg-muted/20">
        <span className="text-sm">کاربر شماره ۱</span>
        <Checkbox size="xs" isTableInline aria-label="select user 1" />
      </div>
      <div className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/20">
        <span className="text-sm">کاربر شماره ۲</span>
        <Checkbox size="xs" isTableInline checked={true} readOnly aria-label="select user 2" />
      </div>
    </div>
  ),
};

// 5. دمو جلوگیری از کلیک (StopPropagation)
export const EventHandling: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [log, setLog] = React.useState<string>("منتظر کلیک...");
    
    return (
      <div className="space-y-4 w-80" dir="rtl">
        <div className="p-3 bg-muted/40 rounded text-sm text-center">
          رویداد: {log}
        </div>
        
        {/* ردیف جدول که دارای onClick است */}
        <div 
          onClick={() => setLog("🔴 کلیک روی ردیف")}
          className="border border-border p-4 rounded-lg cursor-pointer hover:bg-primary/5 flex items-center justify-between"
        >
          <span>کلیک روی ردیف</span>
          
          <Checkbox 
            label="کلیک روی چک‌باکس"
            stopPropagation // کلید اصلی اینجاست
            onCheckedChange={(checked) => setLog(checked ? "🟢 تیک زده شد (Propagation متوقف شد)" : "⚪ تیک برداشته شد")}
          />
        </div>
      </div>
    );
  },
};

// 6. با توضیحات (Form Context)
export const WithDescription: Story = {
  args: {
    label: "دریافت خبرنامه",
    description: "با فعال کردن این گزینه، ایمیل‌های تبلیغاتی دریافت خواهید کرد.",
  },
};
