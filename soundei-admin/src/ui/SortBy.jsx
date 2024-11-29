import { useSearchParams } from "react-router-dom";

export default function SortBy({ options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchParams(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <select
      className="rounded-md border border-slate-200 p-2"
      onChange={(eve) => handleSearchParams(eve.target.value)}
    >
      {options.map(({ value, label }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
