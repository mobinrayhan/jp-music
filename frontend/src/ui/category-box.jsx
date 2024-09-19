import Image from "next/image";
const apiUrl = process.env.API_URL;

export default function CategoryBox({ categoryList }) {
  return (
    <section className="container mx-auto px-4 pb-8 pt-2 md:px-6 lg:px-8">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {categoryList.map((catItem) => (
          <li key={catItem._id.toString()} className="cursor-pointer">
            <div className="relative">
              <Image
                src={catItem.image ? apiUrl + catItem.image : "/no-image.jpg"}
                width={200}
                height={200}
                alt={catItem.category}
              />

              <h3 className="absolute bottom-[10%] left-2 font-semibold tracking-widest text-gray-900">
                {catItem.category}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
