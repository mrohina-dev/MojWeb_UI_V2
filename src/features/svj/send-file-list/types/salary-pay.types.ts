import type { PaginatedResponse } from '@/shared/types/api.types';

/**
 * ساختار هر رکورد در لیست فایل‌های ارسالی
 */
export interface SvjSendFileItem extends Record<string, unknown> {
  id: number | string;
  accNumber: string;
  shebaNumber: string;
  count: number;
  createDate?: string;
  serial?: string;
  statusName?: string;
  sumPrice?: number | string;
}


/**
 * ساختار پاسخ سرور برای اندپوینت GetSendFileList
 */
export type GetSendFileListResponse = PaginatedResponse<
  SvjSendFileItem,
  'uploadedFile'
> & {
  isBranchUser?: boolean;
  isSonati?: boolean;
};

export interface SalaryPayAction {
  account: string;
  serial: string;
  type?: number;
}

export type ActionType = 'confirm' | 'cancel' | 'pdf';

export interface ColumnsProps {
  onConfirmPayment?: (row: SvjSendFileItem) => void;
  onCancelPayment?: (row: SvjSendFileItem) => void;
  onViewDetails?: (row: SvjSendFileItem) => void;
  onDownloadPdf?: (row: SvjSendFileItem) => void;
  /** بررسی اینکه آیا عملیاتی برای یک ردیف در حال اجراست */
  isActionLoading?: (rowId: number | string, action: ActionType) => boolean;
  /** قفل بودن کلی تمام دکمه‌ها در زمان اجرای هر اکشنی */
  isAnyActionLoading?: boolean;
}


export interface ActiveAction {
    id: number | string;
    type: ActionType;
}
