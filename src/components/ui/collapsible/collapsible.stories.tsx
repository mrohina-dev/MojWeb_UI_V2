import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings, User, SlidersHorizontal } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
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
    variant: "default",
    size: "default",
    defaultOpen: false,
    divided: false,
  },
  render: (args) => (
    <div className="w-90">
      <Collapsible {...args}>
        <CollapsibleTrigger>
          <span>تنظیمات پیشرفته حساب</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          این بخش شامل گزینه‌ها و تنظیمات اختصاصی مربوط به حساب کاربری شماست که می‌توانید آن‌ها را تغییر دهید.
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const WithDivider: Story = {
  args: {
    variant: "primary",
    size: "default",
    defaultOpen: true,
    divided: true,
  },
  render: (args) => (
    <div className="w-90">
      <Collapsible {...args}>
        <CollapsibleTrigger>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <span>تنظیمات با خط جداکننده (Divided)</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          با فعال بودن پراپ divided، یک خط مرزی ملایم و استاندارد بین دکمه بازکننده و محتوای زیرین رسم می‌شود.
        </CollapsibleContent>
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
          <Collapsible key={variant} variant={variant} defaultOpen={variant === "primary"}>
            <CollapsibleTrigger>
              <span className="capitalize font-semibold">واریانت: {variant}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              محتوای نمونه برای بررسی رفتار و رنگ‌بندی واریانت {variant}.
            </CollapsibleContent>
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
          <Collapsible key={size} size={size} variant="primary">
            <CollapsibleTrigger>
              <span>سایز کامپوننت ({size})</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              متن محتوا متناسب با سایز انتخاب شده تنظیم شده است.
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const InSidebarNavigation: Story = {
  render: () => (
    <div className="w-64 rounded-xl border border-sidebar-border bg-sidebar p-3 text-sidebar-foreground">
      <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
        ناوبری سایدبار
      </div>
      <Collapsible variant="ghost" size="sm">
        <CollapsibleTrigger>
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span>مدیریت کاربران</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="ghost" size="sm">
        <CollapsibleTrigger>
          <div className="flex items-center gap-2">
            <Settings className="size-4" />
            <span>پیکربندی سیستم</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
