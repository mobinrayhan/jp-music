import Newest from "@/components/newest/newest";

export const metadata = {
  title: "Soundei | Newest Releases – Discover the Latest Music First",
  description:
    "Stay ahead of the curve with Soundei's newest page! Explore the latest music releases, trending tracks, and fresh playlists curated just for you. Be the first to discover new artists and sounds as they drop. Join our community of music lovers and enjoy the thrill of the latest hits today!",
};
export default function NewestPage({ searchParams }) {
  return <Newest searchParams={searchParams} />;
}
