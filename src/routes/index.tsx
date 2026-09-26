import { lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import GeneralLayout from "@/components/layout/general-layout";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/login"));

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        // لایوت کلی هدر برای تمام صفحات محافظت‌شده
        element: <GeneralLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          // صفحات بعدی (ماژول‌ها، گزارش‌ها و ...) خیلی تمیز اینجا اضافه می‌شوند
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
