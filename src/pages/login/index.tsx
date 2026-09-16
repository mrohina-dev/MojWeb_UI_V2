// src/pages/login/index.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FooterLinkItem, LoginFormValues } from "./login.Type";
import { LoginImageSection } from "./LoginImageSection";
import { LoginFormSection } from "./LoginFormSection";
import PageTitle from "@/components/ui/title/title";
import logoImg from "@/assets/images/logo.png";
import { userService } from "@/services/api/user.service";
import { authStorage } from "@/services/api/client/auth-storage";
import internalDepositIcon from "@/assets/images/login-wallet.svg";
import payaDepositIcon from "@/assets/images/login-invoice.svg";

const FOOTER_LINKS: FooterLinkItem[] = [
  { icon: internalDepositIcon, label: "امکان واریز گروهی داخلی" },
  { icon: payaDepositIcon, label: "امکان واریز گروهی پایا" },
];

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaKey, setCaptchaKey] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // ۱. ارسال درخواست احراز هویت
      const response = await userService.login({
        username: data.username,
        password: data.password,
        captcha: data.captcha,
      });

      // ۲. ذخیره‌سازی نشست و توکن
      authStorage.setAuthData(response);

      // ۳. هدایت به داشبورد
      navigate("/", { replace: true });
    } catch (error) {
      // رفرش کردن تصویر کپچا با تغییر کلید
      setCaptchaKey((prev) => prev + 1);
      // ارسال خطا به فرم تا فیلد ورودی کپچا را خالی کند
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="grid min-h-screen w-full grid-cols-1 bg-background text-foreground lg:h-screen lg:grid-cols-12 lg:overflow-hidden"
    >
      {/* بخش تصویر (در موبایل بالا، در دسکتاپ ستون‌های سمت راست/چپ) */}
      <LoginImageSection className="lg:col-span-7 xl:col-span-8" />

      {/* بخش فرم ورود */}
      <section className="flex flex-col justify-between overflow-y-auto bg-background/95 p-6 backdrop-blur-xs sm:p-10 lg:col-span-5 lg:p-12 xl:col-span-4">
        <header className="flex flex-col items-center gap-3 pt-4 text-center sm:pt-6">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/5 p-1 shadow-xs">
            <img
              src={logoImg}
              alt="لوگوی سامانه"
              className="size-full object-contain"
            />
          </div>
          <PageTitle title="سامانه موج" align="center" size="md" />
        </header>

        <div className="my-auto py-6">
          <LoginFormSection
            isLoading={isLoading}
            captchaKey={captchaKey}
            onSubmit={handleSubmit}
          />
        </div>

        <footer className="w-full pt-4 pb-2">
          <div className="mx-auto flex w-full max-w-md flex-col gap-3.5 border-t border-border/70 pt-5 text-sm text-muted-foreground">
            {FOOTER_LINKS.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg p-0.5 shadow-xs">
                  <img
                    src={icon}
                    alt={label}
                    className="size-full object-contain"
                  />
                </div>
                <span className="font-medium leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
};

export default LoginPage;
