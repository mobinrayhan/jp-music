"use client";

import { MAX_AUDIO_PER_PAGE } from "@/app/(app)/category/[category]/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMaxAudios =
    parseInt(searchParams.get("maxAudios")) || MAX_AUDIO_PER_PAGE;

  const handleClick = () => {
    const updatedTotalAudios = currentMaxAudios + MAX_AUDIO_PER_PAGE;
    const params = new URLSearchParams(searchParams);

    params.set("maxAudios", updatedTotalAudios);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      aria-label="Show more pagination button"
      onClick={handleClick}
      className="bottom-2 mx-auto flex w-fit items-baseline justify-center gap-2 border border-gray-900 p-2 px-4 hover:bg-gray-100"
    >
      <span>Show more</span>
      <div className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded bg-black"></span>
        <span className="inline-block h-2 w-2 rounded bg-black"></span>
        <span className="inline-block h-2 w-2 rounded bg-black"></span>
      </div>
    </button>
  );
}
