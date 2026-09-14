import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { Toaster } from "./sonner";
import Button from "../button/button";

/**
 * کامپوننت اعلان (Toast) مبتنی بر کتابخانه sonner.
 * از طریق `sonner.tsx` و فایل `sonner.css` به‌صورت مستقل (Self-Contained) پیاده‌سازی شده
 * و به همین دلیل در هر محیطی (برنامه اصلی یا پیش‌نمایش استوری‌بوک) بدون وابستگی خارجی کار می‌کند.
 */
const meta: Meta<typeof Toaster> = {
  title: "Components/UI/Sonner (Toast)",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `این کامپوننت یک لایهٔ نمایش (Gateway) برای کتابخانهٔ \`sonner\` است.
برای نمایش هر نوع پیام، از توابع سراسری \`toast.success\`، \`toast.error\`،
\`toast.warning\`، \`toast.info\` و \`toast.loading\` استفاده می‌کنید.

- واریانت‌ها، رنگ پس‌زمینه، متن و رنگ نوار پیشرفت به‌صورت خودکار اعمال می‌شوند.
- نوار پیشرفت متحرک (Progress Bar) با فعال‌سازی \`showProgress\` نمایش داده می‌شود.
- در حالت \`loading\` نوار پیشرفت به‌صورت خودکار مخفی می‌ماند.
- دکمه‌های عملیات (\`Action\` و \`Cancel\`) به صورت خودکار در سطر زیرین توضیحات و هماهنگ با جهت راست‌به‌چپ (RTL) چیده می‌شوند.`,
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-center",
        "top-right",
        "top-left",
        "bottom-center",
        "bottom-right",
        "bottom-left",
      ],
      description: "محل قرارگیری اعلان‌ها در صفحه",
      table: {
        type: { summary: "SonnerPosition" },
        defaultValue: { summary: "top-center" },
      },
    },
    expand: {
      control: "boolean",
      description:
        "نمایش اعلان‌ها به‌صورت گسترده (بدون نیاز به هاور) در حالت پشته‌ای",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showProgress: {
      control: "boolean",
      description: "نمایش نوار پیشرفت متحرک زمان انقضای اعلان",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

/** دکمه‌های عملی تولید توست در پیش‌نمایش */
const ToastActionButtons = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-wrap items-center justify-center gap-3 p-6 border rounded-2xl bg-card border-border shadow-xs max-w-xl">
      <Button
        variant="secondary"
        onClick={() => toast("یک پیام ساده بدون وضعیت خاص")}
      >
        پیام ساده
      </Button>

      <Button
        variant="success"
        onClick={() =>
          toast.success("عملیات با موفقیت انجام شد", {
            description: "تغییرات شما در سیستم ثبت شد.",
          })
        }
      >
        موفقیت (Success)
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          toast.error("خطای سیستمی رخ داد", {
            description: "کد وضعیت: ۳۲۰ - لطفاً مجدداً تلاش فرمایید.",
          })
        }
      >
        خطا (Error)
      </Button>

      <Button
        variant="warning"
        onClick={() =>
          toast.warning("هشدار سیستم", {
            description: "مدت اعتبار جلسه کاری شما رو به اتمام است.",
          })
        }
      >
        هشدار (Warning)
      </Button>

      <Button
        variant="ghost"
        onClick={() =>
          toast.info("اطلاعیه جدید", {
            description: "کپچای امنیتی پس از ۲ دقیقه منقضی خواهد شد.",
          })
        }
      >
        اطلاع‌رسانی (Info)
      </Button>

      <Button
        variant="primary"
        onClick={() => {
          const toastId = toast.loading("در حال دریافت کپچا از سرور...");
          setTimeout(() => {
            toast.success("کپچا با موفقیت دریافت شد", { id: toastId });
          }, 2000);
        }}
      >
        بارگذاری (Loading)
      </Button>

      <Button
        variant="primary"
        outline
        onClick={() => {
          toast.dismiss();
          toast.info("اعلان اول: بررسی وضعیت شبکه");
          setTimeout(() => toast.warning("اعلان دوم: حافظه نهان پر است"), 150);
          setTimeout(() => toast.success("اعلان سوم: همگام‌سازی تکمیل شد"), 300);
        }}
      >
        ارسال چندگانه (تست پشته)
      </Button>

      <Button
        variant="ghost"
        onClick={() => toast.dismiss()}
        title="بستن تمام اعلان‌های فعال"
      >
        پاک کردن همه (Clear All)
      </Button>
    </div>
    <p className="text-xs text-muted-foreground text-center max-w-xl">
      برای تست رفتار پشته‌ای (Stacked) و گسترده، از دکمه «ارسال چندگانه» استفاده
      کنید و گزینه <code className="text-foreground">expand</code> را در کنترلز
      استوری روشن/خاموش کنید.
    </p>
  </div>
);

