import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import type { BackendResponse } from "./api.types";
import { createApiError, isApiError } from "./api-error";
import { authStorage } from "./auth-storage";
import type { RefreshTokenResponse } from "@/types/user.types";

declare module "axios" {
  export interface AxiosRequestConfig {
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    _retry?: boolean;
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/";
const normalizedBaseUrl = BASE_URL.replace(/\/$/, "");

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: normalizedBaseUrl,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* =========================================================================
   نرمال‌سازی پاسخ بک‌اند (PascalCase → camelCase)
   ========================================================================= */
const normalizeResponse = <T>(body: BackendResponse<T>) => ({
  data: body.data ?? body.Data,
  isSuccess: body.isSuccess ?? body.IsSuccess ?? true,
  statusCode: body.statusCode ?? body.StatusCode ?? 0,
  message: body.message ?? body.Message ?? "",
});

/* =========================================================================
   مدیریت هم‌زمانی و صف انتظار رفرش توکن
   ========================================================================= */
let isRefreshing = false;
let isRedirecting = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      const apiErr = isApiError(error)
        ? error
        : createApiError("خطا در تمدید نشست", 1401, error);
      prom.reject(apiErr);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleSessionExpired = (
  message = "نشست شما منقضی شد. لطفاً دوباره وارد شوید."
) => {
  authStorage.clearAuthData();

  if (isRedirecting) return;

  toast.error(message);

  if (!window.location.pathname.endsWith("/login")) {
    isRedirecting = true;
    setTimeout(() => {
      window.location.href = "/login";
      isRedirecting = false;
    }, 1200);
  }
};

/* =========================================================================
   1. Request Interceptor
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
   2. Response Interceptor — پاسخ‌های موفق (2xx)
   ========================================================================= */
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {

    if (response.data instanceof Blob || response.config.responseType === "blob") {
      return response;
    }

    const normalized = normalizeResponse(response.data as BackendResponse);
    const config = response.config;

    if (normalized.statusCode === 1401) {
      return handleUnauthorizedFlow(config, normalized.message);
    }

    if (!normalized.isSuccess || normalized.statusCode !== 0) {
      const errorMessage =
        normalized.message || "خطایی در پردازش درخواست رخ داد.";

      if (config.showErrorToast !== false) {
        toast.error(errorMessage);
      }

      return Promise.reject(
        createApiError(errorMessage, normalized.statusCode, normalized.data)
      );
    }

    if (config.showSuccessToast && normalized.message) {
      toast.success(normalized.message);
    }

    response.data = normalized.data;
    return response;
  },

  /* =========================================================================
     3. Response Interceptor — خطاهای HTTP واقعی (4xx، 5xx، network)
     ========================================================================= */
  async (error) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    if (error.response?.status === 401 && originalRequest) {
      return handleUnauthorizedFlow(originalRequest);
    }

    const message =
      (error.response?.data as BackendResponse)?.message ??
      (error.response?.data as BackendResponse)?.Message ??
      "ارتباط با سرور برقرار نشد. لطفاً وضعیت شبکه را بررسی کنید.";

    if (error.config?.showErrorToast !== false) {
      toast.error(message);
    }

    return Promise.reject(
      createApiError(
        message,
        error.response?.status ?? 0,
        error.response?.data
      )
    );
  }
);

/* =========================================================================
   4. چرخه Silent Refresh
   ========================================================================= */
async function handleUnauthorizedFlow(
  originalConfig: InternalAxiosRequestConfig,
  customMessage?: string
): Promise<AxiosResponse> {
  const isAuthEndpoint =
    originalConfig.url?.endsWith("/api/User/Login") ||
    originalConfig.url?.endsWith("/api/User/refreshToken") ||
    originalConfig.url?.endsWith("/api/User/Logout");

  if (isAuthEndpoint) {
     // برای خروج، ریدایرکت دستی نکن چون خود کامپوننت با navigate کنترلش می‌کند
    if (originalConfig.url?.endsWith("/api/User/Logout")) {
      return Promise.reject(createApiError("خروج از سیستم", 1401));
    }
    handleSessionExpired(customMessage);
    return Promise.reject(
      createApiError(
        customMessage || "اطلاعات ورود نامعتبر است.",
        1401
      )
    );
  }

  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    handleSessionExpired(customMessage);
    return Promise.reject(
      createApiError("نشست کاربری نامعتبر است.", 1401)
    );
  }

  if (originalConfig._retry) {
    handleSessionExpired();
    return Promise.reject(createApiError("انقضای مجدد نشست.", 1401));
  }

  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((newToken) => {
      if (originalConfig.headers) {
        originalConfig.headers.Authorization = `Bearer ${newToken}`;
      }
      return axiosInstance(originalConfig);
    });
  }

  originalConfig._retry = true;
  isRefreshing = true;

  try {
    const refreshResponse = await axios.post<
      BackendResponse<RefreshTokenResponse>
    >(
      `${normalizedBaseUrl}/api/User/refreshToken`,
      { token: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    const normalized = normalizeResponse(refreshResponse.data);

    if (!normalized.isSuccess || !normalized.data?.token) {
      throw createApiError("خطا در تمدید توکن", 1401, normalized.data);
    }

    authStorage.setAuthData(normalized.data);

    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${normalized.data.token}`;
    }

    processQueue(null, normalized.data.token);
    return axiosInstance(originalConfig);
  } catch (refreshErr) {
    const apiErr = isApiError(refreshErr)
      ? refreshErr
      : createApiError(
        "اعتبار نشست شما به پایان رسید.",
        1401,
        refreshErr
      );

    processQueue(apiErr, null);
    handleSessionExpired(
      "اعتبار نشست شما به پایان رسید. لطفاً مجدداً وارد شوید."
    );
    return Promise.reject(apiErr);
  } finally {
    isRefreshing = false;
  }
}
