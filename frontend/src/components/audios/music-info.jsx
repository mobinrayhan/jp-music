"use client";

import { useAudioPlayer } from "@/context/audio-player-context";
import { useEffect } from "react";
import AudioPlayer from "./audio-player";
import MusicTableList from "./music-table-list";

function AudioTableContent({ audios, providedPlaylist, onMutate }) {
  const { setAudioPlaylist } = useAudioPlayer();

  useEffect(() => {
    setAudioPlaylist(providedPlaylist || audios);
  }, [audios, providedPlaylist, setAudioPlaylist]);

  return (
    <>
      <MusicTableList audios={audios} onMutate={onMutate} />
      <AudioPlayer />
    </>
  );
}

export default function AudioTable({ audios, providedPlaylist, onMutate }) {
  return (
    <AudioTableContent
      audios={audios}
      providedPlaylist={providedPlaylist}
      onMutate={onMutate}
    />
  );
}
