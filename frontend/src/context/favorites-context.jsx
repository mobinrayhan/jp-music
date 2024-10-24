"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const session = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (session.status === "unauthenticated") {
          return setFavorites([]);
        } else if (session.status === "authenticated") {
          const response = await fetch("/api/favorite-ids");
          const data = await response.json();
          const ids = data.favoriteAudioIds.map((favId) => favId.id);
          setFavorites(ids);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [session.status]);

  const toggleFavorite = async (audioId) => {
    // Optimistically update the UI before awaiting the API call
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.includes(audioId);
      return isFavorited
        ? prevFavorites.filter((id) => id !== audioId)
        : [...prevFavorites, audioId];
    });

    try {
      await fetch(`/api/toggle-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioId }),
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Optionally roll back the optimistic update in case of error
      setFavorites((prevFavorites) => {
        const isFavorited = prevFavorites.includes(audioId);
        return isFavorited
          ? [...prevFavorites, audioId] // Roll back
          : prevFavorites.filter((id) => id !== audioId);
      });
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
