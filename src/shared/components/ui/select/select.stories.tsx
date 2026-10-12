import type { Meta, StoryObj } from "@storybook/react-vite";
import { Building2, Shield, User } from "lucide-react";
import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectGroupLabel,
    SelectItem,
    SelectRoot,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "./index";
import { Label } from "../label";
import type { SelectOption, SelectOptionGroup } from "./select.types";

const meta: Meta<typeof Select> = {
    title: "Components/UI/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
### کامپوننت انتخابگر (Select)
یک فیلد انتخابی پیشرفته با پشتیبانی کامل از **RTL**، استایل‌های استاندارد سازگار با \`Input\` پروژه، ساخته‌شده بر پایه \`@base-ui/react\` و **Tailwind CSS v4**.

---

### ویژگی‌های کلیدی
- **هماهنگ با فرم‌ها و Input**: دارای همان اندازه، رنگ‌های بردر فوکوس، ارتفاع (\`sm: h-8\`, \`default: h-10\`, \`lg: h-12\`)، و رفتار اعتبارسنجی خطا.
- **وضعیت بارگذاری (Loading)**: پشتیبانی از دریافت داده‌های async، نمایش اسپینر متحرک به جای فلش بازشو، و غیرفعال‌سازی خودکار تریگر.
- **جست‌وجوی داخلی (Searchable)**: فیلد جست‌وجو در بالای پاپ‌آپ پین می‌شود، گزینه‌ها را به صورت آنی فیلتر می‌کند و از بسته شدن ناخواسته یا تداخل کلیدهای Space و جهت‌نما جلوگیری می‌نماید.
- **اسکرول هوشمند و Responsive**: محدودیت ارتفاع پاپ‌آپ با \`--available-height\` برای جلوگیری از خروج از Viewport و اسکرول مجزای گزینه‌ها.
- **نگاشت خودکار Label/Value**: فیلد در استیت و فرم مقدار انگلیسی استاندارد (\`value\`) را نگه می‌دارد، اما در رابط کاربری عنوان فارسی (\`label\`) را نمایش می‌دهد.
- **پشتیبانی از هر دو الگوی Shorthand و Compound**: مناسب برای کاربردهای سریع فرمی و سناریوهای سفارشی.
        `,
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "اندازه فیلد (sm: h-8, default: h-10, lg: h-12)",
        },
        isLoading: {
            control: "boolean",
            description: "نمایش اسپینر چرخشی به جای آیکون فلش و قفل موقت فیلد حین دریافت داده از سرور",
        },
        loadingText: {
            control: "text",
            description: "متن پیام در حال بارگذاری درون پاپ‌آپ",
        },
        searchable: {
            control: "boolean",
            description: "فعال‌سازی فیلد جست‌وجو در بالای فهرست گزینه‌ها",
        },
        searchPlaceholder: {
            control: "text",
            description: "متن پیش‌فرض درون فیلد جست‌وجو",
        },
        searchDebounceMs: {
            control: "number",
            description: "میزان تاخیر جست‌وجو برحسب میلی‌ثانیه (پیش‌فرض ۰ برای سرچ آنی در حافظه)",
        },
        maxPopupHeightClass: {
            control: "text",
            description: "کلاس اختیاری Tailwind جهت سفارشی‌سازی حداکثر ارتفاع پاپ‌آپ (مانند max-h-80)",
        },
        fullWidth: {
            control: "boolean",
            description: "اشغال ۱۰۰٪ عرض والد (پیش‌فرض true)",
        },
        disabled: {
            control: "boolean",
            description: "غیرفعال‌سازی فیلد و تغییر استایل پس‌زمینه به muted/40",
        },
        required: {
            control: "boolean",
            description: "نمایش نشانگر فیلد الزامی بر روی Label اختصاصی",
        },
        align: {
            control: "select",
            options: ["start", "center", "end"],
            description: "تراز افقی منوی پاپ‌آپ نسبت به تریگر",
        },
        side: {
            control: "select",
            options: ["top", "bottom", "left", "right"],
            description: "جهت باز شدن منوی پاپ‌آپ",
        },
        placeholder: {
            control: "text",
            description: "متن نگهدارنده داخل تریگر",
        },
        label: {
            control: "text",
            description: "برچسب بالای فیلد با کامپوننت Label",
        },
        helperText: {
            control: "text",
            description: "متن راهنما زیر فیلد",
        },
        error: {
            control: "text",
            description: "پیام خطای اعتبارسنجی با انیمیشن ورود و استایل destructive",
        },
        emptyText: {
            control: "text",
            description: "متن نمایش در صورت پیدا نشدن نتیجه در جست‌وجو یا خالی بودن گزینه‌ها",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

// داده‌های نمونه
const statusOptions: readonly SelectOption[] = [
    { value: "pending", label: "در انتظار بررسی" },
    { value: "in_progress", label: "در حال انجام" },
    { value: "completed", label: "تکمیل شده" },
    { value: "rejected", label: "رد شده", disabled: true },
];

const provinceOptions: readonly SelectOption[] = [
    { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" },
    { value: "fars", label: "فارس (شیراز)" },
    { value: "khorasan_razavi", label: "خراسان رضوی (مشهد)" },
    { value: "east_azarbaijan", label: "آذربایجان شرقی (تبریز)" },
    { value: "west_azarbaijan", label: "آذربایجان غربی (ارومیه)" },
    { value: "khuzestan", label: "خوزستان (اهواز)" },
    { value: "mazandaran", label: "مازندران (ساری)" },
    { value: "gilan", label: "گیلان (رشت)" },
    { value: "kerman", label: "کرمان" },
    { value: "alborz", label: "البرز (کرج)" },
    { value: "qom", label: "قم" },
    { value: "yazd", label: "یزد" },
    { value: "hamedan", label: "همدان" },
    { value: "qazvin", label: "قزوین" },
    { value: "zanjan", label: "زنجان" },
];

const organizationOptions: readonly (SelectOption | SelectOptionGroup)[] = [
    {
        label: "کارکنان ستاد",
        options: [
            { value: "u_1", label: "علی علوی (مدیریت پروژه)" },
            { value: "u_2", label: "سارا حسینی (توسعه‌دهنده نرم‌افزار)" },
            { value: "u_3", label: "رضا محمدی (غیرفعال)", disabled: true },
        ],
    },
    {
        label: "دپارتمان‌ها و واحدها",
        options: [
            { value: "dep_it", label: "فناوری اطلاعات و زیرساخت" },
            { value: "dep_hr", label: "منابع انسانی و اداری" },
            { value: "dep_finance", label: "امور مالی و حسابداری" },
            { value: "dep_commerce", label: "بازرگانی و توسعه بازار" },
        ],
    },
];

// ---------------- ۱. حالت پیش‌فرض (Default Shorthand) ----------------
export const Default: Story = {
    args: {
        label: "وضعیت پرونده",
        placeholder: "یک وضعیت انتخاب کنید...",
        helperText: "وضعیت جاری پرونده را مشخص فرمایید.",
        options: statusOptions,
        size: "default",
        fullWidth: true,
    },
    render: (args) => (
        <div className="flex min-h-72 items-start justify-center p-6">
            <div className="w-full max-w-sm">
                <Select {...args} />
            </div>
        </div>
    ),
};

// ---------------- ۲. وضعیت بارگذاری (Loading State) ----------------
export const LoadingState: Story = {
    render: () => (
        <div className="flex min-h-80 items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
                <Select
                    label="استان‌ها (دریافت اولیه از API)"
                    placeholder="در حال فراخوانی اطلاعات..."
                    options={[]}
                    isLoading
                    helperText="هنگام لودینگ اولیه، اسپینر متحرک نمایش داده شده و کلیک مسدود است."
                />

                <Select
                    label="نمایندگی منتخب (به‌روزرسانی هم‌زمان)"
                    options={statusOptions}
                    defaultValue="in_progress"
                    isLoading
                    helperText="حفظ مقدار فعلی در زمان ری‌فچ (Refetch) داده‌ها با اسپینر فعال"
                />
            </div>
        </div>
    ),
};

// ---------------- ۳. جست‌وجو در گزینه‌ها (Searchable) ----------------
export const Searchable: Story = {
    render: () => (
        <div className="flex min-h-96 items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
                <Select
                    label="استان محل سکونت (جست‌وجوی سریع)"
                    placeholder="جست‌وجو و انتخاب استان..."
                    options={provinceOptions}
                    searchable
                    searchPlaceholder="نام استان را تایپ کنید..."
                    emptyText="استانی با این مشخصات یافت نشد"
                    helperText="جست‌وجوی کلاینت با فیلتر آنی"
                />

                <Select
                    label="واحد یا پرسنل (جست‌وجو در گروه‌ها)"
                    placeholder="جست‌وجو در بخش‌ها و افراد..."
                    options={organizationOptions}
                    searchable
                    searchPlaceholder="جست‌وجوی عنوان یا نام..."
                    emptyText="موردی مطابقت ندارد"
                />
            </div>
        </div>
    ),
};

// ---------------- ۴. لیست طولانی و اسکرول هوشمند (Scroll & Max Height) ----------------
export const LongListWithScroll: Story = {
    render: () => (
        <div className="flex min-h-96 items-start justify-center p-6">
            <div className="w-full max-w-sm">
                <Select
                    label="فهرست کامل استان‌ها (اسکرول داخلی)"
                    placeholder="انتخاب استان از لیست طویل..."
                    options={provinceOptions}
                    searchable
                    helperText="پاپ‌آپ حداکثر ارتفاع مشخص دارد و محتوا به آرامی اسکرول می‌شود."
                />
            </div>
        </div>
    ),
};

// ---------------- ۵. کنترل‌شده با State (Controlled) ----------------
export const Controlled: Story = {
    render: function ControlledExample() {
        const [value, setValue] = React.useState<string | null>("in_progress");

        return (
            <div className="flex min-h-72 items-start justify-center p-6">
                <div className="w-full max-w-sm space-y-3">
                    <Select
                        label="وضعیت سفارش (Controlled)"
                        value={value ?? undefined}
                        onValueChange={setValue}
                        options={statusOptions}
                        helperText="همگام با State محلی فرم"
                    />
                    <div className="rounded-md border bg-muted/30 p-2.5 text-xs text-muted-foreground flex justify-between">
                        <span>مقدار انگلیسی در State:</span>
                        <span className="font-mono font-bold text-foreground">
                            {value || "هیچ‌کدام"}
                        </span>
                    </div>
                </div>
            </div>
        );
    },
};

// ---------------- ۶. دسته‌بندی گزینه‌ها (Groups) ----------------
export const WithGroups: Story = {
    render: () => (
        <div className="flex min-h-80 items-start justify-center p-6">
            <div className="w-full max-w-sm">
                <Select
                    label="انتخاب واحد یا مسئول"
                    placeholder="شخص یا واحد سازمانی مورد نظر..."
                    options={organizationOptions}
                    helperText="امکان تفکیک گزینه‌ها با عناوین گروهی مجزا"
                />
            </div>
        </div>
    ),
};

// ---------------- ۷. همراه با آیکون ابتدا (Leading Icon) ----------------
export const WithLeadingIcon: Story = {
    render: () => (
        <div className="flex min-h-80 items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-4">
                <Select
                    label="کارشناس ارجاع"
                    placeholder="انتخاب کارشناس..."
                    options={statusOptions}
                    iconStart={<User className="size-4" />}
                />
                <Select
                    label="واحد سازمانی"
                    placeholder="انتخاب شعبه..."
                    options={[
                        { value: "tehran", label: "دفتر مرکزی - تهران" },
                        { value: "isfahan", label: "شعبه اصفهان" },
                    ]}
                    iconStart={<Building2 className="size-4" />}
                />
            </div>
        </div>
    ),
};

// ---------------- ۸. اندازه‌ها (Sizes - هماهنگ با Input) ----------------
export const Sizes: Story = {
    render: () => (
        <div className="flex min-h-96 items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-5">
                <Select
                    label="اندازه کوچک (Small - h-8)"
                    size="sm"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    searchable
                />
                <Select
                    label="اندازه پیش‌فرض (Default - h-10)"
                    size="default"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    searchable
                />
                <Select
                    label="اندازه بزرگ (Large - h-12)"
                    size="lg"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    searchable
                />
            </div>
        </div>
    ),
};

// ---------------- ۹. وضعیت‌ها (States) ----------------
export const States: Story = {
    render: () => (
        <div className="flex min-h-96 items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-5">
                <Select
                    label="وضعیت بارگذاری (Loading)"
                    placeholder="در حال دریافت داده..."
                    options={[]}
                    isLoading
                    helperText="در زمان انتظار پاسخ سرور، کاربر از طریق انیمیشن لودینگ آگاه می‌شود."
                />
                <Select
                    label="وضعیت خطا (Error)"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    error="انتخاب این فیلد اجباری است."
                />
                <Select
                    label="الزامی (Required)"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    required
                    helperText="فیلدهای ستاره‌دار باید تکمیل گردند."
                />
                <Select
                    label="غیرفعال (Disabled)"
                    placeholder="انتخاب وضعیت..."
                    options={statusOptions}
                    disabled
                    defaultValue="pending"
                    helperText="امکان ویرایش این فیلد مسدود شده است."
                />
            </div>
        </div>
    ),
};

// ---------------- ۱۰. الگوی ترکیبی (Compound API) ----------------
export const CompoundUsage: Story = {
    render: () => (
        <div className="flex min-h-80 items-start justify-center p-6">
            <div className="flex flex-col gap-1.5 w-full max-w-sm text-right">
                <Label htmlFor="compound-select">سطح دسترسی (الگوی ترکیبی)</Label>

                <SelectRoot defaultValue="admin">
                    <SelectTrigger id="compound-select" fullWidth>
                        <div className="flex items-center gap-2 truncate">
                            <Shield className="size-4 shrink-0 text-muted-foreground" />
                            <SelectValue placeholder="سطح دسترسی را مشخص کنید" />
                        </div>
                    </SelectTrigger>

                    <SelectContent side="bottom" align="start">
                        <SelectGroup>
                            <SelectGroupLabel>مدیریتی</SelectGroupLabel>
                            <SelectItem value="superadmin">مدیر ارشد سامانه</SelectItem>
                            <SelectItem value="admin">مدیر فنی</SelectItem>
                        </SelectGroup>

                        <SelectSeparator />

                        <SelectGroup>
                            <SelectGroupLabel>عملیاتی</SelectGroupLabel>
                            <SelectItem value="operator">اپراتور داده</SelectItem>
                            <SelectItem value="viewer" disabled>
                                مشاهده‌گر (غیرفعال)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </SelectRoot>
            </div>
        </div>
    ),
};
