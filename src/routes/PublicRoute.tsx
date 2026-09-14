// اگر کاربری که قبلاً لاگین کرده دستی آدرس /login را زد، نباید دوباره فرم لاگین را ببیند، بلکه باید به / هدایت شود
import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "@/constants/auth.constants";

export const PublicRoute: FC = () => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
