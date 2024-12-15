import UsersTableHeader from "./UsersTableHeader";

export default function UsersTableList() {
  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
        <UsersTableHeader />
      </table>
    </div>
  );
}
