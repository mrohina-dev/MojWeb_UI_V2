import { Bell, LogOut, MessageSquare } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import logoImg from '@/assets/images/logo2.svg';
import { ThemeToggle } from '@/shared/components/common/theme-toggle/ThemeToggle';
import { Button } from '@/shared/components/ui/button';
import Badge from '@/shared/components/ui/badge';
import { SimpleTooltip } from '@/shared/components/ui/tooltip';
import { SidebarToggle } from '@/shared/components/layout/sidebar/SidebarToggle';

import type { HeaderProps } from './Header.types';
import {
  headerActionButtonVariants,
  headerDividerVariants,
  headerLogoutButtonVariants,
  headerTitleVariants,
  headerVariants,
} from './Header.variants';

const Header = ({
  variant = 'default',
  showSidebarToggle = false,
  hasSidebar = false,
  unreadNotificationsCount = 0,
  unreadMessagesCount = 0,
  className,
  onSidebarToggle,
  onNotificationsClick,
  onMessagesClick,
  onLogout,
}: HeaderProps) => {
  // ۱. اگر showSidebarToggle باشد همه‌جا نشان می‌دهد.
  // ۲. اگر نباشد ولی hasSidebar باشد، فقط در موبایل (md:hidden) نشان می‌دهد.
  const renderSidebarToggle = () => {
    if (showSidebarToggle) {
      return (
        <SidebarToggle
          variant="menu"
          className={headerActionButtonVariants({ variant })}
          onClick={onSidebarToggle}
        />
      );
    }

    if (hasSidebar) {
      return (
        <div className="md:hidden">
          <SidebarToggle
            variant="menu"
            className={headerActionButtonVariants({ variant })}
            onClick={onSidebarToggle}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <header className={cn(headerVariants({ variant }), className)}>
      {/* برندینگ، لوگو و دکمه تاگل سایدبار */}
      <div className="flex items-center gap-2 md:gap-3">
        {renderSidebarToggle()}

        <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg shadow-xs ${variant === 'primary' ? "bg-white p-1" : "" }`}>
          <img
            // src={"/favicon.svg"}
            src={logoImg}
            alt="لوگوی بانک صادرات ایران"
            className="size-full object-contain"
          />
        </div>

        <span className={headerTitleVariants({ variant })}>
          سامانه موج بانک صادرات ایران
        </span>
      </div>

      {/* بخش ابزارها و اکشن‌ها */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle className={headerActionButtonVariants({ variant })} />

        {/* دکمه اعلان‌ها */}
        <SimpleTooltip content="اعلان‌ها" side="bottom">
          <Button
            variant="ghost"
            iconOnly
            aria-label="اعلان‌ها"
            className={cn('relative', headerActionButtonVariants({ variant }))}
            onClick={onNotificationsClick}
          >
            <Bell />
            <Badge
              count={unreadNotificationsCount}
              variant="destructive"
              placement="top-end"
            />
          </Button>
        </SimpleTooltip>

        {/* دکمه پیام‌ها */}
        <SimpleTooltip content="پیام‌ها" side="bottom">
          <Button
            variant="ghost"
            iconOnly
            aria-label="پیام‌ها"
            className={cn('relative', headerActionButtonVariants({ variant }))}
            onClick={onMessagesClick}
          >
            <MessageSquare />
            <Badge
              count={unreadMessagesCount}
              variant="info"
              placement="top-end"
            />
          </Button>
        </SimpleTooltip>

        {/* خط جداکننده */}
        <div className={headerDividerVariants({ variant })} aria-hidden="true" />

        {/* دکمه خروج */}
        <SimpleTooltip content="خروج از حساب" side="bottom">
          <Button
            variant="ghost"
            iconOnly
            aria-label="خروج از حساب"
            className={headerLogoutButtonVariants({ variant })}
            onClick={onLogout}
          >
            <LogOut />
          </Button>
        </SimpleTooltip>
      </div>
    </header>
  );
};

export default Header;
