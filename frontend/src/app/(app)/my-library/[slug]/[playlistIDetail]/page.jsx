import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LibraryHeaderTabs from "@/components/my-library/library-header-tabs";
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

export default async function PalyListItem({ params, searchParams }) {
  const playlistSlug = params?.playlistIDetail;
  const querySearch = searchParams?.querySearch;
  const maxAudios = searchParams?.maxAudios;

  try {
    const session = await getServerSession(authOptions);

    const existedPlaylist = await fetchWithApiKey(
      `/users/get-playlist/${params.playlistIDetail}`,
      {
        jwt: session.jwt,
      },
    );

    return (
      <>
        <SearchInput />
        <LibraryHeaderTabs params={params} />{" "}
        <section className="custom-container">
          <h3 className="py-4 text-sm tracking-wider md:text-lg">
            {" "}
            Now Playing:{" "}
            <span className="font-bold">{existedPlaylist.playlist.name}</span> -
            Audio Collection{" "}
          </h3>

          <PlaylistDetail
            maxAudios={maxAudios}
            querySearch={querySearch}
            playlistSlug={playlistSlug}
          />
        </section>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
