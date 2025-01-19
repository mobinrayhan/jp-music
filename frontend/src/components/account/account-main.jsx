import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import SignoutButton from "./signout-btn";

export default async function AccountMain() {
  const session = await getServerSession(authOptions);
  const user = await fetchWithApiKey("/users/account-info", {
    jwt: session.jwt,
    next: { cache: "no-store" },
  });

  try {
    return (
      <section className="custom-container mt-6 px-8">
        <header>
          <article className="flex items-center gap-6">
            <div className="relative h-28 w-28">
              <Image
                src={"/no-image.png"}
                className="object-cover"
                alt="No Image"
                fill
              />
            </div>

            <div>
              <h3>
                <strong>{user.accountInfo.username}</strong>
              </h3>
              <p>{user.accountInfo.email}</p>
            </div>

            <SignoutButton />
          </article>
        </header>

        <article className="mt-12">
          <h3>Hello {user.accountInfo.username}!</h3>
          <ul
            className="my-5 ml-10 flex flex-col gap-3"
            style={{
              listStyleType: "desc",
            }}
          >
            <li>
              You have downloaded{" "}
              <Link
                href={"/my-library/downloads"}
                className="text-blue-500 transition-all duration-200 hover:underline"
              >
                <strong> {user.accountInfo.totalDownloads} audios.</strong>
              </Link>
            </li>
            <li>
              You have created
              <Link
                href={"/my-library/playlists"}
                className="text-blue-500 transition-all duration-200 hover:underline"
              >
                <strong> {user.accountInfo.totalPlaylists} playlists.</strong>
              </Link>
            </li>
            <li>
              Your favorites include{" "}
              <Link
                href={"/my-library/favorites"}
                className="text-blue-500 transition-all duration-200 hover:underline"
              >
                <strong> {user.accountInfo.totalFavorites} items.</strong>
              </Link>
            </li>
          </ul>
          Enjoy your music journey! 🎶
        </article>
      </section>
    );
  } catch (error) {
    return <p>{error?.message || "Something went wrong !"}</p>;
  }
}
