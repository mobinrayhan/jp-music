"use client";
import { useState } from "react";
import CreatePlaylist from "./create-playlist";
import DialogWrapper from "./dialog-wrapper";
import PlaylistList from "./playlist-list";

export function AddToPlaylist() {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [isActiveNewPlaylist, setIsActiveNewPlaylist] = useState(false);

  function handleCreatingPlaylist(status) {
    setIsCreatingPlaylist(status);
  }

  return (
    <DialogWrapper
      isLoading={isCreatingPlaylist}
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

      {isActiveNewPlaylist && (
        <CreatePlaylist
          onCreatingPlaylist={handleCreatingPlaylist}
          onHideAddPlaylist={setIsActiveNewPlaylist.bind(null, false)}
        />
      )}

      {!isActiveNewPlaylist && (
        <PlaylistList
          onShowAddPlaylist={setIsActiveNewPlaylist.bind(null, true)}
        />
      )}
    </DialogWrapper>
  );
}
