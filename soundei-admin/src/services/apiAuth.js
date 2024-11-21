import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/admin/login", credentials);
  return response.data;
};

export const createNewUser = async (userData) => {
  const res = await axiosInstance.post("/admin/create-account", userData);
  return res.data;
};
