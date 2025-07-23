/* ---------- src/services/axiosInstance.ts ---------- */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL : import.meta.env.VITE_API_BASE_URL,
  timeout : 30_000,        // 30 s   – set to 0 if you never want a timeout
  headers : { Accept: 'application/json' },
});

/* Optional: simple retry once if it was only a timeout ------------------ */
axiosInstance.interceptors.response.use(undefined, err => {
  if (axios.isAxiosError(err) && err.code === 'ECONNABORTED') {
    err.config!.timeout = 60_000;          // wait longer on retry
    return axiosInstance.request(err.config!);
  }
  return Promise.reject(err);
});

// --- NEW: Request Interceptor to add Authorization header ---
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add it to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;