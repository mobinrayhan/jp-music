import { fetchWithApiKey } from "@/utils/api";
import AudioTable from "../audios/music-info";
import Pagination from "./pagination";

export default async function SoundEffects({ categoryParams }) {
  try {
    const { category = [] } = await fetchWithApiKey("/category", {
      cache: "no-store",
    });
    const { audios } = await fetchWithApiKey(
      categoryParams === "all"
        ? "/audios/all"
        : `/audios/category/${categoryParams}`,
      { cache: "no-store" },
    );

    return (
      <>
        <AudioTable category={category} audios={audios} />
        <section className="mt-12">
          <Pagination category={categoryParams} />
        </section>
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
