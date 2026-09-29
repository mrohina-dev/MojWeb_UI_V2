import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./input";
import { Mail, User, Info, Check, Search, X } from "lucide-react";

/**
 * کامپوننت Input با پشتیبانی از سیستم فرم، مدیریت لیبل و ارور، آیکون‌های RTL،
 * و قابلیت استفاده فشرده درون سلول‌ها و فیلترهای جدول (Plain & Inline).
 */
const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "نوع ورودی HTML",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
      description: "سایز و ارتفاع فیلد (xs مناسب برای سلول‌ها و فیلترهای جدول)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    plain: {
      control: "boolean",
      description: "حذف Label، Error و Wrapper اضافی جهت قرارگیری روان درون سلول‌ها و هدرهای جدول",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isTableInline: {
      control: "boolean",
      description: "حذف کادر اولیه و سایه جهت شبیه‌سازی سلول اکسل در ویرایش مستقیم سطرها",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "برچسب بالای فیلد",
    },
    placeholder: {
      control: "text",
      description: "متن پیش‌فرض داخل فیلد",
    },
    helperText: {
      control: "text",
      description: "متن راهنما در پایین فیلد",
    },
    error: {
      control: "text",
      description: "پیام خطا (در صورت وجود، استایل فیلد ارور می‌شود)",
    },
    disabled: {
      control: "boolean",
      description: "غیرفعال کردن فیلد",
    },
    required: {
      control: "boolean",
      description: "نمایش نشانگر الزامی بودن (*)",
    },
    iconStart: {
      control: false,
      description: "آیکون یا المنت سمت راست (در حالت RTL)",
    },
    iconEnd: {
      control: false,
      description: "آیکون یا المنت سمت چپ (در حالت RTL)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* -------------------------------------------------------------------------- */
/*                       ۱. ورودی ساده بدون لیبل (Default)                    */
/* -------------------------------------------------------------------------- */
export const Default: Story = {
  args: {
    placeholder: "متن خود را وارد کنید...",
  },
};

/* -------------------------------------------------------------------------- */
/*                   ۲. همراه با برچسب و راهنما (Label & Helper)              */
/* -------------------------------------------------------------------------- */
export const WithLabelAndHelper: Story = {
  args: {
    label: "نام و نام خانوادگی",
    placeholder: "مثلاً: علی رضایی",
    helperText: "نام خود را دقیقاً مطابق با کارت ملی وارد نمایید.",
    required: true,
  },
};

/* -------------------------------------------------------------------------- */
/*                         ۳. وضعیت خطا (Error State)                         */
/* -------------------------------------------------------------------------- */
export const WithError: Story = {
  args: {
    label: "ایمیل سازمانی",
    type: "email",
    placeholder: "name@company.com",
    defaultValue: "invalid-email@",
    error: "فرمت ایمیل وارد شده صحیح نمی‌باشد.",
  },
};

/* -------------------------------------------------------------------------- */
/*                        ۴. وضعیت غیرفعال (Disabled)                         */
/* -------------------------------------------------------------------------- */
export const Disabled: Story = {
  args: {
    label: "کد ملی (غیرقابل ویرایش)",
    defaultValue: "0012345678",
    disabled: true,
    helperText: "امکان تغییر این فیلد پس از ثبت نهایی وجود ندارد.",
  },
};

/* -------------------------------------------------------------------------- */
/*                  ۵. آیکون در سمت شروع (Right Icon in RTL)                   */
/* -------------------------------------------------------------------------- */
export const WithIconStart: Story = {
  args: {
    label: "آدرس ایمیل",
    type: "email",
    placeholder: "you@example.com",
    iconStart: <Mail className="size-4" />,
  },
};

/* -------------------------------------------------------------------------- */
/*                   ۶. آیکون در سمت پایان (Left Icon in RTL)                  */
/* -------------------------------------------------------------------------- */
export const WithIconEnd: Story = {
  args: {
    label: "نام کاربری",
    placeholder: "username",
    iconEnd: <User className="size-4" />,
    helperText: "از حروف لاتین و اعداد استفاده کنید.",
  },
};

/* -------------------------------------------------------------------------- */
/*                     ۷. دو آیکون همزمان در ابتدا و انتها                     */
/* -------------------------------------------------------------------------- */
export const WithBothIcons: Story = {
  args: {
    label: "کد رهگیری",
    placeholder: "TRK-984210",
    iconStart: <Info className="size-4" />,
    iconEnd: <Check className="size-4 text-emerald-500" />,
    helperText: "کد رهگیری با موفقیت بررسی شد.",
  },
};

/* -------------------------------------------------------------------------- */
/*                         ۸. مقایسه تمام سایزها (Sizes)                       */
/* -------------------------------------------------------------------------- */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-72">
      <Input
        {...args}
        size="xs"
        label="سایز خیلی کوچک (xs - 28px) ویژه جدول"
        placeholder="فیلتر ستون یا سلول..."
      />
      <Input
        {...args}
        size="sm"
        label="سایز کوچک (sm - 32px)"
        placeholder="ورودی کوچک"
      />
      <Input
        {...args}
        size="default"
        label="سایز استاندارد (default - 40px)"
        placeholder="ورودی پیش‌فرض"
      />
      <Input
        {...args}
        size="lg"
        label="سایز بزرگ (lg - 48px)"
        placeholder="ورودی بزرگ"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*               ۹. کاربرد ویژه جدول ۱: فیلتر هدر ستون (Table Filter)          */
/* -------------------------------------------------------------------------- */
export const TableColumnFilter: Story = {
  render: () => {
    return (
      <div className="w-80 rounded-lg border border-border bg-card p-4 shadow-xs">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          پیش‌نمایش اینپوت فیلتر در هدر ستون جدول (`plain` + `size="xs"`):
        </p>
        <Input
          plain
          size="xs"
          placeholder="جستجوی نام خانوادگی..."
          iconStart={<Search />}
          iconEnd={
            <button
              type="button"
              className="hover:text-foreground transition-colors"
              onClick={() => alert("فیلتر پاک شد")}
              title="پاک کردن"
            >
              <X className="size-3.5" />
            </button>
          }
        />
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*           ۱۰. کاربرد ویژه جدول ۲: ویرایش سلولی اکسلی (Inline Edit)         */
/* -------------------------------------------------------------------------- */
export const TableInlineEditing: Story = {
  render: () => {
    return (
      <div className="w-112.5 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-right text-xs">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr>
              <th className="p-2.5 font-medium">ردیف</th>
              <th className="p-2.5 font-medium">عنوان آیتم (کلیک کنید برای ویرایش)</th>
              <th className="p-2.5 font-medium">موجودی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-2.5 text-muted-foreground">۱</td>
              <td className="p-1">
                <Input
                  plain
                  isTableInline
                  size="xs"
                  defaultValue="لپ‌تاپ گیمینگ ایسوس ROG"
                />
              </td>
              <td className="p-2.5">۱۲ عدد</td>
            </tr>
            <tr className="hover:bg-muted/20 transition-colors">
              <td className="p-2.5 text-muted-foreground">۲</td>
              <td className="p-1">
                <Input
                  plain
                  isTableInline
                  size="xs"
                  defaultValue="مانیتور ۲۷ اینچ دل Ultrasharp"
                />
              </td>
              <td className="p-2.5">۵ عدد</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*                     ۱۱. شبیه‌سازی فرم و اعتبارسنجی (Controlled)             */
/* -------------------------------------------------------------------------- */
export const ControlledExample: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);

    const isInvalid = touched && value.trim().length < 3;

    return (
      <div className="w-80 flex flex-col gap-3">
        <Input
          label="عنوان پروژه"
          placeholder="حداقل ۳ حرف بنویسید..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setTouched(true);
          }}
          onBlur={() => setTouched(true)}
          error={isInvalid ? "عنوان پروژه باید حداقل ۳ کاراکتر باشد." : undefined}
          helperText={!isInvalid ? "یک نام کوتاه و معنادار انتخاب کنید." : undefined}
          required
        />
      </div>
    );
  },
};
