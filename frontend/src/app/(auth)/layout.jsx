"use client";

import { Toaster } from "@/components/ui/toaster";
import VerifyEmailCtxProvider from "@/context/verify-email-context";

export default function AuthLayout({ children }) {
  return (
    <body>
      <VerifyEmailCtxProvider>
        {children}
        <Toaster />
      </VerifyEmailCtxProvider>
    </body>
  );
}
