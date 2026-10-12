import React from "react";
import { useForm, Controller } from "react-hook-form";
import { User, Lock } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { CaptchaInput } from "@/shared/components/common/captcha/captcha-input";
import { Button } from "@/shared/components/ui/button";
import type { LoginFormValues, LoginFormSectionProps } from "../types/login.types";

export const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  isLoading,
  captchaKey,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    try {
      await onSubmit(data);
    } catch {
      // بعد از خطای لاگین، مقدار اینپوت کپچا در فرم خالی می‌شود
      setValue("captcha", "");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-7">
        <Input
          label="نام کاربری"
          placeholder="نام کاربری خود را وارد کنید"
          iconStart={<User className="size-4" />}
          disabled={isLoading}
          error={errors.username?.message}
          {...register("username")}
        />

        <PasswordInput
          label="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          iconStart={<Lock className="size-4" />}
          disabled={isLoading}
          error={errors.password?.message}
          {...register("password")}
        />

        <Controller
          name="captcha"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CaptchaInput
              key={captchaKey}
              label="کلمه تصادفی"
              placeholder="کد امنیتی"
              size="default"
              disabled={isLoading}
              error={error?.message}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          className="mt-2"
        >
          ورود
        </Button>
      </form>
    </div>
  );
};

export default LoginFormSection;
