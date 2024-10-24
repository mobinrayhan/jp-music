import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AudioSkeleton from "@/components/audios/audio-skeleton";
import SoundEffects from "@/components/home/sound-effects";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
const apiUrl = process.env.API_URL;

export default async function Favorites({ maxAudios, searchValue }) {
  const fetcherEndPoint = `/users/favorites?querySearch=${searchValue}&maxAudios=${maxAudios}`;
  const session = await getServerSession(authOptions);

  const sortByDateDesc = (audios) => {
    return audios
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((audio) => {
        return {
          ...audio,
          previewURL: `${apiUrl}/${audio.previewURL}`,
        };
      });
  };

  return (
    <Suspense fallback={<AudioSkeleton />}>
      <SoundEffects
        fetcherEndPoint={fetcherEndPoint}
        finalAudioCB={sortByDateDesc}
        jwt={session.jwt}
      />
    </Suspense>
  );
}
