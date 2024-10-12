"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
