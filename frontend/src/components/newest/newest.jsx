import { MAX_AUDIO_PER_PAGE } from "@/app/(app)/category/[category]/page";
import SearchInput from "@/ui/search-input";
import { Suspense } from "react";
import AudioSkeleton from "../audios/audio-skeleton";
import SoundEffects from "../home/sound-effects";
const apiUrl = process.env.API_URL;

export default function Newest({ searchParams }) {
  const searchValue = searchParams?.querySearch;
  const maxAudios = searchParams?.maxAudios || MAX_AUDIO_PER_PAGE;

  const fetcherEndPoint = `/audios/newest?querySearch=${searchValue}&maxAudios=${maxAudios}`;

  const sortByDateDesc = (audios) => {
    return audios
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((audio) => {
        return {
          ...audio,
          previewURL: `${apiUrl}/${audio.previewURL}`,
        };
      });
  };

  return (
    <>
      <SearchInput />
      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects
            fetcherEndPoint={fetcherEndPoint}
            finalAudioCB={sortByDateDesc}
          />
        </Suspense>
      </main>
    </>
  );
}
