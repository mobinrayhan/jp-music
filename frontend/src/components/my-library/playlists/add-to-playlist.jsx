"use client";
import { useEffect, useState } from "react";
import CreatePlaylist from "./create-playlist";
import DialogWrapper from "./dialog-wrapper";
import PlaylistList from "./playlist-list";

export function AddToPlaylist() {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [isActiveNewPlaylist, setIsActiveNewPlaylist] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  function handleCreatingPlaylist(status) {
    setIsCreatingPlaylist(status);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

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
          value={inputValue}
          onChange={handleChange}
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
          querySearch={debouncedValue}
        />
      )}
    </DialogWrapper>
  );
}
