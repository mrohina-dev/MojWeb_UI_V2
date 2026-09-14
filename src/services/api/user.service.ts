import type { CaptchaResponse } from "@/types/userResponse.type";
import { http } from "./client/http-service";


export const userService = {
  getCaptcha: () => {
    return http.get<CaptchaResponse>("/api/User/GetCaptcha");
  },
  
  // متدهای بعدی مربوط به یوزر هم همین‌جا اضافه می‌شوند:
};
