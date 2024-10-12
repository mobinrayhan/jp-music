import { redirect } from "next/navigation";

export const metadata = {
  title: "Soundei | My Library – Your Personalized Music Collection",
  description:
    "Welcome to My Library on Soundei! Access and manage your personalized music collection, including favorite tracks, playlists, and recently played songs. Curate your unique sound experience and easily revisit the music you love. Start exploring your library today and enjoy seamless access to all your favorite tunes!",
};
export default function MyLibraryPage() {
  return redirect("/my-library/favorites");
}
