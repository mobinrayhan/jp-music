"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTotalAudios = parseInt(searchParams.get("maxAudios")) || 10;

  const handleClick = () => {
    const updatedTotalAudios = currentTotalAudios + 10;
    const params = new URLSearchParams(searchParams);

    params.set("totalAudios", updatedTotalAudios);
    router.replace(`/category/${category}?${params.toString()}`);
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
