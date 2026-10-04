import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { scrollAreaVariants } from './ScrollArea.variants';

export type ComponentSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollAreaVariants> {
  /**
   * ارجاع مستقیم به المان اسکرول‌پذیر داخلی (برای برنامه‌ریزی scrollTo یا لیسنرها)
   */
  viewportRef?: React.Ref<HTMLDivElement>;
  /**
   * حداکثر ارتفاع کانتینر اسکرول
   * مثال: '300px' یا '100%' یا 'calc(100vh - 4rem)'
   */
  maxHeight?: string | number;
  /**
   * حداکثر عرض کانتینر در حالت اسکرول افقی
   */
  maxWidth?: string | number;
}
