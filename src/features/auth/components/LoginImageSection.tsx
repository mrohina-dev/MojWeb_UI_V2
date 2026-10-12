import React from "react";
import loginBg from "@/assets/images/saderat-flag-hd-wallpaper.jpg";
import type { LoginImageSectionProps } from "../types/login.types";

export const LoginImageSection: React.FC<LoginImageSectionProps> = ({ className = "" }) => (
  <section className={`relative flex items-center justify-center overflow-hidden bg-muted/20 ${className}`}>
    <img
      src={loginBg}
      alt="تصویر پس‌زمینه ورود"
      loading="eager"
      className="h-full w-full select-none object-contain pointer-events-none"
    />
  </section>
);
