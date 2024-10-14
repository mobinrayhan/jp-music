import AudioSkeleton from "@/components/audios/audio-skeleton";
import DownloadCategory from "@/components/my-library/download-category";
import SearchInput from "@/ui/search-input";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MAX_AUDIO_PER_PAGE } from "../../category/[category]/page";
const apiUrl = process.env.API_URL;

const tabs = [
  {
    link: "/my-library/favorites",
    role: "Favorites",
  },
  {
    link: "/my-library/playlists",
    role: "Playlists",
  },
  {
    link: "/my-library/downloads",
    role: "Downloads",
  },
];

export async function generateMetadata({ params }) {
  switch (params?.slug) {
    case "favorites":
      return {
        title: "Soundei | My Library – Favorites",
        description:
          "Discover your favorite tracks in Soundei's Favorites tab! Easily access and manage the songs you love the most, ensuring your go-to music is always just a click away. Enjoy a personalized listening experience with your top picks at your fingertips!",
      };
    case "playlists":
      return {
        title: "Soundei | My Library – Playlists",
        description:
          "Curate and explore your playlists in Soundei's Playlists tab! Create custom playlists for every mood and occasion, and dive into a world of personalized music collections. Whether it’s for a party, workout, or relaxation, find the perfect mix with ease!",
      };
    case "downloads":
      return {
        title: "Soundei | My Library – Downloads",
        description:
          "Access your downloaded tracks in Soundei's Downloads tab! Enjoy your favorite songs offline anytime, anywhere. Manage your downloaded music effortlessly and ensure you never miss a beat, even without an internet connection!",
      };
    default:
      break;
  }
}
export const dynamic = "force-dynamic";

export default async function MyLibrarySlug({ params, searchParams }) {
  const searchValue = searchParams.querySearch || "";
  const maxAudios = searchParams.maxAudios || MAX_AUDIO_PER_PAGE;
  const activePath = params.slug;

  const isExistSlug = tabs.find(
    (tab) => tab.link === `/my-library/${activePath}`,
  );

  if (!isExistSlug) {
    return notFound();
  }

  return (
    <>
      <SearchInput />

      <section className="custom-container">
        <ul className="flex border-b pt-4">
          {tabs.map(({ link, role }) => (
            <li key={role} className="">
              <Link
                href={link}
                className={`block h-full w-full border-x border-x-white p-2 px-4 hover:border-x-gray-200 hover:bg-gray-200 ${activePath === link?.split("/")?.[2] ? "bg-gray-200" : ""}`}
              >
                {role}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {activePath === "downloads" && (
        <main className="custom-container">
          <Suspense fallback={<AudioSkeleton />}>
            <DownloadCategory searchValue={searchValue} maxAudios={maxAudios} />
          </Suspense>
        </main>
      )}
    </>
  );
}
