import { AudioPlayerProvider } from "@/context/audio-player-context";
import BottomPlayerSpace from "@/ui/bottom-player-space";
import Header from "@/ui/header";
import Footer from "../footer/footer";
import FooterMain from "../footer/footer-main";

function MainLayoutContent({ children }) {
  return (
    <body className="flex min-h-screen flex-col">
      <header className="custom-container flex items-center justify-between">
        <Header />
      </header>
      <main className="flex-grow">{children}</main>
      <FooterMain />
      <Footer />
      <BottomPlayerSpace />
    </body>
  );
}

export default function MainLayout({ children }) {
  return (
    <AudioPlayerProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </AudioPlayerProvider>
  );
}
