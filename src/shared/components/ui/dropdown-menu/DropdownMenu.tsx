import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react';
import { cn } from '@/shared/lib/utils';
import {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
} from './dropdown-menu.variants';
import type {
  DropdownMenuContentProps,
  DropdownMenuGroupConfig,
  DropdownMenuGroupLabelProps,
  DropdownMenuItemConfig,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuRootProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from './dropdown-menu.types';

/* --- کامپوننت‌های ترکیبی اتمیک اصلی --- */

export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  return <BaseMenu.Root {...props} />;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseMenu.Trigger
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center outline-none cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </BaseMenu.Trigger>
    );
  }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (
    {
      className,
      children,
      size = 'default',
      variant = 'default',
      sideOffset = 6,
      side = 'bottom',
      align = 'start',
      ...props
    },
    ref
  ) => {
    return (
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={sideOffset} side={side} align={align}>
          <BaseMenu.Popup
            ref={ref}
            className={cn(dropdownMenuContentVariants({ size, variant }), className)}
            {...props}
          >
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, destructive, inset, children, ...props }, ref) => {
    return (
      <BaseMenu.Item
        ref={ref}
        className={cn(dropdownMenuItemVariants({ destructive, inset }), className)}
        {...props}
      >
        {children}
      </BaseMenu.Item>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuGroupLabel = React.forwardRef<HTMLDivElement, DropdownMenuGroupLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-2.5 py-1.5 text-xs font-semibold text-muted-foreground select-none',
          inset && 'pe-8',
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Separator
        ref={ref}
        className={cn('my-1 h-px bg-border -mx-1', className)}
        {...props}
      />
    );
  }
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* --- کامپوننت‌های ترکیبی اتمیک زیرمنو (Submenu) --- */

// اصلاح اصلی: استفاده از BaseMenu.SubmenuRoot به جای BaseMenu.Root
export function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

export const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <BaseMenu.SubmenuTrigger
        ref={ref}
        className={cn(
          dropdownMenuItemVariants({ inset }),
          'cursor-pointer data-open:bg-accent data-open:text-accent-foreground',
          className
        )}
        {...props}
      >
        {children}
      </BaseMenu.SubmenuTrigger>
    );
  }
);
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  (
    {
      className,
      children,
      size = 'default',
      variant = 'default',
      sideOffset = 4,
      alignOffset = -4,
      side = 'left',
      align = 'start',
      ...props
    },
    ref
  ) => {
    return (
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          side={side}
          align={align}
        >
          <BaseMenu.Popup
            ref={ref}
            className={cn(dropdownMenuContentVariants({ size, variant }), className)}
            {...props}
          >
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    );
  }
);
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/* --- کامپوننت جامع Shorthand --- */

function isGroupConfig(
  item: DropdownMenuItemConfig | DropdownMenuGroupConfig
): item is DropdownMenuGroupConfig {
  return 'items' in item;
}

export function DropdownMenu({
  trigger,
  items,
  children,
  size = 'default',
  variant = 'default',
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  triggerClassName,
  contentClassName,
  ...rootProps
}: DropdownMenuProps) {
  return (
    <DropdownMenuRoot {...rootProps}>
      <DropdownMenuTrigger className={triggerClassName}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        size={size}
        variant={variant}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {items
          ? items.map((entry, idx) => {
              if (isGroupConfig(entry)) {
                return (
                  <React.Fragment key={entry.label ?? `group-${idx}`}>
                    {idx > 0 && <DropdownMenuSeparator />}
                    {entry.label && (
                      <DropdownMenuGroupLabel>{entry.label}</DropdownMenuGroupLabel>
                    )}
                    {entry.items.map((item, itemIdx) => (
                      <DropdownMenuItem
                        key={item.id ?? `item-${itemIdx}`}
                        disabled={item.disabled}
                        destructive={item.destructive}
                        onClick={item.onSelect}
                      >
                        {item.icon && <span className="shrink-0 size-4">{item.icon}</span>}
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-xs text-muted-foreground tracking-widest ms-auto">
                            {item.shortcut}
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </React.Fragment>
                );
              }

              return (
                <DropdownMenuItem
                  key={entry.id ?? `item-${idx}`}
                  disabled={entry.disabled}
                  destructive={entry.destructive}
                  onClick={entry.onSelect}
                >
                  {entry.icon && <span className="shrink-0 size-4">{entry.icon}</span>}
                  <span className="flex-1">{entry.label}</span>
                  {entry.shortcut && (
                    <span className="text-xs text-muted-foreground tracking-widest ms-auto">
                      {entry.shortcut}
                    </span>
                  )}
                </DropdownMenuItem>
              );
            })
          : children}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

DropdownMenu.Root = DropdownMenuRoot;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.GroupLabel = DropdownMenuGroupLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
DropdownMenu.SubContent = DropdownMenuSubContent;
