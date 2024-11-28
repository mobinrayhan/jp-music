import { CiUser } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import useLogout from "../features/auth/useLogout";
import useUser from "../features/auth/useUser";

export default function Header() {
  const { user } = useUser();
  const { isPending, logoutFn } = useLogout();

  return (
    <div className="ml-auto mr-14 flex items-center gap-8">
      <p>
        Welcome back,
        <strong> {user.username}</strong>
      </p>
      <span className="cursor-pointer p-2 transition-all duration-200 hover:shadow-[0_0_0_2px_black]">
        {" "}
        <CiUser size={26} />
      </span>
      <span
        className={`cursor-pointer p-2 transition-all duration-200 hover:shadow-[0_0_0_2px_black] ${isPending ? "is-pending" : ""}`}
        onClick={logoutFn}
      >
        <IoMdLogOut size={26} />
      </span>
    </div>
  );
}
