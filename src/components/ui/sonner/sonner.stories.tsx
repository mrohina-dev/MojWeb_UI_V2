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
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg", "full"],
      description: "اندازه عرض کارت اعلان بر اساس ToastVariantProps",
      table: {
        type: { summary: "'default' | 'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: "default" },
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
    size: "default",
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
        {/* کانتینر مرکزی اعلان‌ها با نوار پیشرفت فعال و سایز پیش‌فرض */}
        <Toaster position="top-center" size="default" expand={false} showProgress={true} />
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

/** لیست تمام سایزها به ترتیب و به‌صورت هم‌زمان بدون وابستگی به Controls */
export const Sizes: Story = {
  render: () => {
    const SIZES = [
      {
        id: "toaster-size-default",
        name: "default",
        label: "سایز پیش‌فرض (فیت کانتنت: min-w: 16rem - max-w: md)",
        description: "عرض کارت خودکار و بر اساس طول متن پیام تنظیم می‌شود.",
      },
      {
        id: "toaster-size-sm",
        name: "sm",
        label: "سایز کوچک (Small: 18rem)",
        description: "مناسب برای پیام‌های کوتاه، تایید سریع و نوتیفیکیشن‌های مختصر.",
      },
      {
        id: "toaster-size-md",
        name: "md",
        label: "سایز متوسط (Medium: 22rem)",
        description: "اندازه متداول برای پیام‌هایی که عنوان و یک خط توضیحات دارند.",
      },
      {
        id: "toaster-size-lg",
        name: "lg",
        label: "سایز بزرگ (Large: 28rem)",
        description: "مناسب برای پیام‌های چندسطری، لاگ‌های خطا یا کارت‌های دارای دکمه Action.",
      },
      {
        id: "toaster-size-full",
        name: "full",
        label: "تمام‌عرض (Full: 100%)",
        description: "تمام پهنای در دسترس کانتینر والد خود را پوشش می‌دهد.",
      },
    ] as const;

    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl py-4">
        {/* رندر هم‌زمان Toasterها با شناسه‌های مستقل */}
        {SIZES.map((s) => (
          <Toaster
            key={s.id}
            id={s.id}
            size={s.name}
            position="top-center"
            showProgress
          />
        ))}

        <div className="text-center">
          <h3 className="text-base font-bold text-foreground">
            بررسی هم‌زمان تمام سایزهای Toast
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            با کلیک روی هر دکمه، اعلان در سایز مربوطه نمایش داده می‌شود:
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SIZES.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 p-4 border rounded-xl bg-card border-border shadow-xs"
            >
              <div className="flex flex-col gap-1 text-right">
                <span className="text-sm font-semibold text-foreground">
                  {s.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {s.description}
                </span>
              </div>

              <Button
                variant="primary"
                onClick={() =>
                  toast.info(`اعلان با سایز ${s.name}`, {
                    description: s.description,
                    toasterId: s.id,
                  })
                }
              >
                نمایش سایز {s.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// استفاده از سایزهای مختلف در Toaster:
// <Toaster size="default" /> // فیت کانتنت (پیش‌فرض)
// <Toaster size="sm" />      // 18rem
// <Toaster size="md" />      // 22rem
// <Toaster size="lg" />      // 28rem
// <Toaster size="full" />    // 100% عرض والد`,
        language: "tsx",
        format: true,
      },
    },
  },
};

/** نمایش و تست تمام موقعیت‌های ۶‌گانه به‌صورت هم‌زمان و چیدمان فضایی صفحه */
export const Positions: Story = {
  render: () => {
    const POSITIONS = [
      { id: "pos-top-right", name: "top-right", label: "بالا - راست (Top Right)" },
      { id: "pos-top-center", name: "top-center", label: "بالا - وسط (Top Center)" },
      { id: "pos-top-left", name: "top-left", label: "بالا - چپ (Top Left)" },
      { id: "pos-bottom-right", name: "bottom-right", label: "پایین - راست (Bottom Right)" },
      { id: "pos-bottom-center", name: "bottom-center", label: "پایین - وسط (Bottom Center)" },
      { id: "pos-bottom-left", name: "bottom-left", label: "پایین - چپ (Bottom Left)" },
    ] as const;

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl py-4">
        {/* ایجاد Toaster اختصاصی برای هر کدام از ۶ موقعیت */}
        {POSITIONS.map((p) => (
          <Toaster
            key={p.id}
            id={p.id}
            position={p.name}
            showProgress
          />
        ))}

        <div className="text-center">
          <h3 className="text-base font-bold text-foreground">
            بررسی هم‌زمان موقعیت‌های ۶‌گانه صفحه
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            روی هر موقعیت در ماکت زیر کلیک کنید تا اعلان دقیقاً در همان جایگاه ظاهر شود:
          </p>
        </div>

        {/* ماکت نمایشی صفحه برای شبیه‌سازی ۶ گوشه و مرکز */}
        <div className="w-full border-2 border-dashed border-border rounded-2xl p-6 bg-muted/20 flex flex-col gap-8 shadow-xs">
          {/* ردیف موقعیت‌های بالا */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                toast.success("اعلان: بالا راست", {
                  description: "موقعیت top-right فعال شد.",
                  toasterId: "pos-top-right",
                })
              }
            >
              بالا - راست (Top Right)
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                toast.info("اعلان: بالا وسط", {
                  description: "موقعیت پیش‌فرض top-center فعال شد.",
                  toasterId: "pos-top-center",
                })
              }
            >
              بالا - وسط (Top Center)
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                toast.warning("اعلان: بالا چپ", {
                  description: "موقعیت top-left فعال شد.",
                  toasterId: "pos-top-left",
                })
              }
            >
              بالا - چپ (Top Left)
            </Button>
          </div>

          <div className="text-center py-4 text-xs font-mono text-muted-foreground border-y border-dashed border-border/60">
            [ ناحیه محتوای اصلی نرم‌افزار (Viewport Area) ]
          </div>

          {/* ردیف موقعیت‌های پایین */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                toast.success("اعلان: پایین راست", {
                  description: "موقعیت bottom-right فعال شد.",
                  toasterId: "pos-bottom-right",
                })
              }
            >
              پایین - راست (Bottom Right)
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                toast.info("اعلان: پایین وسط", {
                  description: "موقعیت bottom-center فعال شد.",
                  toasterId: "pos-bottom-center",
                })
              }
            >
              پایین - وسط (Bottom Center)
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                toast.error("اعلان: پایین چپ", {
                  description: "موقعیت bottom-left فعال شد.",
                  toasterId: "pos-bottom-left",
                })
              }
            >
              پایین - چپ (Bottom Left)
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// تنظیم موقعیت دلخواه در Toaster:
<Toaster position="top-center" />    // پیش‌فرض
<Toaster position="top-right" />
<Toaster position="top-left" />
<Toaster position="bottom-center" />
<Toaster position="bottom-right" />
<Toaster position="bottom-left" />`,
        language: "tsx",
        format: true,
      },
    },
  },
};

/** استوری اختصاصی برای مقایسه رفتار پشته‌ای (Stacked vs Expanded) */
export const StackedVsExpanded: Story = {
  args: {
    position: "bottom-right",
    size: "default",
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
    size: "default",
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
