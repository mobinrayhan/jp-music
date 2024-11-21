import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/admin/create-account",
    credentials,
  );
  return response.data; // Return server response (e.g., user info, message)
};

export const createNewUser = async (userData) => {
  const res = await axiosInstance.post("/admin/create-account", userData);
  return res.data;
};
