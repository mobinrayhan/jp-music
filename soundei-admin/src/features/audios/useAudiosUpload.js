import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

export default function useAudiosUpload() {
  // Mutation for uploading a single file
  const queryClient = useQueryClient();

  const { mutate: uploadFileMutation, isPending } = useMutation({
    mutationFn: async (files) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      formData.append("uploadPath", "uploads/audios");

      return axiosInstance.post("/audios/upload-audios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Upload-Path": "all-audios/preview",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("uploadedFiles");
      toast.success("Uploaded Audios Successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    },
  });

  return { uploadFileMutation, isPending };
}
