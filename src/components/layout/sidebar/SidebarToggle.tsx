import { ChevronsLeft, ChevronsRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleTooltip } from '@/components/ui/tooltip';
import { useSidebar } from './useSidebar';

interface SidebarToggleProps {
  className?: string;
  onClick?: () => void;
  /**
   * اجبار به نمایش آیکون همبرگری منو (مثلاً مخصوص استفاده در هدر)
   * در صورت مشخص نشدن، در موبایل خودکار `menu` و در دسکتاپ `collapse` خواهد بود.
   */
  variant?: 'default' | 'menu';
}

export function SidebarToggle({
  className,
  onClick,
  variant,
}: SidebarToggleProps) {
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      toggleSidebar();
    }
  };

  // تعیین اینکه آیا باید آیکون همبرگری نشان داده شود یا فلش‌های جمع‌شونده
  const isMenuIcon = variant === 'menu' || isMobile;

  const label = isMenuIcon
    ? 'منوی سامانه'
    : isCollapsed
      ? 'باز کردن سایدبار'
      : 'بستن سایدبار';

  return (
    <SimpleTooltip content={label} side="bottom">
      <Button
        variant="ghost"
        iconOnly
        size="sm"
        onClick={handleClick}
        aria-label={label}
        className={className}
      >
        {isMenuIcon ? (
          <Menu className="size-5" />
        ) : isCollapsed ? (
          <ChevronsLeft className="size-4.5 rtl:rotate-180 transition-transform duration-200" />
        ) : (
          <ChevronsRight className="size-4.5 rtl:rotate-180 transition-transform duration-200" />
        )}
      </Button>
    </SimpleTooltip>
  );
}
