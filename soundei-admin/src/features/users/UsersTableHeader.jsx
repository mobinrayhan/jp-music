export default function UsersTableHeader() {
  return (
    <thead className="bg-slate-200 text-xs uppercase">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          E-mail
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>{" "}
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Created At
        </th>
        <th scope="col" className="px-6 py-3">
          {/* (will be added after talking with boss) */}
          Last Login
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Actions
        </th>
      </tr>
    </thead>
  );
}
