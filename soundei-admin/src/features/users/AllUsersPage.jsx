import useSortBySelect from "../../hooks/useSortBySelect";
import QuerySearch from "../../ui/QuerySearch";
import UsersTableList from "./UsersTableList";
import UsesTableOption from "./UsesTableOption";
import useUsers from "./useUsers";

export default function AllUsersPage() {
  const { data, error, isPending } = useUsers();
  const { sortedData: sortedUser } = useSortBySelect({
    datas: data?.users ?? [],
    defaultOrder: "username-asc",
  });

  return (
    <section className="rounded-md bg-slate-100 p-6">
      <h1 className="text-center text-3xl font-semibold tracking-wider">
        All Users
      </h1>

      <header className="flex items-center justify-between">
        <QuerySearch placeholder={"Enter User Name  Or E-mail"} />
        <UsesTableOption
          moreSortedOptions={[
            { label: "Active Users", value: "isActive-true" },
            { label: "Disabled Users", value: "isActive-false" },
          ]}
        />
      </header>

      <UsersTableList
        error={error}
        isPending={isPending}
        sortedUser={sortedUser}
        totalCount={data?.totalCount}
      />
    </section>
  );
}
