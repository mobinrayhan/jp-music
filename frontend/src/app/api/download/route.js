import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
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
      const { message } = await downloadRes.json();

      return new Response(
        JSON.stringify({ error: message || "Failed to download the file" }),
        {
          status: downloadRes.status,
        },
      );
    }

    const fileExtension = audioInfo.audio.previewURL.substr(
      audioInfo.audio.previewURL.lastIndexOf(".") + 1,
    );

    const fileName = `${audioInfo.audio.name}.${fileExtension}`;
    const fileBuffer = await downloadRes.arrayBuffer();

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
