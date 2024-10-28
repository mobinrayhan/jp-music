import Link from "next/link";
import { IoPlaySharp } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";

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
  return (
    <ul className="space-y-3 md:space-y-4">
      <li>
        <button className="flex w-full items-center gap-3 bg-transparent transition duration-75 hover:bg-slate-100 md:gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-[#000000] md:h-16 md:w-16">
            <RiAddLargeFill size={26} className="text-white" />
          </div>
          <span className="text-black">Add a new playlist</span>
        </button>
      </li>

      {listOfPlaylist.map(({ name, slug }) => (
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
