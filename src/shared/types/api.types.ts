
export interface BackendResponse<T = unknown> {
  data?: T;
  isSuccess?: boolean;
  statusCode?: number;
  message?: string;

  Data?: T;
  IsSuccess?: boolean;
  StatusCode?: number;
  Message?: string;
}

export interface ApiError {
  readonly _tag: "ApiError";
  message: string;
  statusCode: number;
  isSuccess: false;
  responseData?: unknown;
}

export type NormalizedResponse<T> = {
  data: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
};

/**
 * جهت مرتب‌سازی
 */
export type SortOrder = 'asc' | 'desc' | 'Ascending' | 'Descending';

/**
 * ساختار پایه درخواست‌های صفحه‌بندی
 * TFilter پیش‌فرض به صورت اختیاری تعریف شده است
 */
export interface PaginationParams<TFilter = Record<string, unknown>> {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  filters?: TFilter;
}

/**
 * تایپ جنریک پاسخ‌های صفحه‌بندی‌شده
 *
 * @template TItem - تایپ هر رکورد
 * @template TKey  - نام کلیدی که آرایه داده‌ها را نگه می‌دارد (پیش‌فرض 'items')
 */
export type PaginatedResponse<
  TItem,
  TKey extends string = 'items',
> = {
  totalCount: number;
  page?: number;
  size?: number;
  totalPages?: number;
  [key: string]: unknown;
} & Record<TKey, TItem[]>;
