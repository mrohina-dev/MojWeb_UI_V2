import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import persian_en from 'react-date-object/locales/persian_en';
import type { DateTimeParts, FormatDateOptions, FormatPriceOptions } from '@/types/Formatter.type';

/**
 * فرمت مبالغ مالی به صورت ۳ رقم ۳ رقم
 * 
 * @example
 * formatPrice(1250000) => "۱،۲۵۰،۰۰۰"
 * formatPrice("1250000") => "۱،۲۵۰،۰۰۰"
 * formatPrice(1250000, { unit: "ریال" }) => "۱،۲۵۰،۰۰۰ ریال"
 * formatPrice(null) => "-"
 */
export function formatPrice(
  value: number | string | null | undefined,
  options: FormatPriceOptions = {}
): string {
  const { fallback = '-', locale = 'fa-IR', unit } = options;

  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  // اگر مقدار ورودی رشته است، فاصله‌ها و کاماهای احتمالی تمیز می‌شوند
  const cleanedValue =
    typeof value === 'string'
      ? value.trim().replace(/,/g, '')
      : value;

  const numericValue = Number(cleanedValue);

  if (Number.isNaN(numericValue)) {
    return fallback;
  }

  const formatted = numericValue.toLocaleString(locale);

  return unit ? `${formatted} ${unit}` : formatted;
}

// Time

// ------------------------------------------------------------------
// Helper: Parse امن فرمت‌های بک‌اند (مثل 7 رقم اعشار ثانیه ASP.NET)
// ------------------------------------------------------------------

function parseBackendDate(input: string | number | Date | null | undefined): Date | null {
  if (input === null || input === undefined || input === '') return null;

  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }

  if (typeof input === 'number') {
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  let value = input.trim();

  // ترانکیت کردن اعشار نانو/میکروثانیه به 3 رقم میلی‌ثانیه برای جلوگیری از خطای مرورگرها
  value = value.replace(/(\.\d{3})\d+/, '$1');

  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

// ------------------------------------------------------------------
// Formatter اصلی
// ------------------------------------------------------------------

/**
 * فرمت جنرال تاریخ و زمان
 *
 * @example
 * formatDate("2026-05-17T12:49:37.0033333")                   => "1405/02/27"
 * formatDate("2026-05-17T12:49:37.0033333", { time: 'hms' })  => "1405/02/27 , 12:49:37"
 * formatDate("2026-05-17T12:49:37", { date: false, time: 'm' }) => "49"
 * formatDate("2026-05-17T12:49:37", { calendar: 'en' })       => "2026/05/17"
 * formatDate(null)                                           => "-"
 */
export function formatDate(
  input: string | number | Date | null | undefined,
  options: FormatDateOptions = {}
): string {
  const {
    calendar = 'jalali',
    date: showDate = true,
    time: timeMode = 'none',
    dateSeparator = '/',
    timeSeparator = ':',
    fallback = '-',
  } = options;

  const parsed = parseBackendDate(input);
  if (!parsed) return fallback;

  const isJalali = calendar !== 'en' && calendar !== 'gregorian';

  // استفاده از persian_en و gregorian_en برای داشتن ارقام انگلیسی (فونت وزیر خودش فارسی رندر میکنه)
  const dateObj = new DateObject({
    date: parsed,
    calendar: isJalali ? persian : gregorian,
    locale: isJalali ? persian_en : gregorian_en,
  });

  let dateStr = '';
  if (showDate) {
    dateStr = dateObj.format(`YYYY${dateSeparator}MM${dateSeparator}DD`);
  }

  let timeStr = '';
  if (timeMode !== 'none') {
    switch (timeMode) {
      case 'h':
        timeStr = dateObj.format('HH');
        break;
      case 'm':
        timeStr = dateObj.format('mm');
        break;
      case 's':
        timeStr = dateObj.format('ss');
        break;
      case 'hm':
        timeStr = dateObj.format(`HH${timeSeparator}mm`);
        break;
      case 'hms':
        timeStr = dateObj.format(`HH${timeSeparator}mm${timeSeparator}ss`);
        break;
    }
  }

  if (dateStr && timeStr) return `${dateStr} , ${timeStr}`;
  return dateStr || timeStr || fallback;
}

// ------------------------------------------------------------------
// گرفتن اجزا به صورت آبجکت جداگانه (شمسی و میلادی)
// ------------------------------------------------------------------

/**
 * دریافت مقادیر تفکیک‌شده تاریخ/زمان
 *
 * @example
 * const parts = getDateTimeParts("2026-05-17T12:49:37.0033333");
 * parts?.jalali.year    // 1405
 * parts?.jalali.minute  // 49
 * parts?.gregorian.day  // 17
 */
export function getDateTimeParts(
  input: string | number | Date | null | undefined
): DateTimeParts | null {
  const parsed = parseBackendDate(input);
  if (!parsed) return null;

  const jalaliObj = new DateObject({
    date: parsed,
    calendar: persian,
    locale: persian_en,
  });

  const gregorianObj = new DateObject({
    date: parsed,
    calendar: gregorian,
    locale: gregorian_en,
  });

  return {
    jalali: {
      year: jalaliObj.year,
      month: jalaliObj.month.number,
      day: jalaliObj.day,
      hour: jalaliObj.hour,
      minute: jalaliObj.minute,
      second: jalaliObj.second,
    },
    gregorian: {
      year: gregorianObj.year,
      month: gregorianObj.month.number,
      day: gregorianObj.day,
      hour: gregorianObj.hour,
      minute: gregorianObj.minute,
      second: gregorianObj.second,
    },
    date: parsed,
  };
}