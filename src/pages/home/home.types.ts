import type { ReactNode } from 'react';

export interface SampleFileItem {
  title: string;
  endpoint: string;
  defaultFileName: string;
  className?: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  icon: ReactNode;
  iconBgColor: 'blue' | 'emerald' | 'violet';
  badge?: string;
  route: string;
  actionText: string;
  descriptions: string[];
  sampleFiles?: SampleFileItem[];
}

export interface HomeNoticeBannerProps {
  title?: string;
  description: ReactNode;
  className?: string;
}