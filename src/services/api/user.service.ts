import type { CaptchaResponse, LoginRequest, LoginResponse } from "@/types/user.types";
import { http } from "./client/http-service";
import { authStorage } from "./client/auth-storage";


export const userService = {
  getCaptcha: () => {
    return http.get<CaptchaResponse>("/api/User/GetCaptcha");
  },
  
  /**
   * لاگین کاربر و بازگرداندن توکن‌ها
   */
  login: async (payload: LoginRequest) => {
    const data = await http.post<LoginResponse>("/api/User/Login", payload);
    // ذخیره توکن‌ها در Storage
    authStorage.setAuthData(data);
    return data;
  },

  /**
   * خروج کاربر و پاک‌سازی سشن
   */
  logout: () => {
    authStorage.clearAuthData();
  },
};