/** پیش‌نمایش پیش‌فرض */
export const Default: Story = {
  args: {
    position: "top-center",
    expand: false,
    showProgress: true,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} />
      <ToastActionButtons />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// ==========================================
// ۱. راه‌اندازی در ریشه برنامه (App.tsx یا RootLayout)
// ==========================================
import { Toaster } from "@/components/ui/sonner/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="rtl" lang="fa">
      <body>
        {children}
        {/* کانتینر مرکزی اعلان‌ها با نوار پیشرفت فعال */}
        <Toaster position="top-center" expand={false} showProgress={true} />
      </body>
    </html>
  );
}

// ==========================================
// ۲. نمونه فراخوانی‌های استاندارد
// ==========================================
import { toast } from "sonner";

// اعلان ساده
toast("پیام عمومی سیستم");

// موفقیت (Success)
toast.success("عملیات با موفقیت انجام شد", {
  description: "تغییرات شما در سیستم ثبت شد.",
  duration: 4000,
});

// خطا (Error)
toast.error("خطای سیستمی رخ داد", {
  description: "کد وضعیت: ۵۰۰ - اتصال به سرور برقرار نشد.",
});

// هشدار (Warning)
toast.warning("هشدار سامانه", {
  description: "مدت اعتبار جلسه کاری شما رو به اتمام است.",
});

// اطلاع‌رسانی (Info)
toast.info("اطلاعیه جدید", {
  description: "کپچای امنیتی پس از ۲ دقیقه منقضی خواهد شد.",
});

// ==========================================
// ۳. مدیریت هوشمند درخواست‌های نامتقارن (toast.promise)
// ==========================================
// مناسب برای درخواست‌های Axios یا ارسال فرم
toast.promise(api.post("/api/captcha/verify", data), {
  loading: "در حال اعتبارسنجی کپچا...",
  success: (res) => \`ورود با موفقیت انجام شد: \${res.data.userName}\`,
  error: (err) => \`خطا در ورود: \${err.response?.data?.message || "مشکل ناشناخته"}\`,
});

// ==========================================
// ۴. فرآیند دستی بارگذاری ناهمگام (Manual Loading)
// ==========================================
const toastId = toast.loading("در حال دریافت کپچا از سرور...");
try {
  const result = await fetchCaptcha();
  toast.success("کپچا با موفقیت دریافت شد", { id: toastId });
} catch (error) {
  toast.error("خطا در بارگذاری کپچا", { id: toastId });
}

// ==========================================
// ۵. بستن دستی اعلان‌ها
// ==========================================
toast.dismiss(); // بستن همه اعلان‌ها
toast.dismiss(toastId); // بستن یک اعلان خاص`,
        language: "tsx",
        format: true,
      },
    },
  },
};

/** استوری اختصاصی برای تست موقعیت‌های مختلف */
export const Positions: Story = {
  args: {
    position: "top-right",
    expand: false,
    showProgress: true,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} />
      <p className="text-sm text-muted-foreground text-center max-w-md">
        موقعیت را از بخش <strong className="text-foreground">Controls</strong> تغییر دهید تا مکان نمایش را از میان ۶ موقعیت استاندارد بررسی فرمایید.
      </p>
      <Button
        variant="primary"
        onClick={() =>
          toast.success("موقعیت اعلان تغییر یافت", {
            description: "این اعلان در مختصات مشخص شده نمایش داده می‌شود.",
          })
        }
      >
        نمایش اعلان در موقعیت انتخابی
      </Button>
    </div>
  ),
};

