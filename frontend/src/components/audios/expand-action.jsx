"use client";
import { usePathname, useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "../ui/button";

export default function ExpandAction({ audioId }) {
  const pathName = usePathname();
  const { push } = useRouter();
  const handleDownload = async () => {
    const response = await fetch(`/api/download?id=${audioId}`, {
      method: "POST",
    });

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
  };

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Download button"
        onClick={handleDownload.bind(null, audioId)}
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

      <Button
        className="hidden md:block"
        variant="ghost"
        aria-label="Like button"
      >
        <CiHeart className="text-lg font-extrabold" />
      </Button>

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
