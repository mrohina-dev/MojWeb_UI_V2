// --- کپچا ---
export interface CaptchaResponse {
  captcha: string; // رشته تصویر Base64
}

// --- لاگین و توکن ---
export interface LoginRequest {
  username: string;
  password: string;
  captcha: string;
}

export interface AuthTokens {
  token: string;
  expiration: string;
  refreshToken: string;
}

// خروجی لاگین و خروجی رفرش توکن هر دو یک ساختار هستند
export type LoginResponse = AuthTokens;
export type RefreshTokenResponse = AuthTokens;

export interface RefreshTokenRequest {
  token: string;
}
