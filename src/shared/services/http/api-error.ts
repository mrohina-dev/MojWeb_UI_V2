
import type { ApiError } from "./api.types";

export const createApiError = (
  message: string,
  statusCode: number,
  responseData: unknown = null
): ApiError => ({
  _tag: "ApiError",
  message,
  statusCode,
  isSuccess: false,
  responseData,
});

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as ApiError)._tag === "ApiError"
  );
};
