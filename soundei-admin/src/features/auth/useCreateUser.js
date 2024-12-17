import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewUser } from "../../services/apiAuth";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  const { isPending, mutate: signup } = useMutation({
    mutationFn: createNewUser,
    onSuccess: (user) => {
      toast.success(user.message || "User Created Successfully!");
      queryClient.invalidateQueries("users");
    },
    onError: (err) => {
      toast.error(err?.message || "Something Went Wrong !");
    },
  });

  return { signup, isPending };
}
