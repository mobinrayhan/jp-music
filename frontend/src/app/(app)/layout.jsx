import Footer from "@/components/footer/footer";
import AudioDrawerCtxProvider from "@/context/audio-drawer-ctx";
import Header from "@/ui/header";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://soundei.com"
    : "http://localhost:3000";

export async function generateMetadata() {
  const title = "SoundEi - Your Ultimate Sound Library";
  const description =
    "SoundEi is a sound platform where users can upload, browse, and download high-quality audio clips and sound effects for creative projects. Join us today!";
  const keywords =
    "Sound downloads, audio clips, sound effects, royalty-free sounds, music for content creators, downloadable audio, sound library, SoundEi";
  const author = "James Prince";
  const image = `${baseUrl}/app-logo.png`;

  return {
    title,
    description,
    author,
    keywords,
    type: "website",
    locale: "en_US",
    url: baseUrl,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "SoundEi Image Link Preview Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-[#131418]`}>
        <AudioDrawerCtxProvider>
          <header className="xl:10 2xl:12 container mx-auto flex items-center justify-between px-4 py-6 pt-2 md:px-6 lg:px-8">
            <Header />
          </header>

          {children}

          <Footer />
        </AudioDrawerCtxProvider>
      </body>
    </html>
  );
}