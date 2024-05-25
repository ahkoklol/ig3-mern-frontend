import axios from 'axios';

// to avoid repeating the ptoken passing on every page

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const token = storedUser.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;