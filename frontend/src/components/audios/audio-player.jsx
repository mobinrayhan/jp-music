"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause } from "react-icons/fa6";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import { IoIosPlay } from "react-icons/io";

import WaveSurfer from "wavesurfer.js";
import { useAudioPlayer } from "@/context/audio-player-context";
import ExpandAction from "./expand-action";

export default function AudioPlayer() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    updateTrackProgress,
    playNext,
    playPrevious,
  } = useAudioPlayer();

  useEffect(() => {
    if (waveformRef.current && currentTrack) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#020817",
        progressColor: "#9ca3af",
        cursorColor: "transparent",
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 70,
      });

      wavesurfer.current.load(currentTrack.previewURL);

      wavesurfer.current.on("ready", () => {
        if (currentTrack.startPosition !== undefined) {
          wavesurfer.current.seekTo(currentTrack.startPosition);
        }
        if (isPlaying) {
          wavesurfer.current.play();
        }
      });

      wavesurfer.current.on("finish", () => {
        togglePlay();
      });

      wavesurfer.current.on("audioprocess", () => {
        const progress =
          wavesurfer.current.getCurrentTime() /
          wavesurfer.current.getDuration();
        updateTrackProgress(currentTrack._id, progress);
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [currentTrack, updateTrackProgress]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      togglePlay();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVolume);
    }
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mt-20 border-t bg-white shadow-lg">
      <div className="custom-container grid w-full grid-cols-1 items-center justify-center md:grid-cols-8 md:gap-4">
        <h3 className="text-center text-lg font-semibold md:col-span-8 md:text-left">
          {currentTrack.name}
        </h3>
        <div className="h-20 md:col-[4_/_span_3]" ref={waveformRef} />
        <div className="flex items-center justify-center space-x-4 pb-4 sm:justify-evenly md:col-[1_/_span_3] md:row-start-2 md:justify-start">
          <div className="flex gap-8">
            <button
              onClick={playPrevious}
              className="rounded-full transition-colors"
            >
              <ImPrevious2 size={28} />
            </button>
            <button
              onClick={handlePlayPause}
              className="rounded-full transition-colors"
            >
              {isPlaying ? <FaPause size={28} /> : <IoIosPlay size={28} />}
            </button>
            <button
              onClick={playNext}
              className="rounded-full transition-colors"
            >
              <ImNext2 size={28} />
            </button>
          </div>
          <div className="relative hidden items-center sm:flex sm:justify-between">
            <button
              onClick={toggleVolumeSlider}
              className="rounded-full p-2 transition-colors hover:bg-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </button>
            {showVolumeSlider && (
              <div className="absolute left-full transform">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-24 cursor-pointer appearance-none rounded-lg bg-gray-300"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      volume * 100
                    }%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={
            "hidden justify-end md:col-[7_/_span_2] md:row-start-2 md:flex"
          }
        >
          <ExpandAction />
        </div>
      </div>
    </div>
  );
}
