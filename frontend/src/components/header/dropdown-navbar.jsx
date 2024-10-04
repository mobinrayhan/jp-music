"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";

const dropdownMenuOptions = [
  {
    href: "/account",
    label: "Account",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
  },
];

export default function DropdownNavbar({ menuOptions }) {
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bottom-16 border border-gray-500">
        <IoMenuSharp size={32} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 p-2">
        {[...menuOptions, ...dropdownMenuOptions].map(({ href, label }, i) => (
          <DropdownMenuItem
            key={href}
            className={`flex cursor-pointer items-center gap-2 sm:${label === "Newest" ? "!hidden" : "flex"} md:${menuOptions[i]?.label === label ? "hidden" : "flex"}`}
          >
            {" "}
            <button onClick={() => push(href)}>{label}</button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
