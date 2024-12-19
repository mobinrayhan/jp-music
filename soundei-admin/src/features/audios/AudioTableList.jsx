import Spinner from "../../ui/Spinner";
import AudioTableBody from "./AudioTableBody";
import AudioTableFooter from "./AudioTableFooter";
import AudioTableHeader from "./AudioTableHeader";
import useAudios from "./useAudios";

export const MAX_AUDIO_PER_PAGE = 10;
export const MENU_POPUP_WIDTH = 160;

export default function AudioTableList() {
  const { audios, isPending, error } = useAudios();

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

  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
        <AudioTableHeader />
        <AudioTableBody audios={audios.audios} />

        {audios.audios.length ? (
          <AudioTableFooter />
        ) : (
          <tfoot>
            <td colSpan="7" className="p-10">
              <h3 className="text-center text-2xl tracking-wider">
                {" "}
                No audios were found based on your search and filter criteria.
              </h3>
            </td>
          </tfoot>
        )}
      </table>
    </div>
  );
}
