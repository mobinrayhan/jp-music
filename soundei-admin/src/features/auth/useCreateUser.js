import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "../../services/apiAuth";

export default function useCreateUser() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: createNewUser,
    onSuccess: (user) => {
      console.log(user);
    },
  });

  return { signup, isPending };
}
