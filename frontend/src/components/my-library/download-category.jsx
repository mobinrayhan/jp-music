import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { categorizeAudios } from "@/lib/categorizeAudios";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import AudioTable from "../audios/music-info";
import Pagination from "../home/pagination";
const apiUrl = process.env.API_URL;

export default async function DownloadCategory({ searchValue, maxAudios }) {
  try {
    const { category = [] } = await fetchWithApiKey("/category", {
      next: { cache: "no-store" },
    });

    const authSession = await getServerSession(authOptions);
    const fetcherEndPoint = `/users/downloads/${authSession.user.id}?querySearch=${searchValue}&maxAudios=${maxAudios}`;

    const { audios, totalAudios } = await fetchWithApiKey(fetcherEndPoint, {
      headers: {
        Authorization: `Bearer ${authSession.jwt}`,
      },
      next: { cache: "no-store" },
    });

    const categorizedAudio = categorizeAudios(audios);

    return (
      <>
        {categorizedAudio.today.length > 0 && (
          <>
            <h1 className="py-3 text-lg tracking-wide">
              Today&apos;s Downloads
            </h1>
            <AudioTable
              category={category}
              audios={URLparsedAudio(categorizedAudio.today)}
            />
          </>
        )}

        {categorizedAudio.lastWeek.length > 0 && (
          <>
            <h1 className="py-3 text-lg tracking-wide">
              Last Week&apos;s Downloads
            </h1>
            <AudioTable
              category={category}
              audios={URLparsedAudio(categorizedAudio.lastWeek)}
            />
          </>
        )}

        {categorizedAudio.lastMonth.length > 0 && (
          <>
            <h1 className="py-3 text-lg tracking-wide">
              Last Month&apos;s Downloads
            </h1>
            <AudioTable
              category={category}
              audios={URLparsedAudio(categorizedAudio.lastMonth)}
            />
          </>
        )}

        {categorizedAudio.older.length > 0 && (
          <>
            <h1 className="py-3 text-lg tracking-wide">Older Downloads</h1>
            <AudioTable
              category={category}
              audios={URLparsedAudio(categorizedAudio.older)}
            />
          </>
        )}

        {totalAudios > maxAudios && (
          <section className="mt-12">
            <Pagination />
          </section>
        )}
      </>
    );
  } catch (error) {
    return (
      <h3 className="text-center">
        {error.message || "Something Went Wrong 😭!"}
      </h3>
    );
  }
}

function URLparsedAudio(audios) {
  return audios.map((audio) => {
    return {
      ...audio,
      previewURL: `${apiUrl}/${audio.previewURL}`,
    };
  });
}
