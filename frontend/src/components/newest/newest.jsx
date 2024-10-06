import SearchInput from "@/ui/search-input";
import { Suspense } from "react";
import AudioSkeleton from "../audios/audio-skeleton";
import SoundEffects from "../home/sound-effects";

export default function Newest() {
  const fetcherEndPoint = "/audios/all";

  const sortByDateDesc = (audios) => {
    return audios.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <>
      <SearchInput />
      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects
            fetcherEndPoint={fetcherEndPoint}
            sortedAudiosCB={sortByDateDesc}
          />
        </Suspense>
      </main>
    </>
  );
}
