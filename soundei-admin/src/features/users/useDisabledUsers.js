import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getDisabledUsers } from "../../services/apiUser";
import { USER_LIMIT_PER_PAGE } from "./UsersTableFooter";

export default function useDisabledUsers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const querySearch = searchParams.get("querySearch") || "";
  const page = +searchParams.get("page") || 1;

  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["disabledUsers", page, querySearch],
    queryFn: () => getDisabledUsers({ querySearch, page }),
  });

  //PRE - FETCHING

  const pageCount = Math.ceil(data?.totalCount / USER_LIMIT_PER_PAGE);

  if (pageCount > page) {
    queryClient.prefetchQuery({
      queryKey: ["disabledUsers", page + 1, querySearch],
      queryFn: () => getDisabledUsers({ querySearch, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["disabledUsers", page - 1, querySearch],
      queryFn: () => getDisabledUsers({ querySearch, page: page - 1 }),
    });
  }

  return { data, isPending, error, isLoading };
}
