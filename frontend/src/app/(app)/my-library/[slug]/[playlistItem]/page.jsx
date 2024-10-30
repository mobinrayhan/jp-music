import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const session = await getServerSession(authOptions);

    const existedPlaylist = await fetchWithApiKey(
      `/users/get-playlist/${params.playlistItem}`,
      {
        jwt: session.jwt,
      },
    );

    console.log(existedPlaylist);

    return {
      title: existedPlaylist.playlist.name,
    };
  } catch (error) {
    return notFound();
  }
}

export default async function PalyListItem({ params }) {
  try {
    const session = await getServerSession(authOptions);

    const existedPlaylist = await fetchWithApiKey(
      `/users/get-playlist/${params.playlistItem}`,
      {
        jwt: session.jwt,
      },
    );

    return (
      <section className="custom-container">
        {existedPlaylist.playlist.name}
      </section>
    );
  } catch (error) {
    return notFound();
  }
}
