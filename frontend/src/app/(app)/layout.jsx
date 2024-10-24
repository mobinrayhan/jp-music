import MainLayout from "@/components/layouts/main-layout";
import { FavoritesContextProvider } from "@/context/favorites-context";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://dev-front.soundei.com"
    : "http://localhost:3000";

export async function generateMetadata() {
  const title = "Soundei | Discover, Stream, and Share Your Favorite Music";
  const description =
    "Welcome to Soundei, your ultimate music destination! Explore a vast library of songs, create personalized playlists, and connect with fellow music lovers. Stream your favorite tracks, discover new genres, and enjoy a seamless listening experience. Join Soundei today and elevate your music journey!";
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
    <html lang="en">
      <FavoritesContextProvider>
        <MainLayout>{children}</MainLayout>
      </FavoritesContextProvider>
    </html>
  );
}
