import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGeneral } from "../../services/apiSettings";

export default function useUpdateWebSettings() {
  const queryClient = useQueryClient();

  const { data, isPending, mutate } = useMutation({
    mutationFn: (formData) => updateGeneral(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["general"]);
    },
  });

  return { data, isPending, mutate };
}
