export default function MetadataTable({ extractedJsonMetadata }) {
  return (
    <div className="relative mt-8 h-[50vh] overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Keywords
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {extractedJsonMetadata.map((metadata) => (
            <tr
              className="border-b bg-white hover:bg-gray-50"
              key={metadata.name}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                {metadata.name}
              </th>
              <td className="px-6 py-4">{metadata.keywords}</td>
              <td className="px-6 py-4">{metadata.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
