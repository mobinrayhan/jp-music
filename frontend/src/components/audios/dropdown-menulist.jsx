"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { CiHeart } from "react-icons/ci";
import { FaLink, FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";

export default function DropDownMenuLIst() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex md:hidden">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          aria-label="Show Audio Options Button"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-2">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          aria-label="Add To Playlist Button"
        >
          {" "}
          <FaPlus className="text-lg" /> <span>Add To Playlist</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          aria-label="Download Button"
        >
          <CiHeart className="text-lg font-extrabold" />
          <span>Favorite</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          aria-label="Copy Link Button"
        >
          <FaLink className="text-lg" /> <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
