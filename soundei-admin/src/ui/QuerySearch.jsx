import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function QuerySearch({ placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("querySearch") || "",
  );
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams);

    if (debouncedValue) {
      updatedParams.set("querySearch", debouncedValue);
    } else {
      updatedParams.delete("querySearch");
    }

    setSearchParams(updatedParams);
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <input
      type="search"
      className="w-1/4 rounded-md border border-slate-200 p-2 px-4 placeholder:tracking-wider"
      placeholder={placeholder || "PLEASE WRITE A PLACEHOLDER"}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  );
}