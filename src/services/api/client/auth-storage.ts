import {
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRATION_KEY,
} from "@/constants/auth.constants";

export interface AuthTokens {
  token: string;
  refreshToken: string;
  expiration: string;
}

export const authStorage = {
  getAccessToken: (): string | null => sessionStorage.getItem(AUTH_TOKEN_KEY),
  getRefreshToken: (): string | null => sessionStorage.getItem(REFRESH_TOKEN_KEY),
  getExpiration: (): string | null => sessionStorage.getItem(TOKEN_EXPIRATION_KEY),

  setAuthData: (data: AuthTokens): void => {
    sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    sessionStorage.setItem(TOKEN_EXPIRATION_KEY, data.expiration);
  },

  clearAuthData: (): void => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRATION_KEY);
  },

  isAuthenticated: (): boolean => {
    return Boolean(sessionStorage.getItem(AUTH_TOKEN_KEY));
  },
};
