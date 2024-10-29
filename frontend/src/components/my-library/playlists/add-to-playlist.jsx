"use client";
import { useState } from "react";
import CreatePlaylist from "./create-playlist";
import DialogWrapper from "./dialog-wrapper";
import PlaylistList from "./playlist-list";

export function AddToPlaylist() {
  const [isActiveNewPlaylist, setIsActiveNewPlaylist] = useState(false);

  function handleNewPlaylist() {
    setIsActiveNewPlaylist((prev) => !prev);
  }

  return (
    <DialogWrapper
      title={isActiveNewPlaylist ? "Create New Playlist" : "Your Playlist"}
      description={
        "Easily add, organize, and enjoy all your favorite tracks in one place."
      }
    >
      {!isActiveNewPlaylist && (
        <input
          type="text"
          placeholder="Search your playlist"
          className="w-full rounded-sm border-none bg-gray-200 px-3 py-2 outline-none"
        />
      )}

      {!isActiveNewPlaylist && (
        <PlaylistList onShowAddPlaylist={handleNewPlaylist} />
      )}
      
      {isActiveNewPlaylist && (
        <CreatePlaylist onHideAddPlaylist={handleNewPlaylist} />
      )}
    </DialogWrapper>
  );
}
