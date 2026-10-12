import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import GeneralLayout from '@/shared/components/layout/GeneralLayout';
import ModuleLayout from '@/shared/components/layout/ModuleLayout';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const LoginPage = lazy(() => import('@/pages/login'));

const SvjSendFileListPage = lazy(() => import('@/pages/svj/sendFileList'));
const PayaListPage = lazy(() => import('@/pages/paya/list'));
const SatnaPage = lazy(() => import('@/pages/satna'));

export const SELECT_OPTIONS_ROUTE = '/SelectOptions';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      // 1. مسیر Home (تنها هدر دارد، بدون سایدبار)
      {
        element: <GeneralLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to={SELECT_OPTIONS_ROUTE} replace />,
          },
          {
            path: '/SelectOptions',
            element: <HomePage />,
          },
        ],
      },

      // 2. ماژول واریز گروهی (SVJ)
      {
        element: <ModuleLayout moduleKey="svj" />,
        children: [
          {
            path: '/svj/SendFileList',
            element: <SvjSendFileListPage />,
          },
        ],
      },

      // 3. ماژول پایا (Paya)
      {
        element: <ModuleLayout moduleKey="paya" />,
        children: [
          {
            path: '/paya/List',
            element: <PayaListPage />,
          },
        ],
      },

      // 4. ماژول ساتنا (Satna)
      {
        element: <ModuleLayout moduleKey="satna" />,
        children: [
          {
            path: '/Satna/List',
            element: <SatnaPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={SELECT_OPTIONS_ROUTE} replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
