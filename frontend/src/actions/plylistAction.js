"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";

export async function createNewPlaylist(_, formData) {
  const playlistName = formData.get("playlistName");
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Your Are not authenticated!",
      success: null,
    };
  }

  console.log(session);

  try {
    fetchWithApiKey("/users/create-playlist", {
      method: "POST",
      jwt: session.jwt,
      body: JSON.stringify({ playlistName }),
    });
  } catch (error) {
    return {
      error: error.message || "Something went wrong!",
      success: null,
    };
  }

  //   return {
  //     success: "Hello world success!",
  //     error: null,
  //   };

  return {
    success: null,
    error: "Hello error",
  };
}
