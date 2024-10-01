"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

export default function DropDownMenuLIst() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex md:hidden">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-2">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <FaPlus className="text-lg" /> <span>Add To Playlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <MdOutlineFileDownload className="text-lg" /> <span>Download</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <FaLink className="text-lg" /> <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
