"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

let activeWaveSurfer = null;

const WaveSurferComponent = ({ audioUrl }) => {
  const waveSurferRef = useRef(null);
  const waveformContainerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: waveformContainerRef.current,
      waveColor: "#FFFFFF",
      progressColor: "#374151",
      cursorColor: "transparent",
      height: 150,
      url: audioUrl,
    });

    waveSurferRef.current.on("click", handlePlayPause);

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (activeWaveSurfer && activeWaveSurfer !== waveSurferRef.current) {
      activeWaveSurfer.pause();
      setIsPlaying(false);
    }

    if (!isPlaying) {
      waveSurferRef.current.play();
      setIsPlaying(true);
      activeWaveSurfer = waveSurferRef.current;
    } else {
      waveSurferRef.current.pause();
      setIsPlaying(false);
      activeWaveSurfer = null;
    }
  };

  return (
    <div>
      <div
        ref={waveformContainerRef}
        style={{ width: "100%", height: "100%", cursor: "pointer" }}
      ></div>
    </div>
  );
};

export default WaveSurferComponent;
