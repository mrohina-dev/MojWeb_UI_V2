import type { FC } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { HomeNoticeBannerProps } from '../home.types';

export const HomeNoticeBanner: FC<HomeNoticeBannerProps> = ({
  title = 'توجه',
  description,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`mb-6 flex items-center gap-3 rounded-xl border border-warning-500/30 bg-warning-50/70 p-4 text-sm leading-relaxed shadow-xs ${className}`}
    >
      <AlertTriangle className="size-6 shrink-0 text-warning-600 lg:size-7" />
      <div className="space-y-1">
        {title && <p className="font-semibold text-warning-700">{title}</p>}
        <div className="text-muted-foreground text-xs leading-normal">{description}</div>
      </div>
    </div>
  );
};
