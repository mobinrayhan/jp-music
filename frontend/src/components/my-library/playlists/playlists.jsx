"use client";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import { Separator } from "@/components/ui/separator";
import { fetcher } from "@/utils/api";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import useSWR from "swr";
import CreatePlaylist from "./create-playlist";
import DialogWrapper from "./dialog-wrapper";

export const listOfPlaylist = [
  {
    name: "Hello playlist 1",
    slug: "hello-1",
  },
  {
    name: "Hello playlist 2",
    slug: "hello-2",
  },
  {
    name: "Hello playlist 3",
    slug: "hello-3",
  },
  {
    name: "Hello playlist 4",
    slug: "hello-4",
  },
  {
    name: "Hello playlist 5",
    slug: "hello-5",
  },
];

export default function Playlists() {
  const [isActiveNewPlaylist, setIsActiveNewPlaylist] = useState(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const { data: session, status } = useSession();

  const fetcherEndPoint = `/users/get-playlist`;
  const { data, error, mutate } = useSWR(
    session?.jwt ? [fetcherEndPoint, { jwt: session.jwt }] : null,
    ([endpoint, options]) => fetcher(endpoint, options),
  );

  if (status === "loading" || !session.jwt || (!data && !error)) {
    return <AudioSkeleton />;
  }

  function handleCreatingPlaylist(status) {
    setIsCreatingPlaylist(status);
  }

  return (
    <ul className="space-y-3 md:space-y-4">
      <Dialog open={isActiveNewPlaylist} onOpenChange={setIsActiveNewPlaylist}>
        <DialogTrigger asChild>
          <li>
            <button className="flex w-full items-center gap-3 bg-transparent transition duration-75 hover:bg-slate-100 md:gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#000000] md:h-16 md:w-16">
                <RiAddLargeFill size={26} className="text-white" />
              </div>
              <span className="text-black">Add a new playlist</span>
            </button>
          </li>
        </DialogTrigger>

        <DialogWrapper
          isLoading={isCreatingPlaylist}
          title={"Create New Playlist"}
          description={
            "Easily add, organize, and enjoy all your favorite tracks in one place."
          }
        >
          <CreatePlaylist
            onHideAddPlaylist={setIsActiveNewPlaylist.bind(null, false)}
            onCreatingPlaylist={handleCreatingPlaylist}
          />
        </DialogWrapper>
      </Dialog>

      <Separator />

      {error && <p className={"py-6"}>{error.message}</p>}

      {!error &&
        data?.playlists?.map(({ name, slug }) => (
          <li key={slug}>
            <Link
              href={`/my-library/playlist/${slug}`}
              className="flex items-center gap-3 transition duration-75 hover:bg-slate-100 md:gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-[#000000] md:h-16 md:w-16">
                <IoPlaySharp size={26} className="text-white" />
              </div>
              <span>{name}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
