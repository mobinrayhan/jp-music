import { useState } from "react";
import { createPortal } from "react-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Backdrop from "../../ui/Backdrop";
import OptionsWrapper from "../../ui/OptionsWrapper";
import { MENU_POPUP_WIDTH } from "./AudioTableList";
import EditAudioPopup from "./EditAudioPopup";

export default function AudioTableBody({ audios, positionAudioId }) {
  const [searchParams] = useSearchParams();
  const [positionAudio, setPositionAudio] = useState(null);
  const [position, setPosition] = useState(null);
  const [isEditableAudio, setIsEditableAudio] = useState(null);

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

  // SORTING AUDIOS - chat gpt and jonas 😝
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedAudios = [...audios].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * modifier;
    } else if (valueA instanceof Date || valueB instanceof Date) {
      return (new Date(valueA) - new Date(valueB)) * modifier;
    } else {
      return (valueA - valueB) * modifier;
    }
  });

  return (
    <>
      <tbody>
        {sortedAudios.map(({ _id, name, category, keywords, ...rest }) => (
          <tr key={_id} className="border-b border-slate-200 bg-white">
            <th
              scope="row"
              className="0 whitespace-nowrap px-6 py-4 font-medium text-black"
            >
              {name}
            </th>
            <td className="px-6 py-4">WILL BE ADDED</td>
            <td className="px-6 py-4">{category}</td>
            <td className="px-6 py-4">
              {keywords?.join(", ") || "No Keywords Found!"}
            </td>
            <td className="flex justify-center px-6 py-4">
              <button
                className={`border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100 ${positionAudioId === _id ? "border-slate-300 bg-slate-200" : ""}`}
                onClick={(eve) =>
                  handleAddMenuPosition(eve, {
                    _id,
                    name,
                    category,
                    keywords,
                    ...rest,
                  })
                }
              >
                <CiMenuKebab size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>

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
