import { cva } from 'class-variance-authority';

export const dialogBackdropVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs',
    'transition-opacity duration-200',
    'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
  ].join(' ')
);

export const dialogContentVariants = cva(
  [
    // نقطه ثقل همواره در مرکز و ثابت است تا پرش رخ ندهد
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
    'overflow-y-auto bg-card text-card-foreground shadow-2xl',
    // تعریف صریح انیمیشن و ترنزیشن روی سایز و شفافیت
    'transition-[width,height,max-width,max-height,border-radius,opacity,transform] duration-400 ease-out',
    'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
    'focus-visible:outline-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
      },
      isMaximized: {
        true: 'w-screen h-screen max-w-none max-h-none rounded-none border-0 p-6 sm:p-8',
        false: 'w-full max-h-[calc(100vh-2rem)] rounded-2xl border border-border p-6',
      },
    },
    defaultVariants: {
      size: 'default',
      isMaximized: false,
    },
  }
);
