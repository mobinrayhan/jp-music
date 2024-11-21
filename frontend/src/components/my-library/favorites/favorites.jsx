"use client";

import AudioSkeleton from "@/components/audios/audio-skeleton";
import AudioTable from "@/components/audios/music-info";
import { fetcher } from "@/utils/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";
const apiUrl = process.env.API_URL;

export default function Favorites({ maxAudios, searchValue }) {
  const { data: session, status } = useSession();

  console.log(session);

  const fetcherEndPoint = `/users/favorites?querySearch=${searchValue}&maxAudios=${maxAudios}`;
  const { data, error, mutate } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
  );

  console.log(data);

  if (status === "loading" || !session.jwt || (!data && !error)) {
    return <AudioSkeleton />;
  }

  if (error) return <p className={"py-6"}>{error.message}</p>;

  const parsedURLAudio = (audios) => {
    return audios.map((audio) => {
      return {
        ...audio,
        previewURL: `${apiUrl}/${audio.previewURL}`,
      };
    });
  };

  return (
    <>
      <AudioTable
        audios={parsedURLAudio(data.audios)}
        onFavoriteMutate={mutate}
      />
    </>
  );
}
