import AudioSkeleton from "@/components/audios/audio-skeleton";
import SoundEffects from "@/components/home/sound-effects";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { categoryList } from "@/utils/category-list";
import { notFound } from "next/navigation";
import { Suspense } from "react";
const apiUrl = process.env.API_URL;

export const MAX_AUDIO_PER_PAGE = 20;

export default async function Category({ params, searchParams }) {
  const searchValue = searchParams.querySearch || "";
  const maxAudios = searchParams.maxAudios || MAX_AUDIO_PER_PAGE;
  const categoryParams = params.category;

  const hasCategory = categoryList.find(
    (cat) => cat.category === categoryParams,
  );

  if (!hasCategory && categoryParams !== "all") {
    return notFound();
  }

  const fetcherEndPoint = `/audios/search/${categoryParams}?querySearch=${searchValue}&maxAudios=${maxAudios}`;

  const addedApiUrl = (audios) => {
    const finalAudios = audios.map((audio) => {
      return {
        ...audio,
        previewURL: `${apiUrl}/${audio.previewURL}`,
      };
    });

    // console.log(finalAudios);
    return finalAudios;
  };

  return (
    <>
      <SearchInput />

      <CategoryBox
        categoryList={categoryList}
        categoryParams={categoryParams}
      />

      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects
            fetcherEndPoint={fetcherEndPoint}
            finalAudioCB={addedApiUrl}
            maxAudios={maxAudios}
          />
        </Suspense>
      </main>
    </>
  );
}
