import MainLayout from "@/components/layouts/main-layout";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://dev-front.soundei.com"
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
    <html lang="en">
      <MainLayout>{children}</MainLayout>
    </html>
  );
}
