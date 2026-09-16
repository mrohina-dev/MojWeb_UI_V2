
export interface LoginFormValues {
  username: string;
  password: string;
  captcha: string;
}

export interface LoginFormSectionProps {
  isLoading: boolean;
  captchaKey: number;
  onSubmit: (values: LoginFormValues) => void; // ← فقط این
}

export interface FooterLinkItem {
  icon: string;
  label: string;
}

export interface LoginImageSectionProps {
  className?: string;
}
