import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton, SkeletonTable } from "./skeleton";

const meta = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ۱. حالت پیش‌فرض (بدون ارسال کلاس، خط پیش‌فرض نمایش داده می‌شود)
export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-64">
      <Skeleton {...args} />
    </div>
  ),
};

// ۲. وریانت‌های شکل (Shapes)
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" />
      <Skeleton variant="default" className="w-24" />
      <Skeleton variant="rounded" className="w-28" />
      <Skeleton variant="sharp" className="h-10 w-24" />
    </div>
  ),
};

// ۳. وریانت‌های انیمیشن (Animations: pulse, wave, none)
export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Pulse (پیش‌فرض)</span>
        <Skeleton animation="pulse" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Wave (افکت براق/Shimmer)</span>
        <Skeleton animation="wave" className="h-6" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">None (بدون انیمیشن)</span>
        <Skeleton animation="none" />
      </div>
    </div>
  ),
};

// ۴. حالت جدول پیش‌فرض (۵ سطر و ۴ ستون)
export const TableExample: Story = {
  render: () => (
    <div className="w-150">
      <SkeletonTable rows={5} columns={4} />
    </div>
  ),
};

// ۵. جدول بزرگ بدون هدر
export const TableWithoutHeader: Story = {
  render: () => (
    <div className="w-150">
      <SkeletonTable rows={4} columns={3} showHeader={false} />
    </div>
  ),
};

// ۶. نمونه کارت پروفایل
export const ProfileCardExample: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border border-border rounded-xl w-72 bg-card shadow-sm">
      <Skeleton variant="circular" />
      <div className="space-y-2 flex-1">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  ),
};
