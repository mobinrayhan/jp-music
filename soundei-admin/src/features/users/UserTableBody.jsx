import { useState } from "react";
import { createPortal } from "react-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../lib/localStorageToken";
import Backdrop from "../../ui/Backdrop";
import OptionsWrapper from "../../ui/OptionsWrapper";
import { formatDateTimeWithSeconds } from "../../utils/helper";
import { MENU_POPUP_WIDTH } from "../audios/AudioTableList";
import EditUserPop from "./EditUserPop";
import useUserActiveStatus from "./useUserActiveStatus";

export default function UserTableBody({ sortedUser }) {
  const { updateUserMutation } = useUserActiveStatus();
  const token = getToken();

  const navigate = useNavigate();
  const [positionUser, setPositionUser] = useState(null);
  const [position, setPosition] = useState(null);
  const [editableUser, setEditableUser] = useState(null);

  const handleAddMenuPosition = (event, user) => {
    event.stopPropagation();

    if (positionUser?._id === user._id) {
      setPositionUser(null);
      return;
    } else {
      const buttonRect = event.target.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY, // Button bottom
        left: buttonRect.left + window.scrollX - MENU_POPUP_WIDTH, // Button left
      });
      setPositionUser(user);
    }
  };

  function handleViewDetail() {
    navigate(`/users/detail/${positionUser._id}`);
  }

  function handleUserActivity() {
    updateUserMutation(
      { id: positionUser._id },
      {
        onSettled: () => {
          setPositionUser(null);
        },
      },
    );
  }

  function handleEditableUser() {
    const body = document.body;

    if (body.getAttribute("style") === "overflow: hidden;") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    setEditableUser((prev) => (prev ? null : positionUser));
  }

  return (
    <>
      <tbody>
        {sortedUser.map((user) => {
          const { _id, email, isActive, lastLogin, role, username, createdAt } =
            user;

          return (
            <tr key={_id} className="border-b border-slate-200 bg-white">
              <th
                scope="row"
                className="0 whitespace-nowrap px-6 py-4 font-medium text-black"
              >
                {username}
              </th>
              <td className="px-6 py-4">{email}</td>
              <td className="px-6 py-4">{role}</td>
              <td
                className={`px-6 py-4 font-semibold tracking-wider ${isActive ? "text-green-500" : "text-red-500"}`}
              >
                {isActive ? "Active" : "Disabled"}
              </td>
              <td className="px-6 py-4">
                {createdAt ? formatDateTimeWithSeconds(createdAt) : "NOT SET"}
              </td>
              <td className="px-6 py-4">
                {lastLogin
                  ? formatDateTimeWithSeconds(lastLogin)
                  : "No LOGGED IN"}
              </td>
              <td className="flex justify-center px-6 py-4">
                {token.userId === _id ? (
                  <span className="rounded-full bg-green-500 p-2" />
                ) : (
                  <button
                    className={`border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100 ${positionUser?._id === _id ? "border-slate-300 bg-slate-200" : ""}`}
                    onClick={(eve) => handleAddMenuPosition(eve, user)}
                  >
                    <CiMenuKebab size={20} />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {/* We did not manage loading state here  */}
      {positionUser && (
        <OptionsWrapper
          position={position}
          onClose={setPositionUser.bind(null, null)}
        >
          <ul>
            <li
              className="flex cursor-pointer items-center gap-2 p-2 px-4 text-sm transition-all duration-200 hover:bg-slate-100"
              onClick={handleViewDetail}
            >
              <FaEye /> View Detail
            </li>{" "}
            <li
              className="flex cursor-pointer items-center gap-2 p-2 px-4 text-sm transition-all duration-200 hover:bg-slate-100"
              onClick={handleEditableUser}
            >
              <FaEdit /> Edit
            </li>
            <li
              className="flex cursor-pointer items-center gap-2 p-2 px-4 text-sm transition-all duration-200 hover:bg-slate-100"
              onClick={handleUserActivity}
            >
              {positionUser.isActive ? (
                <>
                  <IoIosSwitch /> De-active User
                </>
              ) : (
                <>
                  <IoIosSwitch /> Active User
                </>
              )}
            </li>
          </ul>
        </OptionsWrapper>
      )}

      {editableUser &&
        createPortal(
          <>
            {" "}
            <Backdrop onClick={handleEditableUser} />
            <EditUserPop
              editableUser={editableUser}
              onClose={handleEditableUser}
            />
          </>,
          document.body,
        )}
    </>
  );
}
