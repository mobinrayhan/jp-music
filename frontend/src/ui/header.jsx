import DropdownNavbar from "@/components/header/dropdown-navbar";
import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";

export const menuOptions = [
  {
    href: "/newest",
    label: "Newest",
  },

  {
    href: "/my-library/favorites",
    label: "My Library",
  },
];

export default function Header() {
  return (
    <>
      <HeaderLogo />
      <HeaderMenu menuOptions={menuOptions} />
      <DropdownNavbar menuOptions={menuOptions} />
    </>
  );
}
