import AudioDrawer from "@/components/audios/audio-drawer";
import AudioTable from "@/components/audios/music-info";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { fetchWithApiKey } from "../../../utils/api";

export const metadata = {
  title: "SoundEi - Your Ultimate Sound Library",
  description: "",
};

export default async function Home({ searchParams }) {
  const categoryList = await fetchWithApiKey("/category", {
    cache: "no-store",
  });

  const categoryParams = searchParams?.category;

  try {
    const { audios } = await fetchWithApiKey(
      categoryParams ? `/audios/category/${categoryParams}` : "/audios/all",
      { cache: "no-store" },
    );

    return (
      <>
        <SearchInput />
        <CategoryBox
          categoryList={categoryList?.category}
          categoryParams={categoryParams}
        />
        <main className="xl:10 2xl:12 container mx-auto px-4 pt-2 md:px-6 lg:px-8">
          <AudioTable category={categoryList?.category} audios={audios} />
        </main>
        <AudioDrawer />
      </>
    );
  } catch (error) {
    return (
      <>
        <SearchInput />
        <CategoryBox
          categoryList={categoryList?.category}
          categoryParams={categoryParams}
        />

        <main className="xl:10 2xl:12 container mx-auto px-4 pt-2 md:px-6 lg:px-8">
          <h3>{error.message || "Something Went Wrong 😭!"}</h3>
        </main>
        <AudioDrawer />
      </>
    );
  }
}
