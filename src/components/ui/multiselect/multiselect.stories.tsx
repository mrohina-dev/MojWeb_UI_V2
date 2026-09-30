import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "./multiselect";
import type { MultiSelectOptions } from "./multiselect.types";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/UI/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
      description: "سایز کامپوننت",
    },
    disabled: {
      control: "boolean",
      description: "وضعیت غیرفعال بودن فیلد",
    },
    isLoading: {
      control: "boolean",
      description: "وضعیت در حال بارگذاری اطلاعات",
    },
    searchable: {
      control: "boolean",
      description: "امکان فیلتر و جست‌وجو در لیست",
    },
    maxVisibleLabels: {
      control: { type: "number", min: 1, max: 5 },
      description: "حداکثر تعداد آیتم‌های متنی قابل مشاهده قبل از نمایش شمارنده باقی‌مانده",
    },
    closeOnSelect: {
      control: "boolean",
      description: "بستن پاپ‌آپ بلافاصله پس از هر بار انتخاب",
    },
    showClearButton: {
      control: "boolean",
      description: "نمایش دکمه پاک کردن کلیه انتخاب‌ها",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const sampleOptions: MultiSelectOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "nextjs", label: "Next.js" },
  { value: "remix", label: "Remix" },
];

const groupedOptions: MultiSelectOptions = [
  {
    label: "فرانت‌اند",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
    ],
  },
  {
    label: "بک‌اند",
    options: [
      { value: "nodejs", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "golang", label: "Go" },
    ],
  },
  {
    label: "دیتابیس",
    options: [
      { value: "postgresql", label: "PostgreSQL" },
      { value: "mongodb", label: "MongoDB" },
    ],
  },
];

type MultiSelectProps = React.ComponentProps<typeof MultiSelect>;

const ControlledMultiSelect: React.FC<MultiSelectProps> = (props) => {
  const [value, setValue] = React.useState<string[]>(
    props.defaultValue ?? props.value ?? []
  );

  return (
    <div className="w-80" dir="rtl">
      <MultiSelect
        {...props}
        value={value}
        onValueChange={(nextValues) => {
          setValue(nextValues);
          props.onValueChange?.(nextValues);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "تکنولوژی‌ها",
    placeholder: "انتخاب فناوری...",
    options: sampleOptions,
    helperText: "می‌توانید چند مورد را هم‌زمان انتخاب کنید",
    fullWidth: true,
  },
};

export const Searchable: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "جست‌وجو در لیست",
    placeholder: "جست‌وجو و انتخاب...",
    searchable: true,
    searchPlaceholder: "نام پکیج یا فریمورک...",
    options: sampleOptions,
    fullWidth: true,
  },
};

export const Grouped: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "دسته‌بندی مهارت‌ها",
    placeholder: "انتخاب مهارت...",
    options: groupedOptions,
    searchable: true,
    fullWidth: true,
  },
};

export const Preselected: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "دارای مقادیر پیش‌فرض",
    options: sampleOptions,
    defaultValue: ["react", "nextjs"],
    fullWidth: true,
  },
};

export const MaxVisibleLabelsAndRTL: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "کنترل تعداد نمایش و بج شمارنده (RTL)",
    placeholder: "انتخاب چند مورد...",
    options: sampleOptions,
    defaultValue: ["react", "vue", "angular", "nextjs"],
    maxVisibleLabels: 2,
    helperText: "نمایش ۲ آیتم و جمع‌آوری مابقی در بج شمارنده بدون تداخل BiDi",
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-80" dir="rtl">
      <ControlledMultiSelect
        size="xs"
        label="سایز خیلی کوچک (Extra Small)"
        placeholder="انتخاب..."
        options={sampleOptions}
      />
      <ControlledMultiSelect
        size="sm"
        label="سایز کوچک (Small)"
        placeholder="انتخاب..."
        options={sampleOptions}
      />
      <ControlledMultiSelect
        size="default"
        label="سایز پیش‌فرض (Default)"
        placeholder="انتخاب..."
        options={sampleOptions}
      />
      <ControlledMultiSelect
        size="lg"
        label="سایز بزرگ (Large)"
        placeholder="انتخاب..."
        options={sampleOptions}
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "در حال دریافت اطلاعات",
    placeholder: "لطفاً شکیبا باشید...",
    isLoading: true,
    loadingText: "در حال واکشی اطلاعات از سرور...",
    options: [],
    fullWidth: true,
  },
};

export const ErrorState: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "فیلد با ارور اعتبارسنجی",
    placeholder: "انتخاب اجباری...",
    options: sampleOptions,
    error: "انتخاب حداقل یک مورد الزامی است",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    label: "فیلد غیرفعال",
    placeholder: "غیرقابل انتخاب",
    disabled: true,
    options: sampleOptions,
    defaultValue: ["react"],
    fullWidth: true,
  },
};
