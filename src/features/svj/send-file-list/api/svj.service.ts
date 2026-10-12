import type { PaginationParams } from '@/shared/types/api.types';
import { http } from '../../../../shared/services/http/http-service';
import type {
  GetSendFileListResponse,
  SalaryPayAction,
} from '@/features/svj/send-file-list/types/salary-pay.types';

export const salaryPayService = {
  /**
   * دریافت لیست فایل‌های ارسالی
   * نمونه درخواست: /api/SalaryPay/GetSendFileList?size=10
   */
  getSendFileList: (params?: PaginationParams) => {
    return http.get<GetSendFileListResponse>('/api/SalaryPay/GetSendFileList', {
      params,
    });
  },

  /**
   * لغو پرداخت
   */
  postSalaryCancel: (payload: SalaryPayAction) => {
    return http.post<null>('/api/SalaryPay/Cancel', payload, {
      showSuccessToast: true,
    });
  },
};

export default salaryPayService;
