import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// اینجا می‌توانید Interceptor برای مدیریت خطاها یا Refresh Token اضافه کنید
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // مدیریت خطاهای ۴۰۱ یا ۵۰۰ به صورت متمرکز
    return Promise.reject(error);
  }
);

export default api;
