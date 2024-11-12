import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: Please log in" }),
        {
          status: 401,
          headers: {
            Location: `/login?ref=/download-page`,
          },
        },
      );
    }

    const { audioId } = await req.json();
    if (!audioId) {
      return new Response(
        JSON.stringify({ message: "Bad Request: Missing audioId" }),
        { status: 400 },
      );
    }

    const response = await fetchWithApiKey(`/users/toggle-favorites`, {
      method: "POST",
      body: JSON.stringify({ audioId }),
      jwt: session.jwt,
    });

    if (!response.ok) {
      // Pass error message to client
      const errorMessage = `Failed to toggle favorite: ${response.statusText}`;
      return new Response(JSON.stringify({ message: errorMessage }), {
        status: response.status,
      });
    }

    return new Response(
      JSON.stringify({ message: "Favorite toggled successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      {
        status: 500,
      },
    );
  }
};
