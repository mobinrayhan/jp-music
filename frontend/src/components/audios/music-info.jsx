"use client";

import {
  AudioPlayerProvider,
  useAudioPlayer,
} from "@/context/audio-player-context";
import { useEffect } from "react";
import AudioPlayer from "./audio-player";
import MusicTableList from "./music-table-list";

function AudioTableContent({ audios, providedPlaylist }) {
  const { setAudioPlaylist } = useAudioPlayer();

  useEffect(() => {
    setAudioPlaylist(providedPlaylist || audios);
  }, [audios, providedPlaylist, setAudioPlaylist]);

  return (
    <>
      <MusicTableList audios={audios} />
      <AudioPlayer />
    </>
  );
}

export default function AudioTable({ audios, providedPlaylist }) {
  return (
    <AudioTableContent audios={audios} providedPlaylist={providedPlaylist} />
  );
}
