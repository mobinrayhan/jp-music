import { fetchWithApiKey } from "@/utils/api";
import Link from "next/link";

export default async function Footer() {
  const data = await fetchWithApiKey("/settings/general", {
    cache: "no-store",
  });
  const links = data?.general?.filter((gen) => gen.type === "link");

  return (
    <footer className="bg-gray-200 py-2">
      <div className="custom-container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <small className="block tracking-wider">
          &copy; Copyright soundei {new Date().getFullYear()}
        </small>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                target="_blank"
                href={link.link}
                className="text-xs capitalize tracking-wider transition-all duration-150 hover:font-semibold"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
