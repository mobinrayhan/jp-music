import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadAudios } from "../../services/apiAudio";

export default function useAudiosUpload() {
  // Mutation for uploading a single file
  const queryClient = useQueryClient();

  const { mutate: uploadFileMutation, isPending } = useMutation({
    mutationFn: async ({ files, category, metadata }) =>
      uploadAudios({ files, category, metadata }),
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
