"use client";

import { IoMenuSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";

const menuOptions = [
  {
    href: "/",
    label: "Sound Effect",
  },
  {
    href: "/saved",
    label: "Saved",
  },
];

export default function Header() {
  const pathName = usePathname();

  return (
    <>
      <h3>LOGO</h3>

      <ul className="flex align-middle">
        {menuOptions.map(({ href, label }) => (
          <li key={label}>
            <Button asChild variant="secondary">
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>

      <DropdownNavbar />
    </>
  );
}

function DropdownNavbar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoMenuSharp size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>hasdf</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
