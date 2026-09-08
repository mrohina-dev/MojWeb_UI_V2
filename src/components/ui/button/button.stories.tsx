import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";
import { Mail, Trash2, Send, Plus, Check } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: {
      action: "clicked",
      description: "رویداد کلیک (در تب Actions پایین صفحه ثبت می‌شود)",
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "destructive",
        "success",
        "warning",
        "link",
      ],
      description: "تم رنگی دکمه (حالت خطی با پراپ outline جدا می‌شود)",
    },
    outline: {
      control: "boolean",
      description:
        "نمایش به‌صورت خطی (بدون بک‌گراند توپر)؛ بوردر و رنگ متن از variant گرفته می‌شود",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "ابعاد و اندازه دکمه",
    },
    fullWidth: {
      control: "boolean",
      description: "اشغال ۱۰۰٪ عرض والد (مناسب فرم‌ها و موبایل)",
    },
    loading: {
      control: "boolean",
      description: "نمایش وضعیت بارگذاری و غیرفعال‌سازی کلیک",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن کامل دکمه",
    },
    iconStart: {
      control: false,
      description: "آیکون در سمت شروع (سمت راست در حالت RTL)",
    },
    iconEnd: {
      control: false,
      description: "آیکون در سمت پایان (سمت چپ در حالت RTL)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ۱. حالت اصلی (Primary)
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "دکمه اصلی",
  },
};

// ۲. حالت ثانویه (Secondary)
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "دکمه ثانویه",
  },
};

// ۳. حالت خطی اصلی (Primary Outline)
export const Outline: Story = {
  args: {
    variant: "primary",
    outline: true,
    children: "دکمه خطی",
  },
};

// ۴. حالت متنی / شفاف (Ghost/Text)
export const GhostText: Story = {
  args: {
    variant: "ghost",
    children: "دکمه متنی (Ghost)",
  },
};

// ۵. حالت خطرناک (Destructive)
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "حذف آیتم",
    iconStart: <Trash2 className="size-4" />,
  },
};

// ۶. حالت خطرناک به‌صورت خطی (Destructive Outline)
export const DestructiveOutline: Story = {
  args: {
    variant: "destructive",
    outline: true,
    children: "حذف آیتم",
    iconStart: <Trash2 className="size-4" />,
  },
};

// ۷. تست وضعیت بارگذاری (Loading)
export const Loading: Story = {
  args: {
    loading: true,
    children: "در حال پردازش...",
  },
};

// ۸. دکمه همراه با آیکون در سمت شروع (Icon Start - Right in RTL)
export const WithIconStart: Story = {
  args: {
    variant: "primary",
    children: "ایجاد رکورد جدید",
    iconStart: <Plus className="size-4" />,
  },
};

// ۹. دکمه همراه با آیکون در سمت پایان (Icon End - Left in RTL)
export const WithIconEnd: Story = {
  args: {
    variant: "primary",
    children: "ارسال پیام",
    iconEnd: <Send className="size-4" />,
  },
};

// ۱۰. دکمه فقط آیکون (Icon only)
export const IconOnly: Story = {
  args: {
    variant: "primary",
    outline: true,
    size: "icon",
    children: <Mail className="size-4" />,
    "aria-label": "ارسال ایمیل",
  },
};

// ۱۱. دکمه با تمام عرض (Full Width)
export const FullWidth: Story = {
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto space-y-3 p-4 bg-muted/30 rounded-xl border border-border">
      <p className="text-xs text-muted-foreground text-center mb-2">
        نمونه دکمه تمام‌عرض در انتهای فرم یا مودال:
      </p>
      <Button {...args} fullWidth variant="primary">
        تایید و ادامه خرید
      </Button>
      <Button {...args} fullWidth variant="primary" outline>
        انصراف
      </Button>
    </div>
  ),
};

// ۱۲. نمونه تعاملی شبیه‌سازی لودینگ با کلیک (Interactive Loading)
export const InteractiveLoading: Story = {
  render: () => {
    const InteractiveDemo = () => {
      const [isLoading, setIsLoading] = React.useState(false);

      const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      };

      return (
        <div className="flex flex-col items-center gap-3">
          <Button loading={isLoading} onClick={handleClick}>
            {isLoading ? "در حال پردازش..." : "کلیک کنید تا لود شود (۲ ثانیه)"}
          </Button>
          <span className="text-xs text-muted-foreground">
            {isLoading ? "⏳ درخواست در حال ارسال است..." : "آماده برای کلیک"}
          </span>
        </div>
      );
    };

    return <InteractiveDemo />;
  },
};

// ۱۳. مقایسه تمام سایزها
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} size="sm">
        کوچک (sm)
      </Button>
      <Button {...args} size="default">
        متوسط (default)
      </Button>
      <Button {...args} size="lg">
        بزرگ (lg)
      </Button>
      <Button {...args} size="icon">
        <Mail className="size-4" />
      </Button>
    </div>
  ),
};

// ۱۴. ماتریس همه واریانت‌های توپر (Solid)
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="success" iconStart={<Check className="size-4" />}>
        Success
      </Button>
      <Button {...args} variant="warning">Warning</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
};

// ۱۵. ماتریس همه واریانت‌های خطی (Outline)
export const AllOutlineVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary" outline>Primary Outline</Button>
      <Button {...args} variant="secondary" outline>Secondary Outline</Button>
      <Button {...args} variant="destructive" outline>Destructive Outline</Button>
      <Button {...args} variant="success" outline iconStart={<Check className="size-4" />}>
        Success Outline
      </Button>
      <Button {...args} variant="warning" outline>Warning Outline</Button>
    </div>
  ),
};