/** استوری اختصاصی برای مقایسه رفتار پشته‌ای (Stacked vs Expanded) */
export const StackedVsExpanded: Story = {
  args: {
    position: "bottom-right",
    expand: false,
    showProgress: true,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} />
      <p className="text-sm text-muted-foreground max-w-xl text-center">
        با سوئیچ کردن فلگ <code className="text-foreground">expand</code> تفاوت را
        بررسی کنید: <span className="text-foreground">خاموش (false)</span> حالت
        پشته‌ای فشرده و <span className="text-foreground">روشن (true)</span> نمایش
        هم‌سطح و گسترده تمام کارت‌ها.
      </p>
      <Button
        variant="primary"
        outline
        onClick={() => {
          toast.dismiss();
          toast.info("اعلان اول: بررسی وضعیت دسترسی کاربر");
          setTimeout(() => toast.warning("اعلان دوم: نسخه مرورگر قدیمی است"), 150);
          setTimeout(() => toast.success("اعلان سوم: نشست کاری تمدید شد"), 300);
        }}
      >
        ارسال هم‌زمان ۳ اعلان (تست پشته)
      </Button>
    </div>
  ),
};

/**
 * استوری تعاملی اعلان‌های دارای دکمه اقدام و انصراف (Action & Cancel)
 * بررسی چیدمان سطر دوم، فواصل و ترتیب قرارگیری دکمه‌ها در حالت RTL
 */
export const WithActions: Story = {
  args: {
    position: "top-center",
    showProgress: true,
    expand: false,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-6">
      <Toaster {...args} />
      
      <div className="flex flex-col gap-4 p-6 border rounded-2xl bg-card border-border shadow-xs max-w-2xl w-full">
        <div className="text-sm font-medium text-foreground">
          تست سناریوهای مختلف اکشن‌بار (Action Bar):
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* سناریو ۱: خطا با هر دو دکمه Action و Cancel */}
          <Button
            variant="destructive"
            onClick={() =>
              toast.error("حساب کاربری معلق شد", {
                description: "جهت رفع محدودیت نیاز به ارسال مدارک هویتی دارید.",
                action: {
                  label: "تایید مدارک",
                  onClick: () => console.log("هدایت به احراز هویت"),
                },
                cancel: {
                  label: "انصراف",
                  onClick: () => console.log("انصراف کاربر"),
                },
              })
            }
          >
            خطا: Action + Cancel
          </Button>

          {/* سناریو ۲: هشدار با قابلیت بازگردانی (Undo) */}
          <Button
            variant="warning"
            onClick={() =>
              toast.warning("فایل به سطل زباله منتقل شد", {
                description: "آیتم «گزارش_مالی.pdf» حذف موقت گردید.",
                action: {
                  label: "بازگردانی",
                  onClick: () => toast.success("فایل با موفقیت بازیابی شد"),
                },
              })
            }
          >
            هشدار: دارای بازگردانی (Undo)
          </Button>

          {/* سناریو ۳: موفقیت با دکمه مشاهده */}
          <Button
            variant="success"
            onClick={() =>
              toast.success("فایل آپلود شد", {
                description: "فایل تصویری با حجم ۴.۲ مگابایت بارگذاری گردید.",
                action: {
                  label: "مشاهده فایل",
                  onClick: () => console.log("باز کردن پیش‌نمایش"),
                },
              })
            }
          >
            موفقیت: دکمه Action
          </Button>

          {/* سناریو ۴: اطلاع‌رسانی تنها با دکمه انصراف / بستن */}
          <Button
            variant="ghost"
            onClick={() =>
              toast.info("بروزرسانی جدید در دسترس است", {
                description: "نسخه ۲.۴.۰ شامل بهبودهای امنیتی آماده نصب است.",
                cancel: {
                  label: "بعداً یادآوری کن",
                  onClick: () => {},
                },
              })
            }
          >
            اطلاعیه: فقط دکمه Cancel
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// ۱. توست با هر دو دکمه Action و Cancel (خطا):
toast.error("حساب کاربری معلق شد", {
  description: "جهت رفع محدودیت نیاز به ارسال مدارک هویتی دارید.",
  action: {
    label: "تایید مدارک",
    onClick: () => navigate("/verify"),
  },
  cancel: {
    label: "انصراف",
    onClick: () => {},
  },
});

// ۲. توست با دکمه اقدام تکی (موفقیت یا بازگردانی):
toast.success("فایل آپلود شد", {
  description: "فایل با حجم ۴.۲ مگابایت بارگذاری شد.",
  action: {
    label: "مشاهده فایل",
    onClick: () => openModal(),
  },
});

// ۳. توست تنها با دکمه انصراف:
toast.info("بروزرسانی جدید", {
  description: "نسخه جدید در دسترس است.",
  cancel: {
    label: "بعداً",
    onClick: () => {},
  },
});`,
        language: "tsx",
        format: true,
      },
    },
  },
};
