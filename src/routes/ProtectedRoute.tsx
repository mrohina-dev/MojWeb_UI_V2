import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "@/constants/auth.constants";

export const ProtectedRoute: FC = () => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
