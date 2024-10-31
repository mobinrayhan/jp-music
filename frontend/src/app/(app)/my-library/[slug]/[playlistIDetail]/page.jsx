import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PlaylistDetail from "@/components/my-library/playlists/playlist-detail";
import SearchInput from "@/ui/search-input";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const session = await getServerSession(authOptions);

    const existedPlaylist = await fetchWithApiKey(
      `/users/get-playlist/${params.playlistIDetail}`,
      {
        jwt: session.jwt,
      },
    );

    return {
      title: existedPlaylist.playlist.name,
    };
  } catch (error) {
    return notFound();
  }
}

export default function PalyListItem({ params, searchParams }) {
  const playlistSlug = params?.playlistIDetail;
  const querySearch = searchParams?.querySearch;
  const maxAudios = searchParams?.maxAudios;

  return (
    <>
      <SearchInput />
      <section className="custom-container">
        <PlaylistDetail
          maxAudios={maxAudios}
          querySearch={querySearch}
          playlistSlug={playlistSlug}
        />
      </section>
    </>
  );
}
