import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import DialogWrapper from "./dialog-wrapper";

export default function PlaylistLogin() {
  return (
    <DialogWrapper
      title={"Log In to Add to Your Playlist"}
      description={
        "Choose a login option to save this audio to your playlist. Quick access with Facebook, Google, or use your email."
      }
    >
      <div className="mt-6 flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => signIn("google")}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
        <button
          onClick={() => signIn("facebook")}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <FaFacebook className="mr-2" />
          Login with Facebook
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className={`text-blue-600 hover:underline`}>
          {" "}
          Sign up
        </Link>
      </p>
    </DialogWrapper>
  );
}
