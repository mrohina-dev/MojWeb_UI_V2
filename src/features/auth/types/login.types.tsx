// src/features/auth/types/login.types.ts
export interface LoginFormValues {
  username: string;
  password: string;
  captcha: string;
}

export interface LoginFormSectionProps {
  isLoading: boolean;
  captchaKey: number;
  onSubmit: (values: LoginFormValues) => Promise<void>; // تبدیل به Promise<void>
}

export interface FooterLinkItem {
  icon: string;
  label: string;
}

export interface LoginImageSectionProps {
  className?: string;
}
