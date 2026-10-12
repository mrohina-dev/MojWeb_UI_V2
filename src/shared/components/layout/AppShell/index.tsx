import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import Header from '../Header';
import ConfirmDialog from '@/shared/components/common/confirm-dialog';
import type { AppShellProps } from './AppShell.type';

export function AppShell({
  children,
  showSidebarToggle = false,
  sidebar,
  className,
  onLogout,
  isLoggingOut = false,
  unreadMessagesCount = 0,
  unreadNotificationsCount = 0,
}: AppShellProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);

  const handleConfirmLogout = React.useCallback(async () => {
    if (onLogout) {
      await onLogout();
    }
    setIsLogoutDialogOpen(false);
  }, [onLogout]);

  return (
    <div
      className={cn(
        'h-dvh max-h-dvh flex flex-col bg-background text-foreground overflow-hidden',
        className
      )}
    >
      <Header
        showSidebarToggle={showSidebarToggle}
        hasSidebar={Boolean(sidebar)}
        unreadNotificationsCount={unreadNotificationsCount}
        unreadMessagesCount={unreadMessagesCount}
        onNotificationsClick={() => console.log('[Header Action] Notifications')}
        onMessagesClick={() => console.log('[Header Action] Messages')}
        onLogout={() => setIsLogoutDialogOpen(true)}
      />

      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {sidebar && (
          <aside className="h-full shrink-0 flex" aria-label="منوی کناری">
            {sidebar}
          </aside>
        )}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          {children}
        </div>
      </div>

      {onLogout && (
        <ConfirmDialog
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
          title="خروج از حساب کاربری"
          message="آیا برای خروج از سامانه اطمینان دارید؟"
          confirmText="خروج"
          cancelText="انصراف"
          variant="destructive"
          isLoading={isLoggingOut}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}

export default AppShell;
