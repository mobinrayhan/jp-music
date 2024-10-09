import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DropDownMenuLIst from "@/components/audios/dropdown-menulist";
import ExpandAction from "@/components/audios/expand-action";
import WaveSurfer from "wavesurfer.js";

export default function MusicTableList({
  setCurrentTrack,
  currentTrack,
  trackProgress,
  audios,
}) {
  const [playingId, setPlayingId] = useState(null);
  const wavesurferInstances = useRef({});

  useEffect(() => {
    audios.forEach((track) => {
      if (!wavesurferInstances.current[track._id]) {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform-${track._id}`,
          waveColor: "#020817",
          progressColor: "#9ca3af",
          cursorColor: "transparent",
          barWidth: 2,
          barRadius: 3,
          responsive: true,
          height: 120,
          interact: true,
        });

        wavesurfer.load(track.previewURL);
        wavesurferInstances.current[track._id] = wavesurfer;

        wavesurfer.on("click", (e) => {
          const clickPosition = wavesurfer.getCurrentTime() / wavesurfer.getDuration();
          handleTrackClick(track, clickPosition);
        });
      }
    });

    return () => {
      Object.entries(wavesurferInstances.current).forEach(([id, wavesurfer]) => {
        if (!audios.some(audio => audio._id === id)) {
          wavesurfer.destroy();
          delete wavesurferInstances.current[id];
        }
      });
    };
  }, [audios]);

  useEffect(() => {
    if (currentTrack) {
      setPlayingId(currentTrack._id);
      const wavesurfer = wavesurferInstances.current[currentTrack._id];
      if (wavesurfer) {
        wavesurfer.seekTo(currentTrack.startPosition || 0);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    Object.entries(trackProgress).forEach(([id, progress]) => {
      const wavesurfer = wavesurferInstances.current[id];
      if (wavesurfer) {
        wavesurfer.seekTo(progress);
      }
    });
  }, [trackProgress]);

  const handleTrackClick = (track, startPosition) => {
    setCurrentTrack({ ...track, startPosition });
    setPlayingId(track._id);
    const wavesurfer = wavesurferInstances.current[track._id];
    if (wavesurfer) {
      wavesurfer.seekTo(startPosition);
    }
  };

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
                aria-label="Start audio button"
                className="grid grid-cols-[max-content_1fr] items-center gap-x-3"
                onClick={() => handleTrackClick(audio, 0)}
              >
                <div className="col-span-1 row-span-2 cursor-pointer">
                  <span>
                    {playingId === audio._id ? (
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
              <div id={`waveform-${audio._id}`} />
            </TableCell>

            <TableCell className="hidden basis-24 justify-start sm:flex">
              <span>{audio.category}</span>
            </TableCell>

            <TableCell className="flex items-center pt-4">
              <div className="ml-auto flex items-center gap-2">
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
