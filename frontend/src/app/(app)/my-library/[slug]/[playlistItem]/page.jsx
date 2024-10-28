import { listOfPlaylist } from "@/components/my-library/playlists/playlists";
import { notFound } from "next/navigation";

export default function PalyListItem({ params }) {
  const isExistPlaylist = listOfPlaylist.find(
    (playlist) => playlist.slug === params.playlistItem,
  );

  if (!isExistPlaylist) {
    return notFound();
  }

  return <section className="custom-container">{params.playlistItem}</section>;
}
