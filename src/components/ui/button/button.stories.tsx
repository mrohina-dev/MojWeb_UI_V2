import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";
import {
  Mail,
  Trash2,
  Send,
  Plus,
  Check,
  Edit2,
  MoreVertical,
  Eye,
  Filter,
} from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: {
      action: "clicked",
      description: "رویداد کلیک (در تب Actions ثبت می‌شود)",
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
      options: ["xs", "sm", "default", "lg"],
      description: "ابعاد و اندازه دکمه (سایز xs مناسب جداول و اکشن‌های فشرده)",
    },
    iconOnly: {
      control: "boolean",
      description: "حالت مربعی/متقارن دکمه جهت نمایش تک‌آیکون بدون کشیدگی افقی",
    },
    shape: {
      control: "inline-radio",
      options: ["default", "circle", "square"],
      description:
        "فرم گوشه‌ها برای تمام دکمه‌ها (circle برای گردی کامل/کپسولی، square برای گوشه فشرده، default طبق سایز)",
    },
    stopPropagation: {
      control: "boolean",
      description:
        "جلوگیری از انتشار رویداد کلیک به کامپوننت والد (مناسب اکشن‌های سطر جدول)",
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
    iconStart: <Trash2 />,
  },
};

// ۶. حالت خطرناک به‌صورت خطی (Destructive Outline)
export const DestructiveOutline: Story = {
  args: {
    variant: "destructive",
    outline: true,
    children: "حذف آیتم",
    iconStart: <Trash2 />,
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
    iconStart: <Plus />,
  },
};

// ۹. دکمه همراه با آیکون در سمت پایان (Icon End - Left in RTL)
export const WithIconEnd: Story = {
  args: {
    variant: "primary",
    children: "ارسال پیام",
    iconEnd: <Send />,
  },
};

// ۱۰. دکمه فقط آیکون (Icon Only)
export const IconOnly: Story = {
  args: {
    variant: "primary",
    outline: true,
    iconOnly: true,
    size: "default",
    children: <Mail />,
    "aria-label": "ارسال ایمیل",
  },
};

// ۱۱. مقایسه تمام سایزهای دکمه فقط آیکون (شامل xs)
export const IconOnlySizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} iconOnly size="xs" aria-label="فوق فشرده">
        <Mail />
      </Button>
      <Button {...args} iconOnly size="sm" aria-label="کوچک">
        <Mail />
      </Button>
      <Button {...args} iconOnly size="default" aria-label="پیش‌فرض">
        <Mail />
      </Button>
      <Button {...args} iconOnly size="lg" aria-label="بزرگ">
        <Mail />
      </Button>
    </div>
  ),
};

// ۱۲. نمایش کامل اشکال مختلف دکمه (Shapes) برای دکمه‌های متنی و آیکونی
export const Shapes: Story = {
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-xl mx-auto" dir="rtl">
      {/* ردیف دکمه‌های دارای متن */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground">
          دکمه‌های متنی با اشکال مختلف (Shapes on Standard Buttons):
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button {...args} shape="default">
            پیش‌فرض (Default)
          </Button>
          <Button {...args} shape="circle" iconStart={<Check />}>
            کپسولی / گرد (Circle)
          </Button>
          <Button {...args} shape="square">
            مربعی / گوشه‌دار (Square)
          </Button>
        </div>
      </div>

      {/* ردیف دکمه‌های آیکونی */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground">
          دکمه‌های تک‌آیکون با اشکال مختلف (Shapes on IconOnly Buttons):
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">دایره‌ای (circle):</span>
            <Button
              {...args}
              iconOnly
              shape="circle"
              size="sm"
              variant="secondary"
              aria-label="دایره‌ای"
            >
              <Mail />
            </Button>
          </div>

          <div className="flex items-center gap-2 mr-4">
            <span className="text-xs text-muted-foreground">مربعی (square):</span>
            <Button
              {...args}
              iconOnly
              shape="square"
              size="sm"
              variant="secondary"
              aria-label="مربعی"
            >
              <Mail />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ۱۳. مقایسه سایزهای دکمه‌های متنی معمولی (شامل xs فشرده)
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} size="xs">
        فوق‌کوچک (xs)
      </Button>
      <Button {...args} size="sm">
        کوچک (sm)
      </Button>
      <Button {...args} size="default">
        متوسط (default)
      </Button>
      <Button {...args} size="lg">
        بزرگ (lg)
      </Button>
    </div>
  ),
};

