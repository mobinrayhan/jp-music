export default function LogoInput({ isPending }) {
  return (
    <div className="mb-6">
      <label
        htmlFor="logo"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Website Logo
      </label>
      <input
        type="file"
        id="logo"
        name="logo"
        disabled={isPending}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
      />
    </div>
  );
}
