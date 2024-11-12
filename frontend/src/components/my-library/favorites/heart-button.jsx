"use client";

import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/favorites-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";

export default function HeartButton({
  audioId,
  className,
  onFavoriteMutate = null,
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const session = useSession();
  const { push } = useRouter();
  const isFavorited = favorites.includes(audioId);

  const handleClick = () => {
    if (session.status === "authenticated") {
      const wasFavorited = isFavorited;
      toggleFavorite(audioId);

      if (onFavoriteMutate) {
        onFavoriteMutate((prevData) => {
          let updatedAudios;

          if (wasFavorited) {
            updatedAudios = prevData.audios.filter(
              (audio) => audio._id !== audioId,
            );

            return { ...prevData, audios: updatedAudios };
          } else {
            return prevData;
          }
        }, false);
      }
    } else if (session.status === "unauthenticated") {
      push("/login");
    }
  };

  return (
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
  );
}
