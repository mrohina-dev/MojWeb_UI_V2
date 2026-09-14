
import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-client";

export const http = {
  /**
   * ارسال درخواست GET
   * @param url آدرس اندپوینت
   * @param config تنظیمات اختیاری درخواست Axios
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  /**
   * ارسال درخواست POST
   * @param url آدرس اندپوینت
   * @param data بدنه ارسالی
   * @param config تنظیمات اختیاری درخواست Axios
   */
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  /**
   * ارسال درخواست PUT
   * @param url آدرس اندپوینت
   * @param data بدنه ارسالی
   * @param config تنظیمات اختیاری درخواست Axios
   */
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  /**
   * ارسال درخواست PATCH
   * @param url آدرس اندپوینت
   * @param data بدنه ارسالی
   * @param config تنظیمات اختیاری درخواست Axios
   */
  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },

  /**
   * ارسال درخواست DELETE
   * @param url آدرس اندپوینت
   * @param config تنظیمات اختیاری درخواست Axios
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
