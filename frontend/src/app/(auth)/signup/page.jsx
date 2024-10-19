import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signup from "@/components/auth/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Soundei | Create Your Account for Unlimited Music Access",
  description:
    "Join Soundei today and unlock a world of music! Sign up for your free account to access personalized playlists, discover new sounds, and connect with a vibrant community of music enthusiasts. Enjoy unlimited streaming and tailored recommendations—start your musical journey with Soundei now!",
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/my-library/favorites");
  }

  return <Signup />;
}
