import AudioSkeleton from "@/components/audios/audio-skeleton";
import SoundEffects from "@/components/home/sound-effects";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { categoryList } from "@/utils/category-list";
import { Suspense } from "react";

export default async function Category({ params, searchParams }) {
  const searchValue = searchParams.querySearch || "";
  const categoryParams = params.category;

  const hasCategory = categoryList.find(
    (cat) => cat.category === categoryParams,
  );

  if (!hasCategory && categoryParams !== "all") {
    return notFound();
  }

  console.log(categoryParams);
  const fetcherEndPoint = searchValue
    ? `/audios/search/${categoryParams}?query=${searchValue}`
    : categoryParams && categoryParams !== "all"
      ? `/audios/category/${categoryParams}`
      : "/audios/all";

  const sortByDownloadCount = (audios) => {
    const sortAudios = audios.sort((a, b) => b.downloadCount - a.downloadCount);
    return sortAudios;
  };

  return (
    <>
      <SearchInput />

      <CategoryBox
        categoryList={categoryList}
        categoryParams={categoryParams}
      />

      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />} key={searchValue}>
          <SoundEffects
            fetcherEndPoint={fetcherEndPoint}
            sortedAudiosCB={sortByDownloadCount}
          />
        </Suspense>
      </main>
    </>
  );
}
