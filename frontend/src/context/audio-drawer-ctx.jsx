"use client";
const { createContext, useContext, useState } = require("react");

const AudioDrawerCtx = createContext();

export default function AudioDrawerCtxProvider({ children }) {
  const [songFromImage, setSongFromImage] = useState(null);

  const ctxValue = {
    songFromImage,
    handleActiveDrawer: (song) => {
      songFromImage === song ? setSongFromImage(null) : setSongFromImage(song);
    },
  };

  return (
    <AudioDrawerCtx.Provider value={ctxValue}>
      {children}
    </AudioDrawerCtx.Provider>
  );
}

export function useAudioDrawerCtx() {
  const ctx = useContext(AudioDrawerCtx);
  if (!ctx || ctx === undefined) {
    throw new Error(
      "You Can not use useAudioDrawerCtx outside of the AudioDrawerCtxProvider provider",
    );
  }

  return ctx;
}
