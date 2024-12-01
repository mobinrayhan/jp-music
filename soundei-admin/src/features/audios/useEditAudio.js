import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAudio } from "../../services/apiAudio";

export default function useEditAudio() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: editAudioFn,
    error,
  } = useMutation({
    mutationFn: async (formData) =>
      // mutationFn: async ({ audioName, keywords, category, _id }) =>
      await editAudio(formData),
    //   await editAudio({ audioName, keywords, category, _id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["audios"]);
    },
  });

  return { data, editAudioFn, error };
}
