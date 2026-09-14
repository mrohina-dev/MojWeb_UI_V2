import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import type { BackendResponse } from "./api.types";
import { createApiError } from "./api-error";
import { authStorage } from "./auth-storage";
import type { RefreshTokenResponse } from "@/types/user.types";

declare module "axios" {
  export interface AxiosRequestConfig {
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    _retry?: boolean; // فلگ داخلی برای جلوگیری از چرخه بی‌نهایت رفرش
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
   مدیریت هم‌زمانی و صف انتظار رفرش توکن (Queue Manager)
   ========================================================================= */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * هدایت کاربر به صفحه لاگین همراه با پیام و پاک‌سازی کامل
 */
const handleSessionExpired = (message = "نشست شما منقضی شد. لطفاً دوباره وارد شوید.") => {
  authStorage.clearAuthData();
  toast.error(message);
  if (window.location.pathname !== "/login") {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  }
};

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
  (error) => Promise.reject(error)
);

/* =========================================================================
   2. Response Interceptor: مدیریت پاسخ‌ها و رفرش توکن خودکار
   ========================================================================= */
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const resBody = response.data as BackendResponse;
    const config = response.config;

    const data = resBody?.data ?? resBody?.Data;
    const isSuccess = resBody?.isSuccess ?? resBody?.IsSuccess ?? true;
    const statusCode = resBody?.statusCode ?? resBody?.StatusCode ?? 0;
    const message = resBody?.message ?? resBody?.Message ?? "";

    // اگر خطای انقضای نشست باشد (کد بیزنسی 1401)
    if (statusCode === 1401) {
      return handleUnauthorizedFlow(response.config, message);
    }

    // خطای بیزنسی سرور
    if (!isSuccess || statusCode !== 0) {
      const errorMessage = message || "خطایی در پردازش درخواست رخ داد.";

      if (config.showErrorToast !== false) {
        toast.error(errorMessage);
      }

      return Promise.reject(createApiError(errorMessage, statusCode, data));
    }

    // پیام موفقیت اختیاری
    if (config.showSuccessToast && message) {
      toast.success(message);
    }

    // داده Unwrap شده
    response.data = data;
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // اگر خطای HTTP 401 رخ داده باشد
    if (error.response?.status === 401 && originalRequest) {
      return handleUnauthorizedFlow(originalRequest);
    }

    // خطاهای سرور، 500 یا عدم ارتباط شبکه
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

/* =========================================================================
   3. متد مشترک چرخه Silent Refresh برای خطاهای 1401 و 401
   ========================================================================= */
async function handleUnauthorizedFlow(
  originalConfig: InternalAxiosRequestConfig,
  customMessage?: string
) {
  // اگر درخواست مربوط به خودِ لاگین یا رفرش‌توکن باشد، دوباره وارد پروسه رفرش نشود
  if (
    originalConfig.url?.includes("/api/User/Login") ||
    originalConfig.url?.includes("/api/User/refreshToken")
  ) {
    handleSessionExpired(customMessage);
    return Promise.reject(createApiError(customMessage || "اطلاعات ورود نامعتبر است", 1401));
  }

  const refreshToken = authStorage.getRefreshToken();

  // اگر رفرش توکن وجود نداشت، مستقیماً نشست بسته شود
  if (!refreshToken) {
    handleSessionExpired(customMessage);
    return Promise.reject(createApiError("نشست کاربری نامعتبر است.", 1401));
  }

  // اگر قبلاً برای این درخواست یک‌بار رفرش زده شده و مجدد رد شده، متوقف شود
  if (originalConfig._retry) {
    handleSessionExpired();
    return Promise.reject(createApiError("انقضای مجدد نشست.", 1401));
  }

  // اگر در حال حاضر یک درخواست رفرش دیگر در جریان است، بقیه در صف منتظر بمانند
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((newToken) => {
        if (originalConfig.headers) {
          originalConfig.headers.Authorization = `Bearer ${newToken}`;
        }
        return axiosInstance(originalConfig);
      })
      .catch((err) => Promise.reject(err));
  }

  originalConfig._retry = true;
  isRefreshing = true;

  try {
    // طبق توضیحات شما، فیلد token مقدار refreshToken را دریافت می‌کند
    const refreshResponse = await axios.post<BackendResponse<RefreshTokenResponse>>(
      `${BASE_URL.replace(/\/$/, "")}/api/User/refreshToken`,
      { token: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    const resData = refreshResponse.data?.data ?? refreshResponse.data?.Data;
    const isSuccess = refreshResponse.data?.isSuccess ?? refreshResponse.data?.IsSuccess;

    if (!isSuccess || !resData?.token) {
      throw new Error("خطا در تمدید توکن");
    }

    // ذخیره توکن‌های جدید به صورت آبجکت واحد
    authStorage.setAuthData(resData);

    // به‌روزرسانی هدر درخواست اصلی
    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${resData.token}`;
    }

    // آزاد کردن تمام درخواست‌های در صف مانده
    processQueue(null, resData.token);

    // تکرار درخواست اصلی کاربر با توکن جدید
    return axiosInstance(originalConfig);
  } catch (refreshErr) {
    processQueue(refreshErr, null);
    handleSessionExpired("اعتبار نشست شما به پایان رسید. لطفاً مجدداً وارد شوید.");
    return Promise.reject(refreshErr);
  } finally {
    isRefreshing = false;
  }
}
