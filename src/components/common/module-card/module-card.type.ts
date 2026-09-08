import type { ReactNode } from 'react';

export type ModuleCardColor = 'blue' | 'emerald' | 'violet' | 'amber' | 'rose';

export interface ModuleCardProps {
  title: string;
  description?: ReactNode | string[];
  icon?: ReactNode;
  iconBgColor?: ModuleCardColor;
  badge?: string;
  actionText?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
