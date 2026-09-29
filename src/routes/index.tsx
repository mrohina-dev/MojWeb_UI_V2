import { lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import GeneralLayout from "@/components/layout/general-layout";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/login"));

const SvjSendFileListPage = lazy(() => import("@/pages/svj/send-file-list"));
const PayaListPage = lazy(() => import("@/pages/paya/list"));
const SatnaPage = lazy(() => import("@/pages/satna"));

export const SELECT_OPTIONS_ROUTE = "/SelectOptions";

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
        element: <GeneralLayout />,
        children: [
          // ریدایرکت خودکار روت اصلی به مسیر انتخاب سرویس
          {
            path: "/",
            element: <Navigate to={SELECT_OPTIONS_ROUTE} replace />,
          },
          // صفحه Home/انتخاب سرویس‌ها
          {
            path: "/SelectOptions",
            element: <HomePage />,
          },
          // ماژول‌های واریز
          {
            path: "/svj/SendFileList",
            element: <SvjSendFileListPage />,
          },
          {
            path: "/paya/List",
            element: <PayaListPage />,
          },
          {
            path: "/Satna",
            element: <SatnaPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={SELECT_OPTIONS_ROUTE} replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
