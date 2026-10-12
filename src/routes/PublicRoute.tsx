import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/shared/services/http/auth-storage";

export const PublicRoute: FC = () => {
  const isAuth = authStorage.isAuthenticated();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
