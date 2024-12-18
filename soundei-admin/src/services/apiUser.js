import { USER_LIMIT_PER_PAGE } from "../features/users/UsersTableFooter";
import { getToken } from "../lib/localStorageToken";
import axiosInstance from "./axiosInstance";

export const getUsers = async ({ querySearch, page }) => {
  const fetcherEndPoint = `/users/all?querySearch=${querySearch}&page=${page}&limit=${USER_LIMIT_PER_PAGE}`;
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.get(fetcherEndPoint, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while fetching users.",
    );
  }
};

export const updateUserActiveStatus = async ({ id }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.put(
      "/users/toggle-active-status",
      { userId: id },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "An error occurred while updating user status.",
    );
  }
};

export const updateUser = async ({ updateFormData }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.put(
      "/users/update-user",
      updateFormData,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while updating user.",
    );
  }
};
