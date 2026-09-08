import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordInput } from "./password-input";
import { Lock } from "lucide-react";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/UI/PasswordInput",
  component: PasswordInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "رمز عبور",
    placeholder: "رمز عبور خود را وارد کنید",
  },
};

export const Required: Story = {
  args: {
    label: "رمز عبور جدید",
    required: true,
    placeholder: "••••••••",
  },
};

export const WithStartIcon: Story = {
  args: {
    label: "رمز عبور",
    iconStart: <Lock className="size-4" />,
    placeholder: "رمز عبور را وارد کنید",
  },
};

export const WithoutToggleIcon: Story = {
  args: {
    label: "رمز عبور (بدون دکمه چشم)",
    showToggleIcon: false,
    placeholder: "••••••••",
  },
};

export const HasError: Story = {
  args: {
    label: "رمز عبور",
    error: "رمز عبور باید حداقل ۸ کاراکتر باشد",
    defaultValue: "12345",
  },
};

export const Disabled: Story = {
  args: {
    label: "رمز عبور",
    disabled: true,
    defaultValue: "password123",
  },
};
