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
      description: "اتریوت HTML برای اتصال لیبل به Input مربوطه",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "نام کاربری",
  },
};

export const Required: Story = {
  args: {
    children: "شماره همراه",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "ایمیل",
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    children: "رمز عبور",
    hasError: true,
    required: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "توضیحات",
    className: "text-base text-muted-foreground",
  },
};
