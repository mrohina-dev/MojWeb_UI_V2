import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ModuleCardProps } from './module-card.type';
import { colorVariants } from './module-card.variant';

const renderDescription = (description: ModuleCardProps['description']) => {
  if (!description) return null;

  if (Array.isArray(description)) {
    return (
      <div className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
        {description.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
      {description}
    </div>
  );
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  iconBgColor = 'blue',
  badge,
  actionText = 'مشاهده و مدیریت',
  onClick,
  disabled = false,
  className = '',
}) => {
  const colors = colorVariants[iconBgColor] || colorVariants.blue;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={`
        group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 
        text-right transition-all duration-200 ease-out
        ${disabled
              ? 'cursor-not-allowed opacity-60'
              : 'cursor-pointer hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'
            }
        ${className}
      `}
    >
      <div>
        {(icon || badge) && (
          <div className="flex items-center justify-between gap-4">
            {icon ? (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${colors.bg} ${colors.text}`}
              >
                {icon}
              </div>
            ) : (
              <div />
            )}
            {badge && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                {badge}
              </span>
            )}
          </div>
        )}

        <h3 className={`${icon || badge ? 'mt-4' : ''} text-lg font-bold text-card-foreground`}>
          {title}
        </h3>

        {renderDescription(description)}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          {actionText}
        </span>
        <ArrowLeft className="h-4 w-4 text-muted-foreground/70 transition-all duration-200 group-hover:-translate-x-1 group-hover:text-primary" />
      </div>
    </div>
  );
};

export default ModuleCard;
