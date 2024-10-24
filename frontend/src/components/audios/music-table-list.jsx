import DropDownMenuLIst from "@/components/audios/dropdown-menulist";
import ExpandAction from "@/components/audios/expand-action";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAudioPlayer } from "@/context/audio-player-context";
import { useEffect, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import WaveSurfer from "wavesurfer.js";

export default function MusicTableList({ audios }) {
  const waveformRefs = useRef({});
  const {
    currentTrack,
    isPlaying,
    trackProgress,
    playTrack,
    updateTrackProgress,
  } = useAudioPlayer();

  useEffect(() => {
    audios.forEach((audio) => {
      if (!waveformRefs.current[audio._id]) {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform-${audio._id}`,
          waveColor: "#020817",
          progressColor: "#9ca3af",
          cursorColor: "transparent",
          barWidth: 2,
          barRadius: 3,
          responsive: true,
          height: 120,
          interact: true,
        });

        wavesurfer.load(audio.previewURL);
        waveformRefs.current[audio._id] = wavesurfer;

        wavesurfer.on("click", (e) => {
          const clickPosition =
            wavesurfer.getCurrentTime() / wavesurfer.getDuration();
          handleTrackClick(audio, clickPosition);
        });
      }
    });

    return () => {
      Object.entries(waveformRefs.current).forEach(([id, wavesurfer]) => {
        if (!audios.some((audio) => audio._id === id)) {
          wavesurfer.destroy();
          delete waveformRefs.current[id];
        }
      });
    };
  }, [audios]);

  useEffect(() => {
    if (currentTrack) {
      const wavesurfer = waveformRefs.current[currentTrack._id];
      if (
        wavesurfer &&
        typeof currentTrack.startPosition === "number" &&
        isFinite(currentTrack.startPosition)
      ) {
        wavesurfer.seekTo(currentTrack.startPosition);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    Object.entries(trackProgress).forEach(([id, progress]) => {
      const wavesurfer = waveformRefs.current[id];
      if (wavesurfer && typeof progress === "number" && isFinite(progress)) {
        wavesurfer.seekTo(progress);
      }
    });
  }, [trackProgress]);

  const handleTrackClick = (track, startPosition) => {
    if (typeof startPosition === "number" && isFinite(startPosition)) {
      playTrack({ ...track, startPosition });
      const wavesurfer = waveformRefs.current[track._id];
      if (wavesurfer) {
        wavesurfer.seekTo(startPosition);
      }
    } else {
      playTrack(track);
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
                    {currentTrack?._id === audio._id && isPlaying ? (
                      <FaPause size={18} />
                    ) : (
                      <FaPlay size={18} />
                    )}
                  </span>
                </div>

                <h3 className="col-span-1 flex max-w-52 flex-col overflow-hidden text-nowrap text-left font-medium tracking-widest">
                  {audio.name}
                </h3>

                <p className="col-[2_/_span_1] text-nowrap text-start text-xs tracking-wide text-gray-500">
                  {audio.keywords.map((keyword) => (
                    <span key={keyword} className="pr-2">
                      {keyword + ","}
                    </span>
                  ))}
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
                <ExpandAction audioId={audio._id} />
                <DropDownMenuLIst audioId={audio._id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
