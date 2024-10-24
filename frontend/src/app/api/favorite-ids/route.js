import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(null, {
      status: 401,
      headers: {
        Location: `/login?ref=/download-page`,
      },
    });
  }

  const { favoriteIds } = await fetchWithApiKey(`/users/favorites-ids`, {
    jwt: session.jwt,
  });

  return NextResponse.json({ favoriteAudioIds: favoriteIds });
};
