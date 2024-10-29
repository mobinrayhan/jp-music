"use client";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientToast({
  message = "Action completed.",
  isSuccess = true,
  redirect = "/login",
  duration = 3000,
}) {
  const { toast } = useToast();
  const { push } = useRouter();

  console.log(message);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: message,
        duration,
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    if (redirect) {
      const redirectTimeout = setTimeout(() => {
        push(redirect);
      }, duration);
      return () => clearTimeout(redirectTimeout);
    }
  }, [isSuccess, message, redirect, toast, push, duration]);

  return null;
}
