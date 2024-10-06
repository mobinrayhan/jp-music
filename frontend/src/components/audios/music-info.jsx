"use client";

import { FaPlay } from "react-icons/fa6";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DropDownMenuLIst from "@/components/audios/dropdown-menulist";
import ExpandAction from "@/components/audios/expand-action";
import WaveSurferComponent from "@/components/audios/wave-surfer";
import { useAudioDrawerCtx } from "@/context/audio-drawer-ctx";
import { Suspense } from "react";
import { FaPause } from "react-icons/fa6";

const apiUrl = process.env.API_URL;

function MusicTableList({ category: categoryList, audios }) {
  const audioDrawerCtx = useAudioDrawerCtx();
  return (
    <Table>
      <TableBody>
        {audios?.map((audio) => (
          <TableRow
            key={audio._id.toString()}
            className="group flex max-h-16 items-center justify-between overflow-hidden"
          >
            <TableCell className="basis-64 overflow-hidden">
              <button
                aria-label="Start audio  button"
                className="grid grid-cols-[max-content_1fr] items-center gap-x-3"
                onClick={audioDrawerCtx.handleActiveDrawer.bind(
                  null,
                  `${apiUrl}/${audio.previewURL}`,
                )}
              >
                <div className="col-span-1 row-span-2 cursor-pointer">
                  <span>
                    {audioDrawerCtx.songFromImage ===
                    `${apiUrl}/${audio.previewURL}` ? (
                      <FaPause size={18} />
                    ) : (
                      <FaPlay size={18} />
                    )}
                  </span>
                </div>

                <h3 className="col-span-1 flex max-w-52 flex-col overflow-hidden text-nowrap text-left font-medium tracking-widest">
                  {audio.name}
                </h3>

                <p className="col-[2_/_span_1] text-start text-xs tracking-wide text-gray-500">
                  Placeholder Category
                </p>
              </button>
            </TableCell>

            <TableCell className="hidden min-w-[10rem] lg:block">
              <WaveSurferComponent audioUrl={`${apiUrl}/${audio.previewURL}`} />
            </TableCell>

            <TableCell className="hidden basis-24 justify-start sm:flex">
              <span>{audio.category}</span>
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
