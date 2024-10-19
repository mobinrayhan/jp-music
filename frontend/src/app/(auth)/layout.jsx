import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({ children }) {
  return (
    <body>
      {children}
      <Toaster />
    </body>
  );
}
