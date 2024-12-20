import SortBy from "../../ui/SortBy";

const options = [
  { label: "Sort By Name (A-Z)", value: "name-asc" },
  { label: "Sort By Name (Z-A)", value: "name-desc" },
  { label: "Sort By Category (A-Z)", value: "category-asc" },
  { label: "Sort By Category (Z-A)", value: "category-desc" },
  { label: "Sort By Date (Lower first)", value: "createdAt-asc" },
  { label: "Sort By Date (Higher first)", value: "createdAt-desc" },
  { label: "Sort By Download Count (Lower first)", value: "downloadCount-asc" },
  {
    label: "Sort By Download Count (Higher first)",
    value: "downloadCount-desc",
  },
];

export default function AudioTableOperation() {
  return <SortBy options={options} />;
}
