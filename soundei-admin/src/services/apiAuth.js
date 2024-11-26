import { getToken } from "../lib/getToken";
import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/admin/login", credentials);
  return response.data;
};

export const createNewUser = async (userData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No Token Found");
    }

    const res = await axiosInstance.post("/admin/create-account", userData, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while creating a new user.",
      );
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please try again later.",
      );
    } else {
      console.error("Error Message:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const res = await axiosInstance.get(`/admin/user/${token.userId}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return res.data.user;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "An error occurred while creating a new user.",
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error(
        "No response received from the server. Please try again later.",
      );
    } else {
      console.error("Error Message:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};
