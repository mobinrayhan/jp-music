import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";
import { FaLink, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

export default function ExpandAction() {
  return (
    <>
      <Button variant="ghost">
        <CiHeart className="text-lg font-extrabold" />
      </Button>
      <Button variant="ghost" className="hidden md:block">
        <FaPlus className="text-lg" />
      </Button>
      <Button variant="ghost" className="hidden md:block">
        <MdOutlineFileDownload className="text-lg" />
      </Button>
      <Button variant="ghost" className="hidden md:block">
        <FaLink className="text-lg" />
      </Button>
    </>
  );
}
