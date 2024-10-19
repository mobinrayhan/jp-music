"use client";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";

export default function ClientToast({ message, isSuccess = true }) {
  const { toast } = useToast();
  const { push } = useRouter();

  if (!isSuccess) {
    toast({
      title: message || "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
    return push("/login");
  } else {
    toast({
      title: message || "Uh oh! Something went wrong.",
    });
    return push("/login");
  }
}
