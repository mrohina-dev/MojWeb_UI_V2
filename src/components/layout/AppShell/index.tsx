import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import Header from '../Header';
import ConfirmDialog from '@/components/common/confirm-dialog';
import { userService } from '@/services/api/user.service';
import type { AppShellProps } from './AppShell.type';

const LOGIN_ROUTE = '/login';

export function AppShell({
  children,
  showSidebarToggle = false,
  sidebar,
  className,
}: AppShellProps) {
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
      await userService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
      navigate(LOGIN_ROUTE, { replace: true });
    }
  };

  return (
    <div
      className={cn(
        'h-dvh max-h-dvh flex flex-col bg-background text-foreground overflow-hidden',
        className
      )}
    >
      {/* هدر: خودش متوجه می‌شود سایدبار وجود دارد یا نه */}
      <Header
        showSidebarToggle={showSidebarToggle}
        hasSidebar={Boolean(sidebar)}
        unreadNotificationsCount={0}
        unreadMessagesCount={0}
        onNotificationsClick={handleNotificationsClick}
        onMessagesClick={handleMessagesClick}
        onLogout={handleLogoutClick}
      />

      {/* ناحیه محتوا */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {sidebar && <div className="h-full shrink-0 flex">{sidebar}</div>}
        <main className="flex-1 min-w-0 h-full overflow-y-auto">{children}</main>
      </div>

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
}

export default AppShell;
