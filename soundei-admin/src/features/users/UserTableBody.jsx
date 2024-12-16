import { CiMenuKebab } from "react-icons/ci";

export default function UserTableBody({ sortedUsers }) {
  return (
    <tbody>
      {sortedUsers.map(({ _id, name, category, keywords, ...rest }) => (
        <tr key={_id} className="border-b border-slate-200 bg-white">
          <th
            scope="row"
            className="0 whitespace-nowrap px-6 py-4 font-medium text-black"
          >
            {name}
          </th>
          <td className="px-6 py-4">WILL BE ADDED</td>
          <td className="px-6 py-4">{category}</td>
          <td className="px-6 py-4">
            {keywords?.join(", ") || "No Keywords Found!"}
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
      ))}
    </tbody>
  );
}
