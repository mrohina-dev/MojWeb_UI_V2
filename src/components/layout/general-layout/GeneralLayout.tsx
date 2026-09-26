import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

import type { GeneralLayoutProps } from './GeneralLayout.types';
import { authStorage } from '@/services/api/client/auth-storage';
import Header from '../Header';
import ConfirmDialog from '@/components/common/confirm-dialog';

const LOGIN_ROUTE = '/login';

export const GeneralLayout = ({ children, className }: GeneralLayoutProps) => {
  const navigate = useNavigate();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNotificationsClick = () => {
    console.log('[Header Action] Notifications clicked');
  };

  const handleMessagesClick = () => {
    console.log('[Header Action] Messages clicked');
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      authStorage.clearAuthData();
      navigate(LOGIN_ROUTE, { replace: true });
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    <div
      className={cn(
        'min-h-dvh flex flex-col bg-background text-foreground',
        className
      )}
    >
      <Header
        variant="default"
        unreadNotificationsCount={0}
        unreadMessagesCount={0}
        onNotificationsClick={handleNotificationsClick}
        onMessagesClick={handleMessagesClick}
        onLogout={handleLogoutClick}
      />

      {/* اگر children داده شد نمایش می‌دهد، در غیر این‌صورت روت فرزند را با Outlet رندر می‌کند */}
      <main className="flex-1">{children ?? <Outlet />}</main>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="خروج از حساب کاربری"
        message="آیا برای خروج از سامانه موج بانک صادرات ایران اطمینان دارید؟"
        confirmText="خروج"
        cancelText="انصراف"
        variant="destructive"
        isLoading={isLoggingOut}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default GeneralLayout;
