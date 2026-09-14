
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

