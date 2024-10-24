"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import HeartButton from "../my-library/favorites/heart-button";
import { Button } from "../ui/button";

export default function ExpandAction({ audioId }) {
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
        link.download = fileName;
        link.click();
      } else {
        console.error("Download failed!");
      }
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Download button"
        onClick={handleDownload}
      >
        <MdOutlineFileDownload className="text-lg" />
      </Button>

      <Button
        variant="ghost"
        className="hidden md:block"
        aria-label="Added to the playlist button"
      >
        <FaPlus className="text-lg" />
      </Button>

      <HeartButton audioId={audioId} />

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
