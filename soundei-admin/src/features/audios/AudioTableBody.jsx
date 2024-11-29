import { CiMenuKebab } from "react-icons/ci";

export default function AudioTableBody({ audios }) {
  return (
    <tbody>
      {audios.map(({ _id, name, category }) => (
        <tr key={_id} className="border-b border-slate-200 bg-white">
          <th
            scope="row"
            className="0 whitespace-nowrap px-6 py-4 font-medium text-black"
          >
            {name}
          </th>
          <td className="px-6 py-4">WILL BE ADDED</td>
          <td className="px-6 py-4">{category}</td>
          <td className="flex justify-center px-6 py-4">
            <button className="border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100">
              <CiMenuKebab size={20} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
