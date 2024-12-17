import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserActiveStatus } from "../../services/apiUser";

export default function useUserActiveStatus() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateUserMutation } = useMutation({
    mutationFn: ({ id }) => updateUserActiveStatus({ id }),
    onSuccess: (data) => {
      console.log(data);

      toast.success(data?.message || `User Updated Successfully`);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error?.message || "Something Went Wrong!");
    },
  });

  return { isPending, updateUserMutation };
}
