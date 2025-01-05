import { useMutation } from "@tanstack/react-query";
import { updateGeneral } from "../../services/apiSettings";

export default function useUpdateWebSettings() {
  const { data, isPending, mutate } = useMutation({
    mutationFn: ({ facebook, instagram, twitter, logo }) =>
      updateGeneral({ facebook, instagram, twitter, logo }),
  });

  return { data, isPending, mutate };
}
