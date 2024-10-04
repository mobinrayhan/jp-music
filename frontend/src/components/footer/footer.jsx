"use client";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";

export default function Footer() {
  const audioDrawerCtx = useAudioDrawerCtx();

  return (
    !audioDrawerCtx.songFromImage && (
      <footer className="bg-gray-200 py-2">
        <small className="custom-container tracking-wider">
          &copy; Copyright soundei {new Date().getFullYear()}
        </small>
      </footer>
    )
  );
}
