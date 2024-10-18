import { fetchWithApiKey } from "@/utils/api";
import { notFound, redirect } from "next/navigation";

export default async function VerifyEmail({ searchParams }) {
  const { token } = searchParams;

  if (!token) {
    return notFound();
  }

  const verify = await fetchWithApiKey(`/auth/verify-email?token=${token}`, {
    method: "PATCH",
  });
  redirect("/login");
}
