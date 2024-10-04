// import AudioDrawer from "@/components/audios/audio-drawer";
// import CategoryBox from "@/ui/category-box";
// import SearchInput from "@/ui/search-input";
// import { fetchWithApiKey } from "@/utils/api";

import { redirect } from "next/navigation";

// export default async function Home({ searchParams, params }) {
//   console.log(params);

//   const { category = [] } = await fetchWithApiKey("/category", {
//     cache: "no-store",
//   });
//   const categoryParams = searchParams?.category;

//   return (
//     <>
//       <SearchInput />
//       <CategoryBox categoryList={category} categoryParams={categoryParams} />

//       {/* <main className="custom-container">
//         <Suspense fallback={<AudioSkeleton />}>
//           <SoundEffects categoryParams={categoryParams} />
//         </Suspense>
//       </main> */}

//       <AudioDrawer />
//     </>
//   );
// }

export default function HomePage() {
  return redirect("/category/all");
}
