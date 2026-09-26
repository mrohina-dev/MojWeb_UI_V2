import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  [
    'z-50 max-w-xs select-none rounded-md shadow-md text-start break-words',
    'transition-all duration-150 ease-out',
    // انیمیشن‌های وضعیت باز/بسته
    'data-[state=open]:opacity-100 data-[state=open]:scale-100',
    'data-[state=closed]:opacity-0 data-[state=closed]:scale-95',
    'data-[side=top]:slide-in-from-bottom-1 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1',
  ],
  {
    variants: {
      variant: {
        // ۱. تم پیش‌فرض کارت و پاپ‌اور (هماهنگ با popover و border سیستم)
        default:
          'border border-border bg-popover text-popover-foreground [&_[data-part=arrow]]:fill-popover [&_[data-part=arrow]]:stroke-border',

        // ۲. تم کنتراست معکوس (تیره در لایت مد / روشن در دارک مد با رنگ‌های معکوس اصلی)
        dark:
          'bg-foreground text-background [&_[data-part=arrow]]:fill-foreground',

        // ۳. تم اطلاع‌رسانی هماهنگ با توکن‌های Info سیستم (OKLCH تم ۲۷۵)
        info:
          'border border-info-500/30 bg-info-50 text-info-950 [&_[data-part=arrow]]:fill-info-50 [&_[data-part=arrow]]:stroke-info-500/30',

        // ۴. تم موفقیت (Success هماهنگ با تم ۱۵۵) - در صورت نیاز
        success:
          'border border-success-500/30 bg-success-50 text-success-950 [&_[data-part=arrow]]:fill-success-50 [&_[data-part=arrow]]:stroke-success-500/30',

        // ۵. تم هشدار / خطا (Destructive هماهنگ با تم ۲۵) - در صورت نیاز
        destructive:
          'border border-destructive-500/30 bg-destructive-50 text-destructive-950 [&_[data-part=arrow]]:fill-destructive-50 [&_[data-part=arrow]]:stroke-destructive-500/30',
      },
      size: {
        sm: 'px-2 py-1 text-[11px] leading-tight',
        default: 'px-3 py-1.5 text-xs leading-normal font-medium',
        lg: 'px-4 py-2 text-sm leading-relaxed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
