// SORTING AUDIOS - chat gpt and jonas 😝

export const sortFromParams = ({ params, datas }) => {
  const [field, direction] = params.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedData = [...datas].sort((a, b) => {
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

  return sortedData;
};
