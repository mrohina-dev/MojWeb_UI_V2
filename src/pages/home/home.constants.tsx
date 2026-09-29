import { Landmark, Network, Hash } from 'lucide-react';
import type { ModuleItem } from './home.types';

export const HOME_MODULES: ModuleItem[] = [
  {
    id: 'internal-transfer',
    title: 'واریز گروهی داخلی (واریز به حساب‌های بانک صادرات)',
    icon: <Landmark className="h-6 w-6" />,
    iconBgColor: 'blue',
    actionText: 'ورود به واریز گروهی داخلی',
    route: '/svj/SendFileList',
    descriptions: [
      'امکان برداشت مستقیم از حساب و واریز به حساب‌های داخلی این بانک',
      'امکان برداشت توسط ارائه چک و واریز به حساب‌های داخلی این بانک',
    ],
    sampleFiles: [
      {
        title: 'دانلود نمونه فایل واریز گروهی',
        endpoint: 'api/common/DownloadSvjTemplate',
        defaultFileName: 'SvjTemplate.xlsx',
        className: 'text-primary hover:text-primary-600',
      },
      {
        title: 'دانلود راهنمای برنامه',
        endpoint: 'api/common/DownloadSvjGuide',
        defaultFileName: 'SvjGuide.xlsx',
        className: 'text-info-600 hover:text-info-700',
      },
    ],
  },
  {
    id: 'paya-transfer',
    title: 'واریز گروهی پایا',
    icon: <Network className="h-6 w-6" />,
    iconBgColor: 'emerald',
    actionText: 'ورود به واریز گروهی پایا',
    route: '/paya/List',
    descriptions: [
      'امکان برداشت مستقیم از حساب و واریز به حساب‌های سایر بانک‌ها',
      'امکان برداشت توسط ارائه چک و واریز به حساب‌های سایر بانک‌ها',
    ],
    sampleFiles: [
      {
        title: 'دانلود نمونه فایل واریز گروهی پایا',
        endpoint: '/api/common/DownloadPayaTemplate',
        defaultFileName: 'PayaTemplate.xlsx',
        className: 'text-success-600 hover:text-success-700',
      },
      {
        title: 'دانلود راهنمای برنامه',
        endpoint: '/api/common/DownloadPayaGuide',
        defaultFileName: 'paya-guide.pdf',
        className: 'text-info-600 hover:text-info-700',
      },
    ],
  },
  {
    id: 'satna-transfer',
    title: 'واریز گروهی از طریق شماره شبا',
    icon: <Hash className="h-6 w-6" />,
    iconBgColor: 'violet',
    actionText: 'ورود به واریز گروهی از طریق شماره شبا',
    route: '/Satna',
    descriptions: [
      'امکان برداشت مستقیم از حساب و واریز به حساب‌های سایر بانک‌ها',
      'امکان برداشت توسط ارائه چک و واریز به حساب‌های سایر بانک‌ها',
    ],
    sampleFiles: [
      {
        title: 'دانلود نمونه فایل واریز گروهی ساتنا',
        endpoint: '/api/common/DownloadPayaTemplate',
        defaultFileName: 'satna-template.xlsx',
        className: 'text-warning-600 hover:text-warning-700',
      },
      {
        title: 'دانلود راهنمای برنامه',
        endpoint: '/api/common/DownloadSatnaGuide',
        defaultFileName: 'SatnaGuide.xlsx',
        className: 'text-info-600 hover:text-info-700',
      },
    ],
  },
];

export const HOME_NOTICE = {
  title: 'توجه',
  description:
    'مشتری گرامی، به استحضار می‌رساند با عنایت به دستورالعمل‌های بانک مرکزی جمهوری اسلامی ایران، از تاریخ ۱۴۰۵/۰۶/۲۳، کارمزد تراکنش‌های داخلی (انتقال وجه به حساب بانک صادرات) مبلغ ۷۰۰ ریال خواهد بود و همچنین، کارمزد خدمات پایا و ساتنا مطابق تعرفه‌های ابلاغی اعمال گردیده است.',
};
