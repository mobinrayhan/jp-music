import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AudioPlayerProvider } from "@/context/audio-player-context";
import { categorizeAudios } from "@/lib/categorizeAudios";
import { fetchWithApiKey } from "@/utils/api";
import { getServerSession } from "next-auth";
import AudioTable from "../audios/music-info";

const apiUrl = process.env.API_URL;

export default async function DownloadCategory({ searchValue, maxAudios }) {
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

  const catAudios = categorizeAudios(audios);
  const allParsedAudios = URLparsedAudio(audios);

  return (
    <AudioPlayerProvider>
      {catAudios.today.length > 0 && (
        <CategorySection
          title="Today's Downloads"
          audios={URLparsedAudio(catAudios.today)}
          allAudios={allParsedAudios}
        />
      )}
      {catAudios.lastWeek.length > 0 && (
        <CategorySection
          title="Last Week's Downloads"
          audios={URLparsedAudio(catAudios.lastWeek)}
          allAudios={allParsedAudios}
        />
      )}
      {catAudios.lastMonth.length > 0 && (
        <CategorySection
          title="Last Month's Downloads"
          audios={URLparsedAudio(catAudios.lastMonth)}
          allAudios={allParsedAudios}
        />
      )}
      {catAudios.older.length > 0 && (
        <CategorySection
          title="Older Downloads"
          audios={URLparsedAudio(catAudios.older)}
          allAudios={allParsedAudios}
        />
      )}
    </AudioPlayerProvider>
  );
}

function CategorySection({ title, audios, allAudios }) {
  return (
    <>
      <h1 className="py-3 text-lg tracking-wide">{title}</h1>
      <AudioTable audios={audios} providedPlaylist={allAudios} />
    </>
  );
}

function URLparsedAudio(audios) {
  return audios.map((audio) => ({
    ...audio,
    previewURL: `${apiUrl}/${audio.previewURL}`,
  }));
}
