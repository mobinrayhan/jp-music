import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IoPlaySharp } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import { listOfPlaylist } from "./playlists";

export default function PlaylistList({ onShowAddPlaylist }) {
  return (
    <>
      <ul className="space-y-3 md:space-y-4">
        <li>
          <button
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

        <ScrollArea className="h-52 space-y-3">
          {listOfPlaylist.map(({ name, slug }) => (
            <li key={slug} className="pb-3">
              <button className="flex w-full items-center gap-2 bg-transparent transition duration-75 hover:bg-slate-100 md:gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-[#000000]">
                  <IoPlaySharp size={20} className="text-white" />
                </div>
                <span className="text-black">{name}</span>
              </button>
            </li>
          ))}
        </ScrollArea>
      </ul>
    </>
  );
}
