"use client";

import { useEffect } from "react";
import AudioPlayer from "./audio-player";
import { AudioPlayerProvider, useAudioPlayer } from "./audio-player-context";
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
  return (
    <AudioPlayerProvider>
      <AudioTableContent audios={audios} />
    </AudioPlayerProvider>
  );
}
