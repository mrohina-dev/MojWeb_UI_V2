import { AUTH_SESSION_KEY } from "@/shared/constants/auth.constants";
import type { AuthTokens } from "@/features/auth/types/user.types";

export const authStorage = {
  /**
   * دریافت کل آبجکت احراز هویت
   */
  getAuthData: (): AuthTokens | null => {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthTokens;
    } catch {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
  },

  /**
   * ذخیره کل آبجکت سشن
   */
  setAuthData: (data: AuthTokens): void => {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(data));
  },

  /**
   * دریافت اکسس‌توکن برای هدر Authorization
   */
  getAccessToken: (): string | null => {
    return authStorage.getAuthData()?.token ?? null;
  },

  /**
   * دریافت رفرش‌توکن
   */
  getRefreshToken: (): string | null => {
    return authStorage.getAuthData()?.refreshToken ?? null;
  },

  /**
   * بررسی منقضی شدن اکسس‌توکن بر اساس تاریخ expiration
   */
  isTokenExpired: (): boolean => {
    const auth = authStorage.getAuthData();
    if (!auth?.expiration) return true;

    // ۶۰ ثانیه حاشیه اطمینان (skew) برای جلوگیری از رقابت تایم شبکه
    const expirationTime = new Date(auth.expiration).getTime() - 60 * 1000;
    return Date.now() >= expirationTime;
  },

  /**
   * پاک‌سازی کامل نشست
   */
  clearAuthData: (): void => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  },

  /**
   * بررسی وجود نشست فعال
   */
  isAuthenticated: (): boolean => {
    return Boolean(authStorage.getAccessToken());
  },
};
