import { useSearchParams } from "react-router-dom";
import { MAX_AUDIO_PER_PAGE } from "./AudioTableList";
import useAudios from "./useAudios";

export default function AudioTableFooter() {
  const { audios, isPending } = useAudios();
  const [searchParams, setSearchParams] = useSearchParams();
  const maxAudiosParams = searchParams.get("maxAudios");

  function handleResetPagination() {
    searchParams.delete("maxAudios");
    setSearchParams(searchParams);
  }
  const totalAudioLen = audios.totalAudios;

  function handleHasMore() {
    if (maxAudiosParams) {
      searchParams.set("maxAudios", +maxAudiosParams + MAX_AUDIO_PER_PAGE);
    } else {
      searchParams.set("maxAudios", MAX_AUDIO_PER_PAGE * 2);
    }
    setSearchParams(searchParams);
  }

  return (
    <tfoot className="bg-slate-200">
      <td colSpan="6" className="p-3">
        <div className="flex items-center justify-between">
          <span>
            Showing <strong>1</strong> to{" "}
            <strong>
              {maxAudiosParams
                ? Math.min(+maxAudiosParams, totalAudioLen)
                : Math.min(MAX_AUDIO_PER_PAGE, totalAudioLen)}
            </strong>{" "}
            audios of <strong>{totalAudioLen}</strong> results
          </span>

          {+maxAudiosParams <= totalAudioLen ? (
            <button
              disabled={isPending}
              onClick={handleHasMore}
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
