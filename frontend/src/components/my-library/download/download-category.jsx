"use client";

import AudioPlayer from "@/components/audios/audio-player";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import AudioTable from "@/components/audios/music-info";
import Pagination from "@/components/home/pagination";
import { categorizeAudios } from "@/lib/categorizeAudios";
import { fetcher } from "@/utils/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const apiUrl = process.env.API_URL;

export default function DownloadCategory({ searchValue, maxAudios }) {
  const { data: session, status } = useSession();
  const fetcherEndPoint = `/users/downloads?querySearch=${searchValue}&maxAudios=${maxAudios}`;

  const { data, error, mutate } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
  );

  if (status === "loading" || !session?.jwt || (!data && !error)) {
    return <AudioSkeleton />;
  }

  if (error) {
    return <p className={"py-6"}>{error.message}</p>;
  }

  if (!data.audios.length) {
    return <p>You Didn&lsquo;t Download Any Audio Yet!</p>;
  }

  const parsedAudios = parsedURLAudio(data.audios);
  const catAudios = categorizeAudios(parsedAudios);

  // Combine all audios into a single playlist
  const allAudios = [
    ...catAudios.today,
    ...catAudios.lastWeek,
    ...catAudios.lastMonth,
    ...catAudios.older,
  ];

  return (
    <>
      {catAudios.today.length > 0 && (
        <>
          <h1 className="py-3 text-lg tracking-wide">Today&apos;s Downloads</h1>
          <AudioTable
            audios={catAudios.today}
            providedPlaylist={allAudios}
            onDownloadMutate={mutate}
          />
        </>
      )}
      {catAudios.lastWeek.length > 0 && (
        <>
          <h1 className="py-3 text-lg tracking-wide">
            Last Week&apos;s Downloads
          </h1>
          <AudioTable
            audios={catAudios.lastWeek}
            providedPlaylist={allAudios}
            onDownloadMutate={mutate}
          />
        </>
      )}
      {catAudios.lastMonth.length > 0 && (
        <>
          <h1 className="py-3 text-lg tracking-wide">
            Last Month&apos;s Downloads
          </h1>
          <AudioTable
            audios={catAudios.lastMonth}
            providedPlaylist={allAudios}
            onDownloadMutate={mutate}
          />
        </>
      )}
      {catAudios.older.length > 0 && (
        <>
          <h1 className="py-3 text-lg tracking-wide">Older Downloads</h1>
          <AudioTable
            audios={catAudios.older}
            providedPlaylist={allAudios}
            onFavoriteMutate={mutate}
          />
        </>
      )}
      {data.totalAudios > maxAudios && (
        <section className="mt-12">
          <Pagination />
        </section>
      )}
      <AudioPlayer />
    </>
  );
}

function parsedURLAudio(audios) {
  return audios.map((audio) => ({
    ...audio,
    previewURL: `${apiUrl}/${audio.previewURL}`,
  }));
}
