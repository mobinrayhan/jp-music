import { getToken } from "../lib/localStorageToken";
import axiosInstance from "./axiosInstance";

export const updateGeneral = async ({ facebook, instagram, twitter, logo }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const { data } = await axiosInstance.put(
      "/settings/general",
      { facebook, instagram, twitter, logo },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "X-Upload-Path": `images/logo`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "An error occurred while updating general data.",
    );
  }
};
