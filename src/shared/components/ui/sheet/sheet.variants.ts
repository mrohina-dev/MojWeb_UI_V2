import { cva } from 'class-variance-authority';

export const sheetBackdropVariants = cva(
  'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0'
);

export const sheetContentVariants = cva(
  'fixed z-50 shadow-2xl p-6 outline-none transition-all duration-300 ease-out flex flex-col',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        primary: 'bg-primary text-primary-foreground border-primary/20',
      },
      side: {
        // راست: چسبیده به لبه راست و کل ارتفاع
        right: [
          'top-0 right-0 bottom-0 left-auto h-full border-s border-border',
          'data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full translate-x-0',
        ],

        // چپ: اصلاح شد تا دقیقاً به سمت چپ بچسبد و از چپ باز شود
        left: [
          'top-0 left-0 bottom-0 right-auto! h-full border-e border-border',
          'data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full translate-x-0',
        ],

        // بالا: چسبیده به سقف و کل عرض
        top: [
          'top-0 left-0 right-0 bottom-auto w-full border-b border-border',
          'data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full translate-y-0',
        ],

        // پایین: اصلاح شد تا به کف بچسبد و بالا بیاید
        bottom: [
          'bottom-0 left-0 right-0 !top-auto w-full border-t border-border rounded-t-2xl',
          'data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full translate-y-0',
        ],
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // عرض شیت‌های چپ و راست
      { side: ['left', 'right'], size: 'sm', class: 'w-72 max-w-full' },
      { side: ['left', 'right'], size: 'default', class: 'w-88 max-w-[85vw]' },
      { side: ['left', 'right'], size: 'lg', class: 'w-112 max-w-[90vw]' },
      { side: ['left', 'right'], size: 'xl', class: 'w-144 max-w-[95vw]' },
      { side: ['left', 'right'], size: 'full', class: 'w-screen' },

      // ارتفاع شیت‌های بالا و پایین
      { side: ['top', 'bottom'], size: 'sm', class: 'h-auto max-h-[35vh]' },
      { side: ['top', 'bottom'], size: 'default', class: 'h-auto max-h-[50vh]' },
      { side: ['top', 'bottom'], size: 'lg', class: 'h-auto max-h-[70vh]' },
      { side: ['top', 'bottom'], size: 'xl', class: 'h-auto max-h-[85vh]' },
      { side: ['top', 'bottom'], size: 'full', class: 'h-screen' },
    ],
    defaultVariants: {
      variant: 'default',
      side: 'right',
      size: 'default',
    },
  }
);

// واریانت هدر شیت
export const sheetHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-right ps-0 pe-10 pb-4 transition-colors',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// واریانت تایتل شیت
export const sheetTitleVariants = cva(
  'text-lg font-bold leading-none tracking-tight transition-colors',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// واریانت توضیحات شیت (در حالت آبی، مات اما کاملاً خوانا می‌شود)
export const sheetDescriptionVariants = cva('text-sm transition-colors', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      primary: 'text-current/80',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// واریانت دکمه بستن
export const sheetCloseButtonVariants = cva(
  'rounded-lg p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:bg-muted hover:text-foreground',
        primary: 'text-current/80 hover:bg-current/15 hover:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
