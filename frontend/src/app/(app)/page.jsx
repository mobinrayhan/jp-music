import AudioDrawer from "@/components/audios/audio-drawer";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import AudioTable from "@/components/audios/music-info";
import Advertise from "@/components/home/advertise";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { Suspense } from "react";
import { fetchWithApiKey } from "../../../utils/api";

async function SoundEffects({ categoryParams }) {
  try {
    const { category = [] } = await fetchWithApiKey("/category", {
      cache: "no-store",
    });
    const { audios } = await fetchWithApiKey(
      categoryParams ? `/audios/category/${categoryParams}` : "/audios/all",
      { cache: "no-store" },
    );

    return <AudioTable category={category} audios={audios} />;
  } catch (error) {
    return (
      <main className="custom-container">
        <h3>{error.message || "Something Went Wrong 😭!"}</h3>
      </main>
    );
  }
}

export default async function Home({ searchParams }) {
  const categoryParams = searchParams?.category;
  const { category = [] } = await fetchWithApiKey("/category", {
    cache: "no-store",
  });

  return (
    <>
      <SearchInput />
      <Advertise />
      <CategoryBox categoryList={category} categoryParams={categoryParams} />
      <div className="text-center">
        <p className="inline-block border-b-2 border-indigo-100 py-4 text-center">
          Recommended Sound Effect For You
        </p>
      </div>

      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects categoryParams={categoryParams} />
        </Suspense>
      </main>

      <AudioDrawer />
    </>
  );
}
