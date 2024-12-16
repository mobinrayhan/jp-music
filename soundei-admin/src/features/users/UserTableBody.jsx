import { CiMenuKebab } from "react-icons/ci";
import useSortBySelect from "../../hooks/useSortBySelect";
import { formatDateTimeWithSeconds } from "../../utils/helper";

export default function UserTableBody({ users }) {
  const { sortedData: sortedUser } = useSortBySelect({
    datas: users,
    defaultOrder: "username-asc",
  });

  console.log(sortedUser);

  return (
    <tbody>
      {sortedUser.map((user) => {
        const { _id, email, isActive, lastLogin, role, username, createdAt } =
          user;

        return (
          <tr key={_id} className="border-b border-slate-200 bg-white">
            <th
              scope="row"
              className="0 whitespace-nowrap px-6 py-4 font-medium text-black"
            >
              {username}
            </th>
            <td className="px-6 py-4">{email}</td>
            <td className="px-6 py-4">{role}</td>
            <td
              className={`px-6 py-4 font-semibold tracking-wider ${isActive ? "text-green-500" : "text-red-500"}`}
            >
              {isActive ? "Active" : "Disabled"}
            </td>
            <td className="px-6 py-4">
              {createdAt ? formatDateTimeWithSeconds(createdAt) : "NOT SET"}
            </td>
            <td className="px-6 py-4">
              {lastLogin ? formatDateTimeWithSeconds(lastLogin) : "NOT SET"}
            </td>
            <td className="flex justify-center px-6 py-4">
              <button
                className={`border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100 ${/*positionAudioId === _id */ Math.random() ? "border-slate-300 bg-slate-200" : ""}`}
                //   onClick={(eve) =>
                //     handleAddMenuPosition(eve, {
                //       _id,
                //       name,
                //       category,
                //       keywords,
                //       ...rest,
                //     })
                //   }
              >
                <CiMenuKebab size={20} />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
