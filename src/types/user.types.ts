// --- کپچا ---
export interface CaptchaResponse {
  captcha: string; // رشته تصویر Base64
}

// --- لاگین ---
export interface LoginRequest {
  username: string;
  password: string;
  captcha: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  refreshToken: string;
}

