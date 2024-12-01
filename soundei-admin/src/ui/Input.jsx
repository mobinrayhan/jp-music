export default function Input({ header, instruction, ...rest }) {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={rest.name || rest.id}
      >
        {header || "PLEASE ADD HEADER"}
      </label>
      <input
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        {...rest}
      />
      {instruction && (
        <p className="mt-2 text-xs text-gray-500">{instruction}</p>
      )}
    </div>
  );
}
