import { cva } from 'class-variance-authority';

export const sidebarContainerVariants = cva(
  [
    'relative z-30 flex h-full flex-col border-s border-border select-none overflow-hidden',
    'transition-[width,opacity,border-color] duration-300 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        primary: 'bg-primary text-primary-foreground border-primary/20',
      },
      state: {
        expanded: 'w-64 opacity-100',
        collapsed: '',
      },
      collapseMode: {
        mini: '',
        hidden: '',
      },
    },
    compoundVariants: [
      {
        state: 'collapsed',
        collapseMode: 'mini',
        className: 'w-18 opacity-100',
      },
      {
        state: 'collapsed',
        collapseMode: 'hidden',
        className: 'w-0 border-s-0 opacity-0 pointer-events-none p-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      state: 'expanded',
      collapseMode: 'mini',
    },
  }
);

export const sidebarHeaderVariants = cva(
  'flex h-16 shrink-0 items-center justify-between border-b px-4 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border/70 bg-card',
        primary: 'border-primary/20 bg-primary-700/30 text-primary-foreground',
      },
      isCollapsed: {
        true: 'justify-center px-2',
        false: 'justify-between',
      },
    },
    defaultVariants: {
      variant: 'default',
      isCollapsed: false,
    },
  }
);

export const sidebarItemVariants = cva(
  [
    'group/item relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none',
    'transition-all duration-150 cursor-pointer',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: '',
        primary: '',
      },
      isActive: {
        true: '',
        false: '',
      },
      isSubActive: {
        true: '',
        false: '',
      },
      isCollapsed: {
        true: 'justify-center items-center p-0 h-10 w-10 shrink-0',
        false: 'justify-start',
      },
    },
    compoundVariants: [
      // حالت Default: فعال
      {
        variant: 'default',
        isActive: true,
        className: 'bg-primary/10 text-primary font-bold shadow-2xs',
      },
      // حالت Default: غیرفعال عادی
      {
        variant: 'default',
        isActive: false,
        className: 'text-foreground/80 hover:bg-muted hover:text-foreground',
      },
      // حالت Default: ساب‌منوی والد فعال
      {
        variant: 'default',
        isSubActive: true,
        className: 'bg-muted/70 text-foreground font-semibold',
      },

      // حالت Primary: فعال
      {
        variant: 'primary',
        isActive: true,
        className: 'bg-white/20 text-white font-bold shadow-2xs',
      },
      // حالت Primary: غیرفعال عادی
      {
        variant: 'primary',
        isActive: false,
        className: 'text-white/80 hover:bg-white/10 hover:text-white',
      },
      // حالت Primary: ساب‌منوی والد فعال
      {
        variant: 'primary',
        isSubActive: true,
        className: 'bg-white/15 text-white font-semibold',
      },
    ],
    defaultVariants: {
      variant: 'default',
      isActive: false,
      isSubActive: false,
      isCollapsed: false,
    },
  }
);

export const sidebarGroupLabelVariants = cva(
  'px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-opacity duration-200 select-none truncate',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        primary: 'text-primary-foreground/60',
      },
      isCollapsed: {
        true: 'opacity-0 h-0 p-0 overflow-hidden',
        false: 'opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      isCollapsed: false,
    },
  }
);
