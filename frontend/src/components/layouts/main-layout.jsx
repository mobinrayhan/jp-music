"use client";

import {
  AudioPlayerProvider,
  useAudioPlayer,
} from "@/context/audio-player-context";
import Header from "@/ui/header";
import Footer from "../footer/footer";
import FooterMain from "../footer/footer-main";

function MainLayoutContent({ children }) {
  const { currentTrack } = useAudioPlayer();

  return (
    <body className="flex min-h-screen flex-col">
      <header className="custom-container flex items-center justify-between">
        <Header />
      </header>
      <main className="flex-grow">{children}</main>
      <FooterMain />
      <Footer />

      {currentTrack && <div className="p-20 sm:p-[5.4rem] md:p-[4.2rem]" />}
    </body>
  );
}

export default function MainLayout({ children }) {
  return (
    <AudioPlayerProvider>
      <MainLayoutContent>
        <>{children}</>
      </MainLayoutContent>
    </AudioPlayerProvider>
  );
}
