import Spinner from "../../ui/Spinner";
import UsersTableHeader from "./UsersTableHeader";
import UserTableBody from "./UserTableBody";
import useUsers from "./useUsers";

export default function UsersTableList() {
  const { data, error, isPending } = useUsers();

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

  // console.log(data);

  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
        <UsersTableHeader />
        <UserTableBody users={data.users} />
      </table>
    </div>
  );
}
