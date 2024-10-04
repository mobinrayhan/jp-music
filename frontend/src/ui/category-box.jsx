"use client";

import Link from "next/link";
const apiUrl = process.env.API_URL;

export default function CategoryBox({ categoryList, categoryParams }) {
  return (
    <section className="custom-container pb-8 pt-4">
      <ul className="grid auto-cols-min grid-flow-col justify-center">
        {categoryList?.map((catItem) => (
          <li
            key={catItem._id.toString()}
            className="border [&:not(:last-child)]:border-r-0"
          >
            <Link
              href={`/category/${catItem.category}`}
              className={`block ${catItem.category === categoryParams ? "bg-gray-200" : ""} border-gray-300 p-2 hover:bg-gray-200`}
            >
              <p className="capitalize tracking-widest">{catItem.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
