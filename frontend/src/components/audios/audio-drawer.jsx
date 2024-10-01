"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";
import "./customAudioPlayer.css";
import ExpandAction from "@/components/audios/expand-action";

export default function AudioDrawer() {
  const audioDrawerCtx = useAudioDrawerCtx();

  return (
    <section
      className={`invisible absolute bottom-0 mt-8 w-full bg-[#292C33] opacity-0 transition-all duration-150 ${audioDrawerCtx.songFromImage ? "!visible sticky opacity-100" : "sticky"}`}
    >
      <div className="container mx-auto px-2">
        <div className="container mx-auto flex items-center justify-between p-4">
          {audioDrawerCtx.songFromImage ? (
            <AudioPlayer
              src={audioDrawerCtx.songFromImage}
              showSkipControls={true}
              showJumpControls={false}
              onClickNext={() => console.log("Next")}
              onClickPrevious={() => console.log("Prev")}
              volume={0.5}
              autoPlay
              className="custom-audio-player w-full md:max-w-[30rem]"
            />
          ) : (
            <span />
          )}

          <div className="hidden md:flex">
            <ExpandAction />
          </div>
        </div>
      </div>
    </section>
  );
}
