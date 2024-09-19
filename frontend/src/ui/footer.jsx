"use client";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";
import Link from "next/link";

export default function Footer() {
  const audioDrawerCtx = useAudioDrawerCtx();

  return (
    !audioDrawerCtx.songFromImage && (
      <footer className="border-gray-500-300 container mx-auto flex items-center justify-between border-t px-2 pt-6">
        <small>&copy; Copyright soundei {new Date().getFullYear()}</small>

        {/* <ul>
      <li>
        <Link href={"/"}>Hello</Link>
      </li>
    </ul> */}
      </footer>
    )
  );
}
