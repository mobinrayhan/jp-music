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

  try {
    const result = fetchWithApiKey("/users/create-playlist", {
      method: "POST",
      jwt: session.jwt,
      body: JSON.stringify({ playlistName }),
    });

    return {
      success: result.message || "Success!",
      error: null,
    };
  } catch (error) {
    return {
      error: error.message || "Something went wrong!",
      success: null,
    };
  }
}

export async function addAudioToPlaylist(_, formData) {
  const audioId = formData.get("audioId");
  const playlistSlug = formData.get("playlistSlug");
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Your Are not authenticated!",
      success: null,
    };
  }

  try {
    await fetchWithApiKey("/users/add-audio-to-playlist", {
      method: "POST",
      jwt: session.jwt,
      body: JSON.stringify({ audioId, playlistSlug }),
    });
  } catch (error) {
    return {
      error: error.message || "Something went wrong!",
      success: null,
    };
  }
}
