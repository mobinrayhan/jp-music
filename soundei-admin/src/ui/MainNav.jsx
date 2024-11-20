import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { SiAudioboom } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const sidebarMenuList = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={24} />,
    items: [{ name: "Overview", path: "/dashboard/overview" }],
  },
  {
    title: "Users",
    icon: <FiUsers size={24} />,
    items: [
      { name: "All Users", path: "/users/all" },
      { name: "Roles & Permissions", path: "/users/roles" },
      { name: "Blocked Users", path: "/users/blocked" },
    ],
  },
  {
    title: "Audio Content",
    icon: <SiAudioboom size={24} />,
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
    icon: <CiSettings size={24} />,
    items: [
      { name: "General", path: "/settings/general" },
      { name: "Payment", path: "/settings/payment" },
      { name: "Notifications", path: "/settings/notifications" },
    ],
  },
];

export default function MainNav() {
  // State to track the active/expanded menu
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  // Handler to toggle the menu expansion
  const toggleMenu = (title) => {
    setExpandedMenu(title);
  };

  const activeMenu = sidebarMenuList.find((menu) =>
    menu.items.find((item) => item.path === location.pathname),
  );

  return (
    <div>
      <ul className="flex flex-col gap-10 px-6">
        {sidebarMenuList.map(({ icon, title, items }) => (
          <li
            key={title}
            className="cursor-pointer"
            onClick={() => toggleMenu(title)}
          >
            <div className="grid grid-cols-3 items-center justify-between">
              <span className="col-start-1 col-end-3 flex items-center gap-4">
                {icon} {title}
              </span>
              {items.length ? (
                (
                  expandedMenu
                    ? expandedMenu === title
                    : activeMenu?.title === title
                ) ? (
                  <IoIosArrowDown className="justify-self-end" />
                ) : (
                  <IoIosArrowForward className="justify-self-end" />
                )
              ) : (
                ""
              )}
            </div>

            {/* Collapsible Submenu */}
            {(expandedMenu
              ? expandedMenu === title
              : activeMenu?.title === title) && (
              <div className="col-start-1 col-end-4 flex flex-col gap-3 px-4 py-3">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className={`text-sm text-gray-600 hover:text-gray-800 ${location.pathname === item.path ? "font-bold" : ""}`}
                    onClick={() => toggleMenu(title)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
