import SortBy from "../../ui/SortBy";

const options = [
  { label: "Sort By Name (A-Z)", value: "name-asc" },
  { label: "Sort By Name (Z-A)", value: "name-desc" },
  { label: "Sort By Date (lower first)", value: "createdAt-asc" },
  { label: "Sort By Date (higher first)", value: "createdAt-desc" },
];

export default function AudioTableOperation() {
  return <SortBy options={options} />;
}
