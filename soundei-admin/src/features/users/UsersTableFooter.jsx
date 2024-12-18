import { useSearchParams } from "react-router-dom";
import useUsers from "./useUsers";

export const USER_LIMIT_PER_PAGE = 10;

export default function UsersTableFooter() {
  const [querySearch, setSearchParams] = useSearchParams();
  const { data, isPending } = useUsers();

  const totalUsersLen = data?.totalCount;

  const currentPage = +querySearch.get("page") || 1;

  function handleNext() {
    querySearch.set("page", +currentPage + 1);
    setSearchParams(querySearch);
  }

  function handlePrev() {
    querySearch.set("page", +currentPage - 1);
    setSearchParams(querySearch);
  }

  const disablePrevBtn = currentPage === 1;
  const disableNextBtn =
    Math.ceil(totalUsersLen / USER_LIMIT_PER_PAGE) === currentPage;

  return USER_LIMIT_PER_PAGE <= totalUsersLen ? (
    <tfoot className="bg-slate-200">
      <td colSpan="7" className="p-3">
        <div className="flex items-center justify-between">
          <span>
            Showing{" "}
            <strong>{(currentPage - 1) * USER_LIMIT_PER_PAGE + 1}</strong> to{" "}
            <strong>
              {Math.min(totalUsersLen, currentPage * USER_LIMIT_PER_PAGE)}
            </strong>{" "}
            users of <strong>{totalUsersLen}</strong> results
          </span>

          <div className="flex gap-4">
            <button
              className="bg-blue-500 p-2 px-4 tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handlePrev}
              disabled={isPending || disablePrevBtn}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 p-2 px-4 tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleNext}
              disabled={isPending || disableNextBtn}
            >
              Next
            </button>
          </div>
        </div>
      </td>
    </tfoot>
  ) : null;
}
