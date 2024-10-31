"use client";

import { addAudioToPlaylist } from "@/actions/plylistAction";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetcher } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoPlaySharp } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import useSWR from "swr";
import { MAX_PLAYLIST_PER_PAGE } from "./playlists";

export default function PlaylistList({
  onShowAddPlaylist,
  querySearch,
  onAddingToPlaylist,
  isAddingAudio,
  audioId,
}) {
  const { data: session, status } = useSession();
  const [maxPlaylist, setMaxPlaylist] = useState(MAX_PLAYLIST_PER_PAGE);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [state, action] = useFormState(addAudioToPlaylist, {
    success: null,
    error: null,
  });

  const fetcherEndPoint = `/users/get-playlist?querySearch=${querySearch}&maxPlaylist=${maxPlaylist}`;
  const { data, error } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
  );

  const isLoading = status === "loading" || !session.jwt || (!data && !error);

  function handleMorePlaylist() {
    setMaxPlaylist((prev) => prev + MAX_PLAYLIST_PER_PAGE);
  }

  function handleActivePlaylist(slug) {
    setActivePlaylist((prev) => (prev === slug ? null : slug));
  }

  function handleIsAdding(status) {
    onAddingToPlaylist(status);
  }

  return (
    <>
      <ul className="space-y-3 md:space-y-4">
        <li>
          <button
            disabled={isAddingAudio}
            className="flex w-full items-center gap-2 bg-transparent transition duration-75 hover:bg-slate-100 md:gap-4"
            onClick={onShowAddPlaylist}
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#000000]">
              <RiAddLargeFill size={20} className="text-white" />
            </div>
            <span className="text-black">Add a new playlist</span>
          </button>
        </li>

        <Separator />

        {!isLoading && error && <p>{error.message}</p>}

        <ScrollArea className="h-52 space-y-3">
          {isLoading && <AudioSkeleton length={5} />}

          {!isLoading &&
            data?.playlists.map(({ name, slug }) => (
              <li key={slug} className="pb-3">
                <button
                  disabled={isAddingAudio}
                  className={`flex w-full items-center gap-2 bg-transparent transition duration-100 hover:bg-slate-100 md:gap-4 ${activePlaylist === slug && "translate-x-3 !bg-slate-100 shadow"}`}
                  onClick={handleActivePlaylist.bind(null, slug)}
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-[#000000]">
                    <IoPlaySharp size={20} className="text-white" />
                  </div>
                  <span className="text-black">{name}</span>
                </button>
              </li>
            ))}
        </ScrollArea>

        <li>
          {!activePlaylist &&
            data?.totalPlaylists > MAX_PLAYLIST_PER_PAGE &&
            maxPlaylist < data?.totalPlaylists && (
              <Button
                className="w-full"
                variant="secondary"
                onClick={handleMorePlaylist}
              >
                Show more
              </Button>
            )}

          {activePlaylist && (
            <form action={action}>
              <FormInputs
                onAdding={handleIsAdding}
                audioId={audioId}
                playlistSlug={activePlaylist}
              />
            </form>
          )}
        </li>
      </ul>
    </>
  );
}

function FormInputs({ onAdding, audioId, playlistSlug }) {
  const { pending } = useFormStatus();

  useEffect(() => {
    onAdding(pending);
  }, [pending]);

  return (
    <>
      <Button className="w-full" variant="secondary" disabled={pending}>
        {pending ? "Adding..." : "Add To Playlist"}
      </Button>
      <input type="hidden" name="audioId" value={audioId} />
      <input type="hidden" name="playlistSlug" value={playlistSlug} />
    </>
  );
}
