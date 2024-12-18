import SortBy from "../../ui/SortBy";

const options = [
  { label: "Sort By Name (A-Z)", value: "username-asc" },
  { label: "Sort By Name (Z-A)", value: "username-desc" },
  { label: "Sort By Date (lower first)", value: "createdAt-asc" },
  { label: "Sort By Date (higher first)", value: "createdAt-desc" },
  { label: "Active Users", value: "isActive-true" },
  { label: "Disabled Users", value: "isActive-false" },
];

export default function UsesTableOption() {
  return <SortBy options={options} />;
}
