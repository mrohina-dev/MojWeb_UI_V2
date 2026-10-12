// اکسپورت پیش‌فرض برای کامپوننت اصلی فیچر
export { default } from './components/svjSendFileListView';

// تایپ‌هایی که در روت یا بخش‌های دیگر لازم می‌شوند
export * from './types/salary-pay.types';

// سرویس‌ها و هوک‌ها در صورت نیاز به استفاده جداگانه
export * from './api/useSvjSendFiles';
export { default as salaryPayService } from './api/svj.service';
