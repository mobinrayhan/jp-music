"use client";

import { revalidateAction } from "@/actions/revalidateAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavorites } from "@/context/favorites-context";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaLink, FaPlus, FaRegHeart } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { Button } from "../ui/button";

export default function DropDownMenuLIst({ audioId }) {
  // @src\components\my-library\favorites\heart-button.jsx
  //  The same code was using that component for the same behavior

  const { favorites, toggleFavorite } = useFavorites();
  const session = useSession();
  const { push } = useRouter();
  const isFavorited = favorites.includes(audioId);

  const handleClick = () => {
    if (session.status === "authenticated") {
      toggleFavorite(audioId);
    } else if (session.status === "unauthenticated") {
      return push("/login");
    }
  };

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

        <form action={revalidateAction}>
          <input type="hidden" name="path" value={"/my-library/favorites"} />

          <button type="submit">
            <DropdownMenuItem
              as="button"
              className="flex cursor-pointer items-center gap-2"
              aria-label="Download Button"
              onClick={handleClick}
            >
              {isFavorited ? (
                <IoHeart className="text-lg font-extrabold" />
              ) : (
                <FaRegHeart className="text-lg font-extrabold" />
              )}

              <span>Favorite</span>
            </DropdownMenuItem>
          </button>
        </form>

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
