"use client";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { FaPlay, FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { FaLink } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import citicel from "../../private-audios/citicel.mp3";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";
import { FaPause } from "react-icons/fa6";

const audioData = [
  {
    id: 1,
    imageUrl: "/image.jpg",
    title: "Sample Audio 1",
    audioUrl: citicel,
    audioType: "MP3",
    isDownloaded: true,
    category: "hello-1",
  },
  {
    id: 2,
    imageUrl: "/image.jpg",
    title: "Sample Audio 2",
    audioUrl: citicel,
    audioType: "WAV",
    category: "mobin",
  },
  {
    id: 2,
    imageUrl: "/image.jpg",
    title: "Sample Audio 2",
    audioUrl: "./private-audios/music2.mp3",
    audioType: "WAV",
    category: "mobin",
    isDownloaded: true,
  },
  {
    id: 2,
    imageUrl: "/image.jpg",
    title: "Sample Audio 2",
    audioUrl: citicel,
    audioType: "WAV",
    category: "mobin",
    isDownloaded: true,
  },
  {
    id: 2,
    imageUrl: "/image.jpg",
    title: "Sample Audio 2",
    audioUrl: citicel,
    audioType: "WAV",
    category: "mobin",
  },
];

export default function AudioTable() {
  const audioDrawerCtx = useAudioDrawerCtx();


  return (
    <Table>
      <TableBody>
        {audioData.map((item) => (
          <TableRow
            key={item.id}
            className="group flex items-center justify-between"
          >
            <TableCell>
              <div
                className="grid grid-cols-[max-content_1fr] gap-2"
                onClick={audioDrawerCtx.handleActiveDrawer.bind(
                  null,
                  `/api/audio/${item.id}`,
                )}
              >
                <div className="relative col-span-1 row-span-2 cursor-pointer">
                  <Image
                    width={30}
                    height={30}
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-12 w-12 object-cover"
                  />

                  <span
                    className={`absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-gray-700 text-lg group-hover:flex ${audioDrawerCtx.songFromImage === `/api/audio/${item.id}` ? "!flex" : ""}`}
                  >
                    {audioDrawerCtx.songFromImage ===
                    `/api/audio/${item.id}` ? (
                      <FaPause />
                    ) : (
                      <FaPlay />
                    )}
                  </span>
                </div>

                <div className="col-span-1 flex flex-col">
                  <span className="font-medium">{item.title}</span>
                </div>

                <div className="col-[2_/_span_1]">
                  {item.isDownloaded && (
                    <MdOutlineFileDownload className="text-green-500" />
                  )}
                </div>
              </div>
            </TableCell>

            <TableCell className="hidden min-w-[10rem] md:block">
              <audio controls>
                <source
                  src={`/api/audio/${item.id}`}
                  type={`audio/${item.audioType.toLowerCase()}`}
                />
                Your browser does not support the audio element.
              </audio>
            </TableCell>

            <TableCell className="hidden sm:block">
              <span>{item.category}</span>
            </TableCell>

            <TableCell className="flex items-center pt-4">
              <div className="ml-auto flex items-center space-x-2">
                <ExpandActionList />
                <DropDownMenuLIst />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DropDownMenuLIst() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex md:hidden">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-2">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <FaPlus className="text-lg" /> <span>Add To Playlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          {" "}
          <MdOutlineFileDownload className="text-lg" /> <span>Download</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <FaLink className="text-lg" /> <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ExpandActionList() {
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
