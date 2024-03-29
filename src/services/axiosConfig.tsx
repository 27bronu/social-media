import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://192.168.0.43:4000/api",
  timeout: 5000,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
