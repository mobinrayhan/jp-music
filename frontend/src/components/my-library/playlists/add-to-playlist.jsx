"use client";
import { useEffect, useState } from "react";
import CreatePlaylist from "./create-playlist";
import DialogWrapper from "./dialog-wrapper";
import PlaylistList from "./playlist-list";

export function AddToPlaylist({ audioId }) {
  const [isPlaylistLoading, setPlaylistLoading] = useState(false);
  const [isActiveNewPlaylist, setIsActiveNewPlaylist] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  function handlePlaylistLoading(status) {
    setPlaylistLoading(status);
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
      isLoading={isPlaylistLoading}
      title={isActiveNewPlaylist ? "Create New Playlist" : "Your Playlist"}
      description={
        "Easily add, organize, and enjoy all your favorite tracks in one place."
      }
    >
      {!isActiveNewPlaylist && (
        <input
          value={inputValue}
          onChange={handleChange}
          disabled={isPlaylistLoading}
          type="text"
          placeholder="Search your playlist"
          className="w-full rounded-sm border-none bg-gray-200 px-3 py-2 outline-none dark:bg-slate-600"
        />
      )}

      {isActiveNewPlaylist && (
        <CreatePlaylist
          onCreatingPlaylist={handlePlaylistLoading}
          onHideAddPlaylist={setIsActiveNewPlaylist.bind(null, false)}
        />
      )}

      {!isActiveNewPlaylist && (
        <PlaylistList
          isAddingAudio={isPlaylistLoading}
          audioId={audioId}
          onShowAddPlaylist={setIsActiveNewPlaylist.bind(null, true)}
          querySearch={debouncedValue}
          onAddingToPlaylist={handlePlaylistLoading}
        />
      )}
    </DialogWrapper>
  );
}
