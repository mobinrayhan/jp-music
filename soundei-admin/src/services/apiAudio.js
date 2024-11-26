import { getToken } from "../lib/getToken";
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
    console.log(error.response.data.message);

    throw new Error(
      error.response.data.message || "An error occurred while upload audios.",
    );
  }
};
