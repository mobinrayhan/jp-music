import AudioSkeleton from "@/components/audios/audio-skeleton";
import SoundEffects from "@/components/home/sound-effects";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";
import { categoryList } from "@/utils/category-list";
import { Suspense } from "react";

// async function CategoryBoxLoad({ params }) {
//   const { category = [] } = await fetchWithApiKey("/category", {
//     cache: "no-store",
//   });

//   const hasCategory = category.find((cat) => cat.category === params.category);

//   if (!hasCategory && params.category !== "all") {
//     return notFound();
//   }

//   return (
//     <CategoryBox categoryList={category} categoryParams={params.category} />
//   );
// }

export default async function Category({ params }) {
  // const { category = [] } = await fetchWithApiKey("/category", {
  //   cache: "no-store",
  // });

  const hasCategory = categoryList.find(
    (cat) => cat.category === params.category,
  );

  if (!hasCategory && params.category !== "all") {
    return notFound();
  }

  return (
    <>
      <SearchInput />

      {/* <Suspense
        fallback={
          <section className="custom-container pb-8 pt-4">
            <h1>Loading</h1>
          </section>
        }
      >
        <CategoryBoxLoad params={params} />
      </Suspense> */}

      <CategoryBox
        categoryList={categoryList}
        categoryParams={params.category}
      />

      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects categoryParams={params.category} />
        </Suspense>
      </main>
    </>
  );
}
