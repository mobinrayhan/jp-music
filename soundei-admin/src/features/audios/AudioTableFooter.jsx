import { useSearchParams } from "react-router-dom";
import { MAX_AUDIO_PER_PAGE } from "./AudioTableList";
import useAudios from "./useAudios";

export default function AudioTableFooter({ onHasMore }) {
  const { audios, isPending } = useAudios();
  const [searchParams, setSearchParams] = useSearchParams();
  const maxAudiosParams = searchParams.get("maxAudios");

  function handleResetPagination() {
    searchParams.delete("maxAudios");
    setSearchParams(searchParams);
  }
  const totalAudioLen = audios.totalAudios;

  return (
    <tfoot className="bg-slate-200">
      <td colSpan="6" className="p-3">
        <div className="flex items-center justify-between">
          <span>
            Showing <strong>1</strong> to{" "}
            <strong>
              {maxAudiosParams && +maxAudiosParams <= totalAudioLen
                ? maxAudiosParams
                : +maxAudiosParams > totalAudioLen
                  ? totalAudioLen
                  : MAX_AUDIO_PER_PAGE}
            </strong>{" "}
            audios of <strong>{totalAudioLen}</strong> results
          </span>

          {+maxAudiosParams <= totalAudioLen ? (
            <button
              disabled={isPending}
              onClick={onHasMore}
              className={`rounded bg-blue-500 px-6 py-2 text-white`}
            >
              {isPending ? "Loading..." : "Load More"}
            </button>
          ) : (
            <button
              disabled={isPending}
              onClick={handleResetPagination}
              className={`rounded bg-blue-500 px-6 py-2 text-white`}
            >
              {isPending ? "Resetting.." : "Reset"}
            </button>
          )}
        </div>
      </td>
    </tfoot>
  );
}
