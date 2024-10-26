"use client";

import AudioSkeleton from "@/components/audios/audio-skeleton";
import AudioTable from "@/components/audios/music-info";
import { fetcher } from "@/utils/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";
const apiUrl = process.env.API_URL;

export default function Favorites({ maxAudios, searchValue }) {
  const { data: session, status } = useSession();

  const fetcherEndPoint = `/users/favorites?querySearch=${searchValue}&maxAudios=${maxAudios}`;
  const { data, error, mutate } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  if (status === "loading" || !session.jwt || (!data && !error)) {
    return <AudioSkeleton />;
  }

  if (error) {
    if (error) return <p className={"py-6"}>{error.message}</p>;
  }

  const parsedURLAudio = (audios) => {
    console.log(audios);
    return audios.map((audio) => {
      return {
        ...audio,
        previewURL: `${apiUrl}/${audio.previewURL}`,
      };
    });
  };

  return <AudioTable audios={parsedURLAudio(data.audios)} onMutate={mutate} />;
}
