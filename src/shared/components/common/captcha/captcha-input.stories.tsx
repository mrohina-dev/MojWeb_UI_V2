import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CaptchaInput } from "./captcha-input";
import { userService } from "@/features/auth/api/user.service";

const mockCaptchaBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAGQAAAAkCAYAAAB/up84AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAP6SURBVGhD7djBShtBHMfxQvFSH0LoE7RC6aHpCzTtsRSkhcRDLvW2kYoWzUELWkWx4EKEQjBoEONJRLAGX8BrX2e6s9nZ/c3kt5vdze5WYw4f0J3955Avs5PkyeXfO4FmX77S/p8oFg2CzPWJfGlBzBgI75vIz9AdwpgzE9kZCIJYDMRmJkYTGURhMUxsbiK5WEEQi4HYzER8iYMgFgSxmUy0N0X5+aY4YGsF+jbzml4fxUhBFBYDsZn0bsRGueoEqQqrzdaLIWMobD0tGqS1VBP1t/E09nvaLAuC8N5Ueoei4sSQQcrlQ3HM7skZxigkSF9P2F/C3/jL021+3cNiIDYTx8GCF8O1KDZ6/L68mDHuTxDH2f5yaBDEgiA2w50Jy9kVGxhl4Yzcl488QygpgjjX98+9v8+dv4cHUVgMxGbQ8daiqGzdeIe6ilLM4R43Rnv+g/j+NIb5EzqfPMjtb9FYUkHSY0HQ4Iw8zNWb7+wUP0j+h3vcGIFr0SwFb/5eK1jrrteCKFOroq3NJQ7iXQsJ0rHnxNy7N/E0jtwZFgP5ry8Pc3g8yd3i75IcD/fkMaTwIObaj/VrWEsQRDNkhzQbwRv/1b7S17t1LQhiQZC2E/DT1giH+86LT/Q6ShZDigpiPNaMR1emO0SJDCLJKCSIwmKY/N2hpDzcZRCFrUvJYkjxd4gZK5czJCxIx94RTffvI7ESEQSxGCiIkvxwxxgmdn984W86niFmDCl5EHnd/5TlcALZp2qmjwe5Ej9rdS9IAt7PJCyGKc1ZwmIgNjOcHsRknhsoRRCd/Fa/HSNI/8BPEiT4icR8LLEYKM55YlvT4v3sMw0LgtjrcGSHtFaDKFM10fxjzvSNEMRbLy0L+xav60F0KXZIBBbDNDDXqQQRPq7pO8pbYzGQ9noUf2Rph3npl+gOzIUESfJbVr20LVrGfDY7JBkWA7n3YQyrOfAarts1UZ2dFtXdC/d/FgQNzLvCzpATsTcFUciXw4gdkl6mZ0gKLAha+zwjbDKnHO+W/CAKi4Hw3qhDXXt0mWuOAoPgp6xisBiIzbicXWIZQRALgswg5iGuf1vXz5NCg/w/FzQI4nPRWAzkv+meYDfowSQV7ZEEabqPKYnFQHx+OBYEsRkm0yBRv2WtdPlMEVQMRZ0PLAgyXycOFgOxGZTLDrlPzBjsExaLgfDeJFgQxGbGOgiN4aqEfspiQRCbGYbFQHjv2AYxY8hr+O3c/FiLbKtEYyA2FwcLosj1sQzCYijaTyYDXw6bwnK+FFodvBa9a/C+JB5NkKgYgf4b74fxhT/KpCyDIBVDGqsg8WJkI6sYprHdIWztIRjLIOz6QzGWh/rDdSf+AaKJod64tOi/AAAAAElFTkSuQmCC";

const meta = {
  title: "Components/Common/CaptchaInput",
  component: CaptchaInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "جهت چیدمان اینپوت نسبت به تصویر و دکمه",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "اندازه المان‌ها",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن فیلد ورودی و دکمه رفرش",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "برچسب بالای فیلد",
    },
    placeholder: {
      control: "text",
      description: "متن راهنمای درون فیلد",
    },
    error: {
      control: "text",
      description: "متن پیام خطا",
    },
    helperText: {
      control: "text",
      description: "متن کمکی زیر فیلد",
    },
    onRefresh: {
      action: "refreshed",
      description: "رویداد درخواست تصویر جدید کپچا",
    },
  },
  args: {
    orientation: "horizontal",
    size: "default",
    disabled: false,
    label: "عبارت امنیتی",
    placeholder: "کد امنیتی",
  },
  decorators: [
    (Story) => {
      userService.getCaptcha = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          captcha: mockCaptchaBase64,
        };
      };

      return (
        <div dir="rtl" className="w-96 p-6 bg-card rounded-2xl border border-border shadow-xs">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof CaptchaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. پیش‌فرض (Horizontal)
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    label: "عبارت امنیتی",
    placeholder: "کد امنیتی",
  },
};

// ۲. سایزهای حالت افقی (Horizontal Sizes)
export const HorizontalSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <CaptchaInput orientation="horizontal" size="sm" label="سایز کوچک (sm)" placeholder="کد امنیتی" />
      <CaptchaInput orientation="horizontal" size="default" label="سایز پیش‌فرض (default)" placeholder="کد امنیتی" />
      <CaptchaInput orientation="horizontal" size="lg" label="سایز بزرگ (lg)" placeholder="کد امنیتی" />
    </div>
  ),
};

// ۳. حالت عمودی (Vertical)
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    label: "عبارت امنیتی",
    placeholder: "کد امنیتی را وارد کنید",
  },
};

// ۴. سایزهای حالت عمودی (Vertical Sizes)
export const VerticalSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <CaptchaInput orientation="vertical" size="sm" label="سایز کوچک (sm)" placeholder="کد امنیتی" />
      <CaptchaInput orientation="vertical" size="default" label="سایز پیش‌فرض (default)" placeholder="کد امنیتی" />
      <CaptchaInput orientation="vertical" size="lg" label="سایز بزرگ (lg)" placeholder="کد امنیتی" />
    </div>
  ),
};

// ۵. دارای خطا (قابل ویرایش و تست)
export const WithError: Story = {
  render: () => {
    const [val, setVal] = useState("1234");
    return (
      <CaptchaInput
        value={val}
        onChange={(e) => setVal(e.target.value)}
        label="عبارت امنیتی"
        placeholder="کد امنیتی"
        error="کد امنیتی وارد شده نادرست است"
      />
    );
  },
};

// ۶. دارای متن راهنما (Helper Text)
export const WithHelperText: Story = {
  args: {
    label: "عبارت امنیتی",
    helperText: "حروف را بدون فاصله وارد نمایید",
  },
};

// ۷. غیرفعال (Disabled)
export const Disabled: Story = {
  args: {
    label: "عبارت امنیتی",
    disabled: true,
    defaultValue: "5927",
  },
};
