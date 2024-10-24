"use client";

import { revalidateAction } from "@/actions/revalidateAction";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/favorites-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";

export default function HeartButton({ audioId, className }) {
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
    <form action={revalidateAction}>
      <input type="hidden" value={"/my-library/downloads"} name="path" />

      <Button
        className={`${className || "hidden md:block"}`}
        variant="ghost"
        onClick={handleClick}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorited ? (
          <IoHeart className="text-lg font-extrabold" />
        ) : (
          <FaRegHeart className="text-lg font-extrabold" />
        )}
      </Button>
    </form>
  );
}
