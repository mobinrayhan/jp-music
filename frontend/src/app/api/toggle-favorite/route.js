import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const { audioId } = await req.json();

  if (!session) {
    return new Response(null, {
      status: 401,
      headers: {
        Location: `/login?ref=/download-page`,
      },
    });
  }

  await fetchWithApiKey(`/users/toggle-favorites`, {
    method: "POST",
    body: JSON.stringify({ audioId }),
    jwt: session.jwt,
  });

  return NextResponse.json({ message: "Hello world from next js" });
};
