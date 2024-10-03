"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import DropdownNavbar from "@/components/header/dropdown-navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuOptions = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/newest",
    label: "Newest",
  },
  {
    href: "/all-sfx",
    label: "All SFX",
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
      <Link href={"/"} className="flex items-center gap-1">
        <div href="/" className="relative block aspect-video h-10">
          <Image src={"/soundei-logo.png"} fill alt="Soundei Logo" />
        </div>
        <h3 className="md:text-2xl">Soundei</h3>
      </Link>

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
