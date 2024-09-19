import AudioDrawerCtxProvider from "@/context/audio-drawer-ctx";
import AudioDrawer from "@/ui/audio-drawer";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import AudioTable from "@/ui/music-info";
import { fetchWithApiKey } from "../../utils/api";
import CategoryBox from "@/ui/category-box";
import SearchInput from "@/ui/search-input";

export default async function Home() {
  const categoryList = await fetchWithApiKey("/category");
  console.log(categoryList);

  return (
    <>
      {/* <header className="xl:10 2xl:12 container mx-auto flex items-center justify-between px-4 pt-2 md:px-6 lg:px-8">
        <Header />
      </header> */}

      <SearchInput />
      <CategoryBox categoryList={categoryList?.category} />

      <AudioDrawerCtxProvider>
        <main className="xl:10 2xl:12 container mx-auto px-4 pt-2 md:px-6 lg:px-8">
          <AudioTable />
        </main>
        <AudioDrawer />
        <Footer />
      </AudioDrawerCtxProvider>
    </>
  );
}
