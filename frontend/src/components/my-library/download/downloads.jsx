import AudioSkeleton from "@/components/audios/audio-skeleton";
import { Suspense } from "react";
import DownloadCategory from "./download-category-v1";

export default async function Downloads({ searchValue, maxAudios }) {
  return (
    <Suspense fallback={<AudioSkeleton />}>
      <DownloadCategory searchValue={searchValue} maxAudios={maxAudios} />
    </Suspense>
  );
}
