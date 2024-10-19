import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/components/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title:
    "Soundei | Secure Login to Your Music Account for Personalized Sound Experiences",
  description:
    "Log in to your Soundei account to unlock a world of music. Access your personalized playlists, discover new tracks, and enjoy tailored recommendations. Join our community of music lovers and enhance your listening experience. Secure your account with easy login options today!",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/my-library/favorites");
  }

  return <Login />;
}
