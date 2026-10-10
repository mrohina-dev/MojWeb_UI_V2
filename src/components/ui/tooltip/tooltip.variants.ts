import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  [
    'z-100 select-none rounded-md shadow-md text-start break-words pointer-events-none',
    'transition-all duration-150 ease-out',
    // هماهنگ با Base UI و Tailwind v4
    'data-open:opacity-100 data-open:scale-100',
    'data-closed:opacity-0 data-closed:scale-95',
    'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
    'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
    // انیمیشن بر اساس جهت پوزیشن در Base UI
    'data-[side=top]:slide-in-from-bottom-1',
    'data-[side=bottom]:slide-in-from-top-1',
    'data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1',
  ],
  {
    variants: {
      variant: {
        default:
          'border border-border bg-popover text-popover-foreground [&_[data-part=arrow]]:fill-popover [&_[data-part=arrow]]:stroke-border',
        dark:
          'bg-foreground text-background [&_[data-part=arrow]]:fill-foreground',
        info:
          'border border-info-500/30 bg-info-50 text-info-950 [&_[data-part=arrow]]:fill-info-50 [&_[data-part=arrow]]:stroke-info-500/30',
        success:
          'border border-success-500/30 bg-success-50 text-success-950 [&_[data-part=arrow]]:fill-success-50 [&_[data-part=arrow]]:stroke-success-500/30',
        destructive:
          'border border-destructive-500/30 bg-destructive-50 text-destructive-950 [&_[data-part=arrow]]:fill-destructive-50 [&_[data-part=arrow]]:stroke-destructive-500/30',
      },
      size: {
        sm: 'max-w-xs px-2 py-1 text-[11px] leading-tight',
        default: 'max-w-xs px-3 py-1.5 text-xs leading-normal font-medium',
        lg: 'max-w-sm px-4 py-2 text-sm leading-relaxed',
        xl: 'max-w-md px-5 py-2.5 text-sm leading-relaxed font-normal',
        full: 'w-full max-w-full px-4 py-2 text-sm leading-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
