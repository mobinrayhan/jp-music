import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>{children}</body>
    </html>
  );
}
