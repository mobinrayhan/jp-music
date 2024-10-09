import { fetchWithApiKey } from "@/utils/api";
import AudioTable from "../audios/music-info";
import Pagination from "./pagination";

export default async function SoundEffects({
  fetcherEndPoint,
  finalAudioCB,
  maxAudios,
}) {
  try {
    const { category = [] } = await fetchWithApiKey("/category", {
      cache: "no-store",
    });
    const { audios, totalAudios } = await fetchWithApiKey(fetcherEndPoint, {
      cache: "no-store",
    });
    const finalAudio = finalAudioCB ? finalAudioCB(audios?.slice()) : audios;

    return (
      <>
        <AudioTable category={category} audios={finalAudio} />
        {maxAudios < totalAudios && (
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
