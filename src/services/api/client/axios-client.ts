import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import type { BackendResponse } from "./api.types";
import { createApiError } from "./api-error";
import { authStorage } from "./auth-storage";

declare module "axios" {
  export interface AxiosRequestConfig {
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* =========================================================================
   1. Request Interceptor: الصاق توکن به Header
   ========================================================================= */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================================================================
   2. Response Interceptor: مدیریت پاسخ‌ها و پاک‌سازی سشن در صورت عدم احراز هویت
   ========================================================================= */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const resBody = response.data as BackendResponse;
    const config = response.config;

    const data = resBody?.data ?? resBody?.Data;
    const isSuccess = resBody?.isSuccess ?? resBody?.IsSuccess ?? true;
    const statusCode = resBody?.statusCode ?? resBody?.StatusCode ?? 0;
    const message = resBody?.message ?? resBody?.Message ?? "";

    // حالت الف: خطای ابطال نشست (کد بیزنسی 1401 یا موارد مشابه)
    if (statusCode === 1401) {
      authStorage.clearAuthData(); // پاک‌سازی تمام کلیدها (token, refreshToken, expiration)

      const unauthorizedMsg = message || "نشست کاربری منقضی شده است. لطفاً مجدداً وارد شوید.";
      toast.error(unauthorizedMsg);

      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }

      return Promise.reject(createApiError(unauthorizedMsg, statusCode, data));
    }

    // حالت ب: خطای بیزنسی سرور
    if (!isSuccess || statusCode !== 0) {
      const errorMessage = message || "خطایی در پردازش درخواست رخ داد.";

      if (config.showErrorToast !== false) {
        toast.error(errorMessage);
      }

      return Promise.reject(createApiError(errorMessage, statusCode, data));
    }

    // حالت ج: پیام موفقیت اختیاری
    if (config.showSuccessToast && message) {
      toast.success(message);
    }

    // داده آن‌رپ شده خالص
    response.data = data;
    return response;
  },
  (error) => {
    // در صورتی که سرور خطای HTTP 401 بدهد:
    if (error.response?.status === 401) {
      authStorage.clearAuthData();
      if (window.location.pathname !== "/login") {
        toast.error("نشست شما منقضی شد. لطفاً دوباره وارد شوید.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }
    } else {
      const message =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        "ارتباط با سرور برقرار نشد. لطفاً وضعیت شبکه را بررسی کنید.";

      if (error.config?.showErrorToast !== false) {
        toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);
