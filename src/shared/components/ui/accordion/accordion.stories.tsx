import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpCircle, ShieldAlert, CreditCard, Bell, Sparkles } from "lucide-react";
import {
  Accordion,
  BaseAccordion,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccordionContent,
} from "./accordion";

const sampleItems = [
  {
    value: "item-1",
    title: "شرایط و قوانین بازگشت کالا چگونه است؟",
    icon: <HelpCircle className="size-4 text-primary" />,
    content:
      "شما می‌توانید تا ۷ روز پس از دریافت سفارش، در صورت وجود نقص فنی یا مغایرت، درخواست مرجوعی خود را در سامانه ثبت نمایید.",
  },
  {
    value: "item-2",
    title: "روش‌های پرداخت پشتیبانی‌شده کدامند؟",
    icon: <CreditCard className="size-4 text-primary" />,
    content:
      "پرداخت اینترنتی از طریق تمامی کارت‌های عضو شبکه شتاب و همچنین امکان پرداخت در محل برای سفارش‌های واجد شرایط فعال است.",
  },
  {
    value: "item-3",
    title: "اطلاع‌رسانی وضعیت سفارش از چه طریقی انجام می‌شود؟",
    icon: <Bell className="size-4 text-primary" />,
    content:
      "وضعیت بسته از زمان بسته‌بندی، ارسال به انبار توزیع و تحویل نهایی از طریق پیامک به اطلاع خریدار خواهد رسید.",
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Components/UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive", "ghost"],
      description: "واریانت رنگی هماهنگ با تم پروژه",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
      description: "سایز آیتم‌های آکاردئون",
    },
    divided: {
      control: "boolean",
      description: "نمایش خط جداکننده بین عنوان و محتوا",
    },
    multiple: {
      control: "boolean",
      description: "امکان باز شدن همزمان چند آیتم",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن کل آکاردئون",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: sampleItems,
    variant: "default",
    size: "default",
    multiple: false,
    divided: false,
  },
  render: (args) => (
    <div className="w-120">
      <Accordion {...args} />
    </div>
  ),
};

export const WithDividerAndPrimary: Story = {
  args: {
    items: sampleItems,
    variant: "primary",
    size: "default",
    multiple: true,
    divided: true,
    defaultValue: ["item-1"],
  },
  render: (args) => (
    <div className="w-120">
      <Accordion {...args} />
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
      <div className="flex w-120 flex-col gap-6">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">
              واریانت: {variant}
            </span>
            <Accordion
              variant={variant}
              divided
              defaultValue={["item-1"]}
              items={[
                {
                  value: "item-1",
                  title: `عنوان آکاردئون نمونه (${variant})`,
                  content:
                    "محتوای توضیحات این بخش جهت ارزیابی استایل و هماهنگی تم.",
                },
              ]}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "default", "lg"] as const;

    return (
      <div className="flex w-120 flex-col gap-5">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">
              سایز: {size}
            </span>
            <Accordion
              size={size}
              variant="primary"
              items={[
                {
                  value: `size-${size}`,
                  title: `عنوان آیتم با سایز ${size}`,
                  icon: <Sparkles className="size-4 text-primary" />,
                  content: "محتوا و ترنزیشن‌ها بر اساس مقیاس انتخابی هماهنگ شده‌اند.",
                },
              ]}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const InsetContent: Story = {
  args: {
    items: [
      {
        value: "config",
        title: "تنظیمات پیشرفته دیتابیس (حالت فرورفته)",
        content: (
          <div className="space-y-2 font-mono text-xs">
            <p className="text-muted-foreground"># DATABASE_CONFIG</p>
            <p>HOST=127.0.0.1</p>
            <p>PORT=5432</p>
            <p>POOL_MAX=20</p>
          </div>
        ),
      },
      {
        value: "logs",
        title: "مشاهده لاگ‌های سیستم",
        content: "تمام لاگ‌های اخیر با موفقیت سینک شدند.",
      },
    ],
    variant: "default",
    size: "default",
    inset: true, // فعال‌سازی حس فرورفتگی
    defaultValue: ["config"],
  },
  render: (args) => (
    <div className="w-120">
      <Accordion {...args} />
    </div>
  ),
};

export const CompoundExample: Story = {
  name: "Compound Usage (BaseAccordion)",
  render: () => (
    <div className="w-120">
      <BaseAccordion variant="secondary" divided multiple>
        <BaseAccordionItem value="c-1">
          <BaseAccordionTrigger>
            <ShieldAlert className="size-4 text-destructive" />
            <span className="font-semibold">تنظیمات سیاست‌های امنیتی</span>
          </BaseAccordionTrigger>
          <BaseAccordionContent>
            در این شیوه (Compound) می‌توانید هر ترکیب دلخواهی از المان‌های فرم، دکمه‌ها و لینک‌ها را مستقیماً داخل بدنه قرار دهید.
          </BaseAccordionContent>
        </BaseAccordionItem>

        <BaseAccordionItem value="c-2">
          <BaseAccordionTrigger>
            <HelpCircle className="size-4 text-primary" />
            <span>سوالات متداول</span>
          </BaseAccordionTrigger>
          <BaseAccordionContent>
            آیتم دوم با کنترل مجزا و بدون محدودیت ساختار.
          </BaseAccordionContent>
        </BaseAccordionItem>
      </BaseAccordion>
    </div>
  ),
};
