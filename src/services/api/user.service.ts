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
      "/api/User/refreshToken",
      payload
    );
    authStorage.setAuthData(data);
    return data;
  },

  /**
   * خروج کاربر و پاک‌سازی کامل نشست
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
      // پاک‌سازی حافظه کلاینت تحت هر شرایطی
      authStorage.clearAuthData();
    }
  },
};
