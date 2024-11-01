import Downloads from "@/components/my-library/download/downloads";
import Favorites from "@/components/my-library/favorites/favorites";
import LibraryHeaderTabs from "@/components/my-library/library-header-tabs";
import Playlists from "@/components/my-library/playlists/playlists";
import SearchInput from "@/ui/search-input";
import { MAX_AUDIO_PER_PAGE } from "../../category/[category]/page";

export async function generateMetadata({ params }) {
  switch (params?.slug) {
    case "favorites":
      return {
        title: "Soundei | My Library – Favorites",
        description:
          "Discover your favorite tracks in Soundei's Favorites tab! Easily access and manage the songs you love the most, ensuring your go-to music is always just a click away. Enjoy a personalized listening experience with your top picks at your fingertips!",
      };
    case "playlists":
      return {
        title: "Soundei | My Library – Playlists",
        description:
          "Curate and explore your playlists in Soundei's Playlists tab! Create custom playlists for every mood and occasion, and dive into a world of personalized music collections. Whether it’s for a party, workout, or relaxation, find the perfect mix with ease!",
      };
    case "downloads":
      return {
        title: "Soundei | My Library – Downloads",
        description:
          "Access your downloaded tracks in Soundei's Downloads tab! Enjoy your favorite songs offline anytime, anywhere. Manage your downloaded music effortlessly and ensure you never miss a beat, even without an internet connection!",
      };
    default:
      break;
  }
}

export default function MyLibrarySlug({ params, searchParams }) {
  const searchValue = searchParams.querySearch || "";
  const maxAudios = searchParams.maxAudios || MAX_AUDIO_PER_PAGE;
  const activePath = params.slug;

  return (
    <>
      <SearchInput />
      <LibraryHeaderTabs params={params} />{" "}
      <main className="custom-container">
        {activePath === "favorites" && (
          <Favorites maxAudios={maxAudios} searchValue={searchValue} />
        )}
        {activePath === "playlists" && (
          <Playlists maxAudios={maxAudios} searchValue={searchValue} />
        )}
        {activePath === "downloads" && (
          <Downloads maxAudios={maxAudios} searchValue={searchValue} />
        )}
      </main>
    </>
  );
}
