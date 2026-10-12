import type { ModuleCardColor } from "./module-card.type";

export const colorVariants: Record<ModuleCardColor, { bg: string; text: string }> = {
  blue: {
    bg: 'bg-primary-50',
    text: 'text-primary-600',
  },
  emerald: {
    bg: 'bg-success-50',
    text: 'text-success-600',
  },
  violet: {
    bg: 'bg-info-50',
    text: 'text-info-600',
  },
  amber: {
    bg: 'bg-warning-50',
    text: 'text-warning-600',
  },
  rose: {
    bg: 'bg-destructive-50',
    text: 'text-destructive-600',
  },
};
