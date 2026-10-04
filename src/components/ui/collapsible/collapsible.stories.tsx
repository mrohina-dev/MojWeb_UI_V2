import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings, User, SlidersHorizontal, ShieldCheck } from "lucide-react";
import {
  Collapsible,
  BaseCollapsible,
  BaseCollapsibleTrigger,
  BaseCollapsibleContent,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive", "ghost"],
      description: "واریانت رنگی و هماهنگ با دیزاین سیستم",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
      description: "سایز کامپوننت",
    },
    divided: {
      control: "boolean",
      description: "نمایش خط جداکننده بین عنوان و محتوا",
    },
    showChevron: {
      control: "boolean",
      description: "نمایش یا عدم نمایش آیکون فلش (Chevron)",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن تعامل با کلپس",
    },
    defaultOpen: {
      control: "boolean",
      description: "وضعیت پیش‌فرض باز/بسته",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    title: "تنظیمات پیشرفته حساب",
    variant: "default",
    size: "default",
    defaultOpen: false,
    divided: false,
    showChevron: true,
  },
  render: (args) => (
    <div className="w-90">
      <Collapsible {...args}>
        این بخش شامل گزینه‌ها و تنظیمات اختصاصی مربوط به حساب کاربری شماست که می‌توانید آن‌ها را تغییر دهید.
      </Collapsible>
    </div>
  ),
};

export const WithIconAndDivider: Story = {
  args: {
    title: "تنظیمات امنیتی و دسترسی",
    variant: "primary",
    size: "default",
    defaultOpen: true,
    divided: true,
  },
  render: (args) => (
    <div className="w-90">
      <Collapsible
        {...args}
        icon={<ShieldCheck className="size-4 text-primary" />}
      >
        با فعال بودن پراپ divided، یک خط مرزی ملایم و مدرن بین دکمه بازکننده و محتوای زیرین رسم می‌شود.
      </Collapsible>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants = [
      "default",
      "primary",
      "secondary",
      "destructive",
      "ghost",
    ] as const;

    return (
      <div className="flex w-95 flex-col gap-3">
        {variants.map((variant) => (
          <Collapsible
            key={variant}
            variant={variant}
            title={`واریانت: ${variant}`}
            defaultOpen={variant === "primary"}
            divided
          >
            محتوای نمونه جهت بررسی رفتار رنگی و استایل‌های واریانت {variant}.
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "default", "lg"] as const;

    return (
      <div className="flex w-95 flex-col gap-3">
        {sizes.map((size) => (
          <Collapsible
            key={size}
            size={size}
            variant="primary"
            title={`سایز کامپوننت (${size})`}
            icon={<SlidersHorizontal className="size-4 text-primary" />}
          >
            متن محتوا متناسب با سایز انتخاب شده تنظیم شده است.
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const BaseCompoundExample: Story = {
  name: "Compound Usage (BaseCollapsible)",
  render: () => (
    <div className="w-95">
      <BaseCollapsible variant="secondary" divided>
        <BaseCollapsibleTrigger>
          <div className="flex items-center gap-2">
            <Settings className="size-4" />
            <span className="font-semibold">استفاده به شیوه ترکیبی (Compound)</span>
          </div>
        </BaseCollapsibleTrigger>
        <BaseCollapsibleContent>
          در این حالت می‌توانید هر المان یا دکمه اکشن دلخواهی را مستقیماً داخل تریگر یا بدنه قرار دهید و کنترل کامل ساختار HTML را در دست بگیرید.
        </BaseCollapsibleContent>
      </BaseCollapsible>
    </div>
  ),
};

export const InSidebarNavigation: Story = {
  render: () => (
    <div className="w-64 rounded-xl border border-sidebar-border bg-sidebar p-3 text-sidebar-foreground">
      <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
        ناوبری سایدبار
      </div>
      <div className="flex flex-col gap-1">
        <Collapsible
          variant="ghost"
          size="sm"
          title="مدیریت کاربران"
          icon={<User className="size-4" />}
        >
          <div className="flex flex-col gap-1 pr-6 pt-1 text-xs">
            <a
              href="#"
              className="rounded-md p-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              لیست کاربران
            </a>
            <a
              href="#"
              className="rounded-md p-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              سطوح دسترسی
            </a>
          </div>
        </Collapsible>

        <Collapsible
          variant="ghost"
          size="sm"
          title="پیکربندی سیستم"
          icon={<Settings className="size-4" />}
        >
          <div className="flex flex-col gap-1 pr-6 pt-1 text-xs">
            <a
              href="#"
              className="rounded-md p-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              اتصال پایگاه داده
            </a>
            <a
              href="#"
              className="rounded-md p-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              گزارش لاگ‌ها
            </a>
          </div>
        </Collapsible>
      </div>
    </div>
  ),
};
