"use client";

import { useCallback, useState } from "react";

import AudioPlayer from "./audio-player";
import MusicTableList from "./music-table-list";

export default function AudioTable({ audios }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackProgress, setTrackProgress] = useState({});

  const handleProgressChange = useCallback((trackId, progress) => {
    setTrackProgress((prev) => ({ ...prev, [trackId]: progress }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentTrack) {
      const currentIndex = audios.findIndex(
        (track) => track._id === currentTrack._id,
      );
      const nextIndex = (currentIndex + 1) % audios.length;
      setCurrentTrack(audios[nextIndex]);
    }
  }, [currentTrack]);

  const handlePrevious = useCallback(() => {
    if (currentTrack) {
      const currentIndex = audios.findIndex(
        (track) => track._id === currentTrack._id,
      );
      const previousIndex = (currentIndex - 1 + audios.length) % audios.length;
      setCurrentTrack(audios[previousIndex]);
    }
  }, [currentTrack]);

  return (
    <>
      <MusicTableList
        setCurrentTrack={setCurrentTrack}
        currentTrack={currentTrack}
        trackProgress={trackProgress}
        audios={audios}
      />

      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          onProgressChange={handleProgressChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}
