import { CiMenuKebab } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

export default function AudioTableBody({
  audios,
  onAddMenuPosition,
  positionAudioId,
}) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "name-asc";

  // SORTING AUDIOS - chat gpt and jonas 😝
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedAudios = [...audios].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * modifier;
    } else if (valueA instanceof Date || valueB instanceof Date) {
      return (new Date(valueA) - new Date(valueB)) * modifier;
    } else {
      return (valueA - valueB) * modifier;
    }
  });

  return (
    <tbody>
      {sortedAudios.map(({ _id, name, category }) => (
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
            <button
              className={`border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100 ${positionAudioId === _id ? "border-slate-300 bg-slate-200" : ""}`}
              onClick={(eve) =>
                onAddMenuPosition(eve, {
                  _id,
                  name,
                  category,
                })
              }
            >
              <CiMenuKebab size={20} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
