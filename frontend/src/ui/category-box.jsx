"use client";

import Link from "next/link";
const apiUrl = process.env.API_URL;

export default function CategoryBox({ categoryList, categoryParams }) {
  return (
    <section className="custom-container pb-8 pt-4">
      <ul className="grid grid-cols-3 gap-2 cSm:grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-flow-col lg:gap-0">
        {categoryList?.map((catItem) => (
          <li
            key={catItem._id.toString()}
            className={`${catItem.category === categoryParams ? "bg-gray-200" : ""} overflow-hidden border lg:[&:not(:last-child)]:border-r-0`}
          >
            <Link
              href={`/category/${catItem.category}`}
              className={`block p-2 px-4 text-center hover:bg-gray-200`}
            >
              <p className="capitalize tracking-widest">{catItem.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
