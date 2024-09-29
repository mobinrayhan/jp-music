import AudioDrawerCtxProvider from "@/context/audio-drawer-ctx";
import AudioDrawer from "@/ui/audio-drawer";
import Footer from "@/ui/footer";
import AudioTable, { DropDownMenuLIst } from "@/ui/music-info";
import { fetchWithApiKey } from "../../../utils/api";
import CategoryBox from "@/ui/category-box";
import CategoryCtxProvider from "@/context/category-ctx";

export default async function Home() {
  const categoryList = await fetchWithApiKey("/category");
  // console.log(categoryList);

  return (
    <CategoryCtxProvider>
      <CategoryBox categoryList={categoryList?.category} />
      <main className="xl:10 2xl:12 container mx-auto px-4 pt-2 md:px-6 lg:px-8">
        <AudioTable />
      </main>
      <AudioDrawer />
    </CategoryCtxProvider>
  );
}
