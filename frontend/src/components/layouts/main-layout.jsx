"use client";

import { AudioPlayerProvider } from "@/context/audio-player-context";
import Header from "@/ui/header";
import Footer from "../footer/footer";
import FooterMain from "../footer/footer-main";

export default function MainLayout({ children }) {
  return (
    <AudioPlayerProvider>
      <body className="flex min-h-screen flex-col">
        <header className="custom-container flex items-center justify-between">
          <Header />
        </header>
        <main className="flex-grow">{children}</main>
        <FooterMain />
        <Footer />
      </body>
    </AudioPlayerProvider>
  );
}
