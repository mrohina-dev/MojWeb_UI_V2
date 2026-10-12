import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStorage } from "@/shared/services/http/auth-storage";

export const ProtectedRoute: FC = () => {
  const isAuth = authStorage.isAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
