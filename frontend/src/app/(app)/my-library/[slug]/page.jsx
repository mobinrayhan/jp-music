import AudioSkeleton from "@/components/audios/audio-skeleton";
import SoundEffects from "@/components/home/sound-effects";
import SearchInput from "@/ui/search-input";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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

export default function MyLibrarySlug({ params, searchParams }) {
  const activePath = params.slug;
  const isExistSlug = tabs.find(
    (tab) => tab.link === `/my-library/${activePath}`,
  );
  if (!isExistSlug) {
    return notFound();
  }

  const fetcherEndPoint =
    searchParams.searchValue === "downloads"
      ? `/audios/category/object`
      : "/audios/all";

  const sortedAndSearchResult = (audios) => {
    return audios.map((audio) => {
      return {
        ...audio,
        previewURL: `${apiUrl}/${audio.previewURL}`,
      };
    });
  };

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

      <main className="custom-container">
        <Suspense fallback={<AudioSkeleton />}>
          <SoundEffects
            fetcherEndPoint={fetcherEndPoint}
            sortedAudiosCB={sortedAndSearchResult}
          />
        </Suspense>
      </main>
    </>
  );
}
