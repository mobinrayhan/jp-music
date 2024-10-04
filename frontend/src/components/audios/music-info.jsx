"use client";

import { FaPlay } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Image from "next/image";

import DropDownMenuLIst from "@/components/audios/dropdown-menulist";
import ExpandAction from "@/components/audios/expand-action";
import WaveSurferComponent from "@/components/audios/wave-surfer";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";
import { Suspense } from "react";
import { FaPause } from "react-icons/fa6";

const apiUrl = process.env.API_URL;

function imageUrl(categoryList, item) {
  const existedCategory = categoryList.find(
    (catList) => catList.category === item.category,
  );

  if (existedCategory && existedCategory?.image) {
    return apiUrl + existedCategory.image;
  }
  {
    return "/not-found.jpg";
  }
}

function MusicTableList({ category: categoryList, audios }) {
  const audioDrawerCtx = useAudioDrawerCtx();
  return (
    <Table>
      <TableBody>
        {audios?.map((item) => (
          <TableRow
            key={item._id.toString()}
            className="group flex max-h-16 items-center justify-between overflow-hidden"
          >
            <TableCell className="testing">
              <div
                className="grid grid-cols-[max-content_1fr] gap-2"
                onClick={audioDrawerCtx.handleActiveDrawer.bind(
                  null,
                  `${apiUrl}/audio-files/preview/${item.category}/${item.name}.${item.type}`,
                )}
              >
                <div className="relative col-span-1 row-span-2 cursor-pointer">
                  <Image
                    width={30}
                    height={30}
                    src={imageUrl(categoryList, item)}
                    alt={item.name}
                    className="h-12 w-12 object-cover"
                  />

                  <span
                    className={`absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-gray-700 text-lg group-hover:flex ${audioDrawerCtx.songFromImage === `${apiUrl}/audio-files/${item.category}/${item.name}.${item.type}` ? "!flex" : ""}`}
                  >
                    {audioDrawerCtx.songFromImage ===
                    `${apiUrl}/audio-files/preview/${item.category}/${item.name}.${item.type}` ? (
                      <FaPause />
                    ) : (
                      <FaPlay />
                    )}
                  </span>
                </div>

                <div className="col-span-1 flex flex-col">
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="col-[2_/_span_1]">
                  {item.isDownloaded && (
                    <MdOutlineFileDownload className="text-green-500" />
                  )}
                </div>
              </div>
            </TableCell>

            <TableCell className="hidden min-w-[10rem] lg:block">
              <WaveSurferComponent
                audioUrl={`${apiUrl}/audio-files/preview/${item.category}/${item.name}.${item.type}`}
              />
            </TableCell>

            <TableCell className="hidden sm:block">
              <span>{item.category}</span>
            </TableCell>

            <TableCell className="flex items-center pt-4">
              <div className="ml-auto flex items-center space-x-2">
                <ExpandAction />
                <DropDownMenuLIst />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AudioTable({ category, audios }) {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <MusicTableList category={category} audios={audios} />
    </Suspense>
  );
}
