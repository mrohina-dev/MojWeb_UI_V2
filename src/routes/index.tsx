import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { HomePage } from "@/pages/home/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  // مسیرهای عمومی (اگر لاگین باشد هدایت می‌شود به صفحه اصلی)
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  // مسیرهای محافظت‌شده (نیاز به لاگین دارند)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  // مسیرهای تعریف‌ نشده (404 یا Fallback)
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
