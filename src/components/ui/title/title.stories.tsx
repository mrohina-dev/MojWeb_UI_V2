import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageTitle } from "./title";

const meta: Meta<typeof PageTitle> = {
  title: "Components/UI/Title",
  component: PageTitle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "یک کامپوننت عنوان صفحه منعطف با قابلیت تنظیم سایز، تراز، رنگ و توضیحات.",
      },
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "متن اصلی عنوان صفحه (اجباری)",
    },
    description: {
      control: { type: "text" },
      description: "توضیحات تکمیلی زیر عنوان (اختیاری)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "سایز عنوان",
    },
    align: {
      control: { type: "inline-radio" },
      options: ["start", "center", "end"],
      description: "تراز متن عنوان",
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "muted",
        "primary",
        "secondary",
        "destructive",
        "gradient",
      ],
      description: "رنگ/تُن بصری عنوان",
    },
    className: {
      control: { type: "text" },
      description: "کلاس‌های CSS سفارشی برای اعمال به تگ h1",
    },
    id: {
      control: "text",
      description: "شناسه المان h1",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: "داشبورد مدیریتی",
  },
};

export const WithDescription: Story = {
  args: {
    title: "داشبورد مدیریتی",
    description:
      "اینجا می‌توانید نمای کلی فعالیت‌ها و آمار سیستم را مشاهده کنید.",
  },
};

export const Centered: Story = {
  args: {
    title: "خوش آمدید!",
    description: "لطفاً برای شروع، یکی از گزینه‌های منو را انتخاب کنید.",
    align: "center",
  },
};

export const Gradient: Story = {
  args: {
    title: "گزارش تحلیلی سالانه",
    variant: "gradient",
    size: "lg",
  },
};

export const Destructive: Story = {
  args: {
    title: "هشدار!",
    description: "این عملیات قابل بازگشت نیست. آیا مطمئن هستید؟",
    variant: "destructive",
    align: "center",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <PageTitle title="عنوان سایز sm" size="sm" align="start" />
      <PageTitle title="عنوان سایز md" size="md" align="start" />
      <PageTitle title="عنوان سایز lg" size="lg" align="start" />
      <PageTitle title="عنوان سایز xl" size="xl" align="start" />
    </div>
  ),
};

export const AllAlignments: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <PageTitle title="عنوان تراز Start" align="start" />
      <PageTitle title="عنوان تراز Center" align="center" />
      <PageTitle title="عنوان تراز End" align="end" />
    </div>
  ),
};
