import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend URL
  withCredentials: true, // Allows sending cookies with requests
});
axiosInstance.interceptors.request.use((config) => {
  config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  return config;
});

export default axiosInstance;
