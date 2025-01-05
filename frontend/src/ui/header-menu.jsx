"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu({ menuOptions }) {
  const pathName = usePathname();
  const activePath = pathName.split("/")[1] ? pathName.split("/")[1] : "/";

  return (
    <ul className="flex align-middle">
      {menuOptions.map(({ href, label }) => (
        <li key={label} className={`hidden md:block`}>
          <Button
            aria-label={`${label} links`}
            asChild
            variant={`${activePath === href?.split("/")?.[1] ? "secondary" : "ghost"}`}
          >
            <Link href={href}>{label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
