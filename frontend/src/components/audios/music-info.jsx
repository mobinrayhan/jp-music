"use client";

import { useAudioPlayer } from "@/context/audio-player-context";
import { useEffect } from "react";
import AudioPlayer from "./audio-player";
import MusicTableList from "./music-table-list";

function AudioTableContent({ audios }) {
  const { setAudioPlaylist } = useAudioPlayer();

  useEffect(() => {
    setAudioPlaylist(audios);
  }, [audios, setAudioPlaylist]);

  return (
    <>
      <MusicTableList audios={audios} />
      <AudioPlayer />
    </>
  );
}

export default function AudioTable({ audios }) {
  return <AudioTableContent audios={audios} />;
}
