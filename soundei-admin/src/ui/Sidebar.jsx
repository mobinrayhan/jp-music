import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

export default function Sidebar() {
  return (
    <div className={"flex flex-col justify-center gap-8"}>
      <Logo />
      <MainNav />
    </div>
  );
}
