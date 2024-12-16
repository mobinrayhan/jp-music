import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../services/apiUser";
import { USER_LIMIT_PER_PAGE } from "./UsersTableFooter";

export default function useUsers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const querySearch = searchParams.get("querySearch") || "";
  const page = +searchParams.get("page") || 1;

  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["users", page, querySearch],
    queryFn: () => getUsers({ querySearch, page }),
  });

  //PRE - FETCHING

  const pageCount = Math.ceil(data?.totalCount / USER_LIMIT_PER_PAGE);

  if (pageCount > page) {
    console.log({ querySearch, page: page + 1 });

    queryClient.prefetchQuery({
      queryKey: ["users", page + 1, querySearch],
      queryFn: () => getUsers({ querySearch, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["users", page - 1, querySearch],
      queryFn: () => getUsers({ querySearch, page: page - 1 }),
    });
  }

  return { data, isPending, error, isLoading };
}
