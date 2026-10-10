import { Outlet, useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppShell from '../AppShell';
import { userService } from '@/services/api/user.service';

const LOGIN_ROUTE = '/login';

export const GeneralLayout = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = React.useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await userService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [navigate]);

  return (
    <AppShell
      showSidebarToggle={false}
      onLogout={handleLogout}
      isLoggingOut={isLoggingOut}
    >
      <Outlet />
    </AppShell>
  );
};

export default GeneralLayout;
