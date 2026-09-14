
import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import type { BackendResponse } from "./api.types";
import { createApiError } from "./api-error";
import { AUTH_TOKEN_KEY } from "@/constants/auth.constants";

// افزودن فلگ‌های کنترلی به کانفیگ Axios بدون نقض قوانین ESLint
declare module "axios" {
  export interface AxiosRequestConfig {
    showErrorToast?: boolean;    // آیا پیام خطای سرور خودکار توست شود؟ (پیش‌فرض: true)
    showSuccessToast?: boolean;  // آیا پیام موفقیت سرور توست شود؟ (پیش‌فرض: false)
  }
}
// مقدار Base URL از فایل .env خوانده می‌شود، در غیر این صورت مقدار پیش‌فرض
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
   1. Request Interceptor: الصاق توکن از sessionStorage به Header
   ========================================================================= */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

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
   2. Response Interceptor: مدیریت پاسخ‌های موفق/ناموفق و نرمال‌سازی
   ========================================================================= */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const resBody = response.data as BackendResponse;
    const config = response.config;

    // نرمال‌سازی فیلدها (پشتیبانی هم‌زمان از camelCase و PascalCase)
    const data = resBody?.data ?? resBody?.Data;
    const isSuccess = resBody?.isSuccess ?? resBody?.IsSuccess ?? true;
    const statusCode = resBody?.statusCode ?? resBody?.StatusCode ?? 0;
    const message = resBody?.message ?? resBody?.Message ?? "";

    // حالت الف: خطای 1401 (عدم احراز هویت / ابطال نشست)
    if (statusCode === 1401) {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);

      const unauthorizedMsg = message || "لطفاً مجدداً وارد شوید.";
      toast.error(unauthorizedMsg);

      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }

      return Promise.reject(createApiError(unauthorizedMsg, statusCode, data));
    }

    // حالت ب: خطای بیزنسی سرور (HTTP 200 است اما عملیات ناموفق بوده)
    if (!isSuccess || statusCode !== 0) {
      const errorMessage = message || "خطایی در پردازش درخواست رخ داد.";

      // نمایش توست خطا (مگر اینکه صراحتاً با showErrorToast: false غیرفعال شده باشد)
      if (config.showErrorToast !== false) {
        toast.error(errorMessage);
      }

      return Promise.reject(createApiError(errorMessage, statusCode, data));
    }

    // حالت ج: موفقیت بیزنسی و نمایش توست در صورت درخواست
    if (config.showSuccessToast && message) {
      toast.success(message);
    }

    // بازگرداندن داده خالص (Unwrap شده)
    response.data = data;
    return response;
  },
  (error) => {
    // خطاهای سطح پروتکل و شبکه (مثل 500، 404 یا قطعی شبکه)
    const message =
      error.response?.data?.message ||
      error.response?.data?.Message ||
      "ارتباط با سرور برقرار نشد. لطفاً وضعیت شبکه را بررسی کنید.";

    if (error.config?.showErrorToast !== false) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
