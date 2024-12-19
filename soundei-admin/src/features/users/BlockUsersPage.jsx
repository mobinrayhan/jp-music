import useSortBySelect from "../../hooks/useSortBySelect";
import QuerySearch from "../../ui/QuerySearch";
import useDisabledUsers from "./useDisabledUsers";
import UsersTableList from "./UsersTableList";
import UsesTableOption from "./UsesTableOption";

export default function BlockUsersPage() {
  const { data, error, isPending } = useDisabledUsers();
  const { sortedData: sortedDisableUsers } = useSortBySelect({
    datas: data?.disabledUsers ?? [],
    defaultOrder: "username-asc",
  });

  return (
    <section className="rounded-md bg-slate-100 p-6">
      <h1 className="text-center text-3xl font-semibold tracking-wider">
        All Users
      </h1>

      <header className="flex items-center justify-between">
        <QuerySearch placeholder={"Enter User Name  Or E-mail"} />
        <UsesTableOption />
      </header>

      <UsersTableList
        error={error}
        isPending={isPending}
        sortedUser={sortedDisableUsers}
        totalCount={data?.totalCount}
      />
    </section>
  );
}
