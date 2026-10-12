import * as React from 'react';
import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { VariantProps } from 'class-variance-authority';
import type { tooltipVariants } from './tooltip.variants';

// تایپ بدنه Popup که مستقیماً به BaseTooltip.Popup پاس داده می‌شود
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>,
    VariantProps<typeof tooltipVariants> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  showArrow?: boolean;
  container?: HTMLElement | null;
}

// تایپ کامپوننت پوششی (Wrapper)
export interface SimpleTooltipProps extends VariantProps<typeof tooltipVariants> {
  /** محتوای داخل تولتیپ */
  content: React.ReactNode;
  /** المان نشانه (Trigger) */
  children: React.ReactElement;
  /** جهت نمایش نسبت به المان */
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  /** تاخیر در باز شدن (میلی‌ثانیه) */
  delay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;
  container?: HTMLElement | null;
  /** کلاس سفارشی برای استایل‌دهی به پاپ‌آپ */
  className?: string;
}
