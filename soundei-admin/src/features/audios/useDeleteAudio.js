import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAudio } from "../../services/apiAudio";

export default function useDeleteAudio() {
  const queryClient = useQueryClient();

  const { data, mutate: audioDeleteFn } = useMutation({
    mutationFn: async ({ audioId }) => deleteAudio({ audioId }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["audios"]);
    },
  });
  return { data, audioDeleteFn };
}
