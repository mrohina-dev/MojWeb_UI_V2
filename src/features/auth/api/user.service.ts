import type {
  CaptchaResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/features/auth/types/user.types";
import { http } from "../../../shared/services/http/http-service";
import { authStorage } from "../../../shared/services/http/auth-storage";
import { clearSessionCookies } from "../../../shared/services/http/axios-client";

export const userService = {
  /**
   * دریافت تصویر کپچا به صورت Base64
   */
  getCaptcha: () => {
    return http.get<CaptchaResponse>("/api/common/GetCaptcha");
  },

  /**
   * لاگین کاربر   
   */
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const data = await http.post<LoginResponse>("/api/User/Login", payload);
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
      "/api/User/RefreshToken",
      payload
    );
    authStorage.setAuthData(data);
    return data;
  },

  /**
   * خروج کاربر و پاک‌سازی کامل نشست (حافظه و کوکی‌ها)
   */
  logout: async () => {
    try {
      await http.get<null>("/api/User/Logout", {
        showSuccessToast: true,
        showErrorToast: true,
      });
    } catch {
      // خطا توسط Toast نمایش داده شده است؛ نیازی به شکستن فرآیند خروج کلاینت نیست
    } finally {
      // پاک‌سازی هم توکن‌ها و هم کوکی‌های سشن تحت هر شرایطی
      authStorage.clearAuthData();
      clearSessionCookies();
    }
  },
};
