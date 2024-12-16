import { useState } from "react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useSortBySelect from "../../hooks/useSortBySelect";
import OptionsWrapper from "../../ui/OptionsWrapper";
import { formatDateTimeWithSeconds } from "../../utils/helper";
import { MENU_POPUP_WIDTH } from "../audios/AudioTableList";
import useUserActiveStatus from "./useUserActiveStatus";

export default function UserTableBody({ users }) {
  const { sortedData: sortedUser } = useSortBySelect({
    datas: users,
    defaultOrder: "username-asc",
  });
  const { updateUserMutation } = useUserActiveStatus();

  const navigate = useNavigate();
  const [positionUser, setPositionUser] = useState(null);
  const [position, setPosition] = useState(null);

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
        onSuccess: (data) => {
          toast.success(data?.message | `User Updated Successfully`);
        },
        onError: (error) => {
          toast.error(error?.message || "Something Went Wrong!");
        },
        onSettled: () => {
          setPositionUser(null);
        },
      },
    );
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
                <button
                  className={`border border-slate-200 p-2 transition-all duration-150 hover:bg-slate-100 ${positionUser?._id === _id ? "border-slate-300 bg-slate-200" : ""}`}
                  onClick={(eve) => handleAddMenuPosition(eve, user)}
                >
                  <CiMenuKebab size={20} />
                </button>
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
              // onClick={handleEditAudio}
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
    </>
  );
}
