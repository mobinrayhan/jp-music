import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import AudioTableBody from "./AudioTableBody";
import AudioTableFooter from "./AudioTableFooter";
import AudioTableHeader from "./AudioTableHeader";
import useAudios from "./useAudios";

export const MAX_AUDIO_PER_PAGE = 10;
export const MENU_POPUP_WIDTH = 140;

export default function AudioTableList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { audios, isPending, error } = useAudios();

  const maxAudiosParams = searchParams.get("maxAudios");

  if (isPending) {
    return (
      <div className="flex h-[76vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-lg capitalize tracking-wider">
        {error.message}
      </p>
    );
  }

  function handleHasMore() {
    if (maxAudiosParams) {
      searchParams.set("maxAudios", +maxAudiosParams + MAX_AUDIO_PER_PAGE);
    } else {
      searchParams.set("maxAudios", MAX_AUDIO_PER_PAGE * 2);
    }
    setSearchParams(searchParams);
  }

  function handleResetPagination() {
    searchParams.delete("maxAudios");
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
          <AudioTableHeader />
          <AudioTableBody audios={audios.audios} />
          <AudioTableFooter
            isPending={isPending}
            onHasMore={handleHasMore}
            onResetPagination={handleResetPagination}
            maxAudiosParams={maxAudiosParams}
            totalAudioLen={audios.totalAudios}
          />
        </table>
      </div>
    </>
  );
}
