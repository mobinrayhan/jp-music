import "./globals.css";

export const metadata = {
  title: "SoundEi - Your Ultimate Sound Library",
  description:
    "SoundEi is a sound platform where users can upload, browse, and download high-quality audio clips and sound effects for creative projects. Join us today!",
  keywords:
    "Sound downloads, audio clips, sound effects, royalty-free sounds, music for content creators, downloadable audio, sound library, SoundEi",
  author: "James Prince",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-[#131418]`}>{children}</body>
    </html>
  );
}
