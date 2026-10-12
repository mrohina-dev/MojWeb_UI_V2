import type { SvjSendFileItem } from '@/features/svj/send-file-list/types/salary-pay.types';

export const mockFiles: SvjSendFileItem[] = [
  {
    id: 1001,
    accNumber: '0101234567890',
    shebaNumber: 'IR120170000000123456789',
    count: 24,
    createDate: '2026-03-23 10:30',
    serial: 'SVJ-1403-001',
    statusName: 'تایید شده',
    sumPrice: 185000000,
  },
  {
    id: 1002,
    accNumber: '0109876543210',
    shebaNumber: 'IR450170000000987654321',
    count: 12,
    createDate: '2026-01-15 08:45',
    serial: 'SVJ-1403-002',
    statusName: 'در انتظار بررسی',
    sumPrice: 92000000,
  },
  {
    id: 1003,
    accNumber: '0101122334455',
    shebaNumber: 'IR770170000000112233445',
    count: 8,
    createDate: '2026-02-03 14:10',
    serial: 'SVJ-1403-003',
    statusName: 'لغو شده',
    sumPrice: 47500000,
  },
];

export const mockAuthResponse = {
  token: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

export const mockCredentials = {
  username: 'admin',
  password: '123456',
  captcha: '1234',
};

// تصویر SVG کوچک و قابل نمایش برای توسعه محلی
export const mockCaptcha =
  'data:image/svg+xml;base64,' +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="48"><rect width="150" height="48" fill="#e8eef8"/><text x="75" y="32" text-anchor="middle" font-size="24" font-family="sans-serif" fill="#193b70">${mockCredentials.captcha}</text></svg>`);