// ۱۴. دکمه با تمام عرض (Full Width)
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

// ۱۵. سناریوی اکشن‌های سطر و هدر جدول (Table Row & Header Actions)
export const TableRowActions: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => {
    const TableDemo = () => {
      const [lastAction, setLastAction] = React.useState<string>(
        "هنوز کلیکی نشده است"
      );

      const handleRowClick = () => {
        setLastAction("🔴 سطر جدول انتخاب شد (Row Clicked)");
      };

      const handleActionClick = (actionName: string) => {
        setLastAction(
          `🟢 دکمه اکشن «${actionName}» اجرا شد (بدون انتشار به کلیک سطر)`
        );
      };

      return (
        <div className="w-full max-w-2xl mx-auto space-y-4 font-sans" dir="rtl">
          <div className="text-xs font-medium text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border">
            وضعیت آخرین رخداد:{" "}
            <span className="font-semibold text-foreground">{lastAction}</span>
          </div>

          <div className="border border-border rounded-lg overflow-hidden shadow-xs">
            {/* سرستون جدول */}
            <div className="bg-muted/60 px-4 py-2 flex items-center justify-between border-b border-border text-xs font-semibold text-muted-foreground">
              <span>عنوان کاربر</span>
              <div className="flex items-center gap-1.5">
                <span>عملیات ستون</span>
                <Button
                  size="xs"
                  variant="ghost"
                  iconOnly
                  shape="square"
                  aria-label="فیلتر ستون"
                >
                  <Filter />
                </Button>
              </div>
            </div>

            {/* سطر شبیه‌سازی‌شده جدول */}
            <div
              onClick={handleRowClick}
              className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/20 cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">سهراب سپهری</span>
                <span className="text-xs text-muted-foreground">
                  کاربر فعال سازمانی
                </span>
              </div>

              {/* اکشن‌های سطر با سایز xs، گوشه square و stopPropagation */}
              <div className="flex items-center gap-1">
                <Button
                  size="xs"
                  variant="ghost"
                  iconOnly
                  shape="square"
                  stopPropagation
                  onClick={() => handleActionClick("مشاهده جزئیات")}
                  aria-label="مشاهده"
                >
                  <Eye />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  iconOnly
                  shape="square"
                  stopPropagation
                  onClick={() => handleActionClick("ویرایش")}
                  aria-label="ویرایش"
                >
                  <Edit2 />
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  outline
                  iconOnly
                  shape="square"
                  stopPropagation
                  onClick={() => handleActionClick("حذف")}
                  aria-label="حذف"
                >
                  <Trash2 />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  iconOnly
                  shape="square"
                  stopPropagation
                  onClick={() => handleActionClick("منوی بیشتر")}
                  aria-label="بیشتر"
                >
                  <MoreVertical />
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <TableDemo />;
  },
};

// ۱۶. نمونه تعاملی شبیه‌سازی لودینگ با کلیک (Interactive Loading)
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

// ۱۷. ماتریس همه واریانت‌های توپر (Solid)
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="success" iconStart={<Check />}>
        Success
      </Button>
      <Button {...args} variant="warning">Warning</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
};

// ۱۸. ماتریس همه واریانت‌های خطی (Outline)
export const AllOutlineVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary" outline>
        Primary Outline
      </Button>
      <Button {...args} variant="secondary" outline>
        Secondary Outline
      </Button>
      <Button {...args} variant="destructive" outline>
        Destructive Outline
      </Button>
      <Button {...args} variant="success" outline iconStart={<Check />}>
        Success Outline
      </Button>
      <Button {...args} variant="warning" outline>
        Warning Outline
      </Button>
    </div>
  ),
};

