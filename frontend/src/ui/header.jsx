"use client";

import { IoMenuSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import DropdownNavbar from "@/components/header/dropdown-navbar";

const menuOptions = [
  {
    href: "/",
    label: "Sound Effect",
  },
  {
    href: "/library",
    label: "Saved",
  },
];

export default function Header() {
  const pathName = usePathname();

  const activePath = pathName.split("/")[1]
    ? "/" + pathName.split("/")[1]
    : "/";

  return (
    <>
      <h3>
        <Link href="/">LOGO</Link>
      </h3>

      <ul className="flex align-middle">
        {menuOptions.map(({ href, label }) => (
          <li key={label}>
            <Button
              asChild
              variant={`${activePath === href ? "secondary" : "ghost"}`}
            >
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>

      <DropdownNavbar />
    </>
  );
}
