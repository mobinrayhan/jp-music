import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../services/apiUser";

export default function useUsers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const querySearch = searchParams.get("querySearch") || "";
  const page = searchParams.get("page") || 1;
  console.log(querySearch);

  const { data, isPending, error } = useQuery({
    queryKey: ["users", page, querySearch],
    queryFn: () => getUsers({ querySearch, page }),
  });
  return { data, isPending, error };
}
