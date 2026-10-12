import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { createApiError, isApiError } from "./api-error";
import { authStorage } from "./auth-storage";
import type { RefreshTokenRequest, RefreshTokenResponse } from "@/features/auth/types/user.types";
import type { BackendResponse, NormalizedResponse } from "@/shared/types/api.types";

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
    version: "1.1.1",
  },
});

/* =========================================================================
   نرمال‌سازی پاسخ بک‌اند (پشتیبانی از Object، String و JSONهای چسبیده)
   ========================================================================= */

function parsePayload(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    let cleanString = body.trim();
    const splitIndex = cleanString.indexOf("}{");
    if (splitIndex !== -1) {
      cleanString = cleanString.slice(0, splitIndex + 1);
    }

    try {
      const parsed: unknown = JSON.parse(cleanString);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  if (typeof body === "object" && body !== null) {
    return body as Record<string, unknown>;
  }

  return {};
}

const normalizeResponse = <T>(body: unknown): NormalizedResponse<T> => {
  const parsed = parsePayload(body);

  const rawIsSuccess = parsed.isSuccess ?? parsed.IsSuccess;
  const isSuccess =
    rawIsSuccess === undefined
      ? true
      : rawIsSuccess === true || rawIsSuccess === "true" || rawIsSuccess === 1;

  const rawStatusCode = parsed.statusCode ?? parsed.StatusCode;
  const statusCode =
    rawStatusCode !== undefined && rawStatusCode !== null && rawStatusCode !== ""
      ? Number(rawStatusCode)
      : isSuccess
        ? 0
        : 500;

  const message = String(parsed.message ?? parsed.Message ?? "");
  const data = (parsed.data !== undefined ? parsed.data : parsed.Data) as T;

  return { data, isSuccess, statusCode, message };
};

/* =========================================================================
   پاک‌سازی کوکی‌های سشن سمت کلاینت
   ========================================================================= */

export const clearSessionCookies = (): void => {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .forEach((name) => {
      document.cookie = `${name}=; ${expired}; path=/`;
      document.cookie = `${name}=; ${expired}; path=/; domain=${window.location.hostname}`;
    });
};

/* =========================================================================
   ارسال درخواست خروج به سرور (مستقل از اینترسپتور برای جلوگیری از لوپ)
   ========================================================================= */

const callServerLogout = (): void => {
  void axios
    .get(`${normalizedBaseUrl}/api/User/Logout`, {
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        version: "1.1.1",
      },
    })
    .catch(() => {
      // نادیده گرفتن خطا تا فرآیند خروج متوقف نشود
    });
};

/* =========================================================================
   مدیریت هم‌زمانی و صف انتظار رفرش توکن
   ========================================================================= */

let isRefreshing = false;
let isRedirecting = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
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
): void => {
  callServerLogout();
  authStorage.clearAuthData();
  clearSessionCookies();

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

const isAuthEndpoint = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.endsWith("/api/User/Login") ||
    url.endsWith("/api/User/RefreshToken") ||
    url.endsWith("/api/User/Logout")
  );
};

/* =========================================================================
   1. Request Interceptor — تزریق هدر Bearer
   ========================================================================= */

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

/* =========================================================================
   2. Response Interceptor — مدیریت پاسخ‌های سرور (2xx)
   ========================================================================= */

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data instanceof Blob || response.config.responseType === "blob") {
      return response;
    }

    const normalized = normalizeResponse(response.data);
    const config = response.config as InternalAxiosRequestConfig;

    if (normalized.statusCode === 1401) {
      return handleUnauthorizedFlow(
        config,
        normalized.message || "مجوز لازم را ندارید."
      );
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
     3. Error Interceptor — خطاهای شبکه و HTTP
     ========================================================================= */
  async (error: AxiosError<BackendResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest) {
      return handleUnauthorizedFlow(originalRequest);
    }

    const errorPayload = error.response?.data as Record<string, unknown> | undefined;

    const message =
      (typeof errorPayload?.message === "string" && errorPayload.message) ||
      (typeof errorPayload?.Message === "string" && errorPayload.Message) ||
      "ارتباط با سرور برقرار نشد. لطفاً وضعیت شبکه را بررسی کنید.";

    if (originalRequest?.showErrorToast !== false) {
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
   4. چرخه مدیریت نشست و تمدید خودکار (Silent Refresh)
   ========================================================================= */

async function handleUnauthorizedFlow(
  originalConfig: InternalAxiosRequestConfig,
  customMessage?: string
): Promise<AxiosResponse> {
  if (isAuthEndpoint(originalConfig.url)) {
    if (originalConfig.url?.endsWith("/api/User/Logout")) {
      return Promise.reject(createApiError("خروج از سیستم", 1401));
    }
    handleSessionExpired(customMessage);
    return Promise.reject(
      createApiError(customMessage || "اطلاعات ورود نامعتبر است.", 1401)
    );
  }

  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    handleSessionExpired(customMessage);
    return Promise.reject(
      createApiError(customMessage || "نشست کاربری منقضی شد.", 1401)
    );
  }

  if (originalConfig._retry) {
    handleSessionExpired(customMessage || "اعتبار نشست شما به پایان رسید.");
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
    const payload: RefreshTokenRequest = { token: refreshToken };

    const refreshResponse = await axios.post(
      `${normalizedBaseUrl}/api/User/RefreshToken`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          version: "1.1.1",
        },
        withCredentials: true,
        timeout: 30000,
      }
    );

    const normalized = normalizeResponse<RefreshTokenResponse>(refreshResponse.data);

    if (
      !normalized.isSuccess ||
      !normalized.data?.token ||
      normalized.statusCode === 1401
    ) {
      throw createApiError(
        normalized.message || "خطا در تمدید توکن",
        1401,
        normalized.data
      );
    }

    authStorage.setAuthData(normalized.data);

    const newAccessToken = normalized.data.token;

    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    processQueue(null, newAccessToken);
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
      customMessage || "اعتبار نشست شما به پایان رسید. لطفاً مجدداً وارد شوید."
    );
    return Promise.reject(apiErr);
  } finally {
    isRefreshing = false;
  }
}
