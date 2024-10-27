"use client";

import { useAudioPlayer } from "@/context/audio-player-context";
import { useEffect } from "react";
import AudioPlayer from "./audio-player";
import MusicTableList from "./music-table-list";

function AudioTableContent({
  audios,
  providedPlaylist,
  onFavoriteMutate,
  onDownloadMutate,
}) {
  const { setAudioPlaylist } = useAudioPlayer();

  useEffect(() => {
    setAudioPlaylist(providedPlaylist || audios);
  }, [audios, providedPlaylist, setAudioPlaylist]);

  return (
    <>
      <MusicTableList
        audios={audios}
        onFavoriteMutate={onFavoriteMutate}
        onDownloadMutate={onDownloadMutate}
      />
      <AudioPlayer />
    </>
  );
}

export default function AudioTable({
  audios,
  providedPlaylist,
  onFavoriteMutate,
  onDownloadMutate,
}) {
  return (
    <AudioTableContent
      audios={audios}
      providedPlaylist={providedPlaylist}
      onFavoriteMutate={onFavoriteMutate}
      onDownloadMutate={onDownloadMutate}
    />
  );
}
