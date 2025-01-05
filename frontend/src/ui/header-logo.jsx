import { fetchWithApiKey } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

const apiUrl = process.env.API_URL;

export default async function HeaderLogo() {
  const data = await fetchWithApiKey("/settings/general", {
    cache: "no-store",
  });
  const logo = data?.general?.find((gen) => gen.name === "Logo");
  console.log(logo);

  return (
    <Link href={"/category/all"} className="flex items-center gap-1">
      <div className="relative aspect-[10/3] w-40">
        <Image
          src={apiUrl + `/${logo?.link}`}
          alt="Soundei Logo"
          fill
          className="object-contain"
        />
      </div>
      {/* <h3 className="md:text-2xl">Soundei</h3> */}
    </Link>
  );
}
