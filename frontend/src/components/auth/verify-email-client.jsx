// verify-email-client.tsx (Client Component)
"use client";

import { useVerifyEmailCtx } from "@/context/verify-email-context";
import ClientToast from "@/ui/client-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailClient({ message, isSuccess }) {
  const { push } = useRouter();
  const verifyCtx = useVerifyEmailCtx();

  useEffect(() => {
    verifyCtx.onSetVerifyState(message, isSuccess);
    push("/login");
  }, [message, isSuccess]);

  return (
    <div>
      <ClientToast message={message} isSuccess={isSuccess} redirect={null} />
    </div>
  );
}
