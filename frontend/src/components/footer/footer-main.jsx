import Link from "next/link";

const others = [
  {
    role: "Legal Information",
    href: "/legal-information",
  },
  {
    role: "Privacy & Policy",
    href: "/privacy-policy",
  },
  {
    role: "Cookie",
    href: "/cookie",
  },
];
const helpAndSupport = [
  {
    role: "Contact Us",
    href: "/contact-us",
  },
  {
    role: "Join Our Team",
    email: "join@soundei.com",
  },
  {
    role: "Tech Support",
    email: "support@soundei.com",
  },
];

export default function FooterMain() {
  return (
    <section className="custom-container grid grid-cols-1 gap-6 pb-4 pt-16 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <h3 className="bold pb-2 text-xl font-semibold tracking-wider sm:text-2xl">
          Others
        </h3>
        <ul className="flex flex-col gap-2">
          {others.map(({ href, role }) => (
            <li key={role}>
              <Link
                href={href}
                className="text-sm tracking-wide transition-all duration-100 hover:tracking-wider"
              >
                {role}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="bold pb-2 text-xl font-semibold tracking-wider sm:text-2xl">
          Heap & Support
        </h3>

        <ul className="flex flex-col gap-2">
          {helpAndSupport.map(({ email, href, role }) => (
            <li key={role}>
              <Link
                href={email ? `mailto:${email}` : href}
                className="text-sm tracking-wide transition-all duration-100 hover:tracking-wider"
              >
                {role}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-sm">
        <div>
          <strong className="text-lg">
            Your source for free, high-quality
          </strong>
          <p>sound effects for videos and creative projects.</p>
        </div>
        <div>
          <strong className="text-lg">From subtle ambiance to</strong>
          <p>
            {" "}
            impactful impacts, find the perfect sound to bring your content to
            life.
          </p>
        </div>
        <div>
          <strong className="text-lg">Soundei, where sounds meet </strong>{" "}
          <p>creativity!</p>
        </div>
      </div>
    </section>
  );
}
