import Link from "next/link";
import { notFound } from "next/navigation";

const tabs = [
  {
    link: "/my-library/favorites",
    role: "Favorites",
  },
  {
    link: "/my-library/playlists",
    role: "Playlists",
  },
  {
    link: "/my-library/downloads",
    role: "Downloads",
  },
];

export default function LibraryHeaderTabs({ params }) {
  const activePath = params.slug;

  const isExistSlug = tabs.find(
    (tab) => tab.link === `/my-library/${activePath}`,
  );

  if (!isExistSlug) {
    return notFound();
  }

  return (
    <section className="custom-container">
      <ul className="flex border-b pt-4">
        {tabs.map(({ link, role }) => (
          <li key={role} className="">
            <Link
              href={link}
              className={`block h-full w-full border-x border-x-white p-2 px-4 hover:border-x-gray-200 hover:bg-gray-200 dark:border-x-slate-600 dark:hover:bg-slate-700 ${activePath === link?.split("/")?.[2] ? "bg-gray-200 dark:bg-slate-600" : ""}`}
            >
              {role}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
