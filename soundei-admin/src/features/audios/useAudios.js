import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAudios } from "../../services/apiAudio";
import { MAX_AUDIO_PER_PAGE } from "./AudioTableList";

export default function useAudios() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const maxAudios = searchParams.get("maxAudios");

  const maxAudioPerPage = +(maxAudios || MAX_AUDIO_PER_PAGE);

  const { data, isPending } = useQuery({
    queryFn: () => getAudios({ maxAudioPerPage }),
    queryKey: ["audios", maxAudioPerPage],
  });

  if (maxAudioPerPage) {
    queryClient.prefetchQuery({
      queryFn: () =>
        getAudios({ maxAudioPerPage: maxAudioPerPage + MAX_AUDIO_PER_PAGE }),
      queryKey: ["audios", maxAudioPerPage + MAX_AUDIO_PER_PAGE],
    });
  }

  return { audios: data?.data, isPending };
}
