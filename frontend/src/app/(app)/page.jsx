import AudioDrawer from "@/components/audios/audio-drawer";
import AudioTable from "@/components/audios/music-info";
import Advertise from "@/components/home/advertise";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { fetchWithApiKey } from "../../../utils/api";

// async function SoundEffects({ categoryParams }) {
//   const { audios } = await fetchWithApiKey(
//     categoryParams ? `/audios/category/${categoryParams}` : "/audios/all",
//     { cache: "no-store" },
//   );

//   return <AudioTable category={[]} audios={audios} />;
// }

export default async function Home({ searchParams }) {
  const { category } = await fetchWithApiKey("/category", {
    cache: "no-store",
  });
  const categoryParams = searchParams?.category;

  const { audios } = await fetchWithApiKey(
    categoryParams ? `/audios/category/${categoryParams}` : "/audios/all",
    { cache: "no-store" },
  );

  try {
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
          <AudioTable category={category} audios={audios} />{" "}
        </main>
        <AudioDrawer />
      </>
    );
  } catch (error) {
    return (
      <>
        <SearchInput />
        <Advertise />
        <CategoryBox categoryList={category} categoryParams={categoryParams} />

        <main className="custom-container">
          <h3>{error.message || "Something Went Wrong 😭!"}</h3>
        </main>
        <AudioDrawer />
      </>
    );
  }
}
