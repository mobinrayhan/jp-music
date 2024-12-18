import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiUser";

export default function useEditUser() {
  const queryClient = useQueryClient();

  const {
    isPending,
    data,
    mutate: updateUserMutate,
  } = useMutation({
    mutationFn: ({ updateFormData }) => updateUser({ updateFormData }),
    onSuccess: (data) => {
      toast.success(data.message || "Updated User!");
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { isPending, data, updateUserMutate };
}
