"use client";

import { MAX_AUDIO_PER_PAGE } from "@/app/(app)/category/[category]/page";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import AudioTable from "@/components/audios/music-info";
import Pagination from "@/components/home/pagination";
import { fetcher } from "@/utils/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const apiUrl = process.env.API_URL;

export default function PlaylistDetail({
  playlistSlug,
  maxAudios = MAX_AUDIO_PER_PAGE,
  querySearch = "",
}) {
  const { data: session, status } = useSession();

  const fetcherEndPoint = `/users/get-playlist-audios/${playlistSlug}?querySearch=${querySearch}&maxAudios=${maxAudios}`;

  const { data, error, mutate } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
  );

  const isLoading = status === "loading" || !session.jwt || (!data && !error);

  if (isLoading) {
    return <AudioSkeleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <AudioTable audios={parsedURL(data.audios)} />
      {data.totalAudios > MAX_AUDIO_PER_PAGE && <Pagination />}
    </>
  );
}

const parsedURL = (audios) => {
  return audios.map((audio) => {
    return {
      ...audio,
      previewURL: `${apiUrl}/${audio.previewURL}`,
    };
  });
};
