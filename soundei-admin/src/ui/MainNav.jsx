const sidebarMenuList = [
  {
    title: "Dashboard",
    items: [{ name: "Overview", path: "/dashboard/overview" }],
  },
  {
    title: "Users",
    items: [
      { name: "All Users", path: "/users/all" },
      { name: "Roles & Permissions", path: "/users/roles" },
      { name: "Blocked Users", path: "/users/blocked" },
    ],
  },
  {
    title: "Audio Content",
    items: [
      { name: "All Audio", path: "/audio/all" },
      { name: "Upload Audio", path: "/audio/upload" },
      { name: "Categories", path: "/audio/categories" },
      { name: "Genres", path: "/audio/genres" },
    ],
  },
  {
    title: "Moderation",
    items: [
      { name: "Pending Approvals", path: "/moderation/pending" },
      { name: "Reported Content", path: "/moderation/reported" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Earnings", path: "/analytics/earnings" },
      { name: "Subscriptions", path: "/analytics/subscriptions" },
      { name: "Sales Reports", path: "/analytics/sales-reports" },
    ],
  },
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
  return <>hello main nav</>;
}
