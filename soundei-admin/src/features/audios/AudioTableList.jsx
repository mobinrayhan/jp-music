import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Backdrop from "../../ui/Backdrop";
import OptionsWrapper from "../../ui/OptionsWrapper";
import Spinner from "../../ui/Spinner";
import AudioTableBody from "./AudioTableBody";
import AudioTableFooter from "./AudioTableFooter";
import AudioTableHeader from "./AudioTableHeader";
import EditAudioPopup from "./EditAudioPopup";
import useAudios from "./useAudios";

export const MAX_AUDIO_PER_PAGE = 10;
export const MENU_POPUP_WIDTH = 140;

export default function AudioTableList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState(null);
  const [positionAudio, setPositionAudio] = useState(null);
  const [isEditableAudio, setIsEditableAudio] = useState(null);
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

  const handleAddMenuPosition = (event, audio) => {
    event.stopPropagation();

    if (positionAudio?._id === audio._id) {
      setPositionAudio(null);
      return;
    } else {
      const buttonRect = event.target.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY, // Button bottom
        left: buttonRect.left + window.scrollX - MENU_POPUP_WIDTH, // Button left
      });
      setPositionAudio(audio);
    }
  };

  function handleOnEdit() {
    // for removing scroll
    document.body.style.overflow = "hidden";

    setIsEditableAudio((prev) => (prev ? null : positionAudio));
    console.log(isEditableAudio);
    setPositionAudio(null);
  }

  return (
    <>
      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full bg-white text-left text-sm text-black rtl:text-right">
          <AudioTableHeader />
          <AudioTableBody
            audios={audios.audios}
            onAddMenuPosition={handleAddMenuPosition}
            positionAudioId={positionAudio?._id}
          />
          <AudioTableFooter
            isPending={isPending}
            onHasMore={handleHasMore}
            onResetPagination={handleResetPagination}
            maxAudiosParams={maxAudiosParams}
            totalAudioLen={audios.totalAudios}
          />
        </table>
      </div>

      {positionAudio && (
        <OptionsWrapper
          position={position}
          onClose={setPositionAudio.bind(null, null)}
        >
          <ul>
            <li
              className="flex cursor-pointer items-center gap-2 p-2 px-4 text-sm transition-all duration-200 hover:bg-slate-100"
              onClick={handleOnEdit}
            >
              <FaEdit /> Edit
            </li>
            <li className="flex cursor-pointer items-center gap-2 p-2 px-4 text-sm transition-all duration-200 hover:bg-slate-100">
              <FaTrash /> Delete
            </li>
          </ul>
        </OptionsWrapper>
      )}

      {isEditableAudio &&
        createPortal(
          <>
            {" "}
            <Backdrop onClick={handleOnEdit} />
            <EditAudioPopup
              editableAudio={isEditableAudio}
              onClose={handleOnEdit}
            />
          </>,
          document.body,
        )}
    </>
  );
}
