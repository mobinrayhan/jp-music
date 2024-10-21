import Password from "@/components/auth/password";
import ClientToast from "@/ui/client-toast";
import { fetchWithApiKey } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function ResetPassword({ searchParams }) {
  const token = searchParams?.token;

  if (!token) {
    return redirect("/forget-password");
  }

  try {
    const result = await fetchWithApiKey(
      `/auth/is-valid-token?token=${token}`,
      {
        cache: "no-cache",
      },
    );

    return <Password mode="reset-password" userId={result.userId} />;
  } catch (error) {
    console.log(error);

    return (
      <ClientToast
        message={error.message}
        isSuccess={false}
        duration={200000}
        redirect="/forget-password"
      />
    );
  }
}
