// ------------------------------------------------------------------
// Price Types
// ------------------------------------------------------------------
export interface FormatPriceOptions {
  /**
   * مقداری که در صورت null/undefined یا نامعتبر بودن نمایش داده می‌شود
   * @default '-'
   */
  fallback?: string;
  /**
   * نمایش ارقام به صورت فارسی ('fa-IR') یا انگلیسی ('en-US')
   * @default 'fa-IR'
   */
  locale?: 'fa-IR' | 'en-US';
  /**
   * واحد پولی اختیاری برای اضافه شدن به انتهای مبلغ (مثلاً 'ریال' یا 'تومان')
   */
  unit?: string;
}

// ------------------------------------------------------------------
// Time Types
// ------------------------------------------------------------------
export type CalendarMode = 'jalali' | 'gregorian';
export type TimeMode = 'none' | 'h' | 'm' | 's' | 'hm' | 'hms';

export interface FormatDateOptions {
  /**
   * 'jalali' (پیش‌فرض) => تبدیل به شمسی
   * 'gregorian' یا 'en' => بدون تبدیل، تاریخ میلادی
   */
  calendar?: CalendarMode | 'en';
  /** نمایش بخش تاریخ @default true */
  date?: boolean;
  /** نمایش بخش زمان @default 'none' */
  time?: TimeMode;
  /** جداکننده تاریخ @default '/' */
  dateSeparator?: string;
  /** جداکننده زمان @default ':' */
  timeSeparator?: string;
  /** خروجی در صورت مقدار نامعتبر @default '-' */
  fallback?: string;
}

export interface DateTimeParts {
  jalali: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  gregorian: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  /** آبجکت Date نیتیو جاوااسکریپت */
  date: Date;
}