import "./globals.css";

export async function generateMetadata() {
  const title = "SoundEi - Your Ultimate Sound Library";
  const description =
    "SoundEi is a sound platform where users can upload, browse, and download high-quality audio clips and sound effects for creative projects. Join us today!";
  const image = "/app-logo.png";

  return {
    title,
    description,
    type: "website",
    locale: "en_US",
    url: "https://soundei.com",
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "soundei Logo",
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
      <body className={`bg-[#131418]`}>{children}</body>
    </html>
  );
}
