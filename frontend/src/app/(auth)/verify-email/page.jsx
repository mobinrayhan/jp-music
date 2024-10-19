import ClientToast from "@/ui/client-toast";
import { fetchWithApiKey } from "@/utils/api";
import { notFound } from "next/navigation";

export default async function VerifyEmail({ searchParams }) {
  const { token } = searchParams;

  if (!token) {
    return notFound();
  }

  try {
    const verify = await fetchWithApiKey(`/auth/verify-email?token=${token}`, {
      method: "PATCH",
      cache: "no-store",
    });

    return (
      <ClientToast message={verify.message || "Success 💘"} isSuccess={true} />
    );
  } catch (error) {
    return <ClientToast message={error.message || "Something Went Wrong!"} />;
  }
}
