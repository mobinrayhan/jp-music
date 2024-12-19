import Spinner from "../../ui/Spinner";
import UsersTableFooter from "./UsersTableFooter";
import UsersTableHeader from "./UsersTableHeader";
import UserTableBody from "./UserTableBody";

export default function UsersTableList({
  isPending = false,
  error = null,
  sortedUser = [],
  totalCount = 0,
}) {
  if (isPending) {
    return (
      <div className="flex h-[76vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-lg capitalize tracking-wider">
        {error.message}
      </p>
    );
  }

  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
        <UsersTableHeader />
        <UserTableBody sortedUser={sortedUser} />
        {sortedUser.length ? (
          <UsersTableFooter totalUsersLen={totalCount} isPending={isPending} />
        ) : (
          <tfoot>
            <td colSpan="7" className="p-10">
              <h3 className="text-center text-2xl tracking-wider">
                {" "}
                No Filtered Users Found!
              </h3>
            </td>
          </tfoot>
        )}
      </table>
    </div>
  );
}
