"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import HeartButton from "../my-library/favorites/heart-button";
import { AddToPlaylist } from "../my-library/playlists/add-to-playlist";
import PlaylistLogin from "../my-library/playlists/playlist-login";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function ExpandAction({
  audioId,
  onFavoriteMutate,
  onDownloadMutate = null,
}) {
  const session = useSession();
  const pathName = usePathname();
  const { push } = useRouter();

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download?id=${audioId}`);

      if (response.status === 401) {
        push(`/login?ref=/${pathName}`);
      }

      if (response.ok) {
        const blob = await response.blob();
        const fileName = response.headers.get("X-File-Name") || "audio.mp3";

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        if (onDownloadMutate) {
          onDownloadMutate((prevData) => {
            const updatedDownloadList = prevData.audios
              .map((audio) =>
                audio._id === audioId
                  ? {
                      ...audio,
                      downloadInfo: {
                        ...audio.downloadInfo,
                        date: new Date().toISOString(),
                      },
                    }
                  : audio,
              )
              .sort(
                (a, b) =>
                  new Date(b.downloadInfo.date) - new Date(a.downloadInfo.date),
              );

            return { ...prevData, audios: updatedDownloadList };
          }, false);
        }

        link.download = fileName;
        link.click();
      } else {
        const { error } = await response.json();
        alert(error || "Something Went Wrong!");
      }
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  return (
    <>
      <Button
        type="submit"
        variant="ghost"
        aria-label="Download button"
        onClick={handleDownload}
      >
        <MdOutlineFileDownload className="text-lg" />
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="hidden md:block"
            aria-label="Added to the playlist button"
          >
            <FaPlus className="text-lg" />
          </Button>
        </DialogTrigger>
        {session.status === "authenticated" ? (
          <AddToPlaylist audioId={audioId} />
        ) : (
          <PlaylistLogin />
        )}
      </Dialog>

      <HeartButton audioId={audioId} onFavoriteMutate={onFavoriteMutate} />

      <Button
        variant="ghost"
        className="hidden md:block"
        aria-label="Copy Link button"
      >
        <FaLink className="text-lg" />
      </Button>
    </>
  );
}
