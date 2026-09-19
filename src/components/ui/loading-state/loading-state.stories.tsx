import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingState } from "./loading-state";

const meta: Meta<typeof LoadingState> = {
  title: "Components/UI/LoadingState",
  component: LoadingState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["contained", "inline", "viewport"],
      description: "حالت قرارگیری و اسکوپ نمایش لودینگ",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "ابعاد آیکون و متن",
    },
    text: {
      control: "text",
      description: "متن پیام لودینگ",
    },
    showText: {
      control: "boolean",
      description: "نمایش یا پنهان‌سازی متن",
    },
  },
  args: {
    text: "در حال بارگذاری...",
    showText: true,
    size: "md",
    mode: "contained",
  },
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

/**
 * حالت پایه همراه با کنترل کامل پراپ‌ها در Storybook Controls
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-90 rounded-xl border border-border bg-card p-4 shadow-xs">
      <LoadingState {...args} />
    </div>
  ),
};

/**
 * مقایسه اندازه‌های مختلف (کوچک، متوسط و بزرگ)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="flex items-center gap-8 border border-border/60 rounded-xl p-6 bg-card">
        <LoadingState size="sm" text="سایز کوچک (sm)" />
        <div className="h-12 w-px bg-border" />
        <LoadingState size="md" text="سایز استاندارد (md)" />
        <div className="h-12 w-px bg-border" />
        <LoadingState size="lg" text="سایز بزرگ (lg)" />
      </div>
    </div>
  ),
};

/**
 * حالت بدون متن (فقط اسپینر چرخان)
 */
export const SpinnerOnly: Story = {
  render: () => (
    <div className="flex items-center gap-6 rounded-xl border border-border p-6 bg-card">
      <LoadingState size="sm" showText={false} />
      <LoadingState size="md" showText={false} />
      <LoadingState size="lg" showText={false} />
    </div>
  ),
};

/**
 * حالت درون‌خطی (Inline) مناسب برای قرارگیری کنار متن یا داخل بخش‌های کوچک
 */
export const Inline: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-4 py-2 text-sm">
      <span>وضعیت تراکنش:</span>
      <LoadingState mode="inline" size="sm" text="در حال بررسی..." />
    </div>
  ),
};

/**
 * شبیه‌سازی لودینگ داخل یک کارت داشبورد (Contained)
 */
export const InsideCard: Story = {
  render: () => (
    <div className="w-80 h-56 rounded-2xl border border-border bg-card shadow-sm flex flex-col overflow-hidden">
      <div className="border-b border-border p-3 text-xs font-semibold text-muted-foreground">
        گزارش واریزهای اخیر
      </div>
      <div className="flex-1">
        <LoadingState
          mode="contained"
          size="md"
          text="در حال دریافت لیست تراکنش‌ها..."
        />
      </div>
    </div>
  ),
};

/**
 * حالت تمام‌صفحه (Viewport Overlay)
 * این حالت کل صفحه را پوشانده و لودینگ اصلی اپلیکیشن را شبیه‌سازی می‌کند.
 */
export const ViewportOverlay: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    mode: "viewport",
    size: "lg",
    text: "در حال راه‌اندازی سامانه موج...",
  },
};
