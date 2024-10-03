"use client";

import Image from "next/image";
import Link from "next/link";
const apiUrl = process.env.API_URL;

export default function CategoryBox({ categoryList, categoryParams }) {
  return (
    <section className="custom-container pb-8 pt-4">
      <ul className="grid grid-cols-3 gap-4 cSm:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {categoryList?.map((catItem) => (
          <li
            key={catItem._id.toString()}
            className={`cursor-pointer shadow-inner hover:shadow-[0_0_0_2px_green] ${catItem.category === categoryParams ? "!shadow-[0_0_0_2px_green]" : ""}`}
          >
            <Link href={`/?category=${catItem.category}`}>
              <div className="relative">
                <Image
                  src={catItem.image ? apiUrl + catItem.image : "/no-image.jpg"}
                  width={200}
                  height={200}
                  alt={catItem.category}
                  priority
                />

                <h3 className="absolute bottom-[10%] left-2 font-semibold capitalize tracking-widest text-gray-900">
                  {catItem.category}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
