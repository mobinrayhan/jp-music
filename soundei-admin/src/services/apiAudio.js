import { getToken } from "../lib/localStorageToken";
import axiosInstance from "./axiosInstance";

export const uploadAudios = async ({ files, category, metadata }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("metadata", JSON.stringify(metadata));
  formData.append("uploadPath", "uploads/audios");

  try {
    await axiosInstance.post("/audios/upload-audios", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Upload-Path": `all-audios/preview/${category}`,
        Authorization: `Bearer ${token.token}`,
      },
    });
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while upload audios.",
    );
  }
};

export const getAudios = async ({ maxAudioPerPage, querySearch }) => {
  const fetcherEndPoint = `/audios/search/${"all"}?querySearch=${querySearch || ""}&maxAudios=${maxAudioPerPage}`;
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const data = await axiosInstance.get(fetcherEndPoint, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while fetching audios.",
    );
  }
};

// export const editAudio = async ({ audioName, keywords, category, _id }) => {
export const editAudio = async (formData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No Token Found");
  }

  try {
    const data = await axiosInstance.post("/audios/edit", formData, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "multipart/form-data",
        "X-Upload-Path": `all-audios/preview/${formData.get("category")}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while fetching audios.",
    );
  }
};
