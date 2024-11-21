import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { data: user, isPending } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  return { user, isPending };
}
