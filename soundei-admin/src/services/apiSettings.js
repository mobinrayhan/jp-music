import { getToken } from "../lib/localStorageToken";
import axiosInstance from "./axiosInstance";

export const updateGeneral = async (formData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.put("/settings/general", formData, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        "X-Upload-Path": `images/logo`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "An error occurred while updating general data.",
    );
  }
};

export const getGeneralData = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.get(
      "/settings/general",

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
        "An error occurred while getting general data.",
    );
  }
};
