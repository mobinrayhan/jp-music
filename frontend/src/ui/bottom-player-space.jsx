"use client";

import { useAudioPlayer } from "@/context/audio-player-context";

export default function BottomPlayerSpace() {
  const { currentTrack } = useAudioPlayer();

  return currentTrack && <div className="p-20 sm:p-[5.4rem] md:p-[4.2rem]" />;
}
