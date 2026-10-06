import { Outlet } from 'react-router-dom';
import AppShell from '../AppShell';

/**
 * پوسته صفحه انتخاب سرویس‌ها (Home):
 * بدون سایدبار و بدون دکمه منو در هدر
 */
export const GeneralLayout = () => {
  return (
    <AppShell showSidebarToggle={false}>
      <Outlet />
    </AppShell>
  );
};

export default GeneralLayout;
