"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";

export default function DropdownNavbar() {
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoMenuSharp size={32} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 p-2">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <button onClick={() => push("/account")}>Account</button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <button onClick={() => push("/")}>Home</button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <button onClick={() => push("/library")}>Library</button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <button onClick={() => push("/contact-us")}>Contact Us</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
