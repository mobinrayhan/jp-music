import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic"; // Force dynamic route

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(null, {
        status: 401,
        headers: {
          Location: `/login?ref=/download-page`,
        },
      });
    }

    const audioInfo = await fetchWithApiKey(`/audios/${id}`);

    const downloadRes = await fetch(
      `${process.env.API_URL}/audios/download?id=${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "x-api-key": process.env.API_KEY,
        },
      },
    );

    if (!downloadRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to download the file" }),
        {
          status: downloadRes.status,
        },
      );
    }

    const fileName = `${audioInfo.audio.name}.${audioInfo.audio.type}`;
    const fileBuffer = await downloadRes.arrayBuffer();

    // Revalidate the path to refresh data if needed
    revalidatePath("/my-library/downloads");

    return new Response(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "audio/mpeg",
        "X-File-Name": fileName,
      },
    });
  } catch (error) {
    console.error("Error in downloading file:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
