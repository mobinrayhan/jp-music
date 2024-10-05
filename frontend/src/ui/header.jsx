"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import DropdownNavbar from "@/components/header/dropdown-navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const menuOptions = [
  {
    href: "/newest",
    label: "Newest",
  },

  {
    href: "/my-library",
    label: "My Library",
  },
];

export default function Header() {
  const pathName = usePathname();

  const activePath = pathName.split("/")[1]
    ? "/" + pathName.split("/")[1]
    : "/";

  return (
    <>
      <Link href={"/category/all"} className="flex items-center gap-1">
        <div>
          <Image
            src="/soundei-logo.png"
            alt="Soundei Logo"
            width={60}
            height={30}
            layout="intrinsic"
          />
        </div>
        <h3 className="md:text-2xl">Soundei</h3>
      </Link>

      <ul className="flex align-middle">
        {menuOptions.map(({ href, label }) => (
          <li
            key={label}
            className={`hidden sm:${label === "Newest" || label === "Newest" ? "block" : "hidden"} md:block`}
          >
            <Button
              arialLabel={`${label} links`}
              asChild
              variant={`${activePath === href ? "secondary" : "ghost"}`}
            >
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </ul>

      <DropdownNavbar menuOptions={menuOptions} />
    </>
  );
}
