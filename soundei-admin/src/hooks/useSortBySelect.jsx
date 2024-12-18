import { useSearchParams } from "react-router-dom";

export default function useSortBySelect({ datas, defaultOrder }) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || defaultOrder;

  const [field, direction] = sortBy.split("-");
  const modifier =
    direction === "true" || direction === "false"
      ? (direction === "true" && true) || (direction === "false" && false)
      : direction === "asc"
        ? 1
        : -1;

  let sortedData;

  if (typeof modifier === "boolean") {
    sortedData = datas.filter((data) => data[field] === modifier);
  } else {
    sortedData = [...datas].sort((a, b) => {
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
  }

  return { sortedData };
}
