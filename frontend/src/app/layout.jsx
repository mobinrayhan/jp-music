import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-[#131418]`}>{children}</body>
    </html>
  );
}
