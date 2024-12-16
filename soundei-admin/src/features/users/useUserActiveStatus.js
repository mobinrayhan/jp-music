import { useMutation } from "@tanstack/react-query";
import { updateUserActiveStatus } from "../../services/apiUser";

export default function useUserActiveStatus() {
  const { isPending, mutate: updateUserMutation } = useMutation({
    mutationFn: ({ id }) => updateUserActiveStatus({ id }),
    mutationKey: ["users"],
  });

  return { isPending, updateUserMutation };
}
