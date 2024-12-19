import QuerySearch from "../../ui/QuerySearch";
import UsersTableList from "./UsersTableList";
import UsesTableOption from "./UsesTableOption";

export default function BlockUsersPage() {
  return (
    <section className="rounded-md bg-slate-100 p-6">
      <h1 className="text-center text-3xl font-semibold tracking-wider">
        All Users
      </h1>

      <header className="flex items-center justify-between">
        <QuerySearch placeholder={"Enter User Name  Or E-mail"} />
        <UsesTableOption />
      </header>

      <UsersTableList />
    </section>
  );
}
