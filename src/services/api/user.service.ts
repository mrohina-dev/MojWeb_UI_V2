import type {
  CaptchaResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/types/user.types";
import { http } from "./client/http-service";
import { authStorage } from "./client/auth-storage";

export const userService = {
  /**
   * دریافت تصویر کپچا به صورت Base64
   */
  getCaptcha: () => {
    return http.get<CaptchaResponse>("/api/User/GetCaptcha");
  },

  /**
   * لاگین کاربر و ذخیره توکن‌ها
   */
  login: async (payload: LoginRequest) => {
    const data = await http.post<LoginResponse>("/api/User/Login", payload);
    authStorage.setAuthData(data);
    return data;
  },

  /**
   * بررسی معتبر بودن توکن فعلی
   * در صورت نامعتبر بودن، توست خطا نمایش داده نمی‌شود تا سایلنت هندل شود.
   */
  checkTokenIsValid: () => {
    return http.get<null>("/api/User/TokenIsValid", {
      showErrorToast: false,
    });
  },

  /**
   * دریافت توکن جدید با استفاده از توکن رفرش یا توکن فعلی
   */
  refreshToken: async (payload: RefreshTokenRequest) => {
    const data = await http.post<RefreshTokenResponse>(
      "/api/User/refreshToken",
      payload
    );
    authStorage.setAuthData(data);
    return data;
  },

  /**
   * خروج کاربر و پاک‌سازی کامل نشست
   */
  logout: () => {
    authStorage.clearAuthData();
  },
};
