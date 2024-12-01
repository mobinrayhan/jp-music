export default function AudioTableHeader() {
  return (
    <thead className="bg-slate-200 text-xs uppercase">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          preview
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>{" "}
        <th scope="col" className="px-6 py-3">
          Keywords
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Action
        </th>
      </tr>
    </thead>
  );
}
