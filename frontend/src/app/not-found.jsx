import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl tracking-wider md:text-4xl">
        Oops! We couldn&rsquo;t find that sound.
      </h1>
      <p>
        It seems the page you&rsquo;re looking for doesn&rsquo;t exist or the
        track might have been removed. Try exploring our library for more
        amazing sounds!
      </p>

      <Link
        href={"/category/all"}
        className="inline-block rounded bg-green-500 px-4 py-2 duration-75 hover:bg-green-400"
      >
        Go back Home
      </Link>
    </section>
  );
}
