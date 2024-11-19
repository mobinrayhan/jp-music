import { FiUsers } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { SiAudioboom } from "react-icons/si";
import { Link } from "react-router-dom";

const sidebarMenuList = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    items: [{ name: "Overview", path: "/dashboard/overview" }],
  },
  {
    title: "Users",
    icon: <FiUsers />,
    items: [
      { name: "All Users", path: "/users/all" },
      { name: "Roles & Permissions", path: "/users/roles" },
      { name: "Blocked Users", path: "/users/blocked" },
    ],
  },
  {
    title: "Audio Content",
    icon: <SiAudioboom />,
    items: [
      { name: "All Audio", path: "/audio/all" },
      { name: "Upload Audio", path: "/audio/upload" },
      { name: "Categories", path: "/audio/categories" },
      // { name: "Genres", path: "/audio/genres" },
    ],
  },
  // {
  //   title: "Moderation",
  //   icon: <MdOutlineAdminPanelSettings />,
  //   items: [
  //     { name: "Pending Approvals", path: "/moderation/pending" },
  //     { name: "Reported Content", path: "/moderation/reported" },
  //   ],
  // },
  // {
  //   title: "Analytics",
  //   items: [
  //     { name: "Earnings", path: "/analytics/earnings" },
  //     { name: "Subscriptions", path: "/analytics/subscriptions" },
  //     { name: "Sales Reports", path: "/analytics/sales-reports" },
  //   ],
  // },
  {
    title: "Settings",
    items: [
      { name: "General", path: "/settings/general" },
      { name: "Payment", path: "/settings/payment" },
      { name: "Notifications", path: "/settings/notifications" },
    ],
  },
];

export default function MainNav() {
  return (
    <div>
      <ul className={"flex flex-col gap-6 px-6"}>
        {sidebarMenuList.map(({ title, items }) => (
          <li
            key={title}
            className={
              "grid cursor-pointer grid-cols-3 items-center justify-between"
            }
          >
            <span className="col-start-1 col-end-3">{title}</span>
            {items.length ? (
              <IoIosArrowForward className="justify-self-end" />
            ) : (
              ""
            )}

            <div className="col-start-1 col-end-4 flex flex-col gap-3 px-4 py-3">
              {items.map((item, i) => (
                <Link key={i} to={item.path}>
                  {item.name}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
