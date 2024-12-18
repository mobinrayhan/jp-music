import useSortBySelect from "../../hooks/useSortBySelect";
import Spinner from "../../ui/Spinner";
import UsersTableFooter from "./UsersTableFooter";
import UsersTableHeader from "./UsersTableHeader";
import UserTableBody from "./UserTableBody";
import useUsers from "./useUsers";

export default function UsersTableList() {
  const { data, error, isPending } = useUsers();
  const { sortedData: sortedUser } = useSortBySelect({
    datas: data?.users ?? [],
    defaultOrder: "username-asc",
  });

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
          <UsersTableFooter />
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
