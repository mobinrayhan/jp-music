import { CiHeart } from "react-icons/ci";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "../ui/button";

export default function ExpandAction() {
  return (
    <>
      <Button variant="ghost" aria-label="Download button">
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
