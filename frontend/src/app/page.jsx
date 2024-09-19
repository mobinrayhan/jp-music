import AudioDrawerCtxProvider from "@/context/audio-drawer-ctx";
import AudioDrawer from "@/ui/audio-drawer";
import Header from "@/ui/header";
import AudioTable from "@/ui/music-info";

export default function Home() {
  return (
    <>
      {/* <header className="xl:10 2xl:12 container mx-auto flex items-center justify-between px-4 pt-2 md:px-6 lg:px-8">
        <Header />
      </header> */}

      <AudioDrawerCtxProvider>
        <main className="xl:10 2xl:12 container mx-auto h-screen px-4 pt-2 md:px-6 lg:px-8">
          <AudioTable />
        </main>
        <AudioDrawer />
      </AudioDrawerCtxProvider>
    </>
  );
}
