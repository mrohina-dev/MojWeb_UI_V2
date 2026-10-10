import { cva, type VariantProps } from 'class-variance-authority';

/**
 * واریانت‌های کانتینر اصلی نوبار Breadcrumbs
 */
export const breadcrumbsVariants = cva(
  'flex items-center text-muted-foreground w-full select-none',
  {
    variants: {
      size: {
        sm: 'text-xs gap-1',
        default: 'text-sm gap-1.5',
        lg: 'text-base gap-2',
        xl: 'text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * واریانت‌های لینک‌ها
 * آیکون داخلی لینک (item.icon) خودکار از رنگ متن (currentColor) ارث‌بری می‌کند.
 */
export const breadcrumbsLinkVariants = cva(
  'inline-flex items-center gap-1.5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
  {
    variants: {
      variant: {
        // ۱. خنثی (استاندارد): متن میوتد با هاور روشن/تیره تم
        default: 'text-muted-foreground hover:text-foreground',

        // ۲. پرایمری: سرمه‌ای با هاور شید پررنگ‌تر
        primary: 'text-primary hover:text-primary-700 font-medium',

        // ۳. سکندری: کنتراست مشخص متن سکندری
        secondary: 'text-secondary-foreground hover:opacity-80 font-medium',

        // ۴. شبح‌وار: هاور بدون تغییر رنگ شدید
        ghost: 'text-muted-foreground hover:text-foreground',

        // ۵. لایت پرایمری: استفاده از شیدهای 300 و 400 تازه اضافه‌شده
        lightPrimary: 'text-primary-400 hover:text-primary-600 font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * واریانت‌های آیکون جداکننده (Separator)
 * به طور پیش‌فرض خنثی (muted) برای حفظ آرامش بصری، با امکان تغییر به رنگ‌های تم
 */
export const breadcrumbsSeparatorVariants = cva(
  'inline-flex shrink-0 items-center justify-center select-none transition-colors',
  {
    variants: {
      size: {
        sm: '[&>svg]:size-3',
        default: '[&>svg]:size-3.5',
        lg: '[&>svg]:size-4',
        xl: '[&>svg]:size-5',
      },
      variant: {
        // حالت استاندارد UI: خنثی و نیمه‌شفاف
        default: 'text-muted-foreground/60',
        // در صورت تمایل به همرنگ‌سازی با تم
        primary: 'text-primary',
        secondary: 'text-secondary-foreground/70',
        muted: 'text-muted-foreground/40',
        lightPrimary: 'text-primary-400',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export type BreadcrumbsVariantsProps = VariantProps<typeof breadcrumbsVariants>;
export type BreadcrumbsLinkVariantsProps = VariantProps<typeof breadcrumbsLinkVariants>;
export type BreadcrumbsSeparatorVariantsProps = VariantProps<typeof breadcrumbsSeparatorVariants>;
